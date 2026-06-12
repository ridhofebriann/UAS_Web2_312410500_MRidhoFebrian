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
        
        // Get Authorization header
        $authHeader = $request->getHeader('Authorization');
        
        if (!$authHeader) {
            return service('response')
                ->setStatusCode(401)
                ->setContentType('application/json')
                ->setBody(json_encode([
                    'status' => false,
                    'message' => 'Token tidak ditemukan',
                    'data' => null,
                ]));
        }

        // Extract token from "Bearer {token}"
        $token = str_replace('Bearer ', '', $authHeader->getValue());
        $token = str_replace('bearer ', '', $token);

        // Validate token
        $decoded = $jwt->validateToken($token);

        if (!$decoded) {
            return service('response')
                ->setStatusCode(401)
                ->setContentType('application/json')
                ->setBody(json_encode([
                    'status' => false,
                    'message' => 'Token tidak valid atau expired',
                    'data' => null,
                ]));
        }

        return true;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Nothing
    }
}
