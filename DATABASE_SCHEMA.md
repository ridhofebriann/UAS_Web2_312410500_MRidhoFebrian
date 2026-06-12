# 📊 Database Schema - E-Inventory System

## 1. USERS Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  role ENUM('admin') DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 2. KATEGORI Table
```sql
CREATE TABLE kategori (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama_kategori VARCHAR(100) NOT NULL,
  deskripsi TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 3. SUPPLIER Table
```sql
CREATE TABLE supplier (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama_supplier VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  telepon VARCHAR(20),
  alamat TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 4. BARANG Table (Relasi dengan Kategori & Supplier)
```sql
CREATE TABLE barang (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nama_barang VARCHAR(100) NOT NULL,
  kategori_id INT NOT NULL,
  supplier_id INT NOT NULL,
  harga INT NOT NULL,
  stok INT NOT NULL DEFAULT 0,
  deskripsi TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (kategori_id) REFERENCES kategori(id),
  FOREIGN KEY (supplier_id) REFERENCES supplier(id)
);
```

## 5. HISTORI_STOK Table (Relasi dengan Barang)
```sql
CREATE TABLE histori_stok (
  id INT PRIMARY KEY AUTO_INCREMENT,
  barang_id INT NOT NULL,
  tipe ENUM('masuk', 'keluar') NOT NULL,
  jumlah INT NOT NULL,
  alasan VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (barang_id) REFERENCES barang(id)
);
```

## Relationship Diagram
```
Users (1) -----> (many) Barang
            (indirectly via auth)

Kategori (1) -----> (many) Barang
Supplier (1) -----> (many) Barang

Barang (1) -----> (many) HistoriStok
```
