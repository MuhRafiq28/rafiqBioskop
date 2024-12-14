export const state = () => ({
  isLoggedIn: false,
});

export const mutations = {
  LOGIN(state) {
    state.isLoggedIn = true;
  },
  LOGOUT(state) {
    state.isLoggedIn = false;
  },
};

export const actions = {
  async fetchUser({ commit }) {
    const token = localStorage.getItem('token');
    if (token) {
      // Contoh: verifikasi token dengan backend
      try {
        await this.$axios.get('/userId', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        commit('LOGIN');
      } catch {
        commit('LOGOUT');
      }
    } else {
      commit('LOGOUT');
    }
  },
};
