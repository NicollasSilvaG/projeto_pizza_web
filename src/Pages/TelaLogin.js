import React from "react";
import "../Styles/StyleTelaLogin.css"; // Correto import do CSS

export default function TelaLogin() {
    return (
        <div className="tela-login">
            <div className="elemento">
                <div className="login-container">
                    <h1>Entrar</h1>
                    <form id="loginForm">
                        <div className="input-group">
                            <label htmlFor="email"></label>
                            <input type="email" id="email" placeholder="Digite seu email" required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password"></label>
                            <input type="password" id="password" placeholder="Digite sua senha" required />
                        </div>
                        <p>Esqueceu sua senha?</p>
                        <button type="submit">Acessar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
