import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Collapse, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import OrderIcon from "@mui/icons-material/Assignment";
import HomeIcon from "@mui/icons-material/Home";
import UserIcon from "@mui/icons-material/People";
import ProductIcon from "@mui/icons-material/Inventory";
import CuponIcon from "@mui/icons-material/LocalOffer";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalPizzaIcon from '@mui/icons-material/LocalPizza'; 
import './StylePedidos.css';

const drawerWidth = 240;

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState({ users: false, products: false });
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
    toggleDrawer(false)();
};

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get('http://localhost:3070/flutter/pedidos');
        const pedidosData = response.data;

        const pedidosComProdutos = await Promise.all(
          pedidosData.map(async (pedido) => {
            try {
              const produtosResponse = await axios.get(`http://localhost:3070/flutter/carrinho/${pedido.idPedido}`);
              return { ...pedido, produtos: produtosResponse.data };
            } catch (produtosError) {
              console.error(`Erro ao buscar produtos do pedido ${pedido.idPedido}:`, produtosError);
              return { ...pedido, produtos: [] };
            }
          })
        );

        setPedidos(pedidosComProdutos);
      } catch (err) {
        console.error('Erro ao buscar pedidos:', err);
        setError('Erro ao carregar os pedidos');
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  const [expandido, setExpandido] = useState({}); // Armazena o estado de cada pedido (expandido ou não)

  const toggleExpandir = (idPedido) => {
    setExpandido((prevState) => ({
      ...prevState,
      [idPedido]: !prevState[idPedido],
    }));
  };

<<<<<<< HEAD
  // Função para formatar data e hora no fuso horário brasileiro
  const formatarData = (dataISO) => {
    const opcoes = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'America/Sao_Paulo',
    };
    return new Intl.DateTimeFormat('pt-BR', opcoes).format(new Date(dataISO));
  };

=======
  // Funções do Drawer
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

>>>>>>> 9c6b9a34a53e663e495a3ece44c1bbf7adba8201
  if (loading) {
    return <div>Carregando pedidos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
<<<<<<< HEAD
    <div className="pedido-container">
      <h1 className='title-pedido'>Lista de Pedidos</h1>
      {pedidos.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido.idPedido} className="pedido-card">
            <h2>Pedido ID: {pedido.idPedido}</h2>
            <p><strong>Status:</strong> {pedido.status}</p>
            <p><strong>Tipo de Pagamento:</strong> {pedido.tipo_pagamento}</p>
            <p><strong>Data do Pedido:</strong> {formatarData(pedido.dataPedido)}</p>
            <p><strong>Usuário:</strong> {pedido.usuario ? pedido.usuario.nome : 'Usuário não encontrado'}</p>
=======
    <div>
      <AppBar position="static" style={{ backgroundColor: '#c54444' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <h1 style={{ textAlign: 'left', paddingLeft: '20px', margin: 0, color: 'white' }}>Pedidos</h1>
        </Toolbar>
      </AppBar>
>>>>>>> 9c6b9a34a53e663e495a3ece44c1bbf7adba8201

      <Drawer 
        anchor="left" 
        open={isDrawerOpen} 
        onClose={toggleDrawer(false)}
        PaperProps={{ style: { width: drawerWidth } }}
      >
        {drawerList()}
      </Drawer>

      <div className="pedido-container">
        <h1 className='title-pedido'>Lista de Pedidos</h1>
        {pedidos.length === 0 ? (
          <p>Nenhum pedido encontrado.</p>
        ) : (
          pedidos.map((pedido) => (
            <div key={pedido.idPedido} className="pedido-card">
              <h2>Pedido ID: {pedido.idPedido}</h2>
              <p><strong>Status:</strong> {pedido.status}</p>
              <p><strong>Tipo de Pagamento:</strong> {pedido.tipo_pagamento}</p>
              <p><strong>Usuário:</strong> {pedido.usuario ? pedido.usuario.nome : 'Usuário não encontrado'}</p>
              
              {/* Exibindo o endereço completo */}
              <div>
                <h3>Endereço de Entrega:</h3>
                {pedido.usuario ? (
                  <div>
                    <p><strong>Rua:</strong> {pedido.usuario.rua}</p>
                    <p><strong>Bairro:</strong> {pedido.usuario.bairro}</p>
                    <p><strong>Cidade:</strong> {pedido.usuario.cidade}</p>
                    <p><strong>UF:</strong> {pedido.usuario.uf}</p>
                    <p><strong>CEP:</strong> {pedido.usuario.cep}</p>
                    <p><strong>Complemento:</strong> {pedido.usuario.complemento || 'Sem complemento'}</p>
                    <p><strong>Telefone:</strong> {pedido.usuario.telefone}</p>
                  </div>
                ) : (
                  <p>Endereço não definido</p>
                )}
              </div>

              {/* Setando a seta para expandir/colapsar */}
              <div
                className="seta-expandir"
                onClick={() => toggleExpandir(pedido.idPedido)}
              >
                {expandido[pedido.idPedido] ? '▲' : '▼'} {/* Mostra a seta dependendo do estado */}
              </div>

              {/* Lista de produtos - visível quando o estado de expandir for verdadeiro */}
              <div className={`produtos-list ${expandido[pedido.idPedido] ? 'expandido' : ''}`}>
                <h3>Produtos no Pedido:</h3>
                {pedido.produtos && pedido.produtos.length > 0 ? (
                  pedido.produtos.map((produto) => (
                    <div key={produto.idProduto} className="produto-item">
                      <h3>{produto.produto ? produto.produto.nome : 'Produto não encontrado'}</h3>
                      <p><strong>Quantidade:</strong> {produto.quantidade}</p>
                      <p><strong>Preço Unitário:</strong> R${produto.precoUnitario}</p>
                      <p><strong>Desconto:</strong> R${produto.desconto}</p>
                      <p><strong>Valor Total:</strong> R${produto.valorTotal}</p>
                    </div>
                  ))
                ) : (
                  <p>Não há produtos neste pedido.</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Pedidos;
