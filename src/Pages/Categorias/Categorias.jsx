import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para navegação
import { buscarCategorias, criarCategoria, atualizarCategoria, deletarCategoria } from '../../context/CategoriaController';
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
import './StyleCategoria.css'; // Arquivo para os estilos do componente

const drawerWidth = 240;

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [novoTipo, setNovoTipo] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [editandoTipo, setEditandoTipo] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState({ users: false, products: false });
  const [modoEdicao, setModoEdicao] = useState(false); // Novo estado para controlar o modo de edição
  const navigate = useNavigate();

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

  const carregarCategorias = async () => {
    try {
      const data = await buscarCategorias();
      setCategorias(data);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  const handleCriarCategoria = async () => {
    if (!novoTipo.trim()) return;
    try {
      await criarCategoria(novoTipo);
      setNovoTipo('');
      carregarCategorias();
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
    }
  };

  const handleEditarCategoria = async () => {
    if (!editandoTipo.trim()) return;
    try {
      await atualizarCategoria(editandoId, editandoTipo);
      setEditandoId(null);
      setEditandoTipo('');
      carregarCategorias();
      setModoEdicao(false);  // Finaliza o modo de edição
    } catch (error) {
      console.error('Erro ao editar categoria:', error);
    }
  };

  const handleDeletarCategoria = async (id) => {
    try {
      await deletarCategoria(id);
      carregarCategorias();
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
    }
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
      <AppBar className="appbar-categorias" position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <h1 className="title-categorias">Gerenciar Categorias</h1>
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

      <div className="categorias-container">
        {/* Formulário de criação, oculto em modo de edição */}
        {!modoEdicao && (
          <div className="formulario">
            <input
              type="text"
              placeholder="Nova Categoria"
              value={novoTipo}
              onChange={(e) => setNovoTipo(e.target.value)}
            />
            <button onClick={handleCriarCategoria}>+ Adicionar</button> {/* Cor original mantida */}
          </div>
        )}

        {/* Formulário de edição */}
        {editandoId && modoEdicao && (
          <div className="formulario">
            <input
              type="text"
              placeholder="Editar Categoria"
              value={editandoTipo}
              onChange={(e) => setEditandoTipo(e.target.value)}
            />
            <button className="salvar" onClick={handleEditarCategoria}>Salvar</button>
            <button className="cancelar" onClick={() => setModoEdicao(false)}>Cancelar</button>
          </div>
        )}

        {/* Tabela de categorias */}
        <table className="categorias-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.idCategoria}>
                <td>{categoria.idCategoria}</td>
                <td>{categoria.tipo}</td>
                <td>
                  <button
                    className="editar"
                    onClick={() => {
                      setEditandoId(categoria.idCategoria);
                      setEditandoTipo(categoria.tipo);
                      setModoEdicao(true); // Modo de edição ativado
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="excluir"
                    onClick={() => handleDeletarCategoria(categoria.idCategoria)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Categorias;
