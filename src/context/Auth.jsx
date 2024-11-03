import { createContext, useEffect, useState } from "react";
import CryptoJS from "crypto-js";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_bd");

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.find(
        (user) => user.email === JSON.parse(userToken).email
      );

      if (hasUser) setUser(hasUser);
    }
  }, []);

  const TelaLogin = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));
    const hasUser = usersStorage?.find((user) => user.email === email);

    if (hasUser) {
      const hashedPassword = CryptoJS.SHA256(password).toString();

      if (hashedPassword === hasUser.password) {
        const authToken = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token: authToken }));
        setUser({ email });
        return null;
      } else {
        return "E-mail ou senha incorretos";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };

  const Cadastro = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd")) || [];

    const hasUser = usersStorage.some((user) => user.email === email);

    if (hasUser) {
      return "Já existe uma conta com esse E-mail";
    }

    const hashedPassword = CryptoJS.SHA256(password).toString();

    const newUser = [...usersStorage, { email, password: hashedPassword }];
    localStorage.setItem("users_bd", JSON.stringify(newUser));

    return null;
  };

  const resetPassword = async (email, newPassword) => {
    try {
      const users = JSON.parse(localStorage.getItem("users_bd"));
      const userIndex = users.findIndex(user => user.email === email);
      
      if (userIndex !== -1) {
        // Atualiza a senha do usuário
        users[userIndex].password = CryptoJS.SHA256(newPassword).toString();
        localStorage.setItem("users_bd", JSON.stringify(users));
        return null; // Retorna null para indicar sucesso
      } else {
        return "Usuário não encontrado."; // Retorna uma mensagem de erro se o usuário não for encontrado
      }
    } catch (error) {
      return "Erro ao redefinir a senha: " + error.message; // Retorna mensagem de erro em caso de falha
    }
  };
  
  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, TelaLogin, Cadastro, resetPassword, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
