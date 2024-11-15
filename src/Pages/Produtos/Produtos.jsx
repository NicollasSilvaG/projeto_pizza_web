import React, { useEffect, useState } from 'react';
import ProdutoService from '../../context/ProdutoController';
import './StyleProdutos.css'; // Arquivo para os estilos do componente

const ProdutosList = () => {
    const [produtos, setProdutos] = useState([]); // Estado para armazenar os produtos
    const [error, setError] = useState(null); // Estado para erros de carregamento

    // Função para buscar produtos
    const fetchProdutos = async () => {
        try {
            const data = await ProdutoService.getAll();
            setProdutos(data); // Atualiza o estado com os produtos
        } catch (err) {
            setError('Erro ao carregar os produtos.');
        }
    };

    // Carrega os produtos ao montar o componente
    useEffect(() => {
        fetchProdutos();
    }, []);

    return (
        <div className="produtos-container">
            <h1>Lista de Produtos</h1>
            {error && <p className="error">{error}</p>}
            {produtos.length === 0 ? (
                <p>Carregando produtos...</p>
            ) : (
                <div className="produtos-grid">
                    {produtos.map((produto) => (
                        <div key={produto.idProduto} className="produto-card">
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
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProdutosList;
