import axios from './Connection';

export const AuthService = {
    async login(data) {
        return await axios.post("/login", data);
    },
    async me() {
        return await axios.get("/users/me");
    },
}

export const TOKEN_KEY = "access_token";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};