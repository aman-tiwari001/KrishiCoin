import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import { Home } from './pages/Home';
import LandingPage from './pages/LandingPage';

function App() {
	const location = useLocation();

	const shouldShowNavbar = location.pathname !== '/';

	return (
		<>
			{shouldShowNavbar && <Navbar />}
			
			<Routes>
				<Route path='/home' element={<Home />} />
				<Route path='/' element={<LandingPage />} />
			</Routes>
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
