import passWIcon from '../../Assets/passwordIcon.png'
import user from '../../Assets/User.png'
import { Link } from 'react-router-dom'
import '../Login/auth.css'

export default function Register() {
    return (
        <section className="login">
            <div className="containerLogin">
                <h2 className="loginTitle">Crie sua conta</h2>

                <div className="loginField">
                    <p className="loginLabel">Seu E-mail</p>

                    <div className="inputContainer">
                        <img src={user} alt="" />
                        <input
                            className="loginInput"
                            type="email"
                            placeholder="Digite seu e-mail"
                        />
                    </div>
                </div>

                <div className="loginField">
                    <p className="loginLabel">Seu nome </p>

                    <div className="inputContainer">
                        <img src={user} alt="" />
                        <input
                            className="loginInput"
                            type="text"
                            placeholder="Digite seu nome"
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
                        />
                    </div>
                </div>

                <button className="loginButton">Cadastrar</button>

                <p className="loginRegister">
                    Já tem uma conta?
                    <Link className="loginRegisterLink" to="/login">
                        Entre
                    </Link>
                </p>
            </div>
        </section>
    );
}