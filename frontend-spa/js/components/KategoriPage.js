window.KategoriPage = {
  data() {
    return {
      categories: [],
      form: {
        nama_kategori: "",
        deskripsi: "",
      },
      editId: null,
      loading: false,
    };
  },
  template: `
    <div class="min-h-screen bg-[#38E0B5] font-sans selection:bg-black selection:text-white pb-12">
      <!-- Top Navbar -->
      <nav class="bg-white border-b-4 border-black p-4 flex flex-wrap justify-between items-center sticky top-0 z-10 shadow-[0_4px_0_0_rgba(0,0,0,1)] mb-8">
        <div class="text-xl md:text-2xl font-black uppercase tracking-tight mb-2 md:mb-0">
          Kelola Kategori
        </div>
        <div class="flex flex-wrap gap-2">
          <router-link to="/dashboard" class="bg-[#FFE600] border-4 border-black text-black font-black uppercase py-2 px-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">Dashboard</router-link>
          <router-link to="/supplier" class="bg-white border-4 border-black text-black font-black uppercase py-2 px-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">Supplier</router-link>
          <router-link to="/barang" class="bg-[#FF90E8] border-4 border-black text-black font-black uppercase py-2 px-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">Barang</router-link>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 xl:grid-cols-[1fr_2fr] gap-8">
        
        <!-- Form Section -->
        <div class="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] self-start sticky top-[120px]">
          <h2 class="text-3xl font-black mb-6 uppercase tracking-tight">{{ editId ? 'Ubah Kategori' : 'Tambah Kategori' }}</h2>
          <form @submit.prevent="saveKategori" class="space-y-6">
            <div>
              <label class="block text-sm font-black uppercase tracking-widest mb-2">Nama Kategori</label>
              <input v-model="form.nama_kategori" type="text" class="w-full px-4 py-3 border-4 border-black bg-[#f3f4f6] focus:bg-[#FFE600] focus:outline-none transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)]" placeholder="Contoh: Elektronik" required />
            </div>
            <div>
              <label class="block text-sm font-black uppercase tracking-widest mb-2">Deskripsi</label>
              <textarea v-model="form.deskripsi" class="w-full px-4 py-3 border-4 border-black bg-[#f3f4f6] focus:bg-[#FFE600] focus:outline-none transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)]" placeholder="Deskripsi singkat" rows="4"></textarea>
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
          <h2 class="text-3xl font-black mb-6 uppercase tracking-tight">Daftar Kategori</h2>
          
          <div v-if="categories.length === 0" class="p-4 border-4 border-dashed border-black text-center font-bold text-lg">
            Belum ada data kategori.
          </div>
          
          <div v-else class="space-y-6">
            <div v-for="category in categories" :key="category.id" class="p-6 bg-[#f3f4f6] border-4 border-black shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-transform">
              <div class="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h3 class="text-2xl font-black uppercase bg-[#FFE600] inline-block px-2 border-2 border-black mb-2">{{ category.nama_kategori }}</h3>
                  <p class="font-bold border-l-4 border-black pl-3 mt-2">{{ category.deskripsi || 'Tidak ada deskripsi.' }}</p>
                </div>
                <div class="flex gap-2 w-full sm:w-auto">
                  <button @click="editKategori(category)" class="flex-1 sm:flex-none bg-white border-4 border-black font-black uppercase py-2 px-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-[#FFE600] transition-colors">Edit</button>
                  <button @click="deleteKategori(category.id)" class="flex-1 sm:flex-none bg-[#FF5757] text-white border-4 border-black font-black uppercase py-2 px-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-red-600 transition-colors">Hapus</button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  `,
  mounted() {
    this.loadCategories();
  },
  methods: {
    async loadCategories() {
      this.loading = true;
      try {
        const response = await axios.get("http://localhost:8080/api/kategori");
        this.categories = response.data.data || [];
      } catch (err) {
        Swal.fire({ title: 'Error!', text: 'Gagal memuat data kategori.', icon: 'error', customClass: { popup: 'swal2-neo', confirmButton: 'swal2-neo-confirm' } });
      } finally {
        this.loading = false;
      }
    },
    async saveKategori() {
      this.loading = true;
      try {
        const payload = new URLSearchParams(this.form);
        let msg = "";
        if (this.editId) {
          await axios.put(`http://localhost:8080/api/kategori/${this.editId}`, payload, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
          msg = "Data berhasil diperbarui!";
        } else {
          await axios.post("http://localhost:8080/api/kategori", payload, { headers: { "Content-Type": "application/x-www-form-urlencoded" } });
          msg = "Kategori baru berhasil ditambahkan!";
        }
        
        Swal.fire({
          title: 'Berhasil!', text: msg, icon: 'success', customClass: { popup: 'swal2-neo', confirmButton: 'swal2-neo-confirm' }
        });
        
        this.cancelEdit();
        this.loadCategories();
      } catch (err) {
        const errorMsg = err.response?.data?.message || "Gagal menyimpan kategori.";
        Swal.fire({ title: 'Oops!', text: errorMsg, icon: 'error', customClass: { popup: 'swal2-neo', confirmButton: 'swal2-neo-confirm' } });
      } finally {
        this.loading = false;
      }
    },
    editKategori(category) {
      this.editId = category.id;
      this.form.nama_kategori = category.nama_kategori;
      this.form.deskripsi = category.deskripsi;
    },
    cancelEdit() {
      this.editId = null;
      this.form.nama_kategori = "";
      this.form.deskripsi = "";
    },
    async deleteKategori(id) {
      Swal.fire({
        title: 'Hapus Kategori?',
        text: 'Tindakan ini tidak bisa dibatalkan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batal',
        customClass: { popup: 'swal2-neo', confirmButton: 'swal2-neo-confirm', cancelButton: 'swal2-neo-cancel' }
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`http://localhost:8080/api/kategori/${id}`);
            Swal.fire({ title: 'Dihapus!', text: 'Kategori telah dibuang.', icon: 'success', customClass: { popup: 'swal2-neo', confirmButton: 'swal2-neo-confirm' } });
            this.loadCategories();
          } catch (err) {
            Swal.fire({ title: 'Gagal!', text: err.response?.data?.message || 'Gagal menghapus kategori.', icon: 'error', customClass: { popup: 'swal2-neo', confirmButton: 'swal2-neo-confirm' } });
          }
        }
      });
    },
  },
};
