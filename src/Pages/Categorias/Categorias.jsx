import React, { useEffect, useState } from 'react';
import { buscarCategorias, criarCategoria, atualizarCategoria, deletarCategoria } from '../../context/CategoriaController';
import './StyleCategoria.css';

function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [novoTipo, setNovoTipo] = useState('');
    const [editandoId, setEditandoId] = useState(null);
    const [editandoTipo, setEditandoTipo] = useState('');

    useEffect(() => {
        carregarCategorias();
    }, []);

    const carregarCategorias = async () => {
        try {
            const data = await buscarCategorias();
            setCategorias(data);
        } catch (error) {
            console.error('Erro ao carregar categorias:', error);
        }
    };

    const handleCriarCategoria = async () => {
        if (!novoTipo.trim()) return;
        try {
            await criarCategoria(novoTipo);
            setNovoTipo('');
            carregarCategorias();
        } catch (error) {
            console.error('Erro ao criar categoria:', error);
        }
    };

    const handleEditarCategoria = async () => {
        if (!editandoTipo.trim()) return;
        try {
            await atualizarCategoria(editandoId, editandoTipo);
            setEditandoId(null);
            setEditandoTipo('');
            carregarCategorias();
        } catch (error) {
            console.error('Erro ao editar categoria:', error);
        }
    };

    const handleDeletarCategoria = async (id) => {
        try {
            await deletarCategoria(id);
            carregarCategorias();
        } catch (error) {
            console.error('Erro ao deletar categoria:', error);
        }
    };

    return (
        <div className="categorias-container">
            <h1>Gerenciar Categorias</h1>

            {/* Formulário de criação */}
            <div className="formulario">
                <input
                    type="text"
                    placeholder="Nova Categoria"
                    value={novoTipo}
                    onChange={(e) => setNovoTipo(e.target.value)}
                />
                <button onClick={handleCriarCategoria}>Adicionar</button>
            </div>

            {/* Formulário de edição */}
            {editandoId && (
                <div className="formulario">
                    <input
                        type="text"
                        placeholder="Editar Categoria"
                        value={editandoTipo}
                        onChange={(e) => setEditandoTipo(e.target.value)}
                    />
                    <button onClick={handleEditarCategoria}>Salvar</button>
                    <button onClick={() => setEditandoId(null)}>Cancelar</button>
                </div>
            )}

            {/* Tabela de categorias */}
            <table className="categorias-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((categoria) => (
                        <tr key={categoria.idCategoria}>
                            <td>{categoria.idCategoria}</td>
                            <td>{categoria.tipo}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        setEditandoId(categoria.idCategoria);
                                        setEditandoTipo(categoria.tipo);
                                    }}
                                >
                                    Editar
                                </button>
                                <button onClick={() => handleDeletarCategoria(categoria.idCategoria)}>
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Categorias;
