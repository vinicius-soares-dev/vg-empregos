import { Link, useNavigate } from "react-router-dom";
import "../Assets/style/Header.css";

const Header = () => {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("vgjobs_user"));

  const handleLogout = () => {
    localStorage.removeItem("vgjobs_user");
    navigate("/login");
  };

  return (
    <header className="cabecalho">
      {/* Lado Esquerdo: Logo */}
      <div className="logo-container">
        <Link to="/" className="logo-link">
          <h1 className="logo-title">VG Empregos</h1>
          <span className="logo-subtitle">Portal de Vagas</span>
        </Link>
      </div>
      <nav className="nav-container">
        <Link to="/" className="nav-link">
          Vagas
        </Link>
        {userData ? (
          <>
            <Link
              to={
                userData.tipoUsuario === "empresa" ? "/dashboard-empresa" : "/"
              }
              className="nav-link highlight"
            >
              Meu Painel
            </Link>
            <button onClick={handleLogout} className="btn-logout">
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Entrar
            </Link>
            <Link to="/cadastro" className="btn-cadastro">
              Cadastre-se
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
