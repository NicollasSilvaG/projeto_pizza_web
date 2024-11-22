import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para navegação
import ProdutoService from '../../context/ProdutoController';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Collapse, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import OrderIcon from "@mui/icons-material/Receipt";
import UserIcon from "@mui/icons-material/People";
import ProductIcon from "@mui/icons-material/Inventory";
import CuponIcon from "@mui/icons-material/LocalOffer";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import './StyleProdutos.css'; // Arquivo para os estilos do componente

const drawerWidth = 240;

const ProdutosList = () => {
    const [produtos, setProdutos] = useState([]);
    const [error, setError] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState({ users: false, products: false });
    const navigate = useNavigate(); // Usando o hook useNavigate para navegação

    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open);
    };

    const handleLogout = () => {
        navigate("/login");
        toggleDrawer(false)();
    };

    const handleSubMenuToggle = (menu) => {
        setOpenSubMenu((prevState) => ({ ...prevState, [menu]: !prevState[menu] }));
    };

    const navigateTo = (path) => () => {
        navigate(path);
        toggleDrawer(false)();
    };

    const fetchProdutos = async () => {
        try {
            const data = await ProdutoService.getAll();
            const produtosComImagens = data.map(produto => ({
                ...produto,
                imagemUrl: produto.imagem ? `http://localhost:3070/${produto.imagem}` : null
            }));
            setProdutos(produtosComImagens); 
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
            setError("Erro ao carregar produtos.");
        }
    };
    
    useEffect(() => {
        fetchProdutos();
    }, []);

    const handleCriarProduto = () => {
        navigate('/criarproduto'); // Redireciona para a página /criarproduto
    };

    const drawerList = () => (
        <div style={{ width: drawerWidth }} role="presentation">
            <div style={{ backgroundColor: '#c54444', textAlign: 'center', padding: '16px' }}>
                <img 
                    src="/public/assets/logotipo01.png" 
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
            <AppBar className="appbar-produtos" position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <h1 className="title-produtos">Gerenciar Produtos</h1>
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

            <div className="produtos-container">
                <button className="btn-criar-produto" onClick={handleCriarProduto}>
                    <span className="btn-icon">+</span> Criar Produto
                </button>

                {error && <p className="error">{error}</p>}

                {produtos.length === 0 ? (
                    <p>Carregando produtos...</p>
                ) : (
                    <div className="produtos-grid">
                        {produtos.map((produto) => (
                            <div key={produto.idProduto} className="produto-card">
                                {produto.imagemUrl && (
                                    <img src={produto.imagemUrl} alt={produto.nome} className="produto-imagem" />
                                )}
                                <div className="produto-info">
                                    <h3>{produto.nome}</h3>
                                    <p><strong>Descrição:</strong> {produto.descricao}</p>
                                    <p>
                                        <strong>Preço:</strong> 
                                        {produto.preco !== undefined && produto.preco !== null 
                                            ? `R$ ${Number(produto.preco).toFixed(2)}` 
                                            : 'Preço indisponível'}
                                    </p>
                                    <p><strong>Quantidade:</strong> {produto.quantidade || 'Não informado'}</p>
                                    <p><strong>Tamanho:</strong> {produto.tamanho || 'Não informado'}</p>
                                    <p><strong>Categoria:</strong> {produto.categoria?.tipo || 'Sem categoria'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProdutosList;
