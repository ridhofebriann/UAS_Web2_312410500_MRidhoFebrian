const routes = [
  { path: "/", component: window.HomePage },
  { path: "/login", component: window.LoginPage },
  {
    path: "/dashboard",
    component: window.DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/kategori",
    component: window.KategoriPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/supplier",
    component: window.SupplierPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/barang",
    component: window.BarangPage,
    meta: { requiresAuth: true },
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }

  if (to.path === "/login" && token) {
    return next("/dashboard");
  }

  next();
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      router.push("/login");
      alert("Sesi habis, silakan login ulang.");
    }
    return Promise.reject(error);
  },
);

const app = Vue.createApp({
  template: "<router-view></router-view>",
});
app.use(router);
app.mount("#app");
