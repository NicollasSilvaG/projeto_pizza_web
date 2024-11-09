import axios from 'axios';

// Crie uma instância do axios
const api = axios.create({
  baseURL: "http://localhost:3070"  // URL do seu back-end
});

// Recupera o token do localStorage
const user = JSON.parse(localStorage.getItem('user'));
if (user && user.token) {
  // Defina o token no cabeçalho da requisição
  api.defaults.headers.Authorization = `Bearer ${user.token}`;
}

export default api;
