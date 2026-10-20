import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import {
  FiMapPin,
  FiDollarSign,
  FiArrowUpRight,
  FiUploadCloud,
  FiCheck,
  FiX,
  FiLoader,
} from "react-icons/fi";

import enterpriseImage from "../../Assets/ProfileImage.png";
import "./jobCard.css";
import { supabase } from "../../services/supabaseClient";

const JobCard = ({ infoCard }) => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("vgjobs_user"));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [arquivo, setArquivo] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [applyStatus, setApplyStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const efetivarCandidatura = async () => {
    const response = await fetch("http://localhost:3333/candidaturas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usuarioId: userData.id,
        vagaId: infoCard.id,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.erro || "Erro ao realizar candidatura.");
    }
  };

  const handleCandidatura = async () => {
    if (!userData) {
      navigate("/login");
      return;
    }

    if (userData.tipoUsuario === "empresa") {
      setApplyStatus("error");
      setErrorMessage("Apenas Candidatos");
      setTimeout(() => setApplyStatus("idle"), 3000);
      return;
    }

    setApplyStatus("loading");

    try {
      const response = await fetch(
        `http://localhost:3333/usuarios/${userData.id}`,
      );
      const data = await response.json();

      if (data.curriculoUrl) {
        await efetivarCandidatura();
        setApplyStatus("success");
        setTimeout(() => setApplyStatus("idle"), 3000);
      } else {
        setApplyStatus("idle");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Erro na candidatura: ", error);
      setApplyStatus("error");
      setErrorMessage(
        error.message.includes("já se candidatou") ? "Já inscrito" : "Erro",
      );
      setTimeout(() => setApplyStatus("idle"), 3000);
    }
  };

  const handleUploadCurriculo = async () => {
    if (!arquivo) return;
    setIsUploading(true);

    try {
      const filename = `${userData.id}-${Date.now()}-${arquivo.name}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("resume")
        .upload(filename, arquivo);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("resume")
        .getPublicUrl(filename);

      const curriculoPublicUrl = urlData.publicUrl;

      const responseDB = await fetch(
        `http://localhost:3333/usuarios/${userData.id}/curriculo`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ curriculoUrl: curriculoPublicUrl }),
        },
      );

      if (!responseDB.ok) {
        throw new Error("Erro ao salvar URL no banco de dados.");
      }

      await efetivarCandidatura();

      setIsModalOpen(false);
      setApplyStatus("success");
      setTimeout(() => setApplyStatus("idle"), 3000);
    } catch (error) {
      console.error("Erro no upload: ", error);
      setIsModalOpen(false);
      setApplyStatus("error");
      setErrorMessage(
        error.message.includes("já se candidatou") ? "Já inscrito" : "Falha",
      );
      setTimeout(() => setApplyStatus("idle"), 3000);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
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
            className={`jobCardApply status-${applyStatus}`}
            onClick={handleCandidatura}
            disabled={applyStatus === "loading" || applyStatus === "success"}
          >
            {applyStatus === "idle" && (
              <>
                <span>Candidatar-se</span>
                <FiArrowUpRight />
              </>
            )}
            {applyStatus === "loading" && (
              <>
                <span>Processando...</span>
                <FiLoader className="icon-spin" />
              </>
            )}
            {applyStatus === "success" && (
              <>
                <span>Enviado!</span>
                <FiCheck />
              </>
            )}
            {applyStatus === "error" && (
              <>
                <span>{errorMessage}</span>
                <FiX />
              </>
            )}
          </button>
        </div>
      </article>

      {isModalOpen &&
        createPortal(
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header-icon">
                <FiUploadCloud size={48} color="#357976" />
              </div>
              <h3>Quase lá!</h3>
              <p>
                Notamos que você ainda não tem um currículo cadastrado. Anexe-o
                agora para concluir a candidatura.
              </p>

              <div className="modal-file-wrapper">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setArquivo(e.target.files[0])}
                  className="modal-file-input"
                  id="file-upload"
                />
              </div>

              <div className="modal-actions">
                <button
                  className="btn-modal-cancel"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isUploading}
                >
                  Cancelar
                </button>
                <button
                  className="btn-modal-submit"
                  onClick={handleUploadCurriculo}
                  disabled={isUploading}
                >
                  {isUploading ? "Enviando..." : "Enviar Currículo"}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default JobCard;
