# 📦 E-Inventory System (Neubrutalism Edition)

Sistem Informasi Manajemen Inventori (Gudang) modern yang dibangun menggunakan perpaduan **CodeIgniter 4 (RESTful API)** di sisi *backend* dan **Vue.js 3 (SPA) + TailwindCSS** di sisi *frontend*. Aplikasi ini mengadopsi gaya desain UI **Neubrutalism** yang berani, interaktif, dan *anti-mainstream*.

Dikembangkan oleh: **M. Ridho Febrian**

---

## 📖 Penjelasan Sistem (Tentang Aplikasi)

**E-Inventory System** adalah aplikasi berbasis web yang dirancang untuk mendigitalisasi proses pendataan dan pelacakan barang di dalam gudang. Aplikasi ini memisahkan secara tegas antara hak akses publik (pengunjung umum) dan hak akses administrator (pengelola gudang). 

Dengan mengusung arsitektur **Single Page Application (SPA)**, sistem ini beroperasi sangat cepat tanpa perlu memuat ulang halaman (*no hard-reload*) setiap kali berpindah menu, memberikan pengalaman pengguna (*User Experience*) yang mulus layaknya aplikasi *desktop*.

### ✨ Fitur Utama Aplikasi
1. **Public Dashboard (Mode Pengunjung):** Pengunjung dapat melihat secara *real-time* statistik total barang, kategori, supplier, serta memantau 5 barang terbaru yang masuk ke gudang tanpa bisa mengubah data.
2. **Secure Admin Panel:** Sistem dilindungi oleh *Bearer Token* dan *Axios Interceptors*. Jika sesi habis atau pengguna mencoba memaksa masuk tanpa *login*, sistem akan otomatis menendang pengguna kembali ke halaman *login*.
3. **Manajemen Data Master (CRUD):**
   *   **Kelola Kategori:** Mengelompokkan barang berdasarkan jenisnya (contoh: Elektronik, Makanan, dll).
   *   **Kelola Supplier:** Mencatat data pemasok barang lengkap dengan kontak dan alamat.
   *   **Kelola Barang:** Pencatatan inti inventori yang mencakup harga, stok riil, serta relasi langsung dengan Kategori dan Supplier.
4. **Notifikasi Interaktif (SweetAlert2):** Setiap aksi (simpan, hapus, *error*) memberikan respon visual yang memanjakan mata dan jelas.
5. **Tema Neubrutalism:** Antarmuka (*User Interface*) didesain unik dengan warna-warna solid, garis tepi (*border*) tebal yang kontras, serta bayangan asimetris yang tegas, menghadirkan nuansa desain yang sangat modern dan *anti-mainstream*.

---

## 📸 Dokumentasi Visual Aplikasi

*(Ganti teks placeholder di bawah ini dengan gambar screenshot yang relevan)*

### 1. Skema Relasi Database
![Skema Database](https://github.com/ridhofebriann/UAS_Web2_312410500_MRidhoFebrian/blob/main/relasi%20database.png?raw=true)
> Skema relasi antara tabel `kategori`, `supplier`, dan `barang` yang saling terhubung.

### 2. Proteksi Keamanan Server (Error 401)
![Error 401 Postman](https://github.com/ridhofebriann/UAS_Web2_312410500_MRidhoFebrian/blob/main/error%20401.png?raw=true)
> Pengujian penolakan akses manipulasi data via Postman jika tidak melampirkan *Authorization Bearer Token* yang sah.

### 3. Antarmuka Aplikasi (UI)
*   **Halaman Login:**
    ![Halaman Login](https://github.com/ridhofebriann/UAS_Web2_312410500_MRidhoFebrian/blob/main/login.png?raw=true)
*   **Halaman Dashboard Admin:**
    ![Halaman Dashboard](https://github.com/ridhofebriann/UAS_Web2_312410500_MRidhoFebrian/blob/main/admindashboard.png?raw=true)
*   **Form Input & Tabel Data (Kelola Barang):**
    ![Form Kelola Barang](https://github.com/ridhofebriann/UAS_Web2_312410500_MRidhoFebrian/blob/main/kelolabarang.png?raw=true)

*   **Form Input & Tabel Data (Kelola kategori):**
    ![Form Kelola kategori](https://github.com/ridhofebriann/UAS_Web2_312410500_MRidhoFebrian/blob/main/kelolakategori.png?raw=true)

*   **Form Input & Tabel Data (Kelola supplier):**
    ![Form Kelola supplier](https://github.com/ridhofebriann/UAS_Web2_312410500_MRidhoFebrian/blob/main/kelolasupplier.png?raw=true)

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

- **Live Demo Aplikasi:** [https://youtu.be/25uBdrJZcXs]
- **Video Presentasi:** [https://youtu.be/25uBdrJZcXs]
