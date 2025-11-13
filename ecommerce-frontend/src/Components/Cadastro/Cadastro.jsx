import React, { useState } from 'react';
import './Cadastro.css'; //
import { Link, useNavigate } from 'react-router-dom'; // Importa o useNavigate
import axios from 'axios';

const Cadastro = () => {
    // Estados para todos os campos do formulário
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate(); 

    // Função chamada ao submeter o formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!nome || !endereco || !email || !login || !senha) {
            setError('Todos os campos são obrigatórios.');
            return;
        }

        try {
          
            const response = await axios.post('http://localhost:8081/api/auth/register', {
                nome: nome,
                endereco: endereco,
                email: email,
                login: login,
                senha: senha
            });

            console.log('Registo bem-sucedido!', response.data.token);

            
            alert('Conta criada com sucesso! Por favor, faça o login.');
            navigate('/'); // Redireciona para a página de Login

        } catch (err) {
            console.error('Erro no registo:', err);
            if (err.response && err.response.data) {
                setError(err.response.data); 
            } else {
                setError('Não foi possível criar a conta. Tente novamente.');
            }
        }
    };

    return (
        <div className='cadastro-container'>
            <div className="wrapper"> {/* */}
                <form onSubmit={handleSubmit}>
                    <h1>Criar Conta</h1>
                    {error && <p className="cadastro-error">{error}</p>} {/* Mostra erros */}

                    <div className="input-box">
                        <input type="text" placeholder='Nome Completo' value={nome} onChange={(e) => setNome(e.target.value)} required />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder='Endereço' value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder='Login (username)' value={login} onChange={(e) => setLogin(e.target.value)} required />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)} required />
                    </div>
                    
                    <button type="submit">Registar</button>
                    
                    <div className="register-link"> {/* */}
                        <p>Já tem uma conta? <Link to="/">Faça Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Cadastro;