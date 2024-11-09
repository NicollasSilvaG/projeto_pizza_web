import React from 'react';
import RoutesApp from './Routes/Router';
import { AuthProvider } from './context/AuthController'


function App() {
  return (
    <AuthProvider>
      <RoutesApp />
    </AuthProvider>
  );
}

export default App;
