import React, { useContext, useRef, useEffect, useState } from 'react';
import { Container } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import './Header.css';

const NAV__LINKS = [
  { display: 'Home', url: '/home' },
  { display: 'Market', url: '/market' },
  { display: 'Create', url: '/create' },
  { display: 'Contact', url: '/contact' },
];

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeButton, setActiveButton] = useState('signIn');
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const handleScroll = () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      headerRef.current.classList.add('header__shrink');
    } else {
      headerRef.current.classList.remove('header__shrink');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle('active__menu');

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="navigation">
          <div className="logo">
            <h2 className="d-flex gap-2 align-items-center">
              <span>
                <i className="ri-fire-fill"></i>
              </span>
              NFTs
            </h2>
          </div>
          <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
            <ul className="nav__list">
              {NAV__LINKS.map((item, index) => (
                <li className="nav__item" key={index}>
                  <NavLink to={item.url} className={navClass => navClass.isActive ? "active" : ""}>
                    {item.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__right d-flex align-items-center gap-5">
            <Link to="/wallet">
              <button className={`btn d-flex gap-2 align-items-center ${activeButton === 'wallet' ? 'btn-primary' : 'bg-primary-subtle'}`} onClick={() => setActiveButton('wallet')}>
                <span>
                  <i className="ri-wallet-line"></i>
                </span>
                Connect Wallet
              </button>
            </Link>

            <span className="mobile__menu">
              <i className="ri-menu-line" onClick={toggleMenu}></i>
            </span>
          </div>

          <div className="nav__right align-items-center">
            {user ? (
              <>
                <Link to="/my-profile">
                  <i className="ri-user-line" style={{ fontSize: '1.5rem' }}></i>
                </Link>
                <Link to="/Home">
                  <button className="btn btn-danger ms-3" onClick={logout}>Logout</button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/sign-in" className="">
                  <button className={`btn ${activeButton === 'signIn' ? 'btn-primary' : 'bg-primary-subtle'} me-2`} onClick={() => setActiveButton('signIn')}>
                    Sign In
                  </button>
                </Link>
                <Link to="/sign-up" className="">
                  <button className={`btn ${activeButton === 'signUp' ? 'btn-primary' : 'bg-primary-subtle'}`} onClick={() => setActiveButton('signUp')}>
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
