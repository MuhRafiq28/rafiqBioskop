<template>
    <div class="login-page">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            placeholder="Enter your username"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div v-if="errorMessage" class="error">
        {{ errorMessage }}
      </div>
    </div>
  </template>

  <script>
  import axios from "axios";

  export default {
    data() {
      return {
        username: "",
        password: "",
        errorMessage: "",
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await axios.post("http://localhost:8080/api/login", {
            username: this.username,
            password: this.password,
          });






          // Simpan token ke localStorage
          localStorage.setItem("token", response.data.token);
          this.$store.commit('auth/LOGIN');

          // Arahkan user ke halaman utama atau dashboard
          this.$router.push("/");
        } catch (error) {
          // Tangani kesalahan login
          this.errorMessage =
            error.response?.data?.error || "Failed to login. Please try again.";
        }
      },
    },
  };
  </script>

  <style scoped>
  .login-page {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
  }
  .form-group {
    margin-bottom: 15px;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    width: 100%;
    padding: 10px;
    background: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background: #0056b3;
  }
  .error {
    margin-top: 10px;
    color: red;
    font-size: 0.9em;
  }
  </style>
