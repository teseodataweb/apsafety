import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
                                            <li className="has-dropdown active menu-thumb">
                                                <Link onClick={ClickHandler} to="/home">
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
                                            <li className="has-dropdown active d-xl-none">
                                                <Link onClick={ClickHandler} to="/team" className="border-none">
                                                    Inicio
                                                </Link>
                                                <ul className="submenu">
                                                    <li><Link onClick={ClickHandler} to="/home">Inicio</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/home-2">Inicio 2</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/home-3">Inicio 3</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link onClick={ClickHandler} to="/about">Nosotros</Link>
                                                <ul className="submenu">
                                                    <li><Link onClick={ClickHandler} to="/service">Nosotros</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/service-details/Sticker-printing">Distribuidores</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/service-details/Sticker-printing">Laboratorio</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link onClick={ClickHandler} to="/productos">
                                                    Productos
                                                </Link>
                                            </li>
                                            <li>
                                                <Link onClick={ClickHandler} to="#">
                                                    Contenido
                                                </Link>
                                                <ul className="submenu">
                                                    <li><Link onClick={ClickHandler} to="/news">Videos</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/blog-single/How-To-Teach-Kids-Ramadan-Isn’t-About-Food">Noticias</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/blog-single/How-To-Teach-Kids-Ramadan-Isn’t-About-Food">Blog AP</Link></li>
                                                </ul>
                                            </li>
                                            <li className="has-dropdown">
                                                <Link onClick={ClickHandler} to="#">Atención al cliente</Link>
                                                <ul className="submenu">
                                                    <li><Link onClick={ClickHandler} to="/contacto">Contacto</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/asesoria-tecnica">Asesoría Técnica</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/shop-details/Calendar-printing-design">Información Técnica</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/quejas">Quejas</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link onClick={ClickHandler} to="/admin">
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
                                        style={{backgroundColor: '#4CAF50', border: 'none', cursor: 'pointer'}}
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