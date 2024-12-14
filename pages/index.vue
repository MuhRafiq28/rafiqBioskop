<template>
  <div>
  <Navbar />
  <Hero />
</div>
</template>

<script>
import HeroLanding from '../components/landing/HeroLanding.vue';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'IndexPage',
  components: {
    Navbar,
    HeroLanding,
  },
}
</script>
