import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import BaseName from "./pages/BaseName";
import SellPage from "./pages/SellPage";
import Donation from "./pages/DonationPage";
import { Toaster } from 'react-hot-toast';
import CampaignForm from "./components/CampaignForm";
import AuthPage from "./pages/AuthPage";
import MarketPlace from "./pages/MarketPlace";
import ListingDetails from "./pages/ListingDetails";

function App() {
  const location = useLocation();

  const shouldShowNavbar =
    location.pathname !== "/" && location.pathname !== "/get-basename";

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/get-basename" element={<BaseName />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
          <Route path="/campaignform" element={<CampaignForm />} />
          <Route path="/donate" element={<Donation />} />
          <Route path="/market" element={<MarketPlace />} />
        </Routes>
      </main>
    </>
  );
}

export default function MainApp() {
  return (
    <BrowserRouter>
      <Toaster/>
      <App />
    </BrowserRouter>
  );
}
