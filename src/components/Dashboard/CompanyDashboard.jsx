import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CompanyDashboard.css";

export default function CompanyDashboard() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("vgjobs_user"));
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    salario: "",
    localizacao: "",
  });

  const handleLogout = () => {
    localStorage.removeItem("vgjobs_user");
    navigate("/login");
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch("http://localhost:3333/vagas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo: formData.titulo,
          descricao: formData.descricao,
          salario: formData.salario,
          localizacao: formData.localizacao,
          empresaId: userData.id,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.erro || "Erro ao criar vaga.");
      }

      alert("Vaga publicada com sucesso!");
      setFormData({ titulo: "", descricao: "", salario: "", localizacao: "" });
      setIsCreating(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (!userData || userData.tipoUsuario !== "empresa") {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Acesso Negado. Apenas empresas podem acessar.</h2>
        <button className="btn-primary" onClick={() => navigate("/login")}>
          Voltar ao Login
        </button>
      </div>
    );
  }

  return (
    <section className="dashboard-container">
      <div className="dashboard-header">
        <h2>Painel da Empresa: {userData.nome}</h2>
        <button onClick={handleLogout} className="btn-danger">
          Sair da Conta
        </button>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3>As Suas Vagas</h3>
          {!isCreating && (
            <button className="btn-primary" onClick={() => setIsCreating(true)}>
              + Criar Nova Vaga
            </button>
          )}
        </div>
        {isCreating ? (
          <div className="job-form-container">
            <h3>Publicar Vaga</h3>
            <form onSubmit={handleCreateJob}>
              <div className="form-group">
                <label>Título da Vaga</label>
                <input
                  type="text"
                  name="titulo"
                  className="form-input"
                  placeholder="Ex: Desenvolvedor Front-end Júnior"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  name="descricao"
                  className="form-textarea"
                  placeholder="Descreva as responsabilidades e requisitos..."
                  value={formData.descricao}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div style={{ display: "flex", gap: "15px" }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Salário (R$)</label>
                  <input
                    type="number"
                    name="salario"
                    className="form-input"
                    placeholder="Ex: 3500"
                    value={formData.salario}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group" style={{ flex: 1 }}>
                  <label>Localização</label>
                  <input
                    type="text"
                    name="localizacao"
                    className="form-input"
                    placeholder="Ex: Remoto, São Paulo, etc."
                    value={formData.localizacao}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  Publicar Vaga
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setIsCreating(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        ) : (
          <p style={{ color: "#666", marginTop: "20px" }}>
            Você ainda não publicou nenhuma vaga. (A listagem entrará aqui em
            breve).
          </p>
        )}
      </div>
    </section>
  );
}
