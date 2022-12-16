import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Header';
import Game from '../pages/Game';
import About from '../pages/About';
import NotFound from '../pages/NotFound';

export default function NavRoutes() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='game' element={<Game />} />
        <Route path='about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}
