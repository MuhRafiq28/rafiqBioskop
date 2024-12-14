<template>
  <div class="register-page">
    <h1>Register</h1>
    <form @submit.prevent="registerUser">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="form.username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="form.password" required />
      </div>
      <div>
        <label for="role">Role (optional):</label>
        <input type="text" id="role" v-model="form.role" />
      </div>
      <button type="submit">Register</button>
    </form>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        role: '',
      },
      error: null,
      successMessage: null,
    };
  },
  methods: {
    async registerUser() {
      this.error = null;
      this.successMessage = null;
      try {
        const response = await axios.post('http://localhost:8080/api/register', this.form); // Ganti URL sesuai dengan API Anda
        this.successMessage = response.data.message;

        // Reset form
        this.form = { username: '', password: '', role: '' };

        // Redirect ke landing page
        this.$router.push('/');
      } catch (err) {
        this.error = err.response?.data?.error || 'An error occurred';
      }
    },
  },
};
</script>


<style scoped>
.register-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}
form div {
  margin-bottom: 10px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.error-message {
  color: red;
  margin-top: 10px;
}
.success-message {
  color: green;
  margin-top: 10px;
}
</style>
