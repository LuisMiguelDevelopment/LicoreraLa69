


import { useEffect } from 'react'
import './Header.css';
import logo from './img/logo.png';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import { TbLockCog } from "react-icons/tb";

const Header = () => {


  useEffect(() => {


    const menus = document.querySelector(".menu");
    const navLinks = document.querySelector(".navbar__enlaces");

    if (menus && navLinks) {
      const burgerMenu = () => {
        navLinks.classList.toggle('mobile-menu');
      };
      menus.addEventListener('click', burgerMenu);
      return () => {
        menus.removeEventListener('click', burgerMenu);
      };
    }


  }, []);



  return (
    <div>
      <div className="navbar">
        <a className="navbar__logo" href="/">
          <img className="navbar__logo navbar__logo--img" src={logo} alt="" />
        </a>
        <div className="navbar__enlaces">
          <ul className="navbar__ul">
            <li className="navbar__li">
              <NavLink to='/' className={({ isActive }) => isActive ? "text-red-600" : ""}><div className="navbar__a">INICIO</div></NavLink>
            </li>
            <li className="navbar__li">
              <NavLink to='/catalogo' className={({ isActive }) => isActive ? "text-red-600" : ""}><div className="navbar__a">CATALOGO</div></NavLink>
            </li>

            <li className="navbar__li">
              <NavLink to='/pedidos' className={({ isActive }) => isActive ? "text-red-600" : ""}><div className="navbar__a">PEDIDOS</div></NavLink>
            </li>
            <li className="navbar__li">
              <a className="navbar__a abrir"><CgProfile className='icons' /></a>
            </li>
            <li className="navbar__li">
              <div className="navbar__a"><div className="navbar__a abrirCarrito"><AiOutlineShoppingCart className='icons' /></div></div>
            </li>
            <li className="navbar__li">
              <NavLink to='/ListaProductos' className="navbar__a"><div className="navbar__a abrirCarrito"><TbLockCog className='icons' /></div></NavLink>
            </li>
          </ul>
        </div>
        <FaBars className="fa-solid fa-bars menu" />
      </div>



    </div>
  )
}

export default Header