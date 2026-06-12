<?php

namespace App\Models;

use CodeIgniter\Model;

class SupplierModel extends Model
{
    protected $table = 'supplier';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $allowedFields = ['nama_supplier', 'email', 'telepon', 'alamat'];

    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    protected $validationRules = [
        'nama_supplier' => 'required|min_length[3]|max_length[100]',
        'email' => 'permit_empty|valid_email',
        'telepon' => 'permit_empty|string',
        'alamat' => 'permit_empty|string',
    ];

    protected $validationMessages = [
        'nama_supplier' => [
            'required' => 'Nama supplier harus diisi',
            'min_length' => 'Nama supplier minimal 3 karakter',
        ],
        'email' => [
            'valid_email' => 'Format email tidak valid',
        ],
    ];
}
