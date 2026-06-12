window.DashboardPage = {
  data() {
    return {
      stats: {
        kategori: 0,
        supplier: 0,
        barang: 0,
        stok: 0,
      },
      loading: true,
      error: "",
    };
  },
  template: `
    <div class="min-h-screen bg-[#FFE600] font-sans selection:bg-black selection:text-white pb-12">
      <!-- Top Navbar -->
      <nav class="bg-white border-b-4 border-black p-4 flex justify-between items-center sticky top-0 z-10 shadow-[0_4px_0_0_rgba(0,0,0,1)] mb-8 md:mb-12">
        <div class="text-xl md:text-2xl font-black uppercase tracking-tight">
          Admin Dashboard
        </div>
        <button @click="confirmLogout" class="bg-[#FF5757] border-4 border-black text-white font-black uppercase py-2 px-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
          Logout
        </button>
      </nav>

      <div class="max-w-6xl mx-auto px-4 md:px-6">
        
        <div class="bg-white border-4 border-black p-8 mb-10 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          <h1 class="text-4xl font-black mb-2 uppercase tracking-tight">Selamat Datang, Admin!</h1>
          <p class="font-bold border-l-4 border-[#FF90E8] pl-4 text-lg">Gunakan dashboard ini untuk memantau ringkasan data inventori dan menavigasi ke fitur kelola data secara lengkap.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div class="bg-[#FF90E8] border-4 border-black p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-transform cursor-pointer flex flex-col justify-between" @click="navigateTo('/kategori')">
            <h2 class="text-sm font-black uppercase tracking-widest mb-4">Total Kategori</h2>
            <p class="text-6xl font-black mb-6">{{ stats.kategori }}</p>
            <div class="font-bold uppercase text-black bg-white border-4 border-black py-2 px-4 text-center hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)]">Kelola Kategori →</div>
          </div>
          
          <div class="bg-[#38E0B5] border-4 border-black p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-transform cursor-pointer flex flex-col justify-between" @click="navigateTo('/supplier')">
            <h2 class="text-sm font-black uppercase tracking-widest mb-4">Total Supplier</h2>
            <p class="text-6xl font-black mb-6">{{ stats.supplier }}</p>
            <div class="font-bold uppercase text-black bg-white border-4 border-black py-2 px-4 text-center hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)]">Kelola Supplier →</div>
          </div>
          
          <div class="bg-[#FF5757] border-4 border-black p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-transform cursor-pointer flex flex-col justify-between text-white" @click="navigateTo('/barang')">
            <h2 class="text-sm font-black uppercase tracking-widest mb-4">Total Barang</h2>
            <p class="text-6xl font-black mb-6">{{ stats.barang }}</p>
            <div class="font-bold uppercase text-black bg-white border-4 border-black py-2 px-4 text-center hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0_0_rgba(0,0,0,1)]">Kelola Barang →</div>
          </div>
          
          <div class="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] flex flex-col justify-between">
            <h2 class="text-sm font-black uppercase tracking-widest mb-4">Total Stok</h2>
            <p class="text-6xl font-black mb-6">{{ stats.stok }}</p>
            <div class="text-sm font-bold opacity-70 mt-auto uppercase tracking-wider border-t-4 border-black pt-2">Keseluruhan Stok</div>
          </div>
        </div>

      </div>
    </div>
  `,
  mounted() {
    this.loadStats();
  },
  methods: {
    async loadStats() {
      try {
        const [kategoriResp, supplierResp, barangResp] = await Promise.all([
          axios.get("http://localhost:8080/api/kategori"),
          axios.get("http://localhost:8080/api/supplier"),
          axios.get("http://localhost:8080/api/barang"),
        ]);

        const kategoriData = kategoriResp.data.data || [];
        const supplierData = supplierResp.data.data || [];
        const barangData = barangResp.data.data || [];

        this.stats.kategori = kategoriData.length;
        this.stats.supplier = supplierData.length;
        this.stats.barang = barangData.length;
        this.stats.stok = barangData.reduce(
          (total, item) => total + Number(item.stok),
          0,
        );
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        this.loading = false;
      }
    },
    confirmLogout() {
      Swal.fire({
        title: 'Mau Keluar?',
        text: 'Anda harus login lagi nanti.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya, Logout',
        cancelButtonText: 'Batal',
        customClass: {
          popup: 'swal2-neo',
          confirmButton: 'swal2-neo-confirm',
          cancelButton: 'swal2-neo-cancel'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.handleLogout();
        }
      });
    },
    handleLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      
      Swal.fire({
        title: 'Logout Berhasil',
        text: 'Sampai jumpa lagi!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          popup: 'swal2-neo'
        }
      }).then(() => {
        this.$router.push("/login");
      });
    },
    navigateTo(path) {
      this.$router.push(path);
    },
  },
};
