<?php

namespace App\Libraries;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class JwtManager
{
    private $secretKey = "your-secret-key-ekainventory-2026";
    private $issuedAt;
    private $expire;

    public function __construct()
    {
        $this->issuedAt = time();
        $this->expire = $this->issuedAt + (7 * 24 * 60 * 60); // 7 hari
    }

    /**
     * Generate JWT Token
     */
    public function generateToken($userId, $username, $email)
    {
        $payload = [
            'iat' => $this->issuedAt,
            'exp' => $this->expire,
            'userId' => $userId,
            'username' => $username,
            'email' => $email,
        ];

        try {
            return JWT::encode($payload, $this->secretKey, 'HS256');
        } catch (Exception $e) {
            return null;
        }
    }

    /**
     * Validate JWT Token
     */
    public function validateToken($token)
    {
        try {
            $decoded = JWT::decode($token, new Key($this->secretKey, 'HS256'));
            return $decoded;
        } catch (Exception $e) {
            return null;
        }
    }

    /**
     * Get data dari token
     */
    public function getTokenData($token)
    {
        $decoded = $this->validateToken($token);
        
        if ($decoded) {
            return [
                'userId' => $decoded->userId,
                'username' => $decoded->username,
                'email' => $decoded->email,
            ];
        }

        return null;
    }
}
