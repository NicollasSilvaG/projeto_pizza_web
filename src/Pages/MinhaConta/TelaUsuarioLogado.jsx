import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import './StyleUsuarioLogado.css';

const TelaUsuarioLogado = () => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsuarioLogado = async () => {
            const token = localStorage.getItem("token");
            const usuarioId = localStorage.getItem("usuario_id"); // Certifique-se de armazenar isso no login

            if (!token || !usuarioId) {
                navigate("/login"); // Redireciona para o login se não houver token ou ID
                return;
            }

            try {
                const response = await fetch(`http://localhost:3070/autenticacao/usuariosAdmin/${usuarioId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}` // Inclui o token no cabeçalho
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUsuario(data); // Armazena os dados do usuário
                } else {
                    navigate("/login"); // Redireciona em caso de erro
                }
            } catch (error) {
                console.error("Erro ao buscar os dados do usuário:", error);
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarioLogado();
    }, [navigate]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <AppBar position="static" className="appbar-usuario-logado">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className="title-usuario-logado">
                        Perfil do Usuário
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className="usuario-logado-container">
                {usuario ? (
                    <div className="usuario-card">
                        <h2>Bem-vindo, {usuario.nome}</h2>
                        <p><strong>Email:</strong> {usuario.email}</p>
                    </div>
                ) : (
                    <p>Erro ao carregar os dados do usuário.</p>
                )}
            </div>
        </div>
    );
};

export default TelaUsuarioLogado;
