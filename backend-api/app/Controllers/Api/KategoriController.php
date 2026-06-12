<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\KategoriModel;

class KategoriController extends BaseController
{
    protected $model;

    public function __construct()
    {
        $this->model = new KategoriModel();
    }

    /**
     * GET /api/kategori
     * Get all kategori
     */
    public function index()
    {
        $this->response->setHeader('Content-Type', 'application/json');

        try {
            $data = $this->model->orderBy('id', 'DESC')->findAll();

            return $this->response->setStatusCode(200)->setJSON([
                'status' => true,
                'message' => 'Data kategori berhasil diambil',
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
     * POST /api/kategori
     * Create new kategori
     */
    public function create()
    {
        $this->response->setHeader('Content-Type', 'application/json');

        $data = [
            'nama_kategori' => $this->request->getPost('nama_kategori'),
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
                'message' => 'Kategori berhasil ditambahkan',
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
     * PUT /api/kategori/{id}
     * Update kategori
     */
    public function update($id = null)
    {
        $this->response->setHeader('Content-Type', 'application/json');

        // Check if kategori exists
        $existing = $this->model->find($id);
        if (!$existing) {
            return $this->response->setStatusCode(404)->setJSON([
                'status' => false,
                'message' => 'Kategori tidak ditemukan',
                'data' => null,
            ]);
        }

        $data = [
            'id' => $id,
            'nama_kategori' => $this->request->getPost('nama_kategori'),
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
                'message' => 'Kategori berhasil diubah',
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
     * DELETE /api/kategori/{id}
     * Delete kategori
     */
    public function delete($id = null)
    {
        $this->response->setHeader('Content-Type', 'application/json');

        // Check if kategori exists
        $existing = $this->model->find($id);
        if (!$existing) {
            return $this->response->setStatusCode(404)->setJSON([
                'status' => false,
                'message' => 'Kategori tidak ditemukan',
                'data' => null,
            ]);
        }

        try {
            $this->model->delete($id);

            return $this->response->setStatusCode(200)->setJSON([
                'status' => true,
                'message' => 'Kategori berhasil dihapus',
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
