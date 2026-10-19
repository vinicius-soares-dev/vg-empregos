import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CompanyDashboard.css";

export default function CompanyDashboard() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("vgjobs_user"));

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [vagas, setVagas] = useState([]);

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

  const fetchCompanyJobs = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/vagas/empresa/${userData.id}`,
      );
      const data = await response.json();
      if (response.ok) {
        setVagas(data);
      }
    } catch (error) {
      console.error("Erro ao carregar vagas da empresa:", error);
    }
  };

  useEffect(() => {
    if (userData && userData.id) {
      fetchCompanyJobs();
    }
  }, []);

  const handleSubmitJob = async (e) => {
    e.preventDefault();

    const url = editingId
      ? `http://localhost:3333/vagas/${editingId}`
      : "http://localhost:3333/vagas";

    const method = editingId ? "PUT" : "POST";

    try {
      const resposta = await fetch(url, {
        method: method,
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
        throw new Error(dados.erro || "Erro ao salvar vaga.");
      }

      alert(
        editingId
          ? "Vaga atualizada com sucesso!"
          : "Vaga publicada com sucesso!",
      );

      setFormData({ titulo: "", descricao: "", salario: "", localizacao: "" });
      setIsCreating(false);
      setEditingId(null);

      fetchCompanyJobs();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleDeleteJob = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta vaga?")) return;

    try {
      const resposta = await fetch(`http://localhost:3333/vagas/${id}`, {
        method: "DELETE",
      });

      if (!resposta.ok) {
        throw new Error("Erro ao excluir vaga.");
      }

      alert("Vaga excluída com sucesso!");
      fetchCompanyJobs();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleStartEdit = (vaga) => {
    setFormData({
      titulo: vaga.titulo,
      descricao: vaga.descricao,
      salario: vaga.salario,
      localizacao: vaga.localizacao,
    });
    setEditingId(vaga.id);
    setIsCreating(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggleStatus = async (vagaId, statusAtual) => {
    const novoStatus = statusAtual === "ativa" ? "pausada" : "ativa";
    try {
      const resposta = await fetch(
        `http://localhost:3333/vagas/${vagaId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: novoStatus }),
        },
      );

      const dados = await resposta.json();
      if (!resposta.ok) {
        throw new Error(dados.erro || "Erro ao alterar status da vaga.");
      }
      fetchCompanyJobs();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
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
          <h3>As Suas Vagas Publicadas</h3>

          {!isCreating && (
            <button
              className="btn-primary"
              onClick={() => {
                setFormData({
                  titulo: "",
                  descricao: "",
                  salario: "",
                  localizacao: "",
                });
                setEditingId(null);
                setIsCreating(true);
              }}
            >
              + Criar Nova Vaga
            </button>
          )}
        </div>

        {isCreating ? (
          <div className="job-form-container">
            <h3>{editingId ? "Editar Vaga" : "Publicar Nova Vaga"}</h3>
            <form onSubmit={handleSubmitJob}>
              <div className="form-group">
                <label>Título da Vaga</label>
                <input
                  type="text"
                  name="titulo"
                  className="form-input"
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
                    value={formData.localizacao}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingId ? "Salvar Alterações" : "Publicar Vaga"}
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingId(null);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div style={{ marginTop: "20px" }}>
            {vagas.length === 0 ? (
              <p style={{ color: "#666" }}>
                Você ainda não publicou nenhuma vaga.
              </p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                {vagas.map((vaga) => (
                  <div
                    key={vaga.id}
                    style={{
                      padding: "20px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <h4 style={{ margin: "0 0 5px 0", color: "#333" }}>
                        {vaga.titulo}
                      </h4>
                      <p
                        style={{
                          margin: "0 0 10px 0",
                          color: "#666",
                          fontSize: "14px",
                        }}
                      >
                        {vaga.descricao}
                      </p>
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#357976",
                        }}
                      >
                        R$ {vaga.salario} | {vaga.localizacao} | Status:{" "}
                        <span
                          style={{
                            color:
                              vaga.status === "ativa" ? "#28a745" : "#dc3545",
                            textTransform: "uppercase",
                          }}
                        >
                          {vaga.status}
                        </span>
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <button
                        onClick={() => handleToggleStatus(vaga.id, vaga.status)}
                        style={{
                          padding: "6px 12px",
                          backgroundColor:
                            vaga.status === "ativa" ? "#6c757d" : "#28a745",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        {vaga.status === "ativa" ? "Pausar" : "Ativar"}
                      </button>

                      <button
                        onClick={() => handleStartEdit(vaga)}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "#f0ad4e",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => handleDeleteJob(vaga.id)}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "#d9534f",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
