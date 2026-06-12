<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\SupplierModel;

class SupplierController extends BaseController
{
    protected $model;

    public function __construct()
    {
        $this->model = new SupplierModel();
    }

    /**
     * GET /api/supplier
     * Get all supplier
     */
    public function index()
    {
        $this->response->setHeader('Content-Type', 'application/json');

        try {
            $data = $this->model->orderBy('id', 'DESC')->findAll();

            return $this->response->setStatusCode(200)->setJSON([
                'status' => true,
                'message' => 'Data supplier berhasil diambil',
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
     * POST /api/supplier
     * Create new supplier
     */
    public function create()
    {
        $this->response->setHeader('Content-Type', 'application/json');

        $data = [
            'nama_supplier' => $this->request->getPost('nama_supplier'),
            'email' => $this->request->getPost('email'),
            'telepon' => $this->request->getPost('telepon'),
            'alamat' => $this->request->getPost('alamat'),
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
                'message' => 'Supplier berhasil ditambahkan',
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
     * PUT /api/supplier/{id}
     * Update supplier
     */
    public function update($id = null)
    {
        $this->response->setHeader('Content-Type', 'application/json');

        // Check if supplier exists
        $existing = $this->model->find($id);
        if (!$existing) {
            return $this->response->setStatusCode(404)->setJSON([
                'status' => false,
                'message' => 'Supplier tidak ditemukan',
                'data' => null,
            ]);
        }

        $data = [
            'id' => $id,
            'nama_supplier' => $this->request->getPost('nama_supplier'),
            'email' => $this->request->getPost('email'),
            'telepon' => $this->request->getPost('telepon'),
            'alamat' => $this->request->getPost('alamat'),
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
                'message' => 'Supplier berhasil diubah',
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
     * DELETE /api/supplier/{id}
     * Delete supplier
     */
    public function delete($id = null)
    {
        $this->response->setHeader('Content-Type', 'application/json');

        // Check if supplier exists
        $existing = $this->model->find($id);
        if (!$existing) {
            return $this->response->setStatusCode(404)->setJSON([
                'status' => false,
                'message' => 'Supplier tidak ditemukan',
                'data' => null,
            ]);
        }

        try {
            $this->model->delete($id);

            return $this->response->setStatusCode(200)->setJSON([
                'status' => true,
                'message' => 'Supplier berhasil dihapus',
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
