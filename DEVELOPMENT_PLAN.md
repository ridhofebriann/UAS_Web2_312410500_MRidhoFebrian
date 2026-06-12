# 🗺️ Development Roadmap - E-Inventory System

## UAS Pemrograman Web 2 | Full Stack Implementation Guide

---

## 📍 Fase 1: Setup Backend & Database (Minggu 1)

### ✅ Task 1.1 - Setup CodeIgniter 4

**Durasi:** ~30 menit

```bash
# Di folder backend-api
composer create-project codeigniter4/appstarter .
```

**Checklist:**

- [ ] CI4 terinstall dan bisa dijalankan
- [ ] Cek apakah folder `app/`, `public/`, `writable/` ada
- [ ] Edit `.env` file untuk database connection

---

### ✅ Task 1.2 - Database Configuration

**Durasi:** ~20 menit

**File:** `backend-api/.env`

```ini
# Database
database.default.hostname = localhost
database.default.database = e_inventory
database.default.username = root
database.default.password =
database.default.DBDriver = MySQLi
database.default.DBPrefix =
```

**Checklist:**

- [ ] Buat database baru `e_inventory` di phpMyAdmin
- [ ] `.env` sudah dikonfigurasi dengan benar
- [ ] Test koneksi database (bisa lewat CI4 model)

---

### ✅ Task 1.3 - Create Database Tables

**Durasi:** ~45 menit

**Opsi A: Manual SQL (Recommended untuk clarity)**

- Buka phpMyAdmin → database `e_inventory`
- Copy-paste SQL dari `DATABASE_SCHEMA.md`
- Execute semua table

**Opsi B: Menggunakan CI4 Migrations**

```bash
php spark migrate:create create_users_table
php spark migrate:create create_kategori_table
php spark migrate:create create_supplier_table
php spark migrate:create create_barang_table
php spark migrate:create create_histori_stok_table
```

**Checklist:**

- [ ] Semua 5 table berhasil dibuat di database
- [ ] Relasi FK (Foreign Key) berfungsi
- [ ] Insert minimal 2-3 data sample di setiap table

---

### ✅ Task 1.4 - Create Models

**Durasi:** ~1 jam

**File structure yang akan dibuat:**

```
backend-api/app/Models/
├── UserModel.php
├── KategoriModel.php
├── SupplierModel.php
├── BarangModel.php
└── HistoriStokModel.php
```

**Template Model (Contoh: UserModel.php):**

```php
<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table      = 'users';
    protected $primaryKey = 'id';

    protected $allowedFields = ['username', 'password', 'email', 'role'];

    protected $validationRules = [
        'username' => 'required|min_length[3]|max_length[50]|is_unique[users.username]',
        'password' => 'required|min_length[6]',
        'email'    => 'required|valid_email|is_unique[users.email]',
    ];

    protected $validationMessages = [
        'username' => [
            'is_unique' => 'Username sudah terdaftar',
            'min_length' => 'Username minimal 3 karakter',
        ],
        'email' => [
            'is_unique' => 'Email sudah terdaftar',
        ],
    ];
}
?>
```

**Checklist:**

- [ ] UserModel selesai
- [ ] KategoriModel selesai
- [ ] SupplierModel selesai
- [ ] BarangModel selesai (dengan FK rules)
- [ ] HistoriStokModel selesai
- [ ] Semua model punya validation rules

---

## 📍 Fase 2: Backend API Development (Minggu 1-2)

### ✅ Task 2.1 - Setup JWT Authentication

**Durasi:** ~1 jam

**Install Package:**

```bash
composer require firebase/php-jwt
```

**File:** `backend-api/app/Libraries/JwtManager.php`

```php
<?php

namespace App\Libraries;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtManager
{
    private $secretKey = "your-secret-key-change-this";
    private $issuedAt;
    private $expire;

    public function __construct()
    {
        $this->issuedAt = time();
        $this->expire = $this->issuedAt + (7 * 24 * 60 * 60); // 7 hari
    }

    public function generateToken($userId, $username)
    {
        $payload = [
            'iat' => $this->issuedAt,
            'exp' => $this->expire,
            'userId' => $userId,
            'username' => $username,
        ];

        return JWT::encode($payload, $this->secretKey, 'HS256');
    }

    public function validateToken($token)
    {
        try {
            $decoded = JWT::decode($token, new Key($this->secretKey, 'HS256'));
            return $decoded;
        } catch (\Exception $e) {
            return null;
        }
    }
}
?>
```

