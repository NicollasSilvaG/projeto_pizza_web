import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminController } from "../../context/AdminController";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Collapse, Divider, Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import OrderIcon from "@mui/icons-material/Assignment";
import UserIcon from "@mui/icons-material/People";
import ProductIcon from "@mui/icons-material/Inventory";
import CuponIcon from "@mui/icons-material/LocalOffer";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import './StyleAdministrador.css';

const drawerWidth = 240;

const Administradores = () => {
  const [usuariosList, setUsuariosList] = useState([]);
  const [usuarioEmEdicao, setUsuarioEmEdicao] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState({ users: false, products: false });
  const [openModal, setOpenModal] = useState(false); // Controle do modal
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuarios = await AdminController.buscarUsuariosAdmin();
        setUsuariosList(usuarios);
        setCarregando(false);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setCarregando(false);
      }
    };

    fetchUsuarios();
  }, []);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const handleSubMenuToggle = (menu) => {
    setOpenSubMenu((prevState) => ({ ...prevState, [menu]: !prevState[menu] }));
  };

  const navigateTo = (path) => () => {
    navigate(path);
    toggleDrawer(false)();
  };

  const handleEditar = (idAutenticacao) => {
    const usuario = usuariosList.find((user) => user.idAutenticacao === idAutenticacao);
    setUsuarioEmEdicao(usuario);
    setOpenModal(true); // Abre o modal ao editar
  };

  const handleAtualizar = async () => {
    try {
      if (usuarioEmEdicao) {
        const response = await AdminController.atualizarAdmin(usuarioEmEdicao.idAutenticacao, usuarioEmEdicao);
        if (response) {
          const updatedUsuariosList = usuariosList.map((user) =>
            user.idAutenticacao === usuarioEmEdicao.idAutenticacao ? usuarioEmEdicao : user
          );
          setUsuariosList(updatedUsuariosList);
          setUsuarioEmEdicao(null);
          setOpenModal(false); // Fecha o modal após salvar
        }
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  const handleDeletar = async (idAutenticacao) => {
    try {
      const response = await AdminController.deletarAdmin(idAutenticacao);
      if (response) {
        const updatedUsuariosList = usuariosList.filter((user) => user.idAutenticacao !== idAutenticacao);
        setUsuariosList(updatedUsuariosList);
      }
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

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
        <ListItem button onClick={navigateTo("/login")}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="static" className="appbar-administrador">
        <Toolbar style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <h1 className="titulo-administrador">Gerenciar Administradores</h1>
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

      {/* Tabela de Administradores */}
      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <div className="tabela-container">
          <table className="table-administrador">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Login</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuariosList.map((usuario) => (
                <tr key={usuario.idAutenticacao}>
                  <td>{usuario.nome}</td>
                  <td>{usuario.login}</td>
                  <td>
                    <button className="editar" onClick={() => handleEditar(usuario.idAutenticacao)}>Editar</button>
                    <button className="excluir" onClick={() => handleDeletar(usuario.idAutenticacao)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal para Edição */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Editar Usuário</DialogTitle>
        <DialogContent>
          <TextField
            label="Nome"
            fullWidth
            margin="normal"
            value={usuarioEmEdicao?.nome || ''}
            onChange={(e) => setUsuarioEmEdicao({ ...usuarioEmEdicao, nome: e.target.value })}
          />
          <TextField
            label="Login"
            fullWidth
            margin="normal"
            value={usuarioEmEdicao?.login || ''}
            onChange={(e) => setUsuarioEmEdicao({ ...usuarioEmEdicao, login: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button className="cancelarEdicao" onClick={() => setOpenModal(false)} color="primary">Cancelar</Button>
          <Button className="salvarEdicao" onClick={handleAtualizar} color="primary">Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Administradores;
