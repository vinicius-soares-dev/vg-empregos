import Header from "./components/Header";
import JobCard from "./components/JobCard";

function App() {
  return (
    <section>
      <Header />
      <main>
        <JobCard />
        <JobCard />
        <JobCard />
      </main>
    </section>
  );
}

export default App;

/*
  Header - cabeçalho
  p - paragrafos
  a - links
  main - sessão principal do site
  section - sessão
  footer - rodapé

  ---- 
  - iniciante: criar um componente chamado footer.jsx contendo um parágrafo "@2026 VG Empregos - todos os direitos reservados" e importá-lo no App.jsx logo abaixo do fechamento da main.

  - intermediário: fazer o componente footer e também criar um componente CompanyProfile.jsx que exiba um titulo H2 (ex: Sobre a empresa) e um parágrafo descritivo ficticio. Adicionar esse componente na tela principal.
  - Avançado: Construir o layout da JobCard.jsx e do Header.jsx utilizando classes css comuns.
*/
