import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import StyleCadastro from './StyleCadastro.css'; 

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { Cadastro } = useAuth();

  const handleCadastro = () => {
    if (!nome || !email || !emailConf || !senha) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais");
      return;
    }

    const res = Cadastro(nome, email, senha);

    if (res) {
      setError(res);
      return;
    }

    alert("Usuário cadastrado com sucesso!");
    navigate("/login");
  };

  return (
    <div className="Cadastro-container">
      <h1>Cadastro de Usuário</h1>
      <div className="Cadastro-form">
      <input
          type="text"
          placeholder="Digite seu Nome"
          value={nome}
          onChange={(e) => [setNome(e.target.value), setError("")]}
        />
        <input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <input
          type="email"  
          placeholder="Confirme seu E-mail"
          value={emailConf}
          onChange={(e) => [setEmailConf(e.target.value), setError("")]}
        />
        <input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        {error && <span className="error-message">{error}</span>}
        <button onClick={handleCadastro}>Inscrever-se</button>
        <label>
          Já tem uma conta?
          <p>
            <Link to="/login">Entre</Link>
          </p>
        </label>
      </div>
    </div>
  );
};

export default Cadastro;