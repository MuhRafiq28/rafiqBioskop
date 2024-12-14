<template>
  <div>
    <!-- Navbar Component -->
    <Navbar />

    <h1>Movies</h1>

    <!-- Add Movie Form -->
    <form @submit.prevent="createMovie">
      <div>
        <label>Judul</label>
        <input type="text" v-model="newMovie.judul" required />
      </div>
      <div>
        <label>Deskripsi</label>
        <input type="text" v-model="newMovie.deskripsi" required />
      </div>
      <div>
        <label>Tanggal Rilis</label>
        <input type="date" v-model="newMovie.tanggal_rilis" required />
      </div>
      <div>
        <label>Trailer URL</label>
        <input type="text" v-model="newMovie.trailer_url" />
      </div>
      <div>
        <label>Genre</label>
        <input type="text" v-model="newMovie.genre" />
      </div>
      <div>
        <label>Harga</label>
        <input type="number" v-model="newMovie.harga" required />
      </div>
      <div>
        <label>Jumlah Tiket</label>
        <input type="number" v-model="newMovie.jumlah_tiket" required />
      </div>
      <div>
        <label>Photo</label>
        <input type="file" @change="onFileChange" />
      </div>
      <button type="submit">Tambah Movie</button>
    </form>

    <!-- List Movies -->
    <div v-if="movies.length > 0">
      <div v-for="movie in movies" :key="movie.id" class="movie-card">
        <h3>{{ movie.judul }}</h3>
        <p>{{ movie.deskripsi }}</p>
        <p><strong>Status:</strong> {{ movie.status }}</p>
        <p><strong>Harga:</strong> {{ movie.harga }}</p>
        <p><strong>Jumlah Tiket:</strong> {{ movie.jumlah_tiket }}</p>

        <!-- Display Image -->
        <div v-if="movie.photo">
          <img :src="`http://localhost:8080/uploads/${movie.photo}`" alt="Movie Poster" width="200" />
        </div>

        <button @click="deleteMovie(movie.id)">Hapus</button>
      </div>
    </div>
  </div>
</template>

<script>
// Import Navbar component
import Navbar from '@/components/Navbar.vue';

export default {
  name: "tambah-movie",
  components: {
    Navbar, // Register Navbar component
  },
  data() {
    return {
      movies: [],
      newMovie: {
        judul: '',
        deskripsi: '',
        tanggal_rilis: '',
        trailer_url: '',
        genre: '',
        harga: '',
        jumlah_tiket: '',
        photo: null,
      },
    };
  },
  async mounted() {
    await this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await this.$axios.$get('http://localhost:8080/api/movies');
        this.movies = response.data;
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },

    async createMovie() {
      const formData = new FormData();
      formData.append("judul", this.newMovie.judul);
      formData.append("deskripsi", this.newMovie.deskripsi);
      formData.append("tanggal_rilis", this.newMovie.tanggal_rilis);
      formData.append("trailer_url", this.newMovie.trailer_url);
      formData.append("genre", this.newMovie.genre);
      formData.append("harga", this.newMovie.harga);
      formData.append("jumlah_tiket", this.newMovie.jumlah_tiket);
      if (this.newMovie.photo) {
        formData.append("photo", this.newMovie.photo);
      }

      try {
        await this.$axios.$post('http://localhost:8080/api/movies', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        this.fetchMovies();
        this.resetForm();
      } catch (error) {
        console.error("Error creating movie:", error);
      }
    },

    async deleteMovie(id) {
      try {
        await this.$axios.$delete(`http://localhost:8080/api/movies/${id}`);
        this.fetchMovies();
      } catch (error) {
        console.error("Error deleting movie:", error);
      }
    },

    onFileChange(event) {
      this.newMovie.photo = event.target.files[0];
    },

    resetForm() {
      this.newMovie = {
        judul: '',
        deskripsi: '',
        tanggal_rilis: '',
        trailer_url: '',
        genre: '',
        harga: '',
        jumlah_tiket: '',
        photo: null,
      };
    },
  },
};
</script>


<style scoped>
/* General Page Layout */
body {
  font-family: 'Arial', sans-serif;
  background-color: #f4f7fa;
  margin: 0;
  padding: 0;
}

/* Title Style */
h1 {
  text-align: center;
  color: #2c3e50;
  margin: 20px;
  font-size: 2rem;
}

/* Add Movie Form */
form {
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

form div {
  margin-bottom: 15px;
}

form label {
  display: block;
  font-weight: bold;
  color: #34495e;
  margin-bottom: 5px;
}

form input[type="text"],
form input[type="date"],
form input[type="number"],
form input[type="file"] {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 5px;
}

form input[type="file"] {
  padding: 5px;
}

form button {
  width: 100%;
  padding: 12px;
  font-size: 1.2rem;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

form button:hover {
  background-color: #2980b9;
}

/* Movie Cards */
.movie-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  padding: 20px;
  max-width: 800px;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.movie-card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.movie-card h3 {
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.movie-card p {
  color: #7f8c8d;
  font-size: 1rem;
  margin: 5px 0;
}

.movie-card img {
  width: 100%;
  max-width: 200px;
  border-radius: 5px;
  margin-top: 10px;
}

.movie-card button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.movie-card button:hover {
  background-color: #c0392b;
}
</style>

