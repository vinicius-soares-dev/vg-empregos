import "./Footer.css";
import {
    FaBriefcase,
    FaLinkedinIn,
    FaInstagram,
    FaArrowUp,
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footerContainer">
                <div className="footerMain">
                    <div className="footerBrand">
                        <a href="/" className="footerLogo">
                            <FaBriefcase />
                            <span>VG <strong>Empregos</strong></span>
                        </a>

                        <p>
                            Conectando talentos às oportunidades certas.
                            Encontre sua próxima oportunidade profissional
                            com a VG Empregos.
                        </p>
                    </div>

                    <div className="footerLinks">
                        <h3>Explorar</h3>
                        <a href="/vagas">Encontrar vagas</a>
                        <a href="/empresas">Empresas</a>
                        <a href="/sobre">Sobre nós</a>
                    </div>

                    <div className="footerLinks">
                        <h3>Para empresas</h3>
                        <a href="/cadastrar-vaga">Publicar vaga</a>
                        <a href="/login">Acessar conta</a>
                    </div>

                    <div className="footerLinks">
                        <h3>Institucional</h3>
                        <a href="/privacidade">Privacidade</a>
                        <a href="/termos">Termos de uso</a>
                        <a href="/contato">Fale conosco</a>
                    </div>
                </div>

                <div className="footerBottom">
                    <p>
                        © {new Date().getFullYear()} VG Empregos.
                        Todos os direitos reservados.
                    </p>

                    <button
                        type="button"
                        className="footerBackTop"
                        onClick={() =>
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                            })
                        }
                        aria-label="Voltar ao topo"
                    >
                        <FaArrowUp />
                    </button>
                </div>
            </div>
        </footer>
    );
}