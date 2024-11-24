import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { buscarCupons, criarCupom, atualizarCupom, deletarCupom } from '../../context/CupomController';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Collapse, Divider } from "@mui/material";
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
import './StyleCupons.css';

const drawerWidth = 240;

const Cupons = () => {
  const [cupons, setCupons] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [desconto, setDesconto] = useState('');
  const [status, setStatus] = useState('Ativo');
  const [quantidade, setQuantidade] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState({ users: false, products: false });
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

  const carregarCupons = async () => {
    try {
      const data = await buscarCupons();
      setCupons(data);
    } catch (error) {
      console.error('Erro ao carregar cupons:', error);
    }
  };

  useEffect(() => {
    carregarCupons();
  }, []);

  const handleSalvarCupom = async () => {
    if (!codigo.trim() || !desconto.trim() || !status.trim() || !quantidade.trim()) {
      console.error('Todos os campos devem ser preenchidos');
      return;
    }

    try {
      if (editandoId) {
        await atualizarCupom(editandoId, {
          codigo,
          porcentagem_desconto: parseFloat(desconto),
          status,
          quantidade: parseInt(quantidade, 10),
        });
      } else {
        await criarCupom({
          codigo,
          porcentagem_desconto: parseFloat(desconto),
          status,
          quantidade: parseInt(quantidade, 10),
        });
      }

      setCodigo('');
      setDesconto('');
      setStatus('Ativo');
      setQuantidade('');
      setEditandoId(null);
      carregarCupons();
    } catch (error) {
      console.error('Erro ao salvar cupom:', error);
    }
  };

  const handleEditar = (cupom) => {
    setEditandoId(cupom.idCupom);
    setCodigo(cupom.codigo);
    setDesconto(cupom.porcentagem_desconto.toString());
    setStatus(cupom.status);
    setQuantidade(cupom.quantidade.toString());
  };

  const handleDeletarCupom = async (id) => {
    try {
      await deletarCupom(id);
      carregarCupons();
    } catch (error) {
      console.error('Erro ao deletar cupom:', error);
    }
  };

  const handleCancelar = () => {
    setCodigo('');
    setDesconto('');
    setStatus('Ativo');
    setQuantidade('');
    setEditandoId(null);
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
      <AppBar className="appbar-cupons" position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <h1 className="title-cupons">Gerenciar Cupons</h1>
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

      <div className="cupons-container">
        {/* Formulário de criação de cupom */}
        <div className="formulario">
          <input
            type="text"
            placeholder="Código do Cupom"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
          <input
            type="number"
            placeholder="Desconto (%)"
            value={desconto}
            onChange={(e) => setDesconto(e.target.value)}
          />
          <input
            type="text"
            placeholder="(Ativo/Inativo)"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
          {/* Botões diferenciados para salvar ou adicionar */}
          {editandoId ? (
            <button className="salvar-alteracoes" onClick={handleSalvarCupom}>Salvar Alterações</button>
          ) : (
            <button className="adicionar" onClick={handleSalvarCupom}>Adicionar Cupom</button>
          )}
          
          {/* Mostrar o botão Cancelar apenas se estiver editando um cupom */}
          {editandoId && (
            <button className="cancelar" onClick={handleCancelar}>Cancelar</button>
          )}
        </div>

        {/* Tabela de cupons */}
        <table className="cupons-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Desconto</th>
              <th>Status</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {cupons.map((cupom) => (
              <tr key={cupom.idCupom}>
                <td>{cupom.codigo}</td>
                <td>{cupom.porcentagem_desconto}%</td>
                <td>{cupom.status}</td>
                <td>{cupom.quantidade}</td>
                <td>
                  <button className="editar" onClick={() => handleEditar(cupom)}>Editar</button>
                  <button className="excluir" onClick={() => handleDeletarCupom(cupom.idCupom)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cupons;
