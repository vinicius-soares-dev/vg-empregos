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
import { supabase } from "../../services/supabaseClient";

const JobCard = ({ infoCard }) => {
  const userData = JSON.parse(localStorage.getItem("vgjobs_user"));
  const [arquivo, setArquivo] = useState();
  const [isUploading, setIsUploading] = useState(false);

  const handleCandidatura = async () => {
    if (!userData) {
      alert("Você precisa fazer login para se candidatar!");
      return;
    }

    if (userData.tipoUsuario === "empresa") {
      alert("Empresas não podem se candidatar a vagas.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3333/usuarios/${userData.id}`,
      );
      const data = await response.json();

      if (data.curriculoUrl) {
        alert("Candidatura realizada com sucesso usando seu currículo salvo.");
        // tarefa
      } else {
        // fecharia o modal
      }
    } catch (error) {
      console.error("Erro ao verificar curriculo: ", error);
    }
  };

  const handleUploadCurriculo = async () => {
    if (!arquivo) return alert("Selecione um arquivo PDF primeiro!");
    setIsUploading(true);

    try {
      const filename = `${userData.id}-${Date.now()}-${arquivo.nome}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("resume")
        .upload(filename, arquivo);

      if(uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from("resume").getPublicUrl(filename);

      const curriculoPublicUrl = urlData.publicUrl;
      const responseDB = await fetch(`http://localhost:3333/usuarios/${userData.id}/curriculo`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ curriculoUrl: curriculoPublicUrl})
      });
      if(!responseDB.ok) throw new Error("Erro ao salvar URL no banco de dados.");
      alert("Curriculo salvo e candidatura enviada com sucesso!");
      // fecharia o modal
    }
  };

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