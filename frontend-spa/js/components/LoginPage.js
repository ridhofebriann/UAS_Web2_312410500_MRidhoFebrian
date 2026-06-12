window.LoginPage = {
  data() {
    return {
      username: "",
      password: "",
      loading: false,
    };
  },
  template: `
    <div class="min-h-screen flex items-center justify-center px-4 py-12 bg-[#38E0B5] font-sans selection:bg-black selection:text-white">
      <div class="bg-white border-4 border-black max-w-md w-full p-8 shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
        <h1 class="text-4xl font-black mb-2 uppercase tracking-tight">Login</h1>
        <p class="mb-8 font-bold border-b-4 border-black pb-4">Masuk untuk kelola E-Inventory.</p>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-black uppercase tracking-widest mb-2">Username</label>
            <input v-model="username" type="text" class="w-full px-4 py-3 border-4 border-black bg-[#f3f4f6] focus:bg-white focus:outline-none focus:ring-0 shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all" placeholder="admin" required />
          </div>

          <div>
            <label class="block text-sm font-black uppercase tracking-widest mb-2">Password</label>
            <input v-model="password" type="password" class="w-full px-4 py-3 border-4 border-black bg-[#f3f4f6] focus:bg-white focus:outline-none focus:ring-0 shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all" placeholder="admin123" required />
          </div>

          <button type="submit" class="w-full py-4 bg-[#FFE600] border-4 border-black text-xl font-black uppercase shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all" :disabled="loading">
            {{ loading ? 'Loading...' : 'Masuk Sekarang' }}
          </button>
        </form>
        
        <div class="mt-6 text-center">
            <button @click="$router.push('/')" class="font-bold border-b-2 border-black hover:text-blue-600 transition-colors">← Kembali ke Beranda</button>
        </div>
      </div>
    </div>
  `,
  methods: {
    async handleLogin() {
      this.loading = true;

      try {
        const response = await axios.post("http://localhost:8080/api/login", {
          username: this.username,
          password: this.password,
        });

        const { token, user } = response.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");
        
        Swal.fire({
          title: 'Login Berhasil!',
          text: 'Selamat datang kembali di sistem.',
          icon: 'success',
          customClass: {
            popup: 'swal2-neo',
            confirmButton: 'swal2-neo-confirm'
          }
        }).then(() => {
          this.$router.push("/dashboard");
        });

      } catch (err) {
        const errorMsg = err.response?.data?.message || "Login gagal, coba lagi.";
        Swal.fire({
          title: 'Oops!',
          text: errorMsg,
          icon: 'error',
          customClass: {
            popup: 'swal2-neo',
            confirmButton: 'swal2-neo-confirm'
          }
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