**Checklist:**

- [ ] Package JWT terinstall
- [ ] JwtManager class dibuat
- [ ] Generate token bisa berfungsi
- [ ] Validate token bisa mendeteksi invalid token

---

### ✅ Task 2.2 - Create Auth Controller

**Durasi:** ~45 menit

**File:** `backend-api/app/Controllers/Api/AuthController.php`

```php
<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\UserModel;
use App\Libraries\JwtManager;

class AuthController extends BaseController
{
    protected $userModel;
    protected $jwt;

    public function __construct()
    {
        $this->userModel = new UserModel();
        $this->jwt = new JwtManager();
    }

    public function login()
    {
        $username = $this->request->getPost('username');
        $password = $this->request->getPost('password');

        // Validasi
        if (!$username || !$password) {
            return $this->response->setStatusCode(400)->setJSON([
                'status' => false,
                'message' => 'Username dan password harus diisi',
            ]);
        }

        // Cari user
        $user = $this->userModel->where('username', $username)->first();

        if (!$user || !password_verify($password, $user['password'])) {
            return $this->response->setStatusCode(401)->setJSON([
                'status' => false,
                'message' => 'Username atau password salah',
            ]);
        }

        // Generate token
        $token = $this->jwt->generateToken($user['id'], $user['username']);

        return $this->response->setJSON([
            'status' => true,
            'message' => 'Login berhasil',
            'data' => [
                'token' => $token,
                'user' => [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'email' => $user['email'],
                ]
            ]
        ]);
    }

    public function logout()
    {
        return $this->response->setJSON([
            'status' => true,
            'message' => 'Logout berhasil',
        ]);
    }
}
?>
```

**Checklist:**

- [ ] AuthController dibuat
- [ ] Method login() berfungsi
- [ ] Method logout() berfungsi
- [ ] Token di-generate dengan benar

---

### ✅ Task 2.3 - Create Resource Controllers

**Durasi:** ~2 jam

Buat controllers untuk setiap resource dengan pattern CRUD:

- `KategoriController` → GET, POST, PUT, DELETE
- `SupplierController` → GET, POST, PUT, DELETE
- `BarangController` → GET, POST, PUT, DELETE
- `HistoriStokController` → GET, POST

**Template Controller (KategoriController):**

```php
<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\KategoriModel;

class KategoriController extends BaseController
{
    protected $model;

    public function __construct()
    {
        $this->model = new KategoriModel();
    }

    // GET /api/kategori
    public function index()
    {
        $data = $this->model->findAll();
        return $this->response->setJSON([
            'status' => true,
            'data' => $data,
        ]);
    }

    // POST /api/kategori
    public function create()
    {
        $this->model->save([
            'nama_kategori' => $this->request->getPost('nama_kategori'),
            'deskripsi' => $this->request->getPost('deskripsi'),
        ]);

        return $this->response->setStatusCode(201)->setJSON([
            'status' => true,
            'message' => 'Data berhasil ditambahkan',
        ]);
    }

    // PUT /api/kategori/{id}
    public function update($id = null)
    {
        $this->model->update($id, [
            'nama_kategori' => $this->request->getPost('nama_kategori'),
            'deskripsi' => $this->request->getPost('deskripsi'),
        ]);

        return $this->response->setJSON([
            'status' => true,
            'message' => 'Data berhasil diubah',
        ]);
    }

    // DELETE /api/kategori/{id}
    public function delete($id = null)
    {
        $this->model->delete($id);

        return $this->response->setJSON([
            'status' => true,
            'message' => 'Data berhasil dihapus',
        ]);
    }
}
?>
```

**Checklist:**

- [ ] KategoriController selesai
- [ ] SupplierController selesai
- [ ] BarangController selesai
- [ ] HistoriStokController selesai
- [ ] Semua method index, create, update, delete berfungsi

---

### ✅ Task 2.4 - Setup Routes & CORS

**Durasi:** ~30 menit

**File:** `backend-api/app/Config/Routes.php`

