import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import "./Login.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

  // Estados para armazenar as entradas do usuário
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  // Função que é chamada quando o formulário é enviado
  const handleSubmit = async (event) => {
    // Impede que a página seja recarregada
    event.preventDefault();
    setError('');

    if (!username || !password){
        setError('Por favor, preencha o login e a senha');
        return;
    }

    try {
        const response = await axios.post('http://localhost:8081/api/auth/login',{
            login: username,
            senha: password
        });

        localStorage.setItem("token", response.data.token);
        console.log('Login bem-sucedido!');
        console.log('Token recebido:', response.data.token);

        window.location.href = "/home";



    } catch (err){
        console.error('Errono no login', err);
        setError('Login ou senha incorreta. Tente novamente.');
    }


    // Faz o console log das credenciais do usuário
    console.log("Dados de Login:", { username, password });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Faça o seu Login</h1>
        <div className="input-field">
          <input
            type="text"
            placeholder="E-mail"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        <div className="recall-forget">
          <label>
            <input type="checkbox" />
            Lembre de mim
          </label>
          <a href="#">Esqueceu sua senha?</a>
        </div>
        <button type="submit">Login</button>
        <div className="signup-link">
          <p>
            Não tem uma conta? <a href="#">Registar</a>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;