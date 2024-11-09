import { createContext, useState} from "react";
import api from "../services/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Função para cadastrar um novo usuário
  const Cadastro = async (dadosUsuario) => {
    try {
      const response = await api.post("/autenticacao/cadastrar", dadosUsuario); // Ajustado para a rota correta
      if (response.status === 200) {
        console.log("Usuario Cadastrado com Sucesso!!"); // Mensagem de sucesso
        return null; // Retorna null em caso de sucesso
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error.response?.data);
      return error.response?.data?.error || "Erro ao cadastrar usuário";
    }
  };
  const login = async (loginData) => {
    try {
      const response = await api.post('/autenticacao/login', loginData);
      if (response.status === 200) {
        const { token, login } = response.data;
        const loggedInUser = { login, token };
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setUser(loggedInUser);
        console.log(response.data.message); 
        return null;
      }
      return 'Erro ao fazer login';
    } catch (error) {
      console.error('Erro ao fazer login:', error.response?.data);
      return error.response?.data?.error || 'Erro ao fazer login';
    }
  };
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    delete api.defaults.headers.Authorization;
  };

  const signed = !!user;

  return (
    <AuthContext.Provider value={{ user, signed, Cadastro, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};