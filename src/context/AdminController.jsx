export const AdminController = {
    // Função para buscar todos os usuários administrativos
    async buscarUsuariosAdmin() {
      try {
        const response = await fetch('http://localhost:3070/autenticacao/usuariosAdmin', {
          method: 'GET', // Método GET para buscar dados
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Erro ao buscar usuários administrativos');
        }
  
        const data = await response.json();
        return data; // Retorna a lista de usuários
      } catch (error) {
        console.error('Erro ao buscar usuários administrativos:', error);
        return error.message || 'Erro ao buscar usuários';
      }
    },
  
    // Função para buscar um usuário específico por ID
    async buscarUsuarioPorIdAdmin(id) {
      try {
        const response = await fetch(`http://localhost:3070/autenticacao/usuariosAdmin/${id}`, {
          method: 'GET', // Método GET para buscar o usuário pelo ID
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(`Erro ao buscar usuário com ID ${id}`);
        }
  
        const data = await response.json();
        return data; // Retorna o usuário encontrado
      } catch (error) {
        console.error('Erro ao buscar usuário por ID:', error);
        return error.message || 'Erro ao buscar usuário';
      }
    },
  
    // Função para atualizar um usuário
    async atualizarAdmin(id, dadosAtualizados) {
      try {
        const response = await fetch(`http://localhost:3070/autenticacao/usuariosAdmin/${id}`, {
          method: 'PUT', // Método PUT para atualizar o usuário
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dadosAtualizados), // Envia os dados atualizados como corpo da requisição
        });
  
        if (!response.ok) {
          throw new Error(`Erro ao atualizar usuário com ID ${id}`);
        }
  
        const data = await response.json();
        console.log('Usuário atualizado com sucesso!', data);
        return data; // Retorna os dados do usuário atualizado
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return error.message || 'Erro ao atualizar usuário';
      }
    },
  
    // Função para deletar um usuário
    async deletarAdmin(id) {
      try {
        const response = await fetch(`http://localhost:3070/autenticacao/usuariosAdmin/${id}`, {
          method: 'DELETE', // Método DELETE para deletar o usuário
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error(`Erro ao deletar usuário com ID ${id}`);
        }
  
        const data = await response.json();
        console.log('Usuário deletado com sucesso!', data);
        return data; // Retorna a resposta de sucesso
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        return error.message || 'Erro ao deletar usuário';
      }
    },
  };
  