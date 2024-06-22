import React, { useRef, useEffect, useState } from 'react';
import './Header.css';
import { Container } from "reactstrap";

import { NavLink, Link } from "react-router-dom";

const NAV__LINKS = [
  {
    display: 'Home',
    url: '/home'
  },
  {
    display: 'Market',
    url: '/market'
  },
  {
    display: 'Create',
    url: '/create'
  },
  {
    display: 'Contact',
    url: '/contact'
  },
];

const Header = () => {
  const [activeButton, setActiveButton] = useState('signIn');
  const headerRef = useRef(null)

  const menuRef = useRef(null)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('header__shrink')
      }
      else {
        headerRef.current.classList.remove('header__shrink')
      }
    })

    return () => {
      window.removeEventListener('scroll');
    }
  }, [])

  const toggleMenu = () => menuRef.current.classList.toggle('active__menu')
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="navigation">
          <div className="logo">
            <h2 className=' d-flex gap-2 align-items-center ' >
              <span>
                <i class="ri-fire-fill"></i>
              </span>
              NFTs
            </h2>
          </div>
          <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
            <ul className="nav__list">
              {NAV__LINKS.map((item, index) => (
                <li className="nav__item" key={index}>
                  <NavLink to={item.url} className={navClass => navClass.isActive ? "active" : ""} >{item.display}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav__right d-flex align-items-center gap-5 ">
            <Link to="/wallet">
              <button className={`btn d-flex gap-2 align-items-center ${activeButton === 'wallet' ? 'btn-primary ' : 'bg-primary-subtle'} `} onClick={() => setActiveButton('wallet')}>
                <span>
                  <i class="ri-wallet-line"></i>
                </span>

                Connect Wallet
              </button>
            </Link>

            <span className='mobile__menu'>
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>
          </div>
          <div className='nav__right align-items-center'>
            <Link to="/sign-in" className=''>
              <button className={`btn ${activeButton === 'signIn' ? 'btn-primary ' : 'bg-primary-subtle'} me-2`}
                onClick={() => setActiveButton('signIn')}>
                SignIn
              </button>
            </Link>
            <Link to="/sign-up" className=''>
              <button className={`btn ${activeButton === 'signUp' ? 'btn-primary' : 'bg-primary-subtle'}`}
                onClick={() => setActiveButton('signUp')}>
                SignUp
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;