```php
<?php

namespace Config;

// ...

$routes->group('api', static function ($routes) {
    // Auth routes (no token required)
    $routes->post('login', 'Api\AuthController::login');
    $routes->post('logout', 'Api\AuthController::logout');

    // Protected routes (require token)
    $routes->group('', ['filter' => 'AuthToken'], static function ($routes) {
        // Kategori
        $routes->get('kategori', 'Api\KategoriController::index');
        $routes->post('kategori', 'Api\KategoriController::create');
        $routes->put('kategori/(:num)', 'Api\KategoriController::update/$1');
        $routes->delete('kategori/(:num)', 'Api\KategoriController::delete/$1');

        // Supplier
        $routes->get('supplier', 'Api\SupplierController::index');
        $routes->post('supplier', 'Api\SupplierController::create');
        $routes->put('supplier/(:num)', 'Api\SupplierController::update/$1');
        $routes->delete('supplier/(:num)', 'Api\SupplierController::delete/$1');

        // Barang
        $routes->get('barang', 'Api\BarangController::index');
        $routes->post('barang', 'Api\BarangController::create');
        $routes->put('barang/(:num)', 'Api\BarangController::update/$1');
        $routes->delete('barang/(:num)', 'Api\BarangController::delete/$1');

        // Histori Stok
        $routes->get('histori-stok', 'Api\HistoriStokController::index');
        $routes->post('histori-stok', 'Api\HistoriStokController::create');
    });
});
?>
```

**File:** `backend-api/app/Filters/AuthToken.php`

```php
<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;
use App\Libraries\JwtManager;

class AuthToken implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $jwt = new JwtManager();
        $header = $request->getHeader('Authorization');

        if (!$header) {
            return response()->setStatusCode(401)->setJSON([
                'status' => false,
                'message' => 'Token tidak ditemukan',
            ]);
        }

        $token = str_replace('Bearer ', '', $header->getValue());
        $decoded = $jwt->validateToken($token);

        if (!$decoded) {
            return response()->setStatusCode(401)->setJSON([
                'status' => false,
                'message' => 'Token tidak valid',
            ]);
        }

        return true;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Nothing here
    }
}
?>
```

**File:** `backend-api/app/Config/Filters.php`

```php
<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;
use CodeIgniter\Filters\CSRF;
use CodeIgniter\Filters\DebugToolbar;
use CodeIgniter\Filters\ForceHTTPS;
use CodeIgniter\Filters\Honeypot;
use CodeIgniter\Filters\InvalidChars;
use CodeIgniter\Filters\SecureHeaders;
use App\Filters\AuthToken;
use App\Filters\Cors;

class Filters extends BaseConfig
{
    public $aliases = [
        'csrf'      => CSRF::class,
        'toolbar'   => DebugToolbar::class,
        'honeypot'  => Honeypot::class,
        'invalidchars' => InvalidChars::class,
        'secureheaders' => SecureHeaders::class,
        'AuthToken' => AuthToken::class,
        'Cors' => Cors::class,
    ];

    public $globals = [
        'before' => [
            'Cors', // CORS harus pertama
        ],
        'after'  => [
            'toolbar',
        ],
    ];
}
?>
```

**File:** `backend-api/app/Filters/Cors.php`

```php
<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class Cors implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $response = service('response');

        $response->setHeader('Access-Control-Allow-Origin', '*');
        $response->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
        $response->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
        $response->setHeader('Access-Control-Max-Age', '3600');

        if ($request->getMethod() === 'options') {
            return response()->setStatusCode(200);
        }

        return true;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Nothing here
    }
}
?>
```

**Checklist:**

- [ ] Routes dikonfigurasi dengan benar
- [ ] AuthToken filter dibuat
- [ ] Cors filter dibuat
- [ ] GET /api/kategori bisa diakses dengan token
- [ ] POST /api/kategori tanpa token menghasilkan error 401

---

## 📍 Fase 3: Frontend Setup (Minggu 2)

### ✅ Task 3.1 - Setup HTML Index & Tailwind

**Durasi:** ~45 menit

**File:** `frontend-spa/index.html`

