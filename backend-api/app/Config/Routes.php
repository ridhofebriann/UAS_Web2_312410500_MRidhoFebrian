<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */

// Default route
$routes->get('/', 'Home::index');

// ============================================
// API Routes (v1)
// ============================================
$routes->group('api', static function ($routes) {
    
    // ============================================
    // Public Routes (No Authentication Required)
    // ============================================
    $routes->post('login', 'Api\AuthController::login');
    $routes->post('logout', 'Api\AuthController::logout');
    $routes->get('summary', 'Api\PublicController::summary');

    // ============================================
    // Protected Routes (Authentication Required)
    // ============================================
    $routes->group('', ['filter' => 'AuthToken'], static function ($routes) {
        
        // Kategori Routes
        $routes->get('kategori', 'Api\KategoriController::index');
        $routes->post('kategori', 'Api\KategoriController::create');
        $routes->put('kategori/(:num)', 'Api\KategoriController::update/$1');
        $routes->delete('kategori/(:num)', 'Api\KategoriController::delete/$1');

        // Supplier Routes
        $routes->get('supplier', 'Api\SupplierController::index');
        $routes->post('supplier', 'Api\SupplierController::create');
        $routes->put('supplier/(:num)', 'Api\SupplierController::update/$1');
        $routes->delete('supplier/(:num)', 'Api\SupplierController::delete/$1');

        // Barang Routes
        $routes->get('barang', 'Api\BarangController::index');
        $routes->post('barang', 'Api\BarangController::create');
        $routes->put('barang/(:num)', 'Api\BarangController::update/$1');
        $routes->delete('barang/(:num)', 'Api\BarangController::delete/$1');

        // Histori Stok Routes
        $routes->get('histori-stok', 'Api\HistoriStokController::index');
        $routes->post('histori-stok', 'Api\HistoriStokController::create');
    });
});

