export default {
  setToken(token) {
    localStorage.setItem("acess_token", token);
  },
  getToken() {
    return localStorage.getItem("acess_token");
  },
};