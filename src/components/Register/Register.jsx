import { useState } from "react";
import user from "../../Assets/User.png";
import passWIcon from "../../Assets/passwordIcon.png";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.css";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [documento, setDocumento] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("candidato");

  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      const resposta = await fetch("http://localhost:3333/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          email: email,
          senha: senha,
          tipoUsuario: tipoUsuario,
          documento: documento,
        }),
      });
      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.erro || "Ocorreu um erro desconhecido.");
      }

      alert("Cadastro realizado com sucesso! Faça login.");
      navigate("/login");
      console.log(dados);
    } catch (error) {
      console.error(error);
      alert("Erro ao comunicar com o servidor!");
    }
  };

  return (
    <section className="login">
      <div className="containerLogin" style={{ padding: "30px 20px" }}>
        <h2 className="loginTitle">Crie Sua Conta</h2>

        {/* Passamos a usar a classe loginForm em vez de style inline */}
        <form onSubmit={handleCadastro} className="loginForm">
          <div className="loginField">
            <p className="loginLabel">Nome Completo / Razão Social</p>
            <div className="inputContainer">
              <img src={user} alt="" />
              <input
                className="loginInput"
                type="text"
                placeholder="Digite seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
          </div>

          <div className="loginField">
            <p className="loginLabel">E-mail</p>
            <div className="inputContainer">
              <img src={user} alt="" />
              <input
                className="loginInput"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div
            className="radioGroup"
            style={{
              display: "flex",
              gap: "15px",
              marginBottom: "20px",
              fontSize: "14px",
              color: "var(--text-dark)",
              justifyContent: "center",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                value="candidato"
                checked={tipoUsuario === "candidato"}
                onChange={(e) => setTipoUsuario(e.target.value)}
              />
              Sou Candidato
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                cursor: "pointer",
              }}
            >
              <input
                type="radio"
                value="empresa"
                checked={tipoUsuario === "empresa"}
                onChange={(e) => setTipoUsuario(e.target.value)}
              />
              Sou Empresa
            </label>
          </div>

          <div className="loginField">
            <p className="loginLabel">
              {tipoUsuario === "candidato" ? "CPF" : "CNPJ"}
            </p>
            <div className="inputContainer">
              <img src={user} alt="" />
              <input
                className="loginInput"
                type="text"
                placeholder={
                  tipoUsuario === "candidato"
                    ? "Digite seu CPF"
                    : "Digite o CNPJ"
                }
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
              />
            </div>
          </div>

          <div className="loginField">
            <p className="loginLabel">Senha</p>
            <div className="inputContainer">
              <img src={passWIcon} alt="" />
              <input
                className="loginInput"
                type="password"
                placeholder="Crie uma senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="loginButton">
            Cadastrar
          </button>

          <p className="loginRegister">
            Já tem uma conta?
            <Link to="/login" className="loginRegisterLink">
              Faça Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
