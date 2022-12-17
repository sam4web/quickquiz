import { Link } from 'react-router-dom';
import logoImg from '../assets/img/logo.svg';
import $ from 'jquery';

import { AiFillHome, AiFillInfoCircle, AiFillPieChart } from 'react-icons/ai';

export default function Header({ type }) {
  let homePage = type === 'home-page';

  const openNavbar = () => {
    document.body.classList.add('active-nav');
  };

  const closeNavbar = () => {
    document.body.classList.remove('active-nav');
  };

  $('body').on('click', (event) => {
    if (!$(event.target).closest('.side-nav').length) {
      closeNavbar();
    }
  });

  $('.side-nav').on('click', (event) => {
    event.stopPropagation();
  });

  return (
    <header className={`header ${homePage ? 'home' : ''}`}>
      <div className='section-container'>
        {homePage ? <div></div> : ''}
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

            <li
              className='nav-toggle-btn'
              onClick={(e) => {
                openNavbar();
                e.stopPropagation();
              }}
            >
              <div className='bar'></div>
            </li>
          </ul>
        </nav>

        <nav className='side-nav'>
          <ul className='side-nav-list'>
            <li className='side-nav-list-item'>
              <Link to='/' className='side-nav-link'>
                Home
                <AiFillHome />
              </Link>
            </li>
            <li className='side-nav-list-item'>
              <Link to='/about' className='side-nav-link'>
                About
                <AiFillInfoCircle />
              </Link>
            </li>
            <li className='side-nav-list-item'>
              <Link to='/states' className='side-nav-link'>
                States
                <AiFillPieChart />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* section-container */}
    </header>
  );
}
