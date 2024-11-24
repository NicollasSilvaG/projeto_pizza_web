import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { buscarTodasPizzarias } from '../../context/PizzariaController';  // Importe a função de buscar todas as pizzarias
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Collapse, Divider, Button } from "@mui/material";
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
import LocalPizzaIcon from '@mui/icons-material/LocalPizza'; 
import './StylePizzaria.css';  // Estilo específico para a tela Pizzaria

const drawerWidth = 240;

const BuscarPizzaria = () => {
  const [pizzarias, setPizzarias] = useState([]);  // Agora armazenamos um array de pizzarias
  const [erro, setErro] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState({ users: false, products: false });
  const navigate = useNavigate();

  // Função para buscar todas as pizzarias automaticamente ao montar o componente
  useEffect(() => {
    const fetchPizzarias = async () => {
      setErro('');  // Limpar erros anteriores
      setPizzarias([]);  // Limpar a lista de pizzarias anterior

      try {
        const dadosPizzarias = await buscarTodasPizzarias();  // Chama a função para buscar todas as pizzarias
        setPizzarias(dadosPizzarias);  // Atualiza o estado com os dados das pizzarias
      } catch (error) {
        setErro('Erro ao buscar pizzarias.');
      }
    };

    fetchPizzarias();
  }, []);  // O array vazio [] garante que a função seja chamada apenas uma vez quando o componente for montado.

  // Função para abrir/fechar o menu lateral
  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  // Função para deslogar o usuário
  const handleLogout = () => {
    navigate("/login");
    toggleDrawer(false)();
  };

  // Função para alternar submenu
  const handleSubMenuToggle = (menu) => {
    setOpenSubMenu((prevState) => ({ ...prevState, [menu]: !prevState[menu] }));
  };

  // Função para navegar para uma página específica
  const navigateTo = (path) => () => {
    navigate(path);
    toggleDrawer(false)();
  };

  const drawerList = () => (
    <div style={{ width: drawerWidth }} role="presentation">
      <div style={{ backgroundColor: '#c54444', textAlign: 'center', padding: '16px' }}>
        <img 
          src="assets/logotipo01.png" 
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

  // Funções de editar e excluir
  const handleEdit = (id) => {
    // Navegar para a tela de edição de pizzaria com o id
    navigate(`/editar-pizzaria/${id}`);
  };

  const handleDelete = async (id) => {
    // Excluir a pizzaria, chamar API ou ação para exclusão
    try {
      // Exemplo de chamada fictícia para excluir a pizzaria
      // eslint-disable-next-line no-undef
      await deletePizzaria(id);
      setPizzarias(pizzarias.filter(pizzaria => pizzaria.idPizzaria !== id));
    } catch (error) {
      setErro('Erro ao excluir pizzaria.');
    }
  };

  return (
    <div>
      <AppBar className="appbar-pizzaria" position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <h1 className="title-pizzaria">Pizzaria</h1>
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

      <div className="buscar-pizzaria-container">
        <h2>Informações da Dom Pizzas</h2>

        {erro && <p className="erro">{erro}</p>}

        {pizzarias.length > 0 ? (
          <div className="pizzarias-list">
            {pizzarias.map((pizzaria) => (
              <div key={pizzaria.idPizzaria} className="pizzaria-card">
                <h4>{pizzaria.nome_fantasia}</h4>
                <p><strong>CNPJ:</strong> {pizzaria.cpnj}</p>
                <p><strong>Endereço:</strong> {pizzaria.rua}, {pizzaria.bairro}, {pizzaria.cidade} - {pizzaria.uf}, {pizzaria.cep}</p>
                <p><strong>Razão Social:</strong> {pizzaria.razao_social}</p>
                <p><strong>Horário de Funcionamento:</strong> {pizzaria.horarioFuncionamento}</p>
                <Button className="btn-editar" onClick={() => handleEdit(pizzaria.idPizzaria)}>Editar</Button>
                <Button className="btn-excluir" onClick={() => handleDelete(pizzaria.idPizzaria)}>Excluir</Button>
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhuma pizzaria encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default BuscarPizzaria;
