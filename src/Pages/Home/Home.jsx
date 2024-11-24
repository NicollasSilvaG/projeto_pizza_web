import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Collapse, Divider } from "@mui/material"; 
import MenuIcon from "@mui/icons-material/Menu"; 
import LogoutIcon from "@mui/icons-material/Logout"; 
import HomeIcon from "@mui/icons-material/Home"; 
import OrderIcon from "@mui/icons-material/Assignment"; 
import UserIcon from "@mui/icons-material/People"; 
import ProductIcon from "@mui/icons-material/Inventory"; 
import CuponIcon from "@mui/icons-material/LocalOffer"; 
import ExpandLess from "@mui/icons-material/ExpandLess"; 
import ExpandMore from "@mui/icons-material/ExpandMore"; 
import AccountCircle from "@mui/icons-material/AccountCircle";
import LocalPizzaIcon from '@mui/icons-material/LocalPizza'; 
//import { useAuth } from "../../Hooks/useAuth"; 
import "./StyleHome.css";  

const drawerWidth = 240;

const Home = () => { 
  //const { signout } = useAuth(); 
  const navigate = useNavigate(); 
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); 
  const [openSubMenu, setOpenSubMenu] = useState({ users: false, products: false });

  const toggleDrawer = (open) => () => { 
    setIsDrawerOpen(open); 
  };

  const handleLogout = () => {
    //logout(); // Remove o usuário e limpa o token
    navigate("/login"); // Redireciona para a página de login
  };

  const handleSubMenuToggle = (menu) => { 
    setOpenSubMenu((prevState) => ({ ...prevState, [menu]: !prevState[menu] })); 
  };

  const navigateTo = (path) => () => { 
    navigate(path); 
    toggleDrawer(false)(); 
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

        <ListItem button onClick={navigateTo("/pizzaria")}>
          <ListItemIcon><LocalPizzaIcon /></ListItemIcon>
          <ListItemText primary="Pizzaria" />
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
      <AppBar className="appbar-home" position="static"> 
        <Toolbar> 
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}> 
            <MenuIcon /> 
          </IconButton> 
          <h1 className="title-home">Home</h1> 
        </Toolbar> 
      </AppBar>

      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)} PaperProps={{ style: { width: drawerWidth } }}> 
        {drawerList()} 
      </Drawer>
      
      {/* Conteúdo principal */}
      <div className="main-content">
        <img src="/assets/pizza-home.png" alt="Pizza" className="main-image" />
        <p className="slogan">Pizza quentinha, felicidade em cada fatia!</p>
      </div>
    </div>
  ); 
};

export default Home;
