# 📦 E-Inventory System (Neubrutalism Edition)

Sistem Informasi Manajemen Inventori (Gudang) modern yang dibangun menggunakan perpaduan **CodeIgniter 4 (RESTful API)** di sisi *backend* dan **Vue.js 3 (SPA) + TailwindCSS** di sisi *frontend*. Aplikasi ini mengadopsi gaya desain UI **Neubrutalism** yang berani, interaktif, dan *anti-mainstream*.

Dikembangkan oleh: **M. Ridho Febrian**

---

## 📸 Dokumentasi Visual Aplikasi

*(Ganti teks placeholder di bawah ini dengan gambar screenshot yang relevan)*

### 1. Skema Relasi Database
![Skema Database](link_gambar_screenshot_phpmyadmin_disini)
> Skema relasi antara tabel `kategori`, `supplier`, dan `barang` yang saling terhubung.

### 2. Proteksi Keamanan Server (Error 401)
![Error 401 Postman](link_gambar_screenshot_postman_disini)
> Pengujian penolakan akses manipulasi data via Postman jika tidak melampirkan *Authorization Bearer Token* yang sah.

### 3. Antarmuka Aplikasi (UI)
*   **Halaman Login:**
    ![Halaman Login](link_gambar_screenshot_login_disini)
*   **Halaman Dashboard Admin:**
    ![Halaman Dashboard](link_gambar_screenshot_dashboard_disini)
*   **Form Input & Tabel Data (Kelola Barang):**
    ![Form Kelola Barang](link_gambar_screenshot_barang_disini)

---

## ⚙️ Petunjuk Instalasi (Cara Menjalankan)

Proyek ini terbagi menjadi dua bagian (*Frontend* dan *Backend*). Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi di komputer lokal (localhost).

### A. Menjalankan Backend API (CodeIgniter 4)
1. Buka terminal/Command Prompt, lalu arahkan ke folder `backend-api`:
   ```bash
   cd backend-api
   ```
2. Salin file `env` menjadi `.env` dan konfigurasikan koneksi *database* (sesuaikan `database.default.hostname`, `username`, `password`, dan `database`).
3. Jalankan migrasi *database* untuk membuat struktur tabel secara otomatis:
   ```bash
   php spark migrate
   ```
4. Jalankan *development server* bawaan CodeIgniter:
   ```bash
   php spark serve
   ```
   *Backend API akan berjalan di `http://localhost:8080/`.*

### B. Menjalankan Frontend SPA (VueJS & Tailwind)
1. Karena *frontend* ini menggunakan CDN murni untuk Vue, Axios, dan Tailwind, Anda **tidak perlu** menginstal NPM/Node.js.
2. Cukup letakkan folder proyek ini di dalam direktori server lokal Anda (misal: `C:\xampp\htdocs\`).
3. Buka *browser*, lalu akses folder `frontend-spa` melalui localhost. Misalnya:
   ```text
   http://localhost/e-inventory-system/frontend-spa/
   ```
   *(Pastikan server XAMPP Apache Anda sedang menyala).*

---

## 🔗 Tautan Penting

- **Live Demo Aplikasi:** [Masukkan Link Hosting/Vercel/Lainnya di sini]
- **Video Presentasi:** [Masukkan Link Video YouTube/Google Drive di sini]
