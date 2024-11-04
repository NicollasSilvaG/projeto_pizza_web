import React, { Fragment} from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

import Home from '../Pages/Home/Home'; 
import TelaLogin from '../Pages/Login/TelaLogin';
import Cadastro from '../Pages/Cadastro/Cadastro';
import RecuperarSenha from '../Pages/RecuperarSenha/RecuperarSenha';
import Pedidos from '../Pages/Pedidos/Pedidos';
import Clientes from '../Pages/Usuarios/Clientes';
import Administradores from '../Pages/Usuarios/Administradores';
import Produtos from '../Pages/Produtos/Produtos';
import Categorias from '../Pages/Produtos/Categorias';
import Cupons from '../Pages/Cupons/Cupons';


const Private = ({Item}) =>{
  const {signed} = useAuth();

  return signed > 0 ? <Item /> : <TelaLogin />;
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
       <Routes>        
          <Route exact path="/home" element={<Private Item={Home} />} />
          <Route path="/login" element={<TelaLogin />} />
          <Route exact path="/cadastro" element={<Cadastro />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route exact path="/pedidos" element={<Pedidos />} />
          <Route exact path="/clientes" element={<Clientes />} />
          <Route exact path="/administradores" element={<Administradores />} />
          <Route exact path="/produtos" element={<Produtos />} />
          <Route exact path="/categorias" element={<Categorias />} />
          <Route exact path="/cupons" element={<Cupons />} />
        </Routes> 
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
