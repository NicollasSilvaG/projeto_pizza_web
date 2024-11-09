import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import './StyleTelaLogin.css';

const TelaLogin = () => {
  const { login } = useAuth(); // A função login vem do contexto
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Limpa qualquer mensagem de erro anterior
  
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }
    
    try {
      const res = await login({ login: email, senha });
  
      if (res) {
        setError(res); // Se ocorrer erro, exibe a mensagem de erro
      } else {
        console.log("Redirecionando para a página inicial");
        navigate("/home"); // Redireciona para a página inicial
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Erro ao fazer login"); // Mensagem de erro caso a requisição falhe
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required  
          />
          {error && <span className="error-message">{error}</span>} {/* Exibe erro, se houver */}
          <button type="submit">Entrar</button>
          <button type="button" onClick={() => navigate("/cadastro")}>Cadastre-se</button>
        </form>
      </div>
    </div>
  );
};

export default TelaLogin;
