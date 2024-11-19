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
    },

    // Método para criar um produto
    create: async (formData) => {
        try {
            const response = await api.post(
                'http://localhost:3070/api/produtos/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Importante para upload de arquivos
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error("Erro ao salvar o produto:", error);
            throw error;
        }
    },

    // Método para buscar categorias
    getCategorias: async () => {
        try {
            const response = await api.get('http://localhost:3070/flutter/categorias'); // Endpoint para buscar categorias
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
            throw error;
        }
    },
};

export default ProdutoService;
