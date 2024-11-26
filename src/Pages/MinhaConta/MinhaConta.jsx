import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Box, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import './StyleMinhaConta.css';

const MinhaContaScreen = () => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Busca os dados do usuário
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

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario_id");
        navigate("/login");
    };

    return (
        <div>
            <AppBar position="static" className="appbar-minha-conta">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className="title-minha-conta">
                        Minha Conta
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{ padding: 3 }}>
                {usuario ? (
                    <div className="usuario-card">
                        <Typography variant="h5" gutterBottom>Bem-vindo, {usuario.nome}</Typography>
                        <Typography variant="body1"><strong>Email:</strong> {usuario.email}</Typography>
                        <Typography variant="body1"><strong>Role:</strong> {usuario.role}</Typography>
                    </div>
                ) : (
                    <Typography variant="body1">Erro ao carregar os dados do usuário.</Typography>
                )}

                <Divider sx={{ my: 3 }} />
                
                <div className="logout-section">
                    <IconButton onClick={handleLogout} color="secondary">
                        <LogoutIcon />
                    </IconButton>
                    <Typography variant="body1" onClick={handleLogout} style={{ cursor: 'pointer', color: 'red' }}>
                        Sair
                    </Typography>
                </div>
            </Box>
        </div>
    );
};

export default MinhaContaScreen;
