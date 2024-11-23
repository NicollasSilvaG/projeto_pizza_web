import React, { useEffect, useState } from "react";
import { AdminController } from "../../context/AdminController";
import './StyleAdministrador.css';

const Administradores = () => {
  const [usuariosList, setUsuariosList] = useState([]); // Estado para armazenar a lista de usuários
  const [usuarioEmEdicao, setUsuarioEmEdicao] = useState(null); // Estado para armazenar o usuário a ser editado
  const [carregando, setCarregando] = useState(true); // Estado para controle de carregamento

  // Função para buscar os usuários ao carregar a página
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const usuarios = await AdminController.buscarUsuariosAdmin();
        setUsuariosList(usuarios);
        setCarregando(false);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        setCarregando(false);
      }
    };

    fetchUsuarios();
  }, []);

  // Função para editar um usuário
  const handleEditar = (idAutenticacao) => {
    const usuario = usuariosList.find((user) => user.idAutenticacao === idAutenticacao);
    setUsuarioEmEdicao(usuario);
  };

  // Função para atualizar o usuário
  const handleAtualizar = async () => {
    try {
      if (usuarioEmEdicao) {
        const response = await AdminController.atualizarAdmin(usuarioEmEdicao.idAutenticacao, usuarioEmEdicao);
        if (response) {
          // Atualiza a lista de usuários após a atualização
          const updatedUsuariosList = usuariosList.map((user) =>
            user.idAutenticacao === usuarioEmEdicao.idAutenticacao ? usuarioEmEdicao : user
          );
          setUsuariosList(updatedUsuariosList);
          setUsuarioEmEdicao(null);
        }
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  // Função para deletar um usuário
  const handleDeletar = async (idAutenticacao) => {
    try {
      const response = await AdminController.deletarAdmin(idAutenticacao);
      if (response) {
        // Remove o usuário da lista após a exclusão
        const updatedUsuariosList = usuariosList.filter((user) => user.idAutenticacao !== idAutenticacao);
        setUsuariosList(updatedUsuariosList);
      }
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  return (
    <div>
      <h1>Administradores</h1>

      {/* Tabela de Usuários */}
      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Login</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuariosList.map((usuario) => (
              <tr key={usuario.idAutenticacao}>
                <td>{usuario.nome}</td>
                <td>{usuario.login}</td>
                <td>
                  <button onClick={() => handleEditar(usuario.idAutenticacao)}>Editar</button>
                  <button onClick={() => handleDeletar(usuario.idAutenticacao)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal ou Formulário de Edição */}
      {usuarioEmEdicao && (
        <div>
          <h2>Editar Usuário</h2>
          <label>
            Nome:
            <input
              type="text"
              value={usuarioEmEdicao.nome}
              onChange={(e) =>
                setUsuarioEmEdicao({ ...usuarioEmEdicao, nome: e.target.value })
              }
            />
          </label>
          <br />
          <label>
            Login:
            <input
              type="text"
              value={usuarioEmEdicao.login}
              onChange={(e) =>
                setUsuarioEmEdicao({ ...usuarioEmEdicao, login: e.target.value })
              }
            />
          </label>
          <br />
          <button onClick={handleAtualizar}>Salvar Alterações</button>
          <button onClick={() => setUsuarioEmEdicao(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default Administradores;
