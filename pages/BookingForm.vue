<template>
  <div>
    <h1>Detail Tiket</h1>
    <div v-if="booking">
      <p><strong>Judul Film:</strong> {{ booking.movieTitle }}</p>
      <p><strong>Jumlah Tiket:</strong> {{ booking.tiket }}</p>
      <p><strong>Metode Pembayaran:</strong> {{ booking.pembayaran }}</p>
      <p><strong>Tanggal Pemesanan:</strong> {{ booking.createdAt }}</p>
      <p><strong>Sisa Tiket:</strong> {{ booking.sisaTiket }}</p>
    </div>
    <div v-else>
      <p>Memuat detail tiket...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      booking: null,
    };
  },
  async created() {
    const bookingId = this.$route.params.bookingId;
    if (bookingId) {
      try {
        const response = await this.$axios.$get(
          `http://localhost:8080/api/bookings/${bookingId}`
        );
        this.booking = response.booking;
      } catch (error) {
        console.error("Error fetching booking details:", error);
        alert("Gagal memuat detail tiket.");
      }
    }
  },
};
</script>

<style scoped>
/* Gaya untuk halaman detail tiket */
</style>
