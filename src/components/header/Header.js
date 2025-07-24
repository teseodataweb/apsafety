import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from "react-redux";
import { removeFromCart } from "../../store/actions/action";
import Logo from '../../img/apsafetylogo.png';
import auth from '../login/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Header = (props) => {
    const SubmitHandler = (e) => {
        e.preventDefault();
    }

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    const { carts } = props;
    const [isSticky, setIsSticky] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    // Verificar estado de autenticación
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, []);

    // Efecto para el scroll sticky
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

    // Función para determinar si el enlace está activo
    const isActive = (path) => {
        return location.pathname === path;
    }

    // No mostrar el botón si está logueado o en la página de login
    const shouldShowLoginButton = !isLoggedIn && location.pathname !== '/login';

    return (
        <header className={props.hclass}>
            <div id="header-sticky" className={isSticky ? 'sticky' : 'header-1'}>
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
                                                <Link 
                                                    onClick={ClickHandler} 
                                                    to="/home"
                                                    style={{ color: isActive('/home') ? '#02871c' : '' }}
                                                >
                                                    Inicio
                                                </Link>
                                            </li>
                                            <li className="has-dropdown active d-xl-none">
                                                <Link 
                                                    onClick={ClickHandler} 
                                                    to="/team" 
                                                    className="border-none"
                                                    style={{ color: isActive('/team') ? '#02871c' : '' }}
                                                >
                                                    Inicio
                                                </Link>
                                                <ul className="submenu">
                                                    <li><Link onClick={ClickHandler} to="/home" style={{ color: isActive('/home') ? '#02871c' : '' }}>Inicio</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/home-2" style={{ color: isActive('/home-2') ? '#02871c' : '' }}>Inicio 2</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/home-3" style={{ color: isActive('/home-3') ? '#02871c' : '' }}>Inicio 3</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link 
                                                    onClick={ClickHandler} 
                                                    to="/about"
                                                    style={{ color: isActive('/about') ? '#02871c' : '' }}
                                                >
                                                    Nosotros
                                                </Link>
                                                <ul className="submenu">
                                                    <li><Link onClick={ClickHandler} to="/service" style={{ color: isActive('/service') ? '#02871c' : '' }}>Nosotros</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/home-2" style={{ color: isActive('/home-2') ? '#02871c' : '' }}>Distribuidores</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/service-details/Sticker-printing" style={{ color: isActive('/service-details/Sticker-printing') ? '#02871c' : '' }}>Laboratorio</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link 
                                                    onClick={ClickHandler} 
                                                    to={isLoggedIn ? "/productos" : "/productosusers"}
                                                    style={{ 
                                                        color: isActive('/productos') || isActive('/productosusers') ? '#02871c' : '' 
                                                    }}
                                                >
                                                    Productos
                                                </Link>
                                            </li>
                                            <li>
                                                <Link 
                                                    onClick={ClickHandler} 
                                                    to="#"
                                                    style={{ 
                                                        color: location.pathname.startsWith('/checkout') || 
                                                               location.pathname.startsWith('/blog-single') || 
                                                               location.pathname.startsWith('/blog') ? '#02871c' : '' 
                                                    }}
                                                >
                                                    Contenido
                                                </Link>
                                                <ul className="submenu">
                                                    <li><Link onClick={ClickHandler} to="/checkout" style={{ color: isActive('/checkout') ? '#02871c' : '' }}>Videos</Link></li> 
                                                    <li><Link onClick={ClickHandler} to="/blog-single/How-To-Teach-Kids-Ramadan-Isn't-About-Food" style={{ color: location.pathname.startsWith('/blog-single') ? '#02871c' : '' }}>Noticias</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/blog-single/How-To-Teach-Kids-Ramadan-Isn't-About-Food" style={{ color: location.pathname.startsWith('/blog-single') ? '#02871c' : '' }}>Blog AP</Link></li>
                                                </ul>
                                            </li>
                                            <li className="has-dropdown">
                                                <Link 
                                                    onClick={ClickHandler} 
                                                    to="#"
                                                    style={{ 
                                                        color: location.pathname.startsWith('/contacto') || 
                                                               location.pathname.startsWith('/asesoria-tecnica') || 
                                                               location.pathname.startsWith('/shop-details') || 
                                                               location.pathname.startsWith('/quejas') ? '#02871c' : '' 
                                                    }}
                                                >
                                                    Atención al cliente
                                                </Link>
                                                <ul className="submenu">
                                                    <li><Link onClick={ClickHandler} to="/contacto" style={{ color: isActive('/contacto') ? '#02871c' : '' }}>Contacto</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/asesoria-tecnica" style={{ color: isActive('/asesoria-tecnica') ? '#02871c' : '' }}>Asesoría Técnica</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/shop-details/Calendar-printing-design" style={{ color: isActive('/shop-details/Calendar-printing-design') ? '#02871c' : '' }}>Información Técnica</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/quejas" style={{ color: isActive('/quejas') ? '#02871c' : '' }}>Quejas</Link></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="header-right d-flex justify-content-end align-items-center">
                                {shouldShowLoginButton && (
                                    <Link to="/login" className="theme-btn" style={{
                                        backgroundColor: '#02871c', 
                                        color: '#fff',
                                        borderRadius: '4px',
                                        padding: '15px 20px',
                                        height: '50px',
                                        textDecoration: 'none'
                                    }}>
                                        Iniciar Sesión
                                    </Link>
                                )}
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        carts: state.cartList.cart,
    };
};

export default connect(mapStateToProps, { removeFromCart })(Header);