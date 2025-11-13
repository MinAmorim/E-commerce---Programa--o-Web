import { useState } from "react";
import "./Cadastro.css";

const Cadastro = () => {
  // Estados para armazenar as entradas do usuário
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("")


  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Dados de cadastro:", {fullname, username, password });
  };

  return (
    
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Realize o seu Cadastro</h1>
        <div className="input-field">
            <input type="text" 
             placeholder="Nome"
             required
             value={fullname}
             onChange={(e)=> setFullname(e.target.value)}
            />

        </div>
        <div className="input-field">
          <input
            type="text"
            placeholder="E-mail"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
        </div>
        <button type="submit">Cadastrar</button>
        <div className="login-link">
          <p>
            Já tem uma conta? <a href="#">Entrar</a>{" "}
          </p>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;