```html
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>E-Inventory System</title>

    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Custom Neubrutalism Config -->
    <script>
      tailwind.config = {
        theme: {
          colors: {
            primary: "#000000",
            secondary: "#FFFFFF",
            accent: "#FFD700",
            border: "#000000",
            error: "#EF4444",
            success: "#22C55E",
            bg: "#F5F5F5",
          },
        },
      };
    </script>

    <style>
      /* Neubrutalism Base Styles */
      * {
        border-width: 2px;
      }

      body {
        font-family: "Courier New", monospace;
        background-color: #f5f5f5;
      }

      .btn-neo {
        @apply px-6 py-3 bg-black text-white font-bold border-2 border-black;
        box-shadow: 4px 4px 0 rgba(0, 0, 0, 1);
        transition: all 0.1s;
      }

      .btn-neo:active {
        box-shadow: 2px 2px 0 rgba(0, 0, 0, 1);
        transform: translate(2px, 2px);
      }

      .input-neo {
        @apply w-full px-4 py-3 bg-white border-2 border-black font-bold;
        box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1);
      }

      .card-neo {
        @apply bg-white border-2 border-black p-6;
        box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.1);
      }

      .menu-neo {
        @apply border-b-2 border-black pb-4 mb-4;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>

    <!-- Vue 3 CDN -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

    <!-- Vue Router CDN -->
    <script src="https://unpkg.com/vue-router@4/dist/vue-router.global.js"></script>

    <!-- Axios CDN -->
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

    <!-- App JS -->
    <script src="js/app.js"></script>
  </body>
</html>
```

**Checklist:**

- [ ] index.html selesai dibuat
- [ ] Tailwind CSS terload dengan benar
- [ ] Vue 3 CDN tersedia
- [ ] Axios library tersedia

---

### ✅ Task 3.2 - Setup Vue App & Router

**Durasi:** ~1 jam

**File:** `frontend-spa/js/app.js`

```javascript
const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// Import Components
const Home = {
  template: `
        <div class="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center">
            <div class="card-neo w-full max-w-2xl">
                <h1 class="text-4xl font-black mb-4">📦 E-Inventory System</h1>
                <p class="text-lg mb-8">Sistem Manajemen Inventaris Barang dengan Neubrutalism Design</p>
                <a href="#/login" class="btn-neo inline-block">Login Sekarang</a>
            </div>
        </div>
    `,
};

const Login = {
  data() {
    return {
      username: "",
      password: "",
      loading: false,
      error: "",
    };
  },
  template: `
        <div class="min-h-screen bg-white flex items-center justify-center p-4">
            <div class="card-neo w-full max-w-md">
                <h2 class="text-3xl font-black mb-8">🔐 Login Admin</h2>
                
                <div class="mb-4" v-if="error">
                    <p class="text-red-600 font-bold border-2 border-red-600 p-3">⚠️ {{ error }}</p>
                </div>

                <form @submit.prevent="handleLogin">
                    <div class="mb-4">
                        <label class="block font-bold mb-2">Username</label>
                        <input v-model="username" type="text" class="input-neo" placeholder="Masukkan username" required>
                    </div>

                    <div class="mb-6">
                        <label class="block font-bold mb-2">Password</label>
                        <input v-model="password" type="password" class="input-neo" placeholder="Masukkan password" required>
                    </div>

                    <button type="submit" class="btn-neo w-full" :disabled="loading">
                        {{ loading ? 'Loading...' : 'Login' }}
                    </button>
                </form>
            </div>
        </div>
    `,
  methods: {
    async handleLogin() {
      this.loading = true;
      this.error = "";

      try {
        const response = await axios.post("http://localhost:8080/api/login", {
          username: this.username,
          password: this.password,
        });

        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        localStorage.setItem("isLoggedIn", "true");

        this.$router.push("/dashboard");
      } catch (err) {
        this.error = err.response?.data?.message || "Login gagal";
      } finally {
        this.loading = false;
      }
    },
  },
};

const Dashboard = {
  template: `
        <div class="min-h-screen bg-gray-100">
            <nav class="bg-white border-b-4 border-black p-4">
                <div class="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 class="text-2xl font-black">📦 E-Inventory</h1>
                    <button @click="handleLogout" class="btn-neo">Logout</button>
                </div>
            </nav>

            <div class="max-w-7xl mx-auto p-4 grid grid-cols-4 gap-4 mt-4">
                <div class="card-neo">
                    <div class="text-3xl font-black text-yellow-500">🏷️</div>
                    <p class="font-bold">Kategori</p>
                    <p class="text-2xl font-black">0</p>
                </div>
                <div class="card-neo">
                    <div class="text-3xl font-black">🤝</div>
                    <p class="font-bold">Supplier</p>
                    <p class="text-2xl font-black">0</p>
                </div>
                <div class="card-neo">
                    <div class="text-3xl font-black">📊</div>
                    <p class="font-bold">Barang</p>
                    <p class="text-2xl font-black">0</p>
                </div>
                <div class="card-neo">
                    <div class="text-3xl font-black">📈</div>
                    <p class="font-bold">Total Stok</p>
                    <p class="text-2xl font-black">0</p>
                </div>
            </div>

            <div class="max-w-7xl mx-auto p-4 grid grid-cols-4 gap-4">
                <router-link to="/kategori" class="btn-neo block text-center">Kelola Kategori</router-link>
                <router-link to="/supplier" class="btn-neo block text-center">Kelola Supplier</router-link>
                <router-link to="/barang" class="btn-neo block text-center">Kelola Barang</router-link>
                <router-link to="/histori" class="btn-neo block text-center">Lihat Histori</router-link>
            </div>
        </div>
    `,
  methods: {
    handleLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      this.$router.push("/");
    },
  },
};

// Setup Routes
const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// Route Guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (to.meta.requiresAuth && !isLoggedIn) {
    next("/login");
  } else {
    next();
  }
});

// Setup Axios Interceptor
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("isLoggedIn");
      router.push("/login");
    }
    return Promise.reject(error);
  },
);

// Create App
const app = createApp({});

app.use(router);
app.mount("#app");
```

