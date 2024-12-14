<template>
  <div>
    <navbar />

    <h1>Daftar Film</h1>
    <div class="mx-5">

      <!-- Pencarian -->
      <div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari film..."
          class="search-input"
        />
      </div>

      <!-- List Movies -->
      <div v-if="filteredMovies.length > 0" class="movies-container d-flex">
        <div v-for="movie in filteredMovies" :key="movie.id" class="movie-card">
          <div class="movie-card-content">
            <!-- Image -->
            <div class="movie-image">
              <img :src="getImageUrl(movie.photo)" alt="Movie Poster" />
            </div>

            <!-- Text Information -->
            <div class="movie-details">
              <h3>{{ movie.judul }}</h3>
              <p><strong>Deskripsi:</strong> {{ movie.deskripsi }}</p>
              <p><strong>Status:</strong> {{ movie.status }}</p>
              <p><strong>Harga Tiket:</strong> Rp {{ movie.harga }}</p>
              <p><strong>Jumlah Tiket:</strong> {{ movie.jumlah_tiket }}</p>
              <button @click="viewMovieDetails(movie.id)">Lihat Detail</button>
            </div>
          </div>
        </div>
      </div>

      <!-- No movies found message -->
      <div v-else>
        <p>Belum ada film yang tersedia.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';

export default {
  components: {
    Navbar, // Register Navbar component
  },
  name: "movielist",
  data() {
    return {
      movies: [], // Daftar film yang akan ditampilkan
      searchQuery: '', // Query pencarian
    };
  },
  async mounted() {
    await this.fetchMovies();
  },
  methods: {
    // Fetch all movies from the API
    async fetchMovies() {
      try {
        const response = await this.$axios.$get('http://localhost:8080/api/movies');
        this.movies = response.data; // Menyimpan data film ke dalam array movies
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },

    // Get valid image URL based on the file extension
    getImageUrl(photo) {
      if (photo) {
        return `http://localhost:8080${photo.endsWith('.jpeg') || photo.endsWith('.jpg') || photo.endsWith('.png') ? photo : photo + '.jpeg'}`;
      }
      return '';
    },

    // View movie details
    viewMovieDetails(id) {
      this.$router.push(`/movie/${id}`); // Navigasi ke halaman detail film berdasarkan id
    },
  },
  computed: {
    // Filter movies based on the search query
    filteredMovies() {
      return this.movies.filter(movie => {
        const query = this.searchQuery.toLowerCase();
        return (
          movie.judul.toLowerCase().includes(query) ||
          movie.deskripsi.toLowerCase().includes(query)
        );
      });
    }
  }
};
</script>

<style scoped>
.movies-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Responsif, menyesuaikan jumlah kolom berdasarkan lebar layar */
  gap: 20px;
  justify-items: center;
  padding: 20px;
}

.movie-card {
  border: 1px solid #ccc;
  padding: 15px;
  width: 100%;
  height: 380px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.movie-card-content {
  display: flex;
  gap: 15px;
  align-items: center;
  height: 100%;
}

.movie-image {
  flex-shrink: 0;
  width: 30%;
}

.movie-image img {
  max-width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
}

.movie-details {
  flex-grow: 1;
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

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.search-input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
</style>
