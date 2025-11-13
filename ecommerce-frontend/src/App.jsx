import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import AtualizarCadastro from "./Components/AtualizarCadastro/AtualizarCadastro";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/atualizar" element={<AtualizarCadastro />} />
      </Routes>
    </div>
  );
}

export default App;
