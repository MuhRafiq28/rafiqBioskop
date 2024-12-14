<template>
  <div>
    <!-- Tombol Pesan Tiket -->
    <div v-if="movie.jumlah_tiket > 0" class="booking-button">
      <button @click="showBookingForm = true" class="btn-pesan">Pesan Tiket</button>
    </div>

    <!-- Form Pemesanan -->
    <div v-if="showBookingForm" class="booking-form">
      <h2>Pesan Tiket</h2>
      <label for="tiket">Jumlah Tiket:</label>
      <input
        type="number"
        v-model="booking.tiket"
        id="tiket"
        min="1"
        :max="movie.jumlah_tiket"
        class="input-field"
      />

      <label for="pembayaran">Metode Pembayaran:</label>
      <select v-model="booking.pembayaran" id="pembayaran" class="input-field">
        <option value="cash">Cash</option>
        <option value="transfer">Transfer</option>
      </select>

      <button @click="submitBooking" class="btn-konfirmasi">Konfirmasi Pesanan</button>
      <button @click="showBookingForm = false" class="btn-batal">Batal</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showBookingForm: false,
      booking: {
        tiket: 1,
        pembayaran: "cash",
      },
    };
  },
  methods: {
    async submitBooking() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Anda harus login terlebih dahulu.");
      return;
    }

    // Membuat FormData baru
    const formData = new FormData();
    formData.append("tiket", this.booking.tiket);
    formData.append("pembayaran", this.booking.pembayaran);

    // Kirim request dengan FormData
    const response = await this.$axios.$post(
      `http://localhost:8080/api/movies/${this.movie.id}/pesan`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    this.$emit("booking-success", this.booking.tiket); // Emit event jika pemesanan berhasil
    alert(response.message);

    // Pindahkan ke halaman Detail Tiket
    this.$router.push({
      name: "detail-tiket",  // Nama route untuk halaman detail tiket
      params: { bookingId: response.bookingId },  // ID pemesanan tiket
    });

    this.showBookingForm = false;
  } catch (error) {
    console.error("Error booking ticket:", error.response || error);
    alert("Gagal memesan tiket. Silakan coba lagi.");
  }
}


  },
};
</script>

<style scoped>
.booking-button {
  text-align: center;
  margin-top: 20px;
}

.btn-pesan {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-pesan:hover {
  background-color: #0056b3;
}

.booking-form {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
}

.input-field {
  display: block;
  width: 100%;
  margin-bottom: 15px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn-konfirmasi {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-konfirmasi:hover {
  background-color: #218838;
}

.btn-batal {
  background-color: #dc3545;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-batal:hover {
  background-color: #c82333;
}
</style>
