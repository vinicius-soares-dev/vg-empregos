import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import JobOfTheDayPage from "./components/JobsOfTheDay/JobOfTheDayPage";
import Login from "./components/Login/Login";
import Register from "./components/Register/register";
import Footer from "./components/Footer";

function App() {
  return (
    <section>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<JobOfTheDayPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </section>
  );
}

export default App;