import React, { useState, useEffect } from 'react';
import { buscarTodasPizzarias } from '../../context/PizzariaController';  // Importe a função de buscar todas as pizzarias
import './StylePizzaria.css';  // Importe o arquivo CSS

const BuscarPizzaria = () => {
  const [pizzarias, setPizzarias] = useState([]);  // Agora armazenamos um array de pizzarias
  const [erro, setErro] = useState('');

  // Função para buscar todas as pizzarias automaticamente ao montar o componente
  useEffect(() => {
    const fetchPizzarias = async () => {
      setErro('');  // Limpar erros anteriores
      setPizzarias([]);  // Limpar a lista de pizzarias anterior

      try {
        const dadosPizzarias = await buscarTodasPizzarias();  // Chama a função para buscar todas as pizzarias
        setPizzarias(dadosPizzarias);  // Atualiza o estado com os dados das pizzarias
      } catch (error) {
        setErro('Erro ao buscar pizzarias.');
      }
    };

    fetchPizzarias();
  }, []);  // O array vazio [] garante que a função seja chamada apenas uma vez quando o componente for montado.

  // Função para voltar à página anterior
  const handleVoltar = () => {
    window.history.back();  // Volta para a página anterior
  };

  return (
    <div className="buscar-pizzaria-container">
      <h2>Informações da Dom Pizzas</h2>

      {erro && <p className="erro">{erro}</p>}

      {pizzarias.length > 0 ? (
        <div className="pizzarias-list">
          {pizzarias.map((pizzaria) => (
            <div key={pizzaria.idPizzaria} className="pizzaria-card">
              <h4>{pizzaria.nome_fantasia}</h4>
              <p><strong>CNPJ:</strong> {pizzaria.cpnj}</p>
              <p><strong>Endereço:</strong> {pizzaria.rua}, {pizzaria.bairro}, {pizzaria.cidade} - {pizzaria.uf}, {pizzaria.cep}</p>
              <p><strong>Razão Social:</strong> {pizzaria.razao_social}</p>
              <p><strong>Horário de Funcionamento:</strong> {pizzaria.horarioFuncionamento}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhuma pizzaria encontrada.</p>
      )}

      <button className="voltar-btn" onClick={handleVoltar}>Voltar</button>
    </div>
  );
};

export default BuscarPizzaria;
