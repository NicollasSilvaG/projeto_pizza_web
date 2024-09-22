import React, { Fragment} from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

import Home from '../Pages/Home/Home'; 
import TelaLogin from '../Pages/Login/TelaLogin';
import Cadastro from '../Pages/Cadastro/Cadastro';

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
        </Routes> 
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
