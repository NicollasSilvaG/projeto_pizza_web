import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import './StyleCadastro.css';

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [loginConf, setLoginConf] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { Cadastro } = useAuth();
  const navigate = useNavigate();

  const handleCadastro = async () => {
    setErrorMessage(""); // Reseta a mensagem de erro

    if (!nome || !login || !loginConf || !senha) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    if (login !== loginConf) {
      setErrorMessage("Os logins não são iguais.");
      return;
    }

    const res = await Cadastro({ nome, login, senha });

    if (res) {
      setErrorMessage(res); // Define a mensagem de erro recebida do contexto
      return;
    }

    alert("Usuário cadastrado com sucesso!");
    navigate("/login");
  };

  const handleVoltar = () => {
    navigate("/login"); // Redireciona para a página de login
  };

  return (
    <div className="Cadastro-container">
      <div className="elemento"></div>
      <div className="Cadastro-content">
        <h1>Cadastro de Administradores</h1>
        <div className="Cadastro-form">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="E-mail"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            type="text"
            placeholder="Confirme o E-mail"
            value={loginConf}
            onChange={(e) => setLoginConf(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {errorMessage && <span className="error-message">{errorMessage}</span>}
          <button onClick={handleCadastro}>Cadastrar</button>
          <button className="back-to-login" onClick={handleVoltar}>Voltar ao Login</button>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
