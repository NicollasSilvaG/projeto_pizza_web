import axios from 'axios';

// Função para buscar os pedidos
const buscarPedidos = async () => {
  try {
    const response = await axios.get('http://localhost:3070/flutter/pedidos');
    console.log('Pedidos encontrados:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    throw error;
  }
};

// Função para buscar o carrinho de um pedido específico
const buscarCarrinho = async (idPedido) => {
  try {
    // Passa o idPedido como parâmetro para buscar os produtos do pedido específico
    const response = await axios.get(`http://localhost:3070/flutter/carrinho/${idPedido}`);
    console.log('Carrinho encontrado para o pedido:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar carrinho para o pedido ${idPedido}:`, error);
    throw error;
  }
};

// Exemplo de uso com Promise.all para requisições simultâneas
const buscarDados = async () => {
  try {
    const pedidos = await buscarPedidos();

    // Exemplo de como utilizar o primeiro pedido para buscar o carrinho
    if (pedidos && pedidos.length > 0) {
      const idPedido = pedidos[0].idPedido; // Assumindo que o pedido tem o campo idPedido
      const carrinho = await buscarCarrinho(idPedido);

      console.log('Carrinho:', carrinho);
      console.log('Pedidos:', pedidos);
    } else {
      console.log('Nenhum pedido encontrado.');
    }
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
};

buscarDados();
