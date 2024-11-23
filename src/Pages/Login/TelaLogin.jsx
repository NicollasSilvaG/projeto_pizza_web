import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import './StyleTelaLogin.css';

const TelaLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      const res = await login({ login: email, senha });

      if (res) {
        setError(res);
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Erro ao fazer login. Verifique sua conexão.");
    }
  };

  const handleCadastro = () => {
    navigate("/cadastro");
  };

  return (
    <div className="login-page">
      <div className="elemento"></div> 
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group email">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              placeholder="Digite seu E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group senha">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              placeholder="Digite sua Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          {error && <span className="error-message">{error}</span>}
          <button className="btn-login" type="submit">Acessar</button>
          <button className="btn-cadastro" type="button" onClick={handleCadastro}>Cadastre-se</button>
        </form>
      </div>
    </div>
  );
};

export default TelaLogin;
