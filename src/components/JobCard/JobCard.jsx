import { useState } from "react";
import enterpriseImage from "../../Assets/ProfileImage.png";
import { useNavigate } from "react-router-dom";
import {
  FiMapPin,
  FiDollarSign,
  FiHeart,
  FiArrowUpRight,
} from "react-icons/fi";

import "./jobCard.css";

const JobCard = ({ infoCard }) => {
  const [favorito, setFavorito] = useState(false);
  const navigate = useNavigate();

  return (
    <article className="jobCard">
      <div className="jobCardLogo">
        <img src={enterpriseImage} alt="Logo da empresa" />
      </div>

      <div className="jobCardContent">
        <div className="jobCardTop">
          <span className="jobCardLabel">Oportunidade</span>
        </div>

        <h2 className="jobCardTitle" title={infoCard.titulo}>
          {infoCard.titulo}
        </h2>

        <p className="jobCardCompany">
          {infoCard.empresa?.nome || "VG Empregos"}
        </p>

        <div className="jobCardDetails">
          <div className="jobCardDetail">
            <FiDollarSign />
            <span>
              {infoCard.salario
                ? `R$ ${infoCard.salario}`
                : "Salário a combinar"}
            </span>
          </div>

          <div className="jobCardDetail">
            <FiMapPin />
            <span title={infoCard.localizacao}>
              {infoCard.localizacao || "Local não informado"}
            </span>
          </div>
        </div>
      </div>

      <div className="jobCardAction">
        <button
          type="button"
          className="jobCardApply"
          onClick={() =>
            navigate(`/vagas/${infoCard.id}`, {
              state: infoCard,
            })
          }
        >
          <span>Ver vaga</span>
          <FiArrowUpRight />
        </button>
      </div>
    </article>
  );
};

export default JobCard;