<?php

namespace App\Models;

use CodeIgniter\Model;

class BarangModel extends Model
{
    protected $table = 'barang';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $allowedFields = ['nama_barang', 'kategori_id', 'supplier_id', 'harga', 'stok', 'deskripsi'];

    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $validationRules = [
        'nama_barang' => 'required|min_length[3]|max_length[100]',
        'kategori_id' => 'required|integer|greater_than[0]',
        'supplier_id' => 'required|integer|greater_than[0]',
        'harga' => 'required|integer|greater_than_equal_to[0]',
        'stok' => 'required|integer|greater_than_equal_to[0]',
        'deskripsi' => 'permit_empty|string',
    ];

    protected $validationMessages = [
        'nama_barang' => [
            'required' => 'Nama barang harus diisi',
            'min_length' => 'Nama barang minimal 3 karakter',
        ],
        'kategori_id' => [
            'required' => 'Kategori harus dipilih',
            'greater_than' => 'Kategori tidak valid',
        ],
        'supplier_id' => [
            'required' => 'Supplier harus dipilih',
            'greater_than' => 'Supplier tidak valid',
        ],
        'harga' => [
            'required' => 'Harga harus diisi',
            'greater_than_equal_to' => 'Harga tidak boleh negatif',
        ],
        'stok' => [
            'required' => 'Stok harus diisi',
            'greater_than_equal_to' => 'Stok tidak boleh negatif',
        ],
    ];
}
