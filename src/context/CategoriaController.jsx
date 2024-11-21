export const buscarCategorias = async () => {
    const response = await fetch('http://localhost:3070/flutter/categorias');
    return await response.json();
};

export const buscarCategoriaPorId = async (idCategoria) => {
    const response = await fetch(`http://localhost:3070/flutter/categoria/${idCategoria}`);
    return await response.json();
};

export const criarCategoria = async (tipo) => {
    const response = await fetch('http://localhost:3070/flutter/categoria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo }),
    });
    return await response.json();
};

export const atualizarCategoria = async (idCategoria, tipo) => {
    const response = await fetch(`http://localhost:3070/flutter/categoria/${idCategoria}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo }),
    });
    return await response.json();
};

export const deletarCategoria = async (idCategoria) => {
    await fetch(`http://localhost:3070/flutter/categoria/${idCategoria}`, { method: 'DELETE' });
};
