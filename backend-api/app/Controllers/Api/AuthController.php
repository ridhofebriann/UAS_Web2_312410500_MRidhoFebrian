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

    /**
     * Login endpoint
     * POST /api/login
     */
    public function login()
    {
        // Set response header
        $this->response->setHeader('Content-Type', 'application/json');

        // Get JSON input first, fall back to form data
        $json = $this->request->getJSON(true);
        $username = $json['username'] ?? $this->request->getPost('username');
        $password = $json['password'] ?? $this->request->getPost('password');

        // Validasi input
        if (!$username || !$password) {
            return $this->response->setStatusCode(400)->setJSON([
                'status' => false,
                'message' => 'Username dan password harus diisi',
                'data' => null,
            ]);
        }

        // Cari user
        $user = $this->userModel->where('username', $username)->first();

        // Validasi user dan password
        if (!$user || !password_verify($password, $user['password'])) {
            return $this->response->setStatusCode(401)->setJSON([
                'status' => false,
                'message' => 'Username atau password salah',
                'data' => null,
            ]);
        }

        // Generate token
        $token = $this->jwt->generateToken($user['id'], $user['username'], $user['email']);

        if (!$token) {
            return $this->response->setStatusCode(500)->setJSON([
                'status' => false,
                'message' => 'Gagal generate token',
                'data' => null,
            ]);
        }

        // Success response
        return $this->response->setStatusCode(200)->setJSON([
            'status' => true,
            'message' => 'Login berhasil',
            'data' => [
                'token' => $token,
                'user' => [
                    'id' => $user['id'],
                    'username' => $user['username'],
                    'email' => $user['email'],
                    'role' => $user['role'],
                ]
            ]
        ]);
    }

    /**
     * Logout endpoint
     * POST /api/logout
     */
    public function logout()
    {
        $this->response->setHeader('Content-Type', 'application/json');

        return $this->response->setStatusCode(200)->setJSON([
            'status' => true,
            'message' => 'Logout berhasil',
            'data' => null,
        ]);
    }
}
