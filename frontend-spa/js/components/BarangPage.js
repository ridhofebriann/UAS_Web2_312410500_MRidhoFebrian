window.BarangPage = {
  data() {
    return {
      items: [],
      categories: [],
      suppliers: [],
      form: {
        nama_barang: "",
        kategori_id: "",
        supplier_id: "",
        harga: "",
        stok: "",
        deskripsi: "",
      },
      editId: null,
      loading: false,
    };
  },
  template: `
    <div class="min-h-screen bg-[#FF90E8] font-sans selection:bg-black selection:text-white pb-12">
      <!-- Top Navbar -->
      <nav class="bg-white border-b-4 border-black p-4 flex flex-wrap justify-between items-center sticky top-0 z-10 shadow-[0_4px_0_0_rgba(0,0,0,1)] mb-8">
        <div class="text-xl md:text-2xl font-black uppercase tracking-tight mb-2 md:mb-0">
          Kelola Barang
        </div>
        <div class="flex flex-wrap gap-2">
          <router-link to="/dashboard" class="bg-[#FFE600] border-4 border-black text-black font-black uppercase py-2 px-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">Dashboard</router-link>
          <router-link to="/kategori" class="bg-[#38E0B5] border-4 border-black text-black font-black uppercase py-2 px-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">Kategori</router-link>
          <router-link to="/supplier" class="bg-white border-4 border-black text-black font-black uppercase py-2 px-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">Supplier</router-link>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-8">
        
        <!-- Form Section -->
        <div class="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] self-start sticky top-[120px]">
          <h2 class="text-3xl font-black mb-6 uppercase tracking-tight">{{ editId ? 'Ubah Barang' : 'Tambah Barang' }}</h2>
          <form @submit.prevent="saveBarang" class="space-y-6">
            <div>
              <label class="block text-sm font-black uppercase tracking-widest mb-2">Nama Barang</label>
              <input v-model="form.nama_barang" type="text" class="w-full px-4 py-3 border-4 border-black bg-[#f3f4f6] focus:bg-[#FF90E8] focus:outline-none transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)]" placeholder="Contoh: Mouse Wireless" required />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-black uppercase tracking-widest mb-2">Kategori</label>
                <select v-model="form.kategori_id" class="w-full px-4 py-3 border-4 border-black bg-[#f3f4f6] focus:bg-[#FF90E8] focus:outline-none transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)]" required>
                  <option value="" disabled>Pilih kategori</option>
                  <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.nama_kategori }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-black uppercase tracking-widest mb-2">Supplier</label>
                <select v-model="form.supplier_id" class="w-full px-4 py-3 border-4 border-black bg-[#f3f4f6] focus:bg-[#FF90E8] focus:outline-none transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)]" required>
                  <option value="" disabled>Pilih supplier</option>
                  <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">{{ supplier.nama_supplier }}</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-black uppercase tracking-widest mb-2">Harga</label>
                <input v-model="form.harga" type="number" min="0" class="w-full px-4 py-3 border-4 border-black bg-[#f3f4f6] focus:bg-[#FF90E8] focus:outline-none transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)]" placeholder="0" required />
              </div>
              <div>
                <label class="block text-sm font-black uppercase tracking-widest mb-2">Stok</label>
                <input v-model="form.stok" type="number" min="0" class="w-full px-4 py-3 border-4 border-black bg-[#f3f4f6] focus:bg-[#FF90E8] focus:outline-none transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)]" placeholder="0" required />
              </div>
            </div>
            <div>
              <label class="block text-sm font-black uppercase tracking-widest mb-2">Deskripsi</label>
              <textarea v-model="form.deskripsi" class="w-full px-4 py-3 border-4 border-black bg-[#f3f4f6] focus:bg-[#FF90E8] focus:outline-none transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)]" placeholder="Deskripsi barang" rows="4"></textarea>
            </div>
            <div class="flex flex-col sm:flex-row gap-3">
              <button type="submit" class="flex-1 bg-black text-white border-4 border-black font-black uppercase py-3 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all" :disabled="loading">
                {{ loading ? 'Loading...' : editId ? 'Simpan' : 'Tambah' }}
              </button>
              <button v-if="editId" type="button" @click="cancelEdit" class="flex-1 bg-[#FF5757] text-white border-4 border-black font-black uppercase py-3 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                Batal
              </button>
            </div>
          </form>
        </div>

        <!-- List Section -->
        <div class="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <h2 class="text-3xl font-black mb-6 uppercase tracking-tight">Daftar Barang</h2>
          
          <div v-if="items.length === 0" class="p-4 border-4 border-dashed border-black text-center font-bold text-lg">
            Belum ada data barang.
          </div>
          
          <div v-else class="space-y-6">
            <div v-for="item in items" :key="item.id" class="p-6 bg-[#f3f4f6] border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-transform">
              <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div class="flex-1">
                  <h3 class="text-2xl font-black uppercase bg-[#FF90E8] inline-block px-2 border-2 border-black mb-2">{{ item.nama_barang }}</h3>
                  <div class="grid grid-cols-2 gap-4 mt-2 mb-3">
                    <div class="bg-white border-2 border-black p-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <span class="text-xs font-black uppercase text-gray-500 block">Kategori</span>
                      <span class="font-bold">{{ item.nama_kategori }}</span>
                    </div>
                    <div class="bg-white border-2 border-black p-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
                      <span class="text-xs font-black uppercase text-gray-500 block">Supplier</span>
                      <span class="font-bold">{{ item.nama_supplier }}</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-4 text-lg font-bold border-l-4 border-black pl-3 mb-2">
                    <span class="text-green-600">Rp {{ Number(item.harga).toLocaleString('id-ID') }}</span>
                    <span class="bg-black text-white px-2 py-1 text-sm border-2 border-black shadow-[2px_2px_0_0_#FFE600]">STOK: {{ item.stok }}</span>
                  </div>
                  <p class="text-sm text-gray-700 italic border-t-2 border-dashed border-black pt-2 mt-2">{{ item.deskripsi || 'Tidak ada deskripsi.' }}</p>
                </div>
                <div class="flex lg:flex-col gap-2 w-full lg:w-auto mt-4 lg:mt-0">
                  <button @click="editBarang(item)" class="flex-1 lg:flex-none bg-white border-4 border-black font-black uppercase py-2 px-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-[#FFE600] transition-colors">Edit</button>
                  <button @click="deleteBarang(item.id)" class="flex-1 lg:flex-none bg-[#FF5757] text-white border-4 border-black font-black uppercase py-2 px-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-red-600 transition-colors">Hapus</button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  `,
  mounted() {
    this.loadMetaData();
  },
  methods: {
    async loadMetaData() {
      this.loading = true;
      try {
        const [kategoriResp, supplierResp, barangResp] = await Promise.all([
          axios.get("http://localhost:8080/api/kategori"),
          axios.get("http://localhost:8080/api/supplier"),
          axios.get("http://localhost:8080/api/barang"),
        ]);

        this.categories = kategoriResp.data.data || [];
        this.suppliers = supplierResp.data.data || [];
        this.items = barangResp.data.data || [];
      } catch (err) {
        Swal.fire({ title: 'Error!', text: 'Gagal memuat data barang.', icon: 'error', customClass: { popup: 'swal2-neo', confirmButton: 'swal2-neo-confirm' } });
      } finally {
        this.loading = false;
      }
    },
    async saveBarang() {
      this.loading = true;
      try {
        const payload = new URLSearchParams(this.form);
        let msg = "";
        if (this.editId) {
          await axios.put(`http://localhost:8080/api/barang/${this.editId}`, payload, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
          msg = "Data berhasil diperbarui!";
        } else {
          await axios.post("http://localhost:8080/api/barang", payload, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
          msg = "Barang baru berhasil ditambahkan!";
        }
        
        Swal.fire({
          title: 'Berhasil!', text: msg, icon: 'success', customClass: { popup: 'swal2-neo', confirmButton: 'swal2-neo-confirm' }
        });
        
        this.resetForm();
        this.loadMetaData();
      } catch (err) {
        const errorMsg = err.response?.data?.message || "Gagal menyimpan barang.";
        Swal.fire({ title: 'Oops!', text: errorMsg, icon: 'error', customClass: { popup: 'swal2-neo', confirmButton: 'swal2-neo-confirm' } });
      } finally {
        this.loading = false;
      }
    },
    editBarang(item) {
      this.editId = item.id;
      this.form.nama_barang = item.nama_barang;
      this.form.kategori_id = item.kategori_id;
      this.form.supplier_id = item.supplier_id;
      this.form.harga = item.harga;
      this.form.stok = item.stok;
      this.form.deskripsi = item.deskripsi;
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.editId = null;
      this.form = {
        nama_barang: "",
        kategori_id: "",
        supplier_id: "",
        harga: "",
        stok: "",
        deskripsi: "",
      };
    },
    async deleteBarang(id) {
      Swal.fire({
        title: 'Hapus Barang?',
        text: 'Data inventori ini akan dihapus permanen!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
        customClass: { popup: 'swal2-neo', confirmButton: 'swal2-neo-confirm', cancelButton: 'swal2-neo-cancel' }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://localhost:8080/api/barang/${id}`);
            Swal.fire({ title: 'Dihapus!', text: 'Barang telah dibuang.', icon: 'success', customClass: { popup: 'swal2-neo', confirmButton: 'swal2-neo-confirm' } });
            this.loadMetaData();
          } catch (err) {
            Swal.fire({ title: 'Gagal!', text: err.response?.data?.message || 'Gagal menghapus barang.', icon: 'error', customClass: { popup: 'swal2-neo', confirmButton: 'swal2-neo-confirm' } });
          }
        }
      });
    },
  },
};
