import enterpriseImage from "../../Assets/ProfileImage.png";
import moneyImage from "../../Assets/money-square.png";
import group from "../../Assets/ProfileImage.png";

//css
import "./jobCard.css";

const JobCard = ({ infoCard }) => {
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
