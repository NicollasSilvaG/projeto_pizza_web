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

    getProdutoById: async (idProduto) => {
        try {
            const response = await api.get(`/flutter/produto/${idProduto}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar o produto:', error);
            throw new Error('Não foi possível carregar o produto. Tente novamente mais tarde.');
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

     // Método para atualizar um produto
     update: async (idProduto, formData) => {
        try {
            const response = await api.put(
                `http://localhost:3070/flutter/produto/${idProduto}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Importante para upload de arquivos
                    },
                }
            );
            return response.data; // Retorna o produto atualizado
        } catch (error) {
            console.error('Erro ao atualizar o produto:', error);
            throw new Error('Erro ao atualizar o produto. Verifique os dados e tente novamente.');
        }
    },

    delete: async (idProduto) => {
        try {
            const response = await api.delete(`http://localhost:3070/flutter/produto/${idProduto}`);
            return response.data; // Mensagem de sucesso
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            throw new Error('Erro ao deletar o produto. Tente novamente mais tarde.');
        }
    },
};

export default ProdutoService;
