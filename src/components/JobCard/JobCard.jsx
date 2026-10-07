import enterpriseImage from "../../Assets/ProfileImage.png"
import moneyImage from "../../Assets/money-square.png"
import group from "../../Assets/ProfileImage.png"

//css
import './jobCard.css'


const JobCard = ({ infoCard }) => {
  return (
    <section className="jobCard">
      <img className="imgEnterprise" src={enterpriseImage} alt="" />
      <h2>{infoCard.title}</h2>
      <div className="infoJob">
        <img src={moneyImage} alt="" />
        <p>R${infoCard.salary}</p>
      </div>
      <div className="infoJob">
        <img src={group} alt="" />
        <p>{infoCard.location}</p>
      </div>
      <button>Candidatar-se</button>
    </section>
  );
};

export default JobCard;
