import passWIcon from '../../Assets/passwordIcon.png'
import user from '../../Assets/User.png'

import './Login.css'

export default function Login() {
    return (
        <section className="login">
            <div className="containerLogin">
                <h2 className="loginTitle">Acesse sua conta</h2>

                <div className="loginField">
                    <p className="loginLabel">E-mail ou nome de usuário</p>

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

                <button className="loginButton">Entrar</button>

                <a className="loginForgotPassword" href="">
                    Esqueceu a senha?
                </a>

                <p className="loginRegister">
                    Não tem uma conta?
                    <a className="loginRegisterLink" href="">
                        Cadastre-se
                    </a>
                </p>
            </div>
        </section>
    );
}