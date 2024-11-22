
// Função para buscar todos os cupons
export const buscarCupons = async () => {
    const response = await fetch(`http://localhost:3070/flutter/cupons`);
    if (!response.ok) throw new Error('Erro ao buscar cupons');
    return await response.json();
};

// Função para criar um novo cupom
export const criarCupom = async (cupom) => {
    const response = await fetch('http://localhost:3070/flutter/cupom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cupom),
    });
    if (!response.ok) throw new Error('Erro ao criar cupom');
    return await response.json();
};

// Função para atualizar um cupom
export const atualizarCupom = async (idCupom, cupomAtualizado) => {
    const response = await fetch(`http://localhost:3070/flutter/cupom/${idCupom}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cupomAtualizado),
    });
    if (!response.ok) throw new Error('Erro ao atualizar cupom');
    return await response.json();
};

// Função para deletar um cupom
export const deletarCupom = async (idCupom) => {
    const response = await fetch(`http://localhost:3070/flutter/cupom/${idCupom}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar cupom');
    return await response.json();
};
// Função para buscar um cupom pelo ID
export const buscarCupomPorId = async (idCupom) => {
    const response = await fetch(`http://localhost:3070/flutter/cupom/${idCupom}`);
    if (!response.ok) throw new Error(`Erro ao buscar o cupom com ID ${idCupom}`);
    return await response.json();
};

