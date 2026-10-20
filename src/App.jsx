import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import JobOfTheDayPage from "./components/JobsOfTheDay/JobOfTheDayPage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import CompanyDashboard from "./components/Dashboard/CompanyDashboard";
import DetailsJob from './Pages/DetailsJob/DetailsJob.jsx'
import Footer from "./components/Footer/Footer.jsx";
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
            <Route path="/vagas/:id" element={<DetailsJob />}
            />
          </Routes>
        </main>
        <Footer/>
      </section>
    </BrowserRouter>
  );
}

export default App;
