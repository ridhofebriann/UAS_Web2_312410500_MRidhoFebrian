<?php

namespace App\Filters;

use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\Filters\FilterInterface;

class Cors implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $response = service('response');
        
        // Allow from any origin
        $response->setHeader('Access-Control-Allow-Origin', '*');
        $response->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
        $response->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With');
        $response->setHeader('Access-Control-Max-Age', '3600');
        $response->setHeader('Access-Control-Allow-Credentials', 'false');

        // Handle preflight requests
        if ($request->getMethod() === 'OPTIONS') {
            return $response->setStatusCode(200);
        }

        return true;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        // Ensure CORS headers are always set
        $response->setHeader('Access-Control-Allow-Origin', '*');
        $response->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
        $response->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, X-Requested-With');
    }
}
