// router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import ProfilePage from '@/pages/ProfilePage.vue';  // Pastikan import sesuai dengan path komponen Anda
import EditProfilePage from '@/pages/EditProfilePage.vue';  // Komponen untuk halaman edit profil

Vue.use(Router);

export default new Router({
  mode: 'history',  // Aktifkan mode history
  routes: [
    {
      path: '/profile/:id',
      name: 'profile',  // Nama rute
      component: ProfilePage,
      props: true
    },
    {
      path: '/edit-profile/:id',
      name: 'edit-profile',
      component: EditProfilePage,
      props: true
    },
    {
      name: 'login',
  path: '/login',
  component: resolve(__dirname, 'pages/login.vue'),
    },
    {
      path: '/movie/:id',
      name: 'movie-details',
      component: () => import('pages/MovieDetails.vue')
    },
    {
      path: '/tiket/:bookingId',
      name: 'detail-tiket',
      component: () => import('pages/DetailTiket.vue'),
    },
    {
    name: 'detail-tiket',
    path: '/detailtiket/:bookingId',
    component: resolve(__dirname, 'pages/detailtiket.vue'),
    }

  ]
});

