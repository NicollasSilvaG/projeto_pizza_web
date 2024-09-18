import React from "react";
import StyleTelaLogin from "../Styles/StyleTelaLogin.css";

export default function TelaLogin() {
    return (
       
            <div className="login-container">
            <h1>Login</h1>
            <form id="loginForm">
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Digite seu email" required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" placeholder="Digite sua senha" required />
                </div>
                <button type="submit">Entrar</button>
            </form>
        </div>
      
    );
}
