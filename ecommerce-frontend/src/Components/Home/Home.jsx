import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/"); 
  };

  const handleUpdate = () => {
    navigate("/atualizar"); 
  };

  return (
    <div className="home-container">
      <h1>Bem-vindo(a) ao Fangirl 💫</h1>

      <div className="buttons">
        <button onClick={handleUpdate} className="btn update">
          Atualizar Cadastro
        </button>
        <button onClick={handleLogout} className="btn logout">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
