<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\BarangModel;

class BarangController extends BaseController
{
    protected $model;

    public function __construct()
    {
        $this->model = new BarangModel();
    }

    /**
     * GET /api/barang
     * Get all barang with kategori and supplier details
     */
    public function index()
    {
        $this->response->setHeader('Content-Type', 'application/json');

        try {
            $data = $this->model
                ->select('barang.*, kategori.nama_kategori, supplier.nama_supplier')
                ->join('kategori', 'kategori.id = barang.kategori_id')
                ->join('supplier', 'supplier.id = barang.supplier_id')
                ->orderBy('barang.id', 'DESC')
                ->findAll();

            return $this->response->setStatusCode(200)->setJSON([
                'status' => true,
                'message' => 'Data barang berhasil diambil',
                'data' => $data,
            ]);
        } catch (\Exception $e) {
            return $this->response->setStatusCode(500)->setJSON([
                'status' => false,
                'message' => 'Error: ' . $e->getMessage(),
                'data' => null,
            ]);
        }
    }

    /**
     * POST /api/barang
     * Create new barang
     */
    public function create()
    {
        $this->response->setHeader('Content-Type', 'application/json');

        $data = [
            'nama_barang' => $this->request->getPost('nama_barang'),
            'kategori_id' => $this->request->getPost('kategori_id'),
            'supplier_id' => $this->request->getPost('supplier_id'),
            'harga' => $this->request->getPost('harga'),
            'stok' => $this->request->getPost('stok'),
            'deskripsi' => $this->request->getPost('deskripsi'),
        ];

        // Validate
        if (!$this->model->validate($data)) {
            return $this->response->setStatusCode(422)->setJSON([
                'status' => false,
                'message' => 'Validasi gagal',
                'errors' => $this->model->errors(),
            ]);
        }

        try {
            $this->model->save($data);

            return $this->response->setStatusCode(201)->setJSON([
                'status' => true,
                'message' => 'Barang berhasil ditambahkan',
                'data' => null,
            ]);
        } catch (\Exception $e) {
            return $this->response->setStatusCode(500)->setJSON([
                'status' => false,
                'message' => 'Error: ' . $e->getMessage(),
                'data' => null,
            ]);
        }
    }

    /**
     * PUT /api/barang/{id}
     * Update barang
     */
    public function update($id = null)
    {
        $this->response->setHeader('Content-Type', 'application/json');

        // Check if barang exists
        $existing = $this->model->find($id);
        if (!$existing) {
            return $this->response->setStatusCode(404)->setJSON([
                'status' => false,
                'message' => 'Barang tidak ditemukan',
                'data' => null,
            ]);
        }

        $data = [
            'id' => $id,
            'nama_barang' => $this->request->getPost('nama_barang'),
            'kategori_id' => $this->request->getPost('kategori_id'),
            'supplier_id' => $this->request->getPost('supplier_id'),
            'harga' => $this->request->getPost('harga'),
            'stok' => $this->request->getPost('stok'),
            'deskripsi' => $this->request->getPost('deskripsi'),
        ];

        // Validate
        if (!$this->model->validate($data)) {
            return $this->response->setStatusCode(422)->setJSON([
                'status' => false,
                'message' => 'Validasi gagal',
                'errors' => $this->model->errors(),
            ]);
        }

        try {
            $this->model->update($id, $data);

            return $this->response->setStatusCode(200)->setJSON([
                'status' => true,
                'message' => 'Barang berhasil diubah',
                'data' => null,
            ]);
        } catch (\Exception $e) {
            return $this->response->setStatusCode(500)->setJSON([
                'status' => false,
                'message' => 'Error: ' . $e->getMessage(),
                'data' => null,
            ]);
        }
    }

    /**
     * DELETE /api/barang/{id}
     * Delete barang
     */
    public function delete($id = null)
    {
        $this->response->setHeader('Content-Type', 'application/json');

        // Check if barang exists
        $existing = $this->model->find($id);
        if (!$existing) {
            return $this->response->setStatusCode(404)->setJSON([
                'status' => false,
                'message' => 'Barang tidak ditemukan',
                'data' => null,
            ]);
        }

        try {
            $this->model->delete($id);

            return $this->response->setStatusCode(200)->setJSON([
                'status' => true,
                'message' => 'Barang berhasil dihapus',
                'data' => null,
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
