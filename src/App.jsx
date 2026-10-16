import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import JobOfTheDayPage from "./components/JobsOfTheDay/JobOfTheDayPage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CompanyDashboard from "./components/Dashboard/CompanyDashboard";
import Carroussel from "./components/Carroussel/Carroussel";

function App() {
  return (
    <BrowserRouter>
      <section>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<JobOfTheDayPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/dashboard-empresa" element={<CompanyDashboard />} />
          </Routes>
        </main>
      </section>
    </BrowserRouter>
  );
}

export default App;
