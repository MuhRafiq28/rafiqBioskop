export const getToken = () => localStorage.getItem("token");

export const isLoggedIn = () => !!getToken();

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
  localStorage.removeItem("username");
  localStorage.removeItem("userId");
};
