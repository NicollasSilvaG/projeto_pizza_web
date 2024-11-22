import React, { useState, useEffect } from "react";
import { ClienteController } from "../../context/ClienteController"; // Controller para gerenciar requisições
import './StyleClientes.css';

const ClientePage = () => {
    const [usuarios, setUsuarios] = useState([]); // Lista de usuários
    const [error, setError] = useState(""); // Mensagem de erro
    const [editandoUsuario, setEditandoUsuario] = useState(null); // Usuário em edição
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        telefone: "",
        rua: "",
        cidade: "",
        uf: "",
        cep: "",
        bairro: "",
        complemento: "",
    }); // Dados do formulário

    // Busca inicial dos usuários
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await ClienteController.buscarTodosUsuarios();
                setUsuarios(data);
            } catch (err) {
                setError("Erro ao carregar usuários.");
            }
        };

        fetchUsuarios();
    }, []);

    // Atualiza os campos do formulário
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Inicia a edição de um usuário
    const iniciarEdicao = (usuario) => {
        setEditandoUsuario(usuario.idUsuario);
        setFormData({
            nome: usuario.nome,
            email: usuario.email,
            telefone: usuario.telefone,
            rua: usuario.rua,
            cidade: usuario.cidade,
            uf: usuario.uf,
            cep: usuario.cep,
            bairro: usuario.bairro,
            complemento: usuario.complemento,
        });
    };

    // Salva as alterações feitas no usuário
    const salvarEdicao = async () => {
        try {
            await ClienteController.atualizarUsuario(editandoUsuario, formData);
            setUsuarios((prev) =>
                prev.map((usuario) =>
                    usuario.idUsuario === editandoUsuario
                        ? { ...usuario, ...formData }
                        : usuario
                )
            );
            setEditandoUsuario(null);
            setFormData({
                nome: "",
                email: "",
                telefone: "",
                rua: "",
                cidade: "",
                uf: "",
                cep: "",
                bairro: "",
                complemento: "",
            });
        } catch (err) {
            setError("Erro ao salvar alterações.");
        }
    };

    // Exclui um usuário
    const excluirUsuario = async (id) => {
        try {
            await ClienteController.deletarUsuario(id);
            setUsuarios(usuarios.filter((usuario) => usuario.idUsuario !== id));
        } catch (err) {
            setError("Erro ao excluir usuário.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Gerenciar Usuários</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                      <tr>
                          <th className = 'Nome' style={{ border: "1px solid #ddd", padding: "8px" }}>Nome</th>
                          <th className = 'Email' style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
                          <th className = 'Telefone' style={{ border: "1px solid #ddd", padding: "8px" }}>Telefone</th>
                          <th className = 'Endereco' style={{ border: "1px solid #ddd", padding: "8px" }}>Endereço</th>
                          <th className = 'Acoes' style={{ border: "1px solid #ddd", padding: "8px" }}>Ações</th>
                      </tr>
                  </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.idUsuario}>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {editandoUsuario === usuario.idUsuario ? (
                                    <input
                                        type="text"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    usuario.nome
                                )}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {editandoUsuario === usuario.idUsuario ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    usuario.email
                                )}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {editandoUsuario === usuario.idUsuario ? (
                                    <input
                                        type="text"
                                        name="telefone"
                                        value={formData.telefone}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    usuario.telefone
                                )}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {editandoUsuario === usuario.idUsuario ? (
                                    <>
                                        <input
                                            type="text"
                                            name="rua"
                                            value={formData.rua}
                                            placeholder="Rua"
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="text"
                                            name="cidade"
                                            value={formData.cidade}
                                            placeholder="Cidade"
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="text"
                                            name="uf"
                                            value={formData.uf}
                                            placeholder="UF"
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="text"
                                            name="cep"
                                            value={formData.cep}
                                            placeholder="CEP"
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="text"
                                            name="bairro"
                                            value={formData.bairro}
                                            placeholder="Bairro"
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="text"
                                            name="complemento"
                                            value={formData.complemento}
                                            placeholder="Complemento"
                                            onChange={handleInputChange}
                                        />
                                    </>
                                ) : (
                                    <>
                                        {usuario.rua}, {usuario.bairro}, {usuario.cidade}, {usuario.uf},{" "}
                                        {usuario.cep} ({usuario.complemento})
                                    </>
                                )}
                            </td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                {editandoUsuario === usuario.idUsuario ? (
                                    <>
                                        <button onClick={salvarEdicao}>Salvar</button>
                                        <button onClick={() => setEditandoUsuario(null)}>Cancelar</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => iniciarEdicao(usuario)}>Editar</button>
                                        <button onClick={() => excluirUsuario(usuario.idUsuario)}>Excluir</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientePage;
