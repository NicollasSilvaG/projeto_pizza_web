import React, { useState, useEffect } from "react";
import { ClienteController } from "../../context/ClienteController"; // Controller para gerenciar requisições
import { useNavigate } from "react-router-dom"; // Navegação entre páginas
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Collapse } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import UserIcon from "@mui/icons-material/People";
import OrderIcon from "@mui/icons-material/Assignment";
import ProductIcon from "@mui/icons-material/Inventory";
import CuponIcon from "@mui/icons-material/LocalOffer";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import './StyleClientes.css'; // Arquivo de estilos

const drawerWidth = 240;

const ClientePage = () => {
    const [usuarios, setUsuarios] = useState([]); // Lista de usuários
    const [error, setError] = useState(""); // Mensagem de erro
    const [editandoUsuario, setEditandoUsuario] = useState(null); // Usuário em edição
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        telefone: "",
        rua: "",
        cidade: "",
        uf: "",
        cep: "",
        bairro: "",
        complemento: "",
    }); // Dados do formulário
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Estado do Drawer
    const [openSubMenu, setOpenSubMenu] = useState({ users: false, products: false }); // Estado dos submenus
    const navigate = useNavigate(); // Função de navegação

    // Função para abrir e fechar o Drawer
    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open);
    };

    // Função para logout
    const handleLogout = () => {
        navigate("/login");
        toggleDrawer(false)();
    };

    // Função para navegar entre as páginas
    const navigateTo = (path) => () => {
        navigate(path);
        toggleDrawer(false)();
    };

    // Função para buscar todos os usuários
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await ClienteController.buscarTodosUsuarios();
                setUsuarios(data);
            } catch (err) {
                setError("Erro ao carregar usuários.");
            }
        };

        fetchUsuarios();
    }, []);

    // Atualiza os campos do formulário
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Inicia a edição de um usuário
    const iniciarEdicao = (usuario) => {
        setEditandoUsuario(usuario.idUsuario);
        setFormData({
            nome: usuario.nome,
            email: usuario.email,
            telefone: usuario.telefone,
            rua: usuario.rua,
            cidade: usuario.cidade,
            uf: usuario.uf,
            cep: usuario.cep,
            bairro: usuario.bairro,
            complemento: usuario.complemento,
        });
    };

    // Salva as alterações feitas no usuário
    const salvarEdicao = async () => {
        try {
            await ClienteController.atualizarUsuario(editandoUsuario, formData);
            setUsuarios((prev) =>
                prev.map((usuario) =>
                    usuario.idUsuario === editandoUsuario
                        ? { ...usuario, ...formData }
                        : usuario
                )
            );
            setEditandoUsuario(null);
            setFormData({
                nome: "",
                email: "",
                telefone: "",
                rua: "",
                cidade: "",
                uf: "",
                cep: "",
                bairro: "",
                complemento: "",
            });
        } catch (err) {
            setError("Erro ao salvar alterações.");
        }
    };

    // Exclui um usuário
    const excluirUsuario = async (id) => {
        try {
            await ClienteController.deletarUsuario(id);
            setUsuarios(usuarios.filter((usuario) => usuario.idUsuario !== id));
        } catch (err) {
            setError("Erro ao excluir usuário.");
        }
    };

    // Função para alternar a visibilidade dos submenus
    const handleSubMenuToggle = (menu) => {
        setOpenSubMenu((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };

    // Menu do Drawer
    const drawerList = () => (
        <div style={{ width: drawerWidth }} role="presentation">
            <div style={{ backgroundColor: '#c54444', textAlign: 'center', padding: '16px' }}>
                <img 
                    src="/assets/logotipo01.png" 
                    alt="Logo" 
                    style={{ width: '125px', height: 'auto' }} 
                />
            </div>
            <List>
                <ListItem button onClick={navigateTo("/home")}>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>

                <ListItem button onClick={navigateTo("/pedidos")}>
                    <ListItemIcon><OrderIcon /></ListItemIcon>
                    <ListItemText primary="Pedidos" />
                </ListItem>

                <ListItem button onClick={() => handleSubMenuToggle("users")}>
                    <ListItemIcon><UserIcon /></ListItemIcon>
                    <ListItemText primary="Usuários" />
                    {openSubMenu.users ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openSubMenu.users} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button onClick={navigateTo("/clientes")} style={{ paddingLeft: drawerWidth * 0.1 }}>
                            <ListItemText primary="Gerenciar Clientes" />
                        </ListItem>
                        <ListItem button onClick={navigateTo("/administradores")} style={{ paddingLeft: drawerWidth * 0.1 }}>
                            <ListItemText primary="Gerenciar Administradores" />
                        </ListItem>
                    </List>
                </Collapse>

                <ListItem button onClick={() => handleSubMenuToggle("products")}>
                    <ListItemIcon><ProductIcon /></ListItemIcon>
                    <ListItemText primary="Produtos" />
                    {openSubMenu.products ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openSubMenu.products} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button onClick={navigateTo("/produtos")} style={{ paddingLeft: drawerWidth * 0.1 }}>
                            <ListItemText primary="Gerenciar Produtos" />
                        </ListItem>
                        <ListItem button onClick={navigateTo("/categorias")} style={{ paddingLeft: drawerWidth * 0.1 }}>
                            <ListItemText primary="Gerenciar Categorias" />
                        </ListItem>
                    </List>
                </Collapse>

                <ListItem button onClick={navigateTo("/cupons")}>
                    <ListItemIcon><CuponIcon /></ListItemIcon>
                    <ListItemText primary="Cupons" />
                </ListItem>

                <Divider sx={{ marginY: 2 }} />

                <ListItem button onClick={navigateTo("/minha-conta")}>
                    <ListItemIcon><AccountCircle /></ListItemIcon>
                    <ListItemText primary="Minha Conta" />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                    <ListItemIcon><LogoutIcon /></ListItemIcon>
                    <ListItemText primary="Sair" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            {/* AppBar com classe personalizada */}
            <AppBar position="static" className="appbar-categorias">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <h1 className="title-categorias">Gerenciar Clientes</h1>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{ style: { width: drawerWidth } }}
            >
                {drawerList()}
            </Drawer>

            <div style={{ padding: "20px" }}>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th>Endereço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.idUsuario}>
                                <td>
                                    {editandoUsuario === usuario.idUsuario ? (
                                        <input
                                            type="text"
                                            name="nome"
                                            value={formData.nome}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        usuario.nome
                                    )}
                                </td>
                                <td>
                                    {editandoUsuario === usuario.idUsuario ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        usuario.email
                                    )}
                                </td>
                                <td>
                                    {editandoUsuario === usuario.idUsuario ? (
                                        <input
                                            type="text"
                                            name="telefone"
                                            value={formData.telefone}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        usuario.telefone
                                    )}
                                </td>
                                <td>
                                    {editandoUsuario === usuario.idUsuario ? (
                                        <>
                                            <input
                                                type="text"
                                                name="rua"
                                                value={formData.rua}
                                                placeholder="Rua"
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="text"
                                                name="cidade"
                                                value={formData.cidade}
                                                placeholder="Cidade"
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="text"
                                                name="uf"
                                                value={formData.uf}
                                                placeholder="UF"
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="text"
                                                name="cep"
                                                value={formData.cep}
                                                placeholder="CEP"
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="text"
                                                name="bairro"
                                                value={formData.bairro}
                                                placeholder="Bairro"
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="text"
                                                name="complemento"
                                                value={formData.complemento}
                                                placeholder="Complemento"
                                                onChange={handleInputChange}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            {usuario.rua}, {usuario.bairro}, {usuario.cidade}, {usuario.uf}
                                        </>
                                    )}
                                </td>
                                <td>
                                    {editandoUsuario === usuario.idUsuario ? (
                                        <button className="salvarEdicao" onClick={salvarEdicao}>Salvar</button>
                                    ) : (
                                        <>
                                            <button className="editar" onClick={() => iniciarEdicao(usuario)}>Editar</button>
                                            <button className="excluir" onClick={() => excluirUsuario(usuario.idUsuario)}>Excluir</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClientePage;
