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
      <p><strong>Jumlah Tiket Tersedia:</strong> {{ movie.jumlah_tiket }}</p>
    </div>

    <!-- Tombol Pemesanan -->
    <div v-if="movie.jumlah_tiket > 0" class="booking-button">
      <button @click="showBookingForm = !showBookingForm">Pesan Tiket</button>
    </div>

    <!-- Form Pemesanan -->
    <div v-if="showBookingForm" class="booking-form">
      <h3>Pemesanan Tiket</h3>
      <form @submit.prevent="bookMovie">
        <div>
          <label for="tiket">Jumlah Tiket:</label>
          <input type="number" v-model="ticketCount" id="tiket" min="1" :max="movie.jumlah_tiket" required />
        </div>
        <div>
          <label for="pembayaran">Metode Pembayaran:</label>
          <select v-model="paymentMethod" id="pembayaran" required>
            <option value="transfer">Transfer Bank</option>
            <option value="cod">Cash On Delivery</option>
          </select>
        </div>
        <button type="submit">Pesan Tiket</button>
      </form>
      <p v-if="bookingStatus" :class="{'success': bookingStatus.success, 'error': !bookingStatus.success}">{{ bookingStatus.message }}</p>
    </div>

  </div>

  <div v-else class="movie-not-found">
    <p>Film tidak ditemukan.</p>
  </div>
</template>

<script>
export default {
  async mounted() {
    const movieId = this.$route.params.id; // Mengambil ID film dari URL
    await this.fetchMovieDetails(movieId); // Memanggil fungsi untuk mengambil data film
  },
  data() {
    return {
      movie: null, // Menyimpan data film
      ticketCount: 1, // Jumlah tiket yang dipesan
      paymentMethod: 'transfer', // Metode pembayaran
      bookingStatus: null, // Status pemesanan
      showBookingForm: false, // Menampilkan atau menyembunyikan form pemesanan
    };
  },
  methods: {
    async fetchMovieDetails(id) {
      try {
        // Mengambil data film berdasarkan ID dari API
        const response = await this.$axios.$get(`http://localhost:8080/api/movies/${id}`);
        this.movie = response.data; // Menyimpan data film ke dalam properti movie
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    },
    async bookMovie() {
      try {
        const response = await this.$axios.$post(`http://localhost:8080/api/movies/${this.movie.id}/pesan`, {
          tiket: this.ticketCount,
          pembayaran: this.paymentMethod,
        });
        this.bookingStatus = {
          success: true,
          message: `Tiket berhasil dipesan. Sisa tiket: ${response.sisa_tiket}`,
        };
        this.movie.jumlah_tiket = response.sisa_tiket; // Update jumlah tiket setelah pemesanan
      } catch (error) {
        this.bookingStatus = {
          success: false,
          message: `Gagal memesan tiket: ${error.response.data.error}`,
        };
      }
    },
  },
};
</script>

<style scoped>
/* Styling untuk tombol pemesanan */
.booking-button {
  text-align: center;
  margin-top: 20px;
}

.booking-button button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
}

.booking-button button:hover {
  background-color: #218838;
}

/* Styling untuk form pemesanan */
.booking-form {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.booking-form h3 {
  margin-bottom: 15px;
}

.booking-form label {
  display: block;
  margin-bottom: 5px;
}

.booking-form input,
.booking-form select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.booking-form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
}

.booking-form button:hover {
  background-color: #0056b3;
}

.booking-form p {
  text-align: center;
  font-size: 1rem;
  margin-top: 10px;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>
