import React, { useEffect, useState } from 'react';
import { buscarCupons, criarCupom, atualizarCupom, deletarCupom } from '../../context/CupomController';
import './StyleCupons.css';

function Cupons() {
    const [cupons, setCupons] = useState([]);
    const [codigo, setCodigo] = useState('');
    const [desconto, setDesconto] = useState('');
    const [status, setStatus] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        carregarCupons();
    }, []);

    const carregarCupons = async () => {
        try {
            const data = await buscarCupons();
            setCupons(data);
        } catch (error) {
            console.error('Erro ao carregar cupons:', error);
        }
    };

    const handleSalvarCupom = async () => {
        if (!codigo.trim() || !desconto.trim() || !status.trim() || !quantidade.trim()) {
            console.error('Todos os campos devem ser preenchidos');
            return;
        }

        try {
            if (editandoId) {
                // Editar cupom existente
                await atualizarCupom(editandoId, {
                    codigo,
                    porcentagem_desconto: parseFloat(desconto),
                    status,
                    quantidade: parseInt(quantidade, 10),
                });
            } else {
                // Criar novo cupom
                await criarCupom({
                    codigo,
                    porcentagem_desconto: parseFloat(desconto),
                    status,
                    quantidade: parseInt(quantidade, 10),
                });
            }

            setCodigo('');
            setDesconto('');
            setStatus('');
            setQuantidade('');
            setEditandoId(null);
            carregarCupons();
        } catch (error) {
            console.error('Erro ao salvar cupom:', error);
        }
    };

    const handleEditar = (cupom) => {
        setEditandoId(cupom.idCupom);
        setCodigo(cupom.codigo);
        setDesconto(cupom.porcentagem_desconto.toString());
        setStatus(cupom.status);
        setQuantidade(cupom.quantidade.toString());
    };

    const handleDeletarCupom = async (id) => {
        try {
            await deletarCupom(id);
            carregarCupons();
        } catch (error) {
            console.error('Erro ao deletar cupom:', error);
        }
    };

    return (
        <div className="cupons-container">
            <h1>Gerenciar Cupons</h1>

            {/* Formulário */}
            <div className="formulario">
                <input
                    type="text"
                    placeholder="Código do Cupom"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Desconto (%)"
                    value={desconto}
                    onChange={(e) => setDesconto(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Status (ativo/inativo)"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                />
                <button onClick={handleSalvarCupom}>
                    {editandoId ? 'Salvar Alterações' : 'Adicionar'}
                </button>
                {editandoId && <button onClick={() => setEditandoId(null)}>Cancelar</button>}
            </div>

            {/* Tabela de cupons */}
            <table className="cupons-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Código</th>
                        <th>Desconto (%)</th>
                        <th>Status</th>
                        <th>Quantidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {cupons.map((cupom) => (
                        <tr key={cupom.idCupom}>
                            <td>{cupom.idCupom}</td>
                            <td>{cupom.codigo}</td>
                            <td>{cupom.porcentagem_desconto}</td>
                            <td>{cupom.status}</td>
                            <td>{cupom.quantidade}</td>
                            <td>
                                <button onClick={() => handleEditar(cupom)}>Editar</button>
                                <button onClick={() => handleDeletarCupom(cupom.idCupom)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Cupons;
