<?php

namespace App\Models;

use CodeIgniter\Model;

class HistoriStokModel extends Model
{
    protected $table = 'histori_stok';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $allowedFields = ['barang_id', 'tipe', 'jumlah', 'alasan'];

    protected $useTimestamps = true;
    protected $createdField = 'created_at';

    protected $validationRules = [
        'barang_id' => 'required|integer|greater_than[0]',
        'tipe' => 'required|in_list[masuk,keluar]',
        'jumlah' => 'required|integer|greater_than[0]',
        'alasan' => 'permit_empty|string',
    ];

    protected $validationMessages = [
        'barang_id' => [
            'required' => 'Barang harus dipilih',
            'greater_than' => 'Barang tidak valid',
        ],
        'tipe' => [
            'required' => 'Tipe harus dipilih (masuk/keluar)',
            'in_list' => 'Tipe hanya boleh masuk atau keluar',
        ],
        'jumlah' => [
            'required' => 'Jumlah harus diisi',
            'greater_than' => 'Jumlah harus lebih dari 0',
        ],
    ];
}
