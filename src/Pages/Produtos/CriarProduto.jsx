import React, { useState, useEffect } from 'react';
import ProdutoService from '../../context/ProdutoController'; // Importar serviço para manipulação de produto
import './StyleCriarProduto.css'; // Estilo do formulário

const CriarProduto = () => {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [imagem, setImagem] = useState(null); // Armazenar o arquivo
    const [categoria, setCategoria] = useState('');
    const [categorias, setCategorias] = useState([]); // Lista de categorias
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Simulação de carregamento das categorias no início
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                // Exemplo: busque categorias do backend ou defina manualmente
                const response = await ProdutoService.getCategorias(); // API que retorna categorias
                setCategorias(response.data); // Exemplo de resposta: [{ id: 1, tipo: "Pizza" }, { id: 2, tipo: "Bebida" }]
            } catch (error) {
                console.error("Erro ao carregar categorias:", error);
            }
        };

        fetchCategorias();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('quantidade', quantidade);
        formData.append('preco', preco);
        formData.append('descricao', descricao);
        formData.append('tamanho', tamanho);
        formData.append('imagem', imagem); // Adiciona o arquivo anexado
        formData.append('categoria', JSON.stringify({ tipo: categoria, idCategoria: categorias.find((c) => c.tipo === categoria)?.id }));

        try {
            await ProdutoService.create(formData); // Envia o formulário com os dados
            setSuccess("Produto cadastrado com sucesso!");
            setError(null);
        } catch (error) {
            setError("Erro ao cadastrar o produto.");
            setSuccess(null);
        }
    };

    return (
        <div className="form-container">
            <h1>Criar Produto</h1>

            {success && <p className="success">{success}</p>}
            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="quantidade">Quantidade:</label>
                    <input
                        type="number"
                        id="quantidade"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="preco">Preço:</label>
                    <input
                        type="number"
                        id="preco"
                        step="0.01"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="descricao">Descrição:</label>
                    <textarea
                        id="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="tamanho">Tamanho:</label>
                    <input
                        type="text"
                        id="tamanho"
                        value={tamanho}
                        onChange={(e) => setTamanho(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imagem">Imagem:</label>
                    <input
                        type="file"
                        id="imagem"
                        onChange={(e) => setImagem(e.target.files[0])} // Captura o arquivo
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="categoria">Categoria:</label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                    >
                        <option value="">Selecione uma categoria</option>
                        {categorias.map((cat) => (
                            <option key={cat.id} value={cat.tipo}>
                                {cat.tipo}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn-submit">
                    Criar Produto
                </button>
            </form>
        </div>
    );
};

export default CriarProduto;
