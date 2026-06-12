<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table = 'users';
    protected $primaryKey = 'id';
    protected $useAutoIncrement = true;
    protected $returnType = 'array';
    protected $useSoftDeletes = false;
    protected $allowedFields = ['username', 'password', 'email', 'role'];

    // Dates
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';

    // Validation
    protected $validationRules = [
        'username' => 'required|min_length[3]|max_length[50]|is_unique[users.username]',
        'password' => 'required|min_length[6]',
        'email' => 'required|valid_email|is_unique[users.email]',
    ];

    protected $validationMessages = [
        'username' => [
            'is_unique' => 'Username sudah terdaftar',
            'min_length' => 'Username minimal 3 karakter',
        ],
        'email' => [
            'is_unique' => 'Email sudah terdaftar',
            'valid_email' => 'Format email tidak valid',
        ],
    ];
}
