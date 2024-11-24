import React, { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ProdutoService from '../../context/ProdutoController'; // Serviço de produto
import './StyleCriarProduto.css'; // Estilo do formulário

const CriarProduto = () => {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');
    const [descricao, setDescricao] = useState('');
    const [tamanho, setTamanho] = useState('');
    const [imagem, setImagem] = useState(null);
    const [categoria, setCategoria] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await ProdutoService.getCategorias();
                if (Array.isArray(response) && response.length > 0) {
                    setCategorias(response);
                } else {
                    setError('Nenhuma categoria encontrada.');
                }
            } catch (error) {
                setError('Erro ao carregar categorias.');
                console.error('Erro ao carregar categorias:', error);
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
        formData.append('imagem', imagem);
        formData.append('categoria', JSON.stringify({ tipo: categoria, idCategoria: categorias.find((c) => c.tipo === categoria)?.id }));

        try {
            await ProdutoService.create(formData);
            setSuccess("Produto cadastrado com sucesso!");
            setError(null);
        } catch (error) {
            setError("Erro ao cadastrar o produto.");
            setSuccess(null);
        }
    };

    return (
        <div className="page-container">
            {/* AppBar com a seta de voltar */}
            <div className="app-bar">
                <button className="btn-voltar" onClick={() => window.history.back()}>
                    <ArrowBackIcon style={{ fontSize: 28, color: "white" }} />
                </button>
                <h1>Criar Produto</h1>
            </div>

            {/* Formulário */}
            <div className="form-container">
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
                        <select
                            id="tamanho"
                            value={tamanho}
                            onChange={(e) => setTamanho(e.target.value)}
                            required
                        >
                            <option value="">Selecione um tamanho</option>
                            <option value="Pequeno">Pequeno</option>
                            <option value="Médio">Médio</option>
                            <option value="Grande">Grande</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="imagem">Imagem:</label>
                        <input
                            type="file"
                            id="imagem"
                            onChange={(e) => setImagem(e.target.files[0])}
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
                    <button type="submit" className="btn-submit">Criar Produto</button>
                </form>
            </div>
        </div>
    );
};

export default CriarProduto;
