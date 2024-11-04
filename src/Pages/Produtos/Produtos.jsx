import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
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
import "./StyleProdutos.css";

const Pedidos = () => {
    const { signout } = useAuth();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState({ users: false, clients: false, admins: false, products: false, coupons: false });

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const handleLogout = () => {
    signout();
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

  

  const drawerList = () => (
    <div role="presentation">
      <div style={{ backgroundColor: '#da3131', textAlign: 'center', padding: '16px' }}>
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
            <ListItem button onClick={navigateTo("/clientes")} sx={{ pl: 4 }}>
              <ListItemText primary="Gerenciar Clientes" />
            </ListItem>
            <ListItem button onClick={navigateTo("/administradores")} sx={{ pl: 4 }}>
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
            <ListItem button onClick={navigateTo("/produtos")} sx={{ pl: 4 }}>
              <ListItemText primary="Gerenciar Produtos" />
            </ListItem>
            <ListItem button onClick={navigateTo("/categorias")} sx={{ pl: 4 }}>
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
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {drawerList()}
      </Drawer>
      {/* Conteúdo principal da tela de gerenciar produtos */}
      <div style={{ padding: '20px' }}>
        {/* Aqui você pode adicionar a tabela para o gerenciamento de produtos*/}
      </div>
    </div>
  );
};

export default Pedidos;
