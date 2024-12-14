<template>
  <div v-if="movie" class="movie-details-container">
    <h1 class="movie-title">{{ movie.judul }}</h1>
    <div v-if="movie.photo" class="movie-image-container">
      <img :src="`http://localhost:8080${movie.photo}`" alt="Movie Poster" class="movie-image" />
    </div>
    <div class="movie-info">
      <p><strong>Deskripsi:</strong> {{ movie.deskripsi }}</p>
      <p><strong>Status:</strong> {{ movie.status }}</p>
      <p><strong>Tanggal Rilis:</strong> {{ movie.tanggal_rilis }}</p>
      <p><strong>Trailer:</strong> <a :href="movie.trailer_url" target="_blank" class="movie-trailer-link">Tonton Trailer</a></p>
      <p><strong>Harga Tiket:</strong> Rp {{ movie.harga }}</p>
      <p><strong>Jumlah Tiket:</strong> {{ movie.jumlah_tiket }}</p>
    </div>

    <!-- Include Komponen TicketBooking -->
    <TicketBooking
      :movie="movie"
      @booking-success="handleBookingSuccess"
    />
  </div>

  <!-- Film Tidak Ditemukan -->
  <div v-else class="movie-not-found">
    <p>Film tidak ditemukan.</p>
  </div>
</template>

<script>
import TicketBooking from '../../components/TicketBooking.vue';



export default {
  components: {
    TicketBooking,
  },
  async mounted() {
    const movieId = this.$route.params.id;
    await this.fetchMovieDetails(movieId);
  },
  data() {
    return {
      movie: null,
    };
  },
  methods: {
    async fetchMovieDetails(id) {
      try {
        const response = await this.$axios.$get(`http://localhost:8080/api/movies/${id}`);
        this.movie = response.data;
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    },
    handleBookingSuccess(tiket) {
      this.movie.jumlah_tiket -= tiket; // Update jumlah tiket setelah pemesanan
    },
  },
};
</script>

<style scoped>
/* Container utama */
.movie-details-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #fefefe;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Judul Film */
.movie-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 10px;
}

/* Container Gambar */
.movie-image-container {
  text-align: center;
  position: relative;
}

.movie-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.movie-image:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

/* Informasi Film */
.movie-info {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  line-height: 1.6;
  font-size: 1rem;
  color: #34495e;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.movie-info p {
  margin: 0;
  font-size: 0.95rem;
}

.movie-info strong {
  color: #2c3e50;
}

/* Tombol Pemesanan */
.order-button {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #3498db;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;
}

.order-button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.order-button:active {
  transform: translateY(0);
}

/* Teks ketika film tidak ditemukan */
.movie-not-found {
  text-align: center;
  font-size: 1.2rem;
  color: #e74c3c;
  margin-top: 50px;
}

/* Responsif */
@media (max-width: 768px) {
  .movie-details-container {
    padding: 15px;
  }

  .movie-title {
    font-size: 1.5rem;
  }

  .movie-image {
    width: 100%;
  }

  .movie-info {
    padding: 15px;
  }

  .order-button {
    width: 100%;
  }
}
</style>

