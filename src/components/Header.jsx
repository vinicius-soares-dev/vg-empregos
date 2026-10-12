import { Link, useLocation } from 'react-router-dom'
<Link className="loginRegisterLink" to="/login">
  Entre
</Link>
const Header = () => {

  const location = useLocation();

  const login = location.pathname=== '/login';

  return (
    <header className="cabecalho">
      <h2 id="title-header">Portal de Empregos</h2>
      {login ? (
      <Link to="/"><button className="btn-login">Home</button></Link>
      ) : (
      <Link to="/login"><button className="btn-login">Login</button></Link>
      )}
    </header>
  );
};

export default Header;
