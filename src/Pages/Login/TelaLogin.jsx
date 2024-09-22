import { useNavigate } from "react-router-dom";
import StyleTelaLogin from "./StyleTelaLogin.css";
import useAuth from '../../Hooks/useAuth';
import React,{ useState } from 'react';

const TelaLogin = () => {
  const { TelaLogin } = useAuth(); 
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleCadastro = () => {
    navigate('/cadastro');
  };

  const handleLogin = () => {
    if (!email | !senha) {
      setError("Preencha todos os campos");
      return;
    }
    
    

    const res = TelaLogin(email, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("/home");
  };

  return (
    <div className="login-page">
      <div className="elemento">
        <div className="login-container">
          <h1>Entrar</h1>
          <form id="loginForm">
            <div className="input-group email">
              <label htmlFor="email"></label>
            <input
            type="email"
            placeholder="Digite seu E-mail"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError("")]}
            />
            </div>
            <div className="input-group senha">
              <label htmlFor="password"></label>
            <input
            type="password"
            placeholder="Digite sua Senha"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setError("")]}
            />
            <label>{error}</label>
            </div>
            <p>Esqueceu sua senha?</p>
            <button class="btn-login" onClick={handleLogin}>Acessar</button>
            <button class="btn-cadastro"onClick={handleCadastro}>Cadastre-se</button> 
          </form>
        </div>
      </div>
    </div>
  );
};

export default TelaLogin;
