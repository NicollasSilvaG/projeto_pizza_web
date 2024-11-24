
export const buscarTodasPizzarias = async () => {
    try {
      const response = await fetch('http://localhost:3070/flutter/pizzarias');  // URL da sua API
      if (!response.ok) {
        throw new Error('Falha ao buscar pizzarias');
      }
      const dados = await response.json();
      return dados;  // Retorna a lista de pizzarias    
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  // Caso você também tenha outras funções e queira exportá-las de forma agrupada:
  export default buscarTodasPizzarias;
  