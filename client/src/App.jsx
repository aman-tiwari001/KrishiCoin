import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import BaseName from "./pages/BaseName";
import SellPage from "./pages/SellPage";
import Donation from "./pages/DonationPage";

function App() {
  const location = useLocation();

  const shouldShowNavbar =
    location.pathname !== "/" && location.pathname !== "/get-basename";

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <main>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/get-basename" element={<BaseName />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/donate" element={<Donation />} />
        </Routes>
      </main>
    </>
  );
}

export default function MainApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
