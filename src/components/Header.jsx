import { Link, useLocation } from 'react-router-dom'

const Header = () => {

  const location = useLocation();

  const login = location.pathname=== '/login';

  return (
    <header className="cabecalho">
      <h2 id="title-header">Portal de Empregos</h2>
      {login ? (
      <Link className="btn-login" to="/">Home</Link>
      ) : (
      <Link className="btn-login" to="/login">Login</Link>
      )}
      
    </header>
  );
};

export default Header;
