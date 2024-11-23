import React, { Fragment, useEffect} from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

import Home from '../Pages/Home/Home'; 
import TelaLogin from '../Pages/Login/TelaLogin';
import Cadastro from '../Pages/Cadastro/Cadastro';
import RecuperarSenha from '../Pages/RecuperarSenha/RecuperarSenha';
import Pedidos from '../Pages/Pedidos/Pedidos';
import Clientes from '../Pages/Usuarios/Clientes';
import Administradores from '../Pages/Usuarios/Administradores';
import Cupons from '../Pages/Cupons/Cupons';
import { useNavigate } from 'react-router-dom';
import ProdutosList from '../Pages/Produtos/Produtos';
import CriarProduto from '../Pages/Produtos/CriarProduto';
import Categorias from '../Pages/Categorias/Categorias';

const Private = ({ Item }) => {
  const { signed } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signed) {
      navigate('/login');
    }
  }, [signed, navigate]);

  return signed ? <Item /> : null; // Removemos TelaLogin para evitar re-render
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
      <Routes>
         <Route path="/login" element={<TelaLogin />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />

          {/* Páginas privadas */}
          <Route path="/home" element={<Private Item={Home} />} />
          <Route path="/pedidos" element={<Private Item={Pedidos} />} />
          <Route path="/clientes" element={<Private Item={Clientes} />} />
          <Route path="/administradores" element={<Private Item={Administradores} />} />
          <Route path="/produtos" element={<Private Item={ProdutosList} />} />
          <Route path="/criarproduto" element={<Private Item={CriarProduto} />} />
          <Route path="/categorias" element={<Private Item={Categorias} />} />
          <Route path="/cupons" element={<Private Item={Cupons} />} />

          </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
