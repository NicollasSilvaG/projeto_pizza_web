import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate para navegação
import ProdutoService from '../../context/ProdutoController';
import './StyleProdutos.css'; // Arquivo para os estilos do componente

const ProdutosList = () => {
    const [produtos, setProdutos] = useState([]);
    const [error, setError] = useState(null); // Para armazenar erros, caso ocorram
    const navigate = useNavigate(); // Usando o hook useNavigate para navegação

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const data = await ProdutoService.getAll();
                // Certifique-se de que a URL da imagem está sendo corretamente gerada
                const produtosComImagens = data.map(produto => ({
                    ...produto,
                    imagemUrl: produto.imagem ? produto.imagem : 'caminho/para/imagem/default.png', // Fallback caso imagem não esteja disponível
                }));
                setProdutos(produtosComImagens); // Armazena os produtos recebidos, incluindo a imagemUrl
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
                setError("Erro ao carregar produtos.");
            }
        };

        fetchProdutos();
    }, []);

    const handleCriarProduto = () => {
        navigate('/criarproduto'); // Redireciona para a página /criarproduto
    };

    return (
        <div className="produtos-container">
            <h1>Lista de Produtos</h1>

            <button className="btn-criar-produto" onClick={handleCriarProduto}> Criar Produto
            </button>

            {error && <p className="error">{error}</p>} {/* Exibe mensagem de erro */}
            {produtos.length === 0 ? (
                <p>Carregando produtos...</p>
            ) : (
                <div className="produtos-grid">
                    {produtos.map((produto) => (
                        <div key={produto.idProduto} className="produto-card">
                            {produto.imagemUrl && (
                                <img src={produto.imagemUrl} alt={produto.nome} className="produto-imagem" />
                            )}
                            <div className="produto-info">
                                <h3>{produto.nome}</h3>
                                <p><strong>Descrição:</strong> {produto.descricao}</p>
                                <p>
                                    <strong>Preço:</strong> 
                                    {produto.preco !== undefined && produto.preco !== null 
                                        ? `R$ ${Number(produto.preco).toFixed(2)}` 
                                        : 'Preço indisponível'}
                                </p>
                                <p><strong>Quantidade:</strong> {produto.quantidade || 'Não informado'}</p>
                                <p><strong>Tamanho:</strong> {produto.tamanho || 'Não informado'}</p>
                                <p><strong>Categoria:</strong> {produto.categoria?.tipo || 'Sem categoria'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProdutosList;
