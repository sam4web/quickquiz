import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Header';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import States from './States';

export default function NavRoutes() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='about' element={<About />} />
        <Route path='states' element={<States />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}
