import { useNavigate, useLocation } from "react-router-dom";

import {
    FiArrowLeft,
    FiMapPin,
    FiDollarSign,
    FiBriefcase,
    FiHome,
    FiArrowUpRight,
} from "react-icons/fi";

import enterpriseImage from "../../Assets/ProfileImage.png";
import "./DetailsJob.css";

export default function DetailsJob() {
    const navigate = useNavigate();

    const location = useLocation();
    const infoCard = location.state;

    return (
        <main className="detalhesVaga">
            <button
                type="button"
                className="detalhesVagaBack"
                onClick={() => navigate(-1)}
            >
                <FiArrowLeft />
                Voltar para vagas
            </button>

            <section className="detalhesVagaBanner">
                <div className="detalhesVagaLogo">
                    <img src={enterpriseImage} alt="Logo da empresa" />
                </div>

                <div className="detalhesVagaTitulo">
                    <span className="detalhesVagaLabel">
                        Oportunidade
                    </span>

                    <h1>
                        {infoCard?.titulo || "Título da vaga"}
                    </h1>

                    <p className="detalhesVagaEmpresa">
                        <FiHome />
                        {infoCard?.empresa?.nome || "VG Empregos"}
                    </p>

                    <div className="detalhesVagaInformacoes">
                        <span>
                            <FiMapPin />
                            {infoCard?.localizacao || "Local não informado"}
                        </span>

                        <span>
                            <FiDollarSign />
                            {infoCard?.salario
                                ? `R$ ${ infoCard.salario } `
                                : "Salário a combinar"}
                        </span>
                    </div>
                </div>
            </section>

            <div className="detalhesVagaConteudo">
                <section className="detalhesVagaDescricao">
                    <article className="detalhesVagaCard">
                        <h2>Sobre a vaga</h2>

                        <p>
                            {infoCard.descricao || "Vaga sem descrição"}
                            
                        </p>
                    </article>

                    <article className="detalhesVagaCard">
                        <h2>Descrição e responsabilidades</h2>

                        <p>
                            As atividades e responsabilidades relacionadas
                            ao cargo serão disponibilizadas conforme as
                            informações cadastradas pela empresa.
                        </p>
                    </article>

                    <article className="detalhesVagaCard">
                        <h2>Requisitos</h2>

                        <p>
                            Confira as qualificações e os requisitos
                            necessários para participar do processo seletivo.
                        </p>
                    </article>
                </section>

                <aside className="detalhesVagaSidebar">
                    <div className="detalhesVagaResumo">
                        <h2>Informações da vaga</h2>

                        <div className="detalhesVagaItem">
                            <FiBriefcase />

                            <div>
                                <span>Cargo</span>
                                <strong>
                                    {infoCard?.titulo || "Não informado"}
                                </strong>
                            </div>
                        </div>

                        <div className="detalhesVagaItem">
                            <FiHome />

                            <div>
                                <span>Empresa</span>
                                <strong>
                                    {infoCard?.empresa?.nome || "VG Empregos"}
                                </strong>
                            </div>
                        </div>

                        <div className="detalhesVagaItem">
                            <FiMapPin />

                            <div>
                                <span>Localização</span>
                                <strong>
                                    {infoCard?.localizacao || "Não informada"}
                                </strong>
                            </div>
                        </div>

                        <div className="detalhesVagaItem">
                            <FiDollarSign />

                            <div>
                                <span>Salário</span>
                                <strong>
                                    {infoCard?.salario
                                        ? `R$ ${ infoCard.salario } `
                                        : "A combinar"}
                                </strong>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="detalhesVagaCandidatar"
                        >
                            Candidatar-se
                            <FiArrowUpRight />
                        </button>
                    </div>
                </aside>
            </div>
        </main>
    );
}