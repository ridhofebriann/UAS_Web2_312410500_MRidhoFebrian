<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\HistoriStokModel;
use App\Models\BarangModel;

class HistoriStokController extends BaseController
{
    protected $model;
    protected $barangModel;

    public function __construct()
    {
        $this->model = new HistoriStokModel();
        $this->barangModel = new BarangModel();
    }

    /**
     * GET /api/histori-stok
     * Get all histori stok
     */
    public function index()
    {
        $this->response->setHeader('Content-Type', 'application/json');

        try {
            $data = $this->model
                ->select('histori_stok.*, barang.nama_barang')
                ->join('barang', 'barang.id = histori_stok.barang_id')
                ->orderBy('histori_stok.id', 'DESC')
                ->findAll();

            return $this->response->setStatusCode(200)->setJSON([
                'status' => true,
                'message' => 'Data histori stok berhasil diambil',
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
     * POST /api/histori-stok
     * Create new histori stok and update barang stok
     */
    public function create()
    {
        $this->response->setHeader('Content-Type', 'application/json');

        $data = [
            'barang_id' => $this->request->getPost('barang_id'),
            'tipe' => $this->request->getPost('tipe'),
            'jumlah' => $this->request->getPost('jumlah'),
            'alasan' => $this->request->getPost('alasan'),
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
            // Get barang
            $barang = $this->barangModel->find($data['barang_id']);
            if (!$barang) {
                return $this->response->setStatusCode(404)->setJSON([
                    'status' => false,
                    'message' => 'Barang tidak ditemukan',
                    'data' => null,
                ]);
            }

            // Calculate new stok
            $newStok = $barang['stok'];
            if ($data['tipe'] === 'masuk') {
                $newStok += $data['jumlah'];
            } else {
                $newStok -= $data['jumlah'];
                // Check if stok enough
                if ($newStok < 0) {
                    return $this->response->setStatusCode(400)->setJSON([
                        'status' => false,
                        'message' => 'Stok barang tidak mencukupi',
                        'data' => null,
                    ]);
                }
            }

            // Save histori stok
            $this->model->save($data);

            // Update barang stok
            $this->barangModel->update($data['barang_id'], ['stok' => $newStok]);

            return $this->response->setStatusCode(201)->setJSON([
                'status' => true,
                'message' => 'Histori stok berhasil ditambahkan dan stok barang terupdate',
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
