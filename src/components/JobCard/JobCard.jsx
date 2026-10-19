import { useState } from "react";
import enterpriseImage from "../../Assets/ProfileImage.png";
import moneyImage from "../../Assets/money-square.png";
import group from "../../Assets/ProfileImage.png";

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
    <section className="jobCard">
      <img className="imgEnterprise" src={enterpriseImage} alt="" />
      <h2>{infoCard.titulo}</h2>
      <p
        style={{
          color: "#666",
          fontSize: "14px",
          marginTop: "-10px",
          marginBottom: "15px",
          fontWeight: "600",
        }}
      >
        {infoCard.empresa?.nome || "VG Empregos"}
      </p>
      <div className="infoJob">
        <img src={moneyImage} alt="" />
        <p>R${infoCard.salario}</p>
      </div>
      <div className="infoJob">
        <img src={group} alt="" />
        <p>{infoCard.localizacao}</p>
      </div>
      <button>Candidatar-se</button>
    </section>
  );
};

export default JobCard;
