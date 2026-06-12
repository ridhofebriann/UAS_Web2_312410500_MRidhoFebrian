<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\KategoriModel;
use App\Models\SupplierModel;
use App\Models\BarangModel;

class PublicController extends BaseController
{
    public function summary()
    {
        $this->response->setHeader('Content-Type', 'application/json');

        try {
            $kategoriModel = new KategoriModel();
            $supplierModel = new SupplierModel();
            $barangModel = new BarangModel();

            $totalKategori = $kategoriModel->countAll();
            $totalSupplier = $supplierModel->countAll();
            
            // Get barang and sum stock
            $barangData = $barangModel->findAll();
            $totalBarang = count($barangData);
            $totalStok = array_reduce($barangData, function($carry, $item) {
                return $carry + (int)$item['stok'];
            }, 0);

            // Get latest 5 barang with kategori name
            $latestBarang = $barangModel
                ->select('barang.*, kategori.nama_kategori, supplier.nama_supplier')
                ->join('kategori', 'kategori.id = barang.kategori_id')
                ->join('supplier', 'supplier.id = barang.supplier_id')
                ->orderBy('barang.id', 'DESC')
                ->limit(5)
                ->findAll();

            return $this->response->setStatusCode(200)->setJSON([
                'status' => true,
                'message' => 'Ringkasan data public berhasil diambil',
                'data' => [
                    'total_kategori' => $totalKategori,
                    'total_supplier' => $totalSupplier,
                    'total_barang' => $totalBarang,
                    'total_stok' => $totalStok,
                    'latest_barang' => $latestBarang
                ],
            ]);
        } catch (\Exception $e) {
            return $this->response->setStatusCode(500)->setJSON([
                'status' => false,
                'message' => 'Error: ' . $e->getMessage(),
                'data' => null,
            ]);
        }
    }
}
