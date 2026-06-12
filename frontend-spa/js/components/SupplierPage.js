window.SupplierPage = {
  data() {
    return {
      suppliers: [],
      form: {
        nama_supplier: "",
        email: "",
        telepon: "",
        alamat: "",
      },
      editId: null,
      loading: false,
    };
  },
  template: `
    <div class="min-h-screen bg-[#FFE600] font-sans selection:bg-black selection:text-white pb-12">
      <!-- Top Navbar -->
      <nav class="bg-white border-b-4 border-black p-4 flex flex-wrap justify-between items-center sticky top-0 z-10 shadow-[0_4px_0_0_rgba(0,0,0,1)] mb-8">
        <div class="text-xl md:text-2xl font-black uppercase tracking-tight mb-2 md:mb-0">
          Kelola Supplier
        </div>
        <div class="flex flex-wrap gap-2">
          <router-link to="/dashboard" class="bg-[#38E0B5] border-4 border-black text-black font-black uppercase py-2 px-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">Dashboard</router-link>
          <router-link to="/kategori" class="bg-white border-4 border-black text-black font-black uppercase py-2 px-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">Kategori</router-link>
          <router-link to="/barang" class="bg-[#FF90E8] border-4 border-black text-black font-black uppercase py-2 px-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">Barang</router-link>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-8">
        
        <!-- Form Section -->
        <div class="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] self-start sticky top-[120px]">
          <h2 class="text-3xl font-black mb-6 uppercase tracking-tight">{{ editId ? 'Ubah Supplier' : 'Tambah Supplier' }}</h2>
          <form @submit.prevent="saveSupplier" class="space-y-6">
            <div>
              <label class="block text-sm font-black uppercase tracking-widest mb-2">Nama Supplier</label>
              <input v-model="form.nama_supplier" type="text" class="w-full px-4 py-3 border-4 border-black bg-[#f3f4f6] focus:bg-[#38E0B5] focus:outline-none transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)]" placeholder="Contoh: PT Bursa" required />
            </div>
            <div>
              <label class="block text-sm font-black uppercase tracking-widest mb-2">Email</label>
              <input v-model="form.email" type="email" class="w-full px-4 py-3 border-4 border-black bg-[#f3f4f6] focus:bg-[#38E0B5] focus:outline-none transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)]" placeholder="supplier@example.com" />
            </div>
            <div>
              <label class="block text-sm font-black uppercase tracking-widest mb-2">Telepon</label>
              <input v-model="form.telepon" type="text" class="w-full px-4 py-3 border-4 border-black bg-[#f3f4f6] focus:bg-[#38E0B5] focus:outline-none transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)]" placeholder="08123456789" />
            </div>
            <div>
              <label class="block text-sm font-black uppercase tracking-widest mb-2">Alamat</label>
              <textarea v-model="form.alamat" class="w-full px-4 py-3 border-4 border-black bg-[#f3f4f6] focus:bg-[#38E0B5] focus:outline-none transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)]" placeholder="Alamat supplier" rows="4"></textarea>
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
          <h2 class="text-3xl font-black mb-6 uppercase tracking-tight">Daftar Supplier</h2>
          
          <div v-if="suppliers.length === 0" class="p-4 border-4 border-dashed border-black text-center font-bold text-lg">
            Belum ada data supplier.
          </div>
          
          <div v-else class="space-y-6">
            <div v-for="supplier in suppliers" :key="supplier.id" class="p-6 bg-[#f3f4f6] border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-transform">
              <div class="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h3 class="text-2xl font-black uppercase bg-[#38E0B5] inline-block px-2 border-2 border-black mb-2">{{ supplier.nama_supplier }}</h3>
                  <div class="font-bold border-l-4 border-black pl-3 mt-2 space-y-1 text-sm">
                    <p>📧 {{ supplier.email || 'Tidak tersedia' }}</p>
                    <p>📞 {{ supplier.telepon || 'Tidak tersedia' }}</p>
                    <p>📍 {{ supplier.alamat || 'Tidak tersedia' }}</p>
                  </div>
                </div>
                <div class="flex gap-2 w-full sm:w-auto">
                  <button @click="editSupplier(supplier)" class="flex-1 sm:flex-none bg-white border-4 border-black font-black uppercase py-2 px-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-[#FFE600] transition-colors">Edit</button>
                  <button @click="deleteSupplier(supplier.id)" class="flex-1 sm:flex-none bg-[#FF5757] text-white border-4 border-black font-black uppercase py-2 px-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-red-600 transition-colors">Hapus</button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  `,
  mounted() {
    this.loadSuppliers();
  },
  methods: {
    async loadSuppliers() {
      this.loading = true;
      try {
        const response = await axios.get("http://localhost:8080/api/supplier");
        this.suppliers = response.data.data || [];
      } catch (err) {
        Swal.fire({ title: 'Error!', text: 'Gagal memuat data supplier.', icon: 'error', customClass: { popup: 'swal2-neo', confirmButton: 'swal2-neo-confirm' } });
      } finally {
        this.loading = false;
      }
    },
    async saveSupplier() {
      this.loading = true;
      try {
        const payload = new URLSearchParams(this.form);
        let msg = "";
        if (this.editId) {
          await axios.put(`http://localhost:8080/api/supplier/${this.editId}`, payload, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
          msg = "Data berhasil diperbarui!";
        } else {
          await axios.post("http://localhost:8080/api/supplier", payload, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
          msg = "Supplier baru berhasil ditambahkan!";
        }
        
        Swal.fire({
          title: 'Berhasil!', text: msg, icon: 'success', customClass: { popup: 'swal2-neo', confirmButton: 'swal2-neo-confirm' }
        });
        
        this.cancelEdit();
        this.loadSuppliers();
      } catch (err) {
        const errorMsg = err.response?.data?.message || "Gagal menyimpan supplier.";
        Swal.fire({ title: 'Oops!', text: errorMsg, icon: 'error', customClass: { popup: 'swal2-neo', confirmButton: 'swal2-neo-confirm' } });
      } finally {
        this.loading = false;
      }
    },
    editSupplier(supplier) {
      this.editId = supplier.id;
      this.form.nama_supplier = supplier.nama_supplier;
      this.form.email = supplier.email;
      this.form.telepon = supplier.telepon;
      this.form.alamat = supplier.alamat;
    },
    cancelEdit() {
      this.editId = null;
      this.form.nama_supplier = "";
      this.form.email = "";
      this.form.telepon = "";
      this.form.alamat = "";
    },
    async deleteSupplier(id) {
      Swal.fire({
        title: 'Hapus Supplier?',
        text: 'Tindakan ini tidak bisa dibatalkan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
        customClass: { popup: 'swal2-neo', confirmButton: 'swal2-neo-confirm', cancelButton: 'swal2-neo-cancel' }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://localhost:8080/api/supplier/${id}`);
            Swal.fire({ title: 'Dihapus!', text: 'Supplier telah dibuang.', icon: 'success', customClass: { popup: 'swal2-neo', confirmButton: 'swal2-neo-confirm' } });
            this.loadSuppliers();
          } catch (err) {
            Swal.fire({ title: 'Gagal!', text: err.response?.data?.message || 'Gagal menghapus supplier.', icon: 'error', customClass: { popup: 'swal2-neo', confirmButton: 'swal2-neo-confirm' } });
          }
        }
      });
    },
  },
};
