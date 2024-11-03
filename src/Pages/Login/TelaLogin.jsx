import { useNavigate } from "react-router-dom";
import "./StyleTelaLogin.css";
import useAuth from '../../Hooks/useAuth';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const TelaLogin = () => {
  const { TelaLogin } = useAuth(); 
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleCadastro = () => {
    navigate('/cadastro');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !senha) {
      setError("Preencha todos os campos");
      toast.error("Preencha todos os campos"); 
      return;
    }
    
    const res = TelaLogin(email, senha);

    if (res) {
      setError(res);
      toast.error(res); 
      return;
    }

    navigate("/home"); 
  };

  const handleForgotPassword = () => {
    navigate("/recuperar-senha"); 
  };

  return (
    <div className="login-page">
      <div className="elemento">
        <div className="login-container">
          <h1>Entrar</h1>
          <form id="loginForm" onSubmit={handleLogin}>
            <div className="input-group email">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                placeholder="Digite seu E-mail"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                required
              />  
            </div>
            <div className="input-group senha">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                placeholder="Digite sua Senha"
                value={senha}
                onChange={(e) => {
                  setSenha(e.target.value);
                  setError("");
                }}
                required
              />
            </div>
            <p className="forgot-password" onClick={handleForgotPassword}>Esqueceu sua senha?</p>             
            <button className="btn-login" type="submit">Acessar</button>
            <button className="btn-cadastro" type="button" onClick={handleCadastro}>Cadastre-se</button> 
          </form>
        </div>
      </div>
      <ToastContainer /> {}
    </div>
  );
};

export default TelaLogin;
