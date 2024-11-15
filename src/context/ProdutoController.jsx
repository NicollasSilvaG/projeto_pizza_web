import api from "../services/api"; // Configuração do axios

const ProdutoService = {
    // Método para buscar todos os produtos
    getAll: async () => {
        try {
            const response = await api.get('http://localhost:3070/flutter/produtos'); // Endpoint para buscar produtos
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            throw error;
        }
    }
};

export default ProdutoService;
