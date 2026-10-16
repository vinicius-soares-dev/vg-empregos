import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import passWIcon from "../../Assets/passwordIcon.png";
import user from "../../Assets/User.png";

import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.erro || "Falha no login.");
      }
      localStorage.setItem("vgjobs_user", JSON.stringify(dados.usuario));
      alert(`Bem-vindo, ${dados.usuario.nome}!`);
      if (dados.usuario.tipoUsuario === "empresa") {
        navigate("/dashboard-empresa");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <section className="login">
      <div className="containerLogin">
        <h2 className="loginTitle">Acesse sua conta</h2>

        <form onSubmit={handleLogin} className="loginForm">
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

          <div className="loginField">
            <p className="loginLabel">Senha</p>
            <div className="inputContainer">
              <img src={passWIcon} alt="" />
              <input
                className="loginInput"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="loginButton">
            Entrar
          </button>

          <p className="loginRegister">
            Não tem uma conta?
            <Link to="/cadastro" className="loginRegisterLink">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