**Checklist:**

- [ ] App.js selesai dibuat dengan struktur lengkap
- [ ] Router dikonfigurasi dengan 4 rute utama
- [ ] Axios interceptor setup dengan benar
- [ ] Route guard melindungi /dashboard
- [ ] Frontend bisa menampilkan Home, Login, dan Dashboard

---

## 🎯 TAHAP AWAL YANG HARUS DIKERJAKAN SEKARANG

### Prioritas Utama (Lakukan Terlebih Dahulu):

1. ✅ **Setup Backend CI4 & Database** → Task 1.1 - 1.4
   - Install CI4, config database, buat 5 table
2. ✅ **Create Models** → Task 1.4
   - UserModel, KategoriModel, SupplierModel, BarangModel, HistoriStokModel

3. ✅ **Setup Authentication** → Task 2.1 - 2.2
   - JWT Manager, AuthController

4. ✅ **Setup Frontend Basic** → Task 3.1 - 3.2
   - index.html dengan Tailwind & Neubrutalism
   - app.js dengan Vue Router

---

## 📋 API Endpoints Summary

**Base URL:** `http://localhost:8080/api`

### Authentication

- `POST /login` - Login (no token needed)
- `POST /logout` - Logout (need token)

### Kategori (Protected)

- `GET /kategori` - List semua
- `POST /kategori` - Tambah baru
- `PUT /kategori/{id}` - Edit
- `DELETE /kategori/{id}` - Hapus

### Supplier (Protected)

- `GET /supplier` - List semua
- `POST /supplier` - Tambah baru
- `PUT /supplier/{id}` - Edit
- `DELETE /supplier/{id}` - Hapus

### Barang (Protected)

- `GET /barang` - List semua
- `POST /barang` - Tambah baru
- `PUT /barang/{id}` - Edit
- `DELETE /barang/{id}` - Hapus

### Histori Stok (Protected)

- `GET /histori-stok` - List semua
- `POST /histori-stok` - Tambah baru

---

## 🔒 Default Test Credentials

Setelah menjalankan initial data insert:

```
Username: admin
Password: admin123
```

---

## 🚀 Mari Mulai!

Saya akan memandu Anda step-by-step.

**PERTANYAAN UNTUK ANDA:**

1. Apakah CodeIgniter 4 sudah terinstall di backend-api?
2. Apakah XAMPP sudah berjalan?
3. Apakah database `e_inventory` sudah dibuat?

Jawab pertanyaan ini, lalu kita mulai dari Task 1.1 yang paling pertama! 🚀
