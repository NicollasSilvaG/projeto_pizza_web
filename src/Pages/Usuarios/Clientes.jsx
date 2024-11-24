import React, { useState, useEffect } from "react";
import { ClienteController } from "../../context/ClienteController";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Collapse, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
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
import VisibilityIcon from "@mui/icons-material/Visibility"; // Ícone de olho
import './StyleClientes.css';

const drawerWidth = 240;

const ClientePage = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState("");
    const [editandoUsuario, setEditandoUsuario] = useState(null);
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
    });
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState({ users: false, products: false });
    const [openModal, setOpenModal] = useState(false); // Estado para abrir a modal
    const [selectedUsuario, setSelectedUsuario] = useState(null); // Armazena o usuário selecionado para exibir o modal
    const navigate = useNavigate();

    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open);
    };

    const handleLogout = () => {
        navigate("/login");
        toggleDrawer(false)();
    };

    const navigateTo = (path) => () => {
        navigate(path);
        toggleDrawer(false)();
    };

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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

    const excluirUsuario = async (id) => {
        try {
            await ClienteController.deletarUsuario(id);
            setUsuarios(usuarios.filter((usuario) => usuario.idUsuario !== id));
        } catch (err) {
            setError("Erro ao excluir usuário.");
        }
    };

    const handleSubMenuToggle = (menu) => {
        setOpenSubMenu((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };

    const cancelarEdicao = () => {
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
    };

    const openAddressModal = (usuario) => {
        setSelectedUsuario(usuario);
        setOpenModal(true);
    };

    const closeAddressModal = () => {
        setOpenModal(false);
        setSelectedUsuario(null);
    };

    const drawerList = () => (
        <div style={{ width: drawerWidth }} role="presentation">
            <div style={{ backgroundColor: '#c54444', textAlign: 'center', padding: '16px' }}>
                <img src="/assets/logotipo01.png" alt="Logo" style={{ width: '125px', height: 'auto' }} />
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
                                            <IconButton onClick={() => openAddressModal(usuario)}>
                                                <VisibilityIcon />
                                            </IconButton>
                                        </>
                                    )}
                                </td>
                                <td>
                                    {editandoUsuario === usuario.idUsuario ? (
                                        <>
                                            <button className="salvarEdicao" onClick={salvarEdicao}>Salvar</button>
                                            <button className="cancelarEdicao" onClick={cancelarEdicao}>Cancelar</button>
                                        </>
                                    ) : (
                                        // Aqui, verificamos se nenhum usuário está em edição antes de renderizar os botões de "Editar" e "Excluir"
                                        editandoUsuario === null && (
                                            <>
                                                <button className="editar" onClick={() => iniciarEdicao(usuario)}>Editar</button>
                                                <button className="excluir" onClick={() => excluirUsuario(usuario.idUsuario)}>Excluir</button>
                                            </>
                                        )
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal de Endereço */}
            <Dialog open={openModal} onClose={closeAddressModal}>
                <DialogTitle>Endereço Completo</DialogTitle>
                <DialogContent>
                    {selectedUsuario && (
                        <div>
                            <p><strong>Rua:</strong> {selectedUsuario.rua}</p>
                            <p><strong>Bairro:</strong> {selectedUsuario.bairro}</p>
                            <p><strong>Cidade:</strong> {selectedUsuario.cidade}</p>
                            <p><strong>UF:</strong> {selectedUsuario.uf}</p>
                            <p><strong>CEP:</strong> {selectedUsuario.cep}</p>
                            <p><strong>Complemento:</strong> {selectedUsuario.complemento}</p>
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAddressModal} color="primary">
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ClientePage;
