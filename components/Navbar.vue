<template>
  <div class="navbar">
    <div class="navbar-content">
      <h1 class="navbar-title">Bioskop App</h1>
      <nav class="navbar-links">
        <nuxt-link to="/landing">Story</nuxt-link>
        <nuxt-link to="/movies">Tambah Film</nuxt-link>
        <nuxt-link to="/about">About</nuxt-link>
        <nuxt-link to="/movielist">Daftar film</nuxt-link>
      </nav>
      <div class="auth-button">
        <b-button @click="handleAuth">{{ isLoggedIn ? 'Logout' : 'Login' }}</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn; // Status login dari Vuex
    },
  },
  methods: {
    handleAuth() {
      if (this.isLoggedIn) {
        // Logout
        localStorage.removeItem('token'); // Hapus token
        this.$store.commit('auth/LOGOUT'); // Mutasi Vuex untuk logout
        this.$router.push('/login'); // Arahkan ke halaman login
      } else {
        // Login
        this.$router.push('/login'); // Arahkan ke halaman login
      }
    },
  },
  async mounted() {
    await this.$store.dispatch('auth/fetchUser'); // Periksa status login saat komponen dimuat
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #5389B2;
  color: white;
}
.navbar-title {
  font-size: 1.5rem;
  font-weight: bold;
}
.navbar-links {
  display: flex;
  gap: 20px;
}
.navbar-links a {
  color: white;
  text-decoration: none;
}
.auth-button {
  margin-left: auto;
}
</style>
