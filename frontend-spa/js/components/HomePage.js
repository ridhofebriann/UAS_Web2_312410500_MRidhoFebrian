window.HomePage = {
  data() {
    return {
      stats: {
        total_kategori: 0,
        total_supplier: 0,
        total_barang: 0,
        total_stok: 0,
      },
      loading: true,
      error: "",
    };
  },
  template: `
    <div class="min-h-screen bg-[#FFE600] text-black font-sans selection:bg-black selection:text-white">
      <!-- Navbar (Neubrutalism Style) -->
      <nav class="border-b-4 border-black bg-white p-4 md:p-6 flex justify-between items-center">
        <div class="text-2xl md:text-3xl font-black uppercase tracking-tighter">
          E-Inventory
        </div>
        <div>
          <button @click="goToLogin" class="bg-[#FF90E8] border-4 border-black font-bold uppercase py-2 px-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
            Login Admin
          </button>
        </div>
      </nav>

      <!-- Hero Section -->
      <main class="max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center text-center">
        <h1 class="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight leading-tight">
          Pusat Kendali <br /> Inventori Cerdas!
        </h1>
        <p class="text-xl md:text-2xl font-bold max-w-2xl mb-12 border-4 border-black bg-white p-4 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
          Kelola stok, pantau pergerakan barang, dan optimalkan rantai pasok Anda dalam satu platform bergaya neubrutalism yang super cepat dan aman.
        </p>

        <!-- Stats Section -->
        <div v-if="loading" class="text-2xl font-bold animate-pulse">
          Memuat data ringkasan...
        </div>
        <div v-else-if="error" class="text-red-600 bg-white border-4 border-black p-4 font-bold text-xl shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
          {{ error }}
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 w-full mt-8">
          
          <!-- Stat Card 1 -->
          <div class="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all text-left flex flex-col justify-between">
            <div class="bg-[#FF90E8] w-12 h-12 border-4 border-black rounded-full mb-4 flex items-center justify-center shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <span class="font-black text-xl">📁</span>
            </div>
            <h2 class="text-lg font-bold uppercase mb-2">Total Kategori</h2>
            <p class="text-6xl font-black">{{ stats.total_kategori }}</p>
          </div>

          <!-- Stat Card 2 -->
          <div class="bg-[#38E0B5] border-4 border-black p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all text-left flex flex-col justify-between">
            <div class="bg-white w-12 h-12 border-4 border-black rounded-full mb-4 flex items-center justify-center shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <span class="font-black text-xl">🚚</span>
            </div>
            <h2 class="text-lg font-bold uppercase mb-2">Total Supplier</h2>
            <p class="text-6xl font-black">{{ stats.total_supplier }}</p>
          </div>

          <!-- Stat Card 3 -->
          <div class="bg-[#FF5757] border-4 border-black p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all text-left flex flex-col justify-between">
            <div class="bg-white w-12 h-12 border-4 border-black rounded-full mb-4 flex items-center justify-center shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <span class="font-black text-xl">📦</span>
            </div>
            <h2 class="text-lg font-bold uppercase mb-2 text-white">Total Barang</h2>
            <p class="text-6xl font-black text-white">{{ stats.total_barang }}</p>
          </div>

          <!-- Stat Card 4 -->
          <div class="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all text-left flex flex-col justify-between">
            <div class="bg-[#FFE600] w-12 h-12 border-4 border-black rounded-full mb-4 flex items-center justify-center shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
              <span class="font-black text-xl">🔢</span>
            </div>
            <h2 class="text-lg font-bold uppercase mb-2">Total Stok Item</h2>
            <p class="text-6xl font-black">{{ stats.total_stok }}</p>
          </div>

        </div>

        <!-- Latest Barang Table Section -->
        <div v-if="stats.latest_barang && stats.latest_barang.length > 0" class="w-full mt-16 text-left">
          <h2 class="text-3xl font-black mb-6 uppercase tracking-tight bg-black text-white inline-block px-4 py-2 shadow-[6px_6px_0_0_#FFE600]">
            📦 5 Barang Terbaru Masuk
          </h2>
          <div class="overflow-x-auto bg-white border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-[#38E0B5] border-b-4 border-black text-lg">
                  <th class="p-4 font-black uppercase border-r-4 border-black">Nama Barang</th>
                  <th class="p-4 font-black uppercase border-r-4 border-black">Kategori</th>
                  <th class="p-4 font-black uppercase border-r-4 border-black">Supplier</th>
                  <th class="p-4 font-black uppercase text-center">Stok</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in stats.latest_barang" :key="item.id" :class="{'border-b-4 border-black': index !== stats.latest_barang.length - 1}">
                  <td class="p-4 font-bold border-r-4 border-black">{{ item.nama_barang }}</td>
                  <td class="p-4 font-bold border-r-4 border-black">
                    <span class="bg-[#FFE600] border-2 border-black px-2 py-1 text-sm">{{ item.nama_kategori }}</span>
                  </td>
                  <td class="p-4 font-bold border-r-4 border-black">{{ item.nama_supplier }}</td>
                  <td class="p-4 font-black text-center text-xl">{{ item.stok }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </main>
      
      <!-- Footer -->
      <footer class="border-t-4 border-black bg-white p-6 text-center font-bold mt-12">
        <p class="uppercase text-sm tracking-widest">© 2026 E-Inventory System | Developed by M. Ridho Febrian</p>
      </footer>
    </div>
  `,
  mounted() {
    this.fetchSummary();
  },
  methods: {
    async fetchSummary() {
      try {
        const response = await axios.get("http://localhost:8080/api/summary");
        if (response.data && response.data.status) {
          this.stats = response.data.data;
        } else {
          this.error = "Gagal memuat data ringkasan.";
        }
      } catch (err) {
        this.error = "Koneksi ke server bermasalah.";
        console.error("Fetch summary error:", err);
      } finally {
        this.loading = false;
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
  },
};
