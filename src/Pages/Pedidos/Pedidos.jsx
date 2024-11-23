import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StylePedidos.css'; // Importe o arquivo de estilos

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get('http://localhost:3070/flutter/pedidos');
        const pedidosData = response.data;

        const pedidosComProdutos = await Promise.all(
          pedidosData.map(async (pedido) => {
            try {
              const produtosResponse = await axios.get(`http://localhost:3070/flutter/carrinho/${pedido.idPedido}`);
              return { ...pedido, produtos: produtosResponse.data };
            } catch (produtosError) {
              console.error(`Erro ao buscar produtos do pedido ${pedido.idPedido}:`, produtosError);
              return { ...pedido, produtos: [] };
            }
          })
        );

        setPedidos(pedidosComProdutos);
      } catch (err) {
        console.error('Erro ao buscar pedidos:', err);
        setError('Erro ao carregar os pedidos');
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  const [expandido, setExpandido] = useState({}); // Armazena o estado de cada pedido (expandido ou não)

  const toggleExpandir = (idPedido) => {
    setExpandido((prevState) => ({
      ...prevState,
      [idPedido]: !prevState[idPedido],
    }));
  };

  if (loading) {
    return <div>Carregando pedidos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="pedido-container">
      <h1 className='title-pedido'>Lista de Pedidos</h1>
      {pedidos.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido.idPedido} className="pedido-card">
            <h2>Pedido ID: {pedido.idPedido}</h2>
            <p><strong>Status:</strong> {pedido.status}</p>
            <p><strong>Tipo de Pagamento:</strong> {pedido.tipo_pagamento}</p>
            <p><strong>Usuário:</strong> {pedido.usuario ? pedido.usuario.nome : 'Usuário não encontrado'}</p>

            {/* Exibindo o endereço completo */}
            <div>
              <h3>Endereço de Entrega:</h3>
              {pedido.usuario ? (
                <div>
                  <p><strong>Rua:</strong> {pedido.usuario.rua}</p>
                  <p><strong>Bairro:</strong> {pedido.usuario.bairro}</p>
                  <p><strong>Cidade:</strong> {pedido.usuario.cidade}</p>
                  <p><strong>UF:</strong> {pedido.usuario.uf}</p>
                  <p><strong>CEP:</strong> {pedido.usuario.cep}</p>
                  <p><strong>Complemento:</strong> {pedido.usuario.complemento || 'Sem complemento'}</p>
                  <p><strong>Telefone:</strong> {pedido.usuario.telefone}</p>
                </div>
              ) : (
                <p>Endereço não definido</p>
              )}
            </div>

            {/* Setando a seta para expandir/colapsar */}
            <div
              className="seta-expandir"
              onClick={() => toggleExpandir(pedido.idPedido)}
            >
              {expandido[pedido.idPedido] ? '▲' : '▼'} {/* Mostra a seta dependendo do estado */}
            </div>

            {/* Lista de produtos - visível quando o estado de expandir for verdadeiro */}
            <div className={`produtos-list ${expandido[pedido.idPedido] ? 'expandido' : ''}`}>
              <h3>Produtos no Pedido:</h3>
              {pedido.produtos && pedido.produtos.length > 0 ? (
                pedido.produtos.map((produto) => (
                  <div key={produto.idProduto} className="produto-item">
                    <h3>{produto.produto ? produto.produto.nome : 'Produto não encontrado'}</h3>
                    <p><strong>Quantidade:</strong> {produto.quantidade}</p>
                    <p><strong>Preço Unitário:</strong> R${produto.precoUnitario}</p>
                    <p><strong>Desconto:</strong> R${produto.desconto}</p>
                    <p><strong>Valor Total:</strong> R${produto.valorTotal}</p>
                    {produto.cupom && (
                      <div className="cupom-info">
                        <p><strong>Desconto do Cupom:</strong> {produto.cupom.codigo}</p>
                        <p><strong>Desconto Aplicado:</strong> R${produto.valorTotal - (produto.precoUnitario * produto.quantidade)}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>Sem produtos no pedido.</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Pedidos;
