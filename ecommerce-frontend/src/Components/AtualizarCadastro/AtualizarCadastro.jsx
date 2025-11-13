import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./AtualizarCadastro.css";

export default function AtualizarCadastro() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [novoNome, setNovoNome] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    //  Buscar dados do usuário autenticado
    fetch("http://localhost:8081/api/cliente/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`, 
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Erro ao buscar cliente:", res.status, errorText);
          throw new Error("Erro ao carregar dados");
        }
        return res.json();
      })
      .then((data) => setUsuario(data))
      .catch((err) => {
        console.error("Erro capturado:", err);
        alert("Sessão expirada ou erro ao carregar dados. Faça login novamente.");
        handleLogout();
      });
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  async function handleAtualizarCadastro(e) {
    e.preventDefault();

    const dadosAtualizados = {
      nome: novoNome || usuario?.nome,
      senha: novaSenha || null,
    };

    try {
      const response = await fetch("http://localhost:8081/api/cliente/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify(dadosAtualizados),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro ao atualizar:", response.status, errorText);
        throw new Error("Erro ao atualizar dados");
      }

      const data = await response.json();
      alert("Dados atualizados com sucesso!");
      setUsuario(data);
      setNovoNome("");
      setNovaSenha("");
    } catch (err) {
      console.error("Erro no PUT:", err);
      alert("Erro ao atualizar cadastro. Tente novamente.");
    }
  }

  return (
    <div className="home-container">
      <h1 className="titulo-home">
        Bem-vinda, {usuario ? usuario.nome : "carregando..."} 💖
      </h1>

      <div className="botoes">
        <button className="btn logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="card-atualizar">
        <h2>Atualizar Cadastro</h2>
        <form onSubmit={handleAtualizarCadastro} className="form-atualizar">
          <input
            type="text"
            placeholder="Novo nome"
            value={novoNome}
            onChange={(e) => setNovoNome(e.target.value)}
          />
          <input
            type="password"
            placeholder="Nova senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
          />
          <button type="submit" className="btn atualizar">
            Atualizar
          </button>
        </form>
      </div>
    </div>
  );
}
