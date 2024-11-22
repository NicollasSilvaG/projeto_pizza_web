export const ClienteController = {
    // Buscar todos os usuários
    async buscarTodosUsuarios() {
        try {
            const response = await fetch("http://localhost:3070/flutter/usuarios");
            if (!response.ok) {
                throw new Error("Erro ao buscar os usuários.");
            }
            return await response.json(); // Retorna os usuários como JSON
        } catch (error) {
            console.error("Erro ao buscar os usuários:", error.message);
            throw error; // Relança o erro para ser tratado no frontend
        }
    },

    // Buscar usuário por ID
    async buscarUsuarioPorId(id) {
        try {
            const response = await fetch(`http://localhost:3070/flutter/usuarios/${id}`);
            if (!response.ok) {
                throw new Error(`Erro ao buscar o usuário com ID ${id}.`);
            }
            return await response.json(); // Retorna o usuário encontrado
        } catch (error) {
            console.error(`Erro ao buscar o usuário com ID ${id}:`, error.message);
            throw error; // Relança o erro para ser tratado no frontend
        }
    },

    // Atualizar usuário
    async atualizarUsuario(id, usuarioAtualizado) {
        try {
            const response = await fetch(`http://localhost:3070/flutter/usuarios/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(usuarioAtualizado),
            });
            if (!response.ok) {
                throw new Error(`Erro ao atualizar o usuário com ID ${id}.`);
            }
            return await response.json(); // Retorna o usuário atualizado
        } catch (error) {
            console.error(`Erro ao atualizar o usuário com ID ${id}:`, error.message);
            throw error; // Relança o erro para ser tratado no frontend
        }
    },

    // Deletar usuário
    async deletarUsuario(id) {
        try {
            const response = await fetch(`http://localhost:3070/flutter/usuarios/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Erro ao deletar o usuário com ID ${id}.`);
            }
            return await response.json(); // Retorna mensagem de sucesso
        } catch (error) {
            console.error(`Erro ao deletar o usuário com ID ${id}:`, error.message);
            throw error; // Relança o erro para ser tratado no frontend
        }
    }
};
