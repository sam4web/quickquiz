import { Link } from 'react-router-dom';
import logoImg from '../assets/img/logo.svg';

export default function Header({ type }) {
  // let homePage = type === 'home-page';
  // console.log(homePage);

  const toggleNavbar = () => {
    document.body.classList.toggle('active-nav');
  };

  return (
    <header className='header'>
      <div className='section-container'>
        <div className='logo-container noselect'>
          <img src={logoImg} alt='logo' />
        </div>

        <nav className='nav'>
          <ul className='nav-list'>
            <li className='nav-list-item nolink'>QuickQuiz</li>
            <li className='nav-list-item'>
              <Link to='/' className='nav-link'>
                Home
              </Link>
            </li>

            <li className='nav-toggle-btn' onClick={toggleNavbar}>
              <div className='bar'></div>
            </li>
          </ul>

          <nav className='side-nav'>
            <ul className='side-nav-list'>
              <li className='side-nav-list-item'>
                <Link to='/' className='side-nav-link'>
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        </nav>
      </div>
      {/* section-container */}
    </header>
  );
}
