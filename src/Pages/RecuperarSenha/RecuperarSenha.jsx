import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import useAuth from '../../Hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import CryptoJS from 'crypto-js'; 
import './StyleTelaRecuperarSenha.css';

const TelaRecuperarSenha = () => {
  const navigate = useNavigate(); 
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));
    const hasUser = usersStorage.find(user => user.email === email);

    if (hasUser) {
      const hashedOldPassword = CryptoJS.SHA256(oldPassword).toString();
      if (hashedOldPassword !== hasUser.password) {
        toast.error("Senha antiga incorreta.");
        return;
      }
    } else {
      toast.error("Usuário não encontrado.");
      return;
    }

    setIsSubmitting(true);
    const errorMessage = await resetPassword(email, newPassword);
    setIsSubmitting(false);

    if (errorMessage) {
      toast.error(errorMessage);
    } else {
      toast.success("Senha redefinida com sucesso!");
      setEmail("");
      setOldPassword("");
      setNewPassword("");   
      setConfirmPassword("");
    }
  };

  const handleLogin = () => {
    navigate('/login'); 
  };

  return (
    <div className="reset-page">
      <div className="reset-container">
        <h1>Redefinir Senha</h1>
        <form onSubmit={handlePasswordReset}>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            placeholder="Digite seu E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="oldPassword">Senha Antiga</label>
          <input
            type="password"
            placeholder="Digite sua Senha Antiga"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <label htmlFor="newPassword">Nova Senha</label>
          <input
            type="password"
            placeholder="Digite sua Nova Senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmPassword">Confirme a Senha</label>
          <input
            type="password"
            placeholder="Confirme sua Nova Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Redefinindo..." : "Redefinir Senha"}
          </button>
        </form>
        <ToastContainer />
        <div className="link-container">
          <button className="btn-login" type="button" onClick={handleLogin}>
            Fazer Login
          </button> 
        </div>
      </div>
    </div>
  );
};

export default TelaRecuperarSenha;
