import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { connect } from "react-redux";
import { removeFromCart } from "../../store/actions/action";
import Logo from '../../img/apsafetylogo.png';
import Home1 from '../../img/header/home-1.jpg';
import Home2 from '../../img/header/home-2.jpg';
import Home3 from '../../img/header/home-3.jpg';
import MobileMenu from '../MobileMenu/MobileMenu';
import { logout } from '../../services/authService';

const HeaderS2 = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const SubmitHandler = (e) => {
        e.preventDefault();
    }

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const { carts } = props;
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 250) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Función para verificar si la ruta está activa
    const isActive = (path) => {
        return location.pathname === path || 
               (path === '/home' && location.pathname === '/') ||
               (path === '/home' && location.pathname.startsWith('/home'));
    };

    return (
        <header className={props.hclass}>
            <div id="header-sticky" className={isSticky ? 'header-1 style-2 sticky' : 'header-1 style-2'}>
                <div className="container-fluid">
                    <div className="mega-menu-wrapper">
                        <div className="header-main">
                            <div className="header-left">
                                <div className="logo">
                                    <Link onClick={ClickHandler} to="/" className="header-logo">
                                        <img src={Logo} alt="logo-img" width={80} />
                                    </Link>
                                </div>
                            </div>
                            <div className="mean__menu-wrapper">
                                <div className="main-menu">
                                    <nav id="mobile-menu">
                                        <ul>
                                            <li className={`has-dropdown ${isActive('/home') ? 'active' : ''} menu-thumb`}>
                                                <Link onClick={ClickHandler} to="/home" style={isActive('/home') ? {color: 'green'} : {}}>
                                                    Inicio
                                                </Link>
                                                <ul className="submenu has-homemenu">
                                                    <li>
                                                        <div className="homemenu-items">
                                                            <div className="homemenu">
                                                                <div className="homemenu-thumb">
                                                                    <img src={Home1} alt="img" />
                                                                    <div className="demo-button">
                                                                        <Link onClick={ClickHandler} to="/home" className="theme-btn">
                                                                            Demo Page
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                                <div className="homemenu-content text-center">
                                                                    <h4 className="homemenu-title">
                                                                        Inicio 01
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                            <div className="homemenu">
                                                                <div className="homemenu-thumb mb-15">
                                                                    <img src={Home2} alt="img" />
                                                                    <div className="demo-button">
                                                                        <Link onClick={ClickHandler} to="/home-2" className="theme-btn">
                                                                            Demo Page
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                                <div className="homemenu-content text-center">
                                                                    <h4 className="homemenu-title">
                                                                        Home 02
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                            <div className="homemenu">
                                                                <div className="homemenu-thumb mb-15">
                                                                    <img src={Home3} alt="img" />
                                                                    <div className="demo-button">
                                                                        <Link onClick={ClickHandler} to="/home-3" className="theme-btn">
                                                                            Demo Page
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                                <div className="homemenu-content text-center">
                                                                    <h4 className="homemenu-title">
                                                                        Home 03
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li className={`has-dropdown ${isActive('/home') ? 'active' : ''} d-xl-none`}>
                                                <Link onClick={ClickHandler} to="/team" className="border-none" style={isActive('/home') ? {color: 'green'} : {}}>
                                                    Inicio
                                                </Link>
                                                <ul className="submenu">
                                                    <li><Link onClick={ClickHandler} to="/home">Inicio</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/home-2">Inicio 2</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/home-3">Inicio 3</Link></li>
                                                </ul>
                                            </li>
                                            <li className={isActive('/about') || isActive('/service') || isActive('/service-details/Sticker-printing') ? 'active' : ''}>
                                                <Link onClick={ClickHandler} to="/about" style={isActive('/about') || isActive('/service') || isActive('/service-details/Sticker-printing') ? {color: 'green'} : {}}>
                                                    Nosotros
                                                </Link>
                                                <ul className="submenu">
                                                    <li><Link onClick={ClickHandler} to="/service">Nosotros</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/service-details/Sticker-printing">Distribuidores</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/service-details/Sticker-printing">Laboratorio</Link></li>
                                                </ul>
                                            </li>
                                            <li className={isActive('/productos') ? 'active' : ''}>
                                                <Link onClick={ClickHandler} to="/productos" style={isActive('/productos') ? {color: 'green'} : {}}>
                                                    Productos
                                                </Link>
                                            </li>
                                            <li className={isActive('/news') || isActive('/blog-single/How-To-Teach-Kids-Ramadan-Isn’t-About-Food') ? 'active' : ''}>
                                                <Link onClick={ClickHandler} to="#" style={isActive('/news') || isActive('/blog-single/How-To-Teach-Kids-Ramadan-Isn’t-About-Food') ? {color: 'green'} : {}}>
                                                    Contenido
                                                </Link>
                                                <ul className="submenu">
                                                    <li><Link onClick={ClickHandler} to="/news">Videos</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/blog-single/How-To-Teach-Kids-Ramadan-Isn’t-About-Food">Noticias</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/blog-single/How-To-Teach-Kids-Ramadan-Isn’t-About-Food">Blog AP</Link></li>
                                                </ul>
                                            </li>
                                            <li className={`has-dropdown ${isActive('/contacto') || isActive('/asesoria-tecnica') || isActive('/shop-details/Calendar-printing-design') || isActive('/quejas') ? 'active' : ''}`}>
                                                <Link onClick={ClickHandler} to="#" style={isActive('/contacto') || isActive('/asesoria-tecnica') || isActive('/shop-details/Calendar-printing-design') || isActive('/quejas') ? {color: 'green'} : {}}>
                                                    Atención al cliente
                                                </Link>
                                                <ul className="submenu">
                                                    <li><Link onClick={ClickHandler} to="/contacto">Contacto</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/asesoria-tecnica">Asesoría Técnica</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/shop-details/Calendar-printing-design">Información Técnica</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/quejas">Quejas</Link></li>
                                                </ul>
                                            </li>
                                            <li className={isActive('/admin') ? 'active' : ''}>
                                                <Link onClick={ClickHandler} to="/admin" style={isActive('/admin') ? {color: 'green'} : {}}>
                                                    Administrar Usuarios
                                                </Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="header-right d-flex justify-content-end align-items-center">
                                <div className="header-button">
                                    <Link onClick={ClickHandler} to="/formProducto" className="theme-btn">Agregar Producto</Link>
                                </div>
                                <div className="header-button">
                                    <button 
                                        onClick={handleLogout} 
                                        className="theme-btn" 
                                        style={{backgroundColor: '#04871c', color: '#fff', border: 'none', cursor: 'pointer'}}
                                    >
                                        Cerrar Sesión
                                    </button>
                                </div>
                                <div className="header__hamburger d-xl-none my-auto">
                                    <div className="sidebar__toggle">
                                        <MobileMenu />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

const mapStateToProps = (state) => {
    return {
        carts: state.cartList.cart,
    };
};

export default connect(mapStateToProps, { removeFromCart })(HeaderS2);