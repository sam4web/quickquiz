import { useEffect } from 'react';
import WebFont from 'webfontloader';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NavRoutes from './pages/NavRoutes';
import Navbar from './components/Header';

export default function App() {
  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = () => {
    WebFont.load({
      google: {
        families: ['Varela Round', 'Nunito'],
      },
    });
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/*' element={<NavRoutes />}></Route>
      </Routes>
    </>
  );
}
