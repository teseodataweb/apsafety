import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from "react-redux";
import { removeFromCart } from "../../store/actions/action";
import Logo from '../../img/apsafetylogo.png';
import auth from '../login/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';
import { FaBars, FaTimes, FaUser, FaChevronDown, FaChevronUp } from 'react-icons/fa';

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 250) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            setActiveSubmenu(null); 
        }
    }, [isMobileMenuOpen]);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setActiveSubmenu(null);
    }, [location]);

    const toggleSubmenu = (index) => {
        setActiveSubmenu(activeSubmenu === index ? null : index);
    };

    const isActive = (path) => location.pathname === path;
    const shouldShowLoginButton = !isLoggedIn && location.pathname !== '/login';

    return (
        <>
            <div 
                className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <header className="header">
                <div id="header-sticky" className={isSticky ? 'sticky' : ''}>
                    <div className="container">
                        <div className="header-content">
                            <div className="logo">
                                <Link to="/" onClick={ClickHandler}>
                                    <img src={Logo} alt="logo" width={80} />
                                </Link>
                            </div>

                            <div className={`main-navigation ${isMobileMenuOpen ? 'active' : ''}`}>
                                <ul className="menu">
                                    <li>
                                        <Link 
                                            to="/home" 
                                            className={isActive('/home') ? 'active' : ''}
                                            onClick={ClickHandler}
                                        >
                                            Inicio
                                        </Link>
                                    </li>
                                    <li className={`menu-item-has-children ${activeSubmenu === 0 ? 'active' : ''}`}>
                                        <div className="submenu-trigger" onClick={() => toggleSubmenu(0)}>
                                            <span>Nosotros</span>
                                            {activeSubmenu === 0 ? <FaChevronUp className="submenu-icon" /> : <FaChevronDown className="submenu-icon" />}
                                        </div>
                                        <ul className="sub-menu">
                                            <li>
                                                <Link 
                                                    to="/service" 
                                                    className={isActive('/service') ? 'active' : ''}
                                                    onClick={ClickHandler}
                                                >
                                                    Nosotros
                                                </Link>
                                            </li>
                                            <li>
                                                <Link 
                                                    to="/home-2" 
                                                    className={isActive('/home-2') ? 'active' : ''}
                                                    onClick={ClickHandler}
                                                >
                                                    Distribuidores
                                                </Link>
                                            </li>
                                            <li>
                                                <Link 
                                                    to="/service-details/Sticker-printing" 
                                                    className={isActive('/service-details/Sticker-printing') ? 'active' : ''}
                                                    onClick={ClickHandler}
                                                >
                                                    Laboratorio
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <Link 
                                            to={isLoggedIn ? "/productos" : "/productosusers"} 
                                            className={isActive('/productos') || isActive('/productosusers') ? 'active' : ''}
                                            onClick={ClickHandler}
                                        >
                                            Productos
                                        </Link>
                                    </li>
                                    <li className={`menu-item-has-children ${activeSubmenu === 1 ? 'active' : ''}`}>
                                        <div className="submenu-trigger" onClick={() => toggleSubmenu(1)}>
                                            <span>Contenido</span>
                                            {activeSubmenu === 1 ? <FaChevronUp className="submenu-icon" /> : <FaChevronDown className="submenu-icon" />}
                                        </div>
                                        <ul className="sub-menu">
                                            <li>
                                                <Link to="/checkout" onClick={ClickHandler}>Videos</Link>
                                            </li>
                                            <li>
                                                <Link to="#" onClick={ClickHandler}>Blog AP</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={`menu-item-has-children ${activeSubmenu === 2 ? 'active' : ''}`}>
                                        <div className="submenu-trigger" onClick={() => toggleSubmenu(2)}>
                                            <span>Atención al cliente</span>
                                            {activeSubmenu === 2 ? <FaChevronUp className="submenu-icon" /> : <FaChevronDown className="submenu-icon" />}
                                        </div>
                                        <ul className="sub-menu">
                                            <li>
                                                <Link 
                                                    to="/contacto" 
                                                    className={isActive('/contacto') ? 'active' : ''}
                                                    onClick={ClickHandler}
                                                >
                                                    Contacto
                                                </Link>
                                            </li>
                                            <li>
                                                <Link 
                                                    to="/asesoria-tecnica" 
                                                    className={isActive('/asesoria-tecnica') ? 'active' : ''}
                                                    onClick={ClickHandler}
                                                >
                                                    Asesoría Técnica
                                                </Link>
                                            </li>
                                            <li>
                                                <Link 
                                                    to="/shop-details/Calendar-printing-design" 
                                                    className={isActive('/shop-details/Calendar-printing-design') ? 'active' : ''}
                                                    onClick={ClickHandler}
                                                >
                                                    Información Técnica
                                                </Link>
                                            </li>
                                            <li>
                                                <Link 
                                                    to="/quejas" 
                                                    className={isActive('/quejas') ? 'active' : ''}
                                                    onClick={ClickHandler}
                                                >
                                                    Quejas
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>

                            <div className="header-actions">
                                {shouldShowLoginButton && (
                                    <Link to="/login" className="login-button">
                                        <FaUser className="icon" />
                                        <span>Iniciar Sesión</span>
                                    </Link>
                                )}
                                
                                <button 
                                    className="menu-toggle"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    aria-label="Toggle menu"
                                    aria-expanded={isMobileMenuOpen}
                                >
                                    {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <style jsx>{`
                /* Variables de diseño */
                :root {
                    --primary-color: #02871c;
                    --text-color: #000;
                    --bg-color: #fff;
                    --transition: all 0.3s ease;
                    --box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                    --border-radius: 4px;
                }

                /* Importar Montserrat */
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

                /* Estilos base */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                html, body {
                    width: 100%;
                    height: 100%;
                    overflow-x: hidden;
                }

                .header {
                    position: relative;
                    z-index: 1000;
                    width: 100%;
                }

                #header-sticky {
                    background-color: var(--bg-color);
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    transition: var(--transition);
                }

                #header-sticky.sticky {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    animation: slideDown 0.5s ease;
                    box-shadow: var(--box-shadow);
                    z-index: 1000;
                }

                .container {
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 15px;
                }

                .header-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 0;
                    position: relative;
                }

                .logo img {
                    transition: var(--transition);
                }

                .logo img:hover {
                    transform: scale(1.05);
                }

                /* Menú principal - Desktop */
                .main-navigation {
                    flex: 1;
                    margin: 0 30px;
                }

                .menu {
                    display: flex;
                    justify-content: center;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                .menu > li {
                    position: relative;
                    margin: 0 12px;
                }

                .menu > li > a {
                    color: var(--text-color);
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 16px;
                    padding: 10px 15px;
                    display: block;
                    transition: var(--transition);
                    position: relative;
                }

                .menu > li > a:hover,
                .menu > li > a.active {
                    color: var(--primary-color);
                }

                .menu > li > a.active:after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 15px;
                    right: 15px;
                    height: 2px;
                    background-color: var(--primary-color);
                }

                /* Submenús - Desktop */
                .sub-menu {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    background: var(--bg-color);
                    min-width: 220px;
                    box-shadow: var(--box-shadow);
                    border-radius: var(--border-radius);
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(10px);
                    transition: var(--transition);
                    z-index: 999;
                    padding: 10px 0;
                    list-style: none;
                }

                .menu-item-has-children:hover .sub-menu {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }

                .sub-menu li a {
                    padding: 10px 20px;
                    display: block;
                    color: var(--text-color);
                    text-decoration: none;
                    transition: var(--transition);
                }

                .sub-menu li a:hover {
                    color: var(--primary-color);
                    background: rgba(2, 135, 28, 0.05);
                }

                /* Botón de login */
                .login-button {
                    background-color: var(--primary-color);
                    color: #fff;
                    border-radius: var(--border-radius);
                    padding: 12px 20px;
                    text-decoration: none;
                    font-weight: 500;
                    display: flex;
                    align-items: center;
                    transition: var(--transition);
                    margin-right: 10px;
                }

                .login-button:hover {
                    background-color: #026a17;
                    transform: translateY(-2px);
                    color: #fff;
                    box-shadow: var(--box-shadow);
                }

                .login-button .icon {
                    margin-right: 8px;
                    font-size: 14px;
                }

                /* Header Actions */
                .header-actions {
                    display: flex;
                    align-items: center;
                }

                /* Menú móvil */
                .menu-toggle {
                    display: none;
                    background: none;
                    border: none;
                    font-size: 24px;
                    color: var(--text-color);
                    cursor: pointer;
                    padding: 10px;
                    z-index: 1001;
                }

                .mobile-menu-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 998;
                    opacity: 0;
                    visibility: hidden;
                    transition: var(--transition);
                }

                .mobile-menu-overlay.active {
                    opacity: 1;
                    visibility: visible;
                }

                /* Submenu triggers para móvil */
                .submenu-trigger {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                    padding: 15px 0;
                    color: var(--text-color);
                }

                .submenu-trigger span {
                    pointer-events: none;
                }

                .submenu-icon {
                    margin-left: 8px;
                    font-size: 14px;
                    transition: var(--transition);
                }

                /* Responsive - Tablet y Mobile */
                @media (max-width: 991px) {
                    .menu-toggle {
                        display: block;
                    }

                    .main-navigation {
                        position: fixed;
                        top: 0;
                        right: -100%;
                        width: 320px;
                        height: 100vh;
                        background: var(--bg-color);
                        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
                        transition: right 0.3s ease;
                        z-index: 999;
                        margin: 0;
                        padding: 80px 20px 20px;
                        overflow-y: auto;
                    }

                    .main-navigation.active {
                        right: 0;
                    }

                    .menu {
                        flex-direction: column;
                        padding: 0;
                    }

                    .menu > li {
                        margin: 0;
                        border-bottom: 1px solid #eee;
                    }

                    .menu > li > a {
                        padding: 15px 0;
                        display: block;
                    }

                    .sub-menu {
                        position: static;
                        box-shadow: none;
                        opacity: 1;
                        visibility: visible;
                        transform: none;
                        max-height: 0;
                        overflow: hidden;
                        padding-left: 15px;
                        background: transparent;
                        width: 100%;
                        transition: max-height 0.3s ease;
                    }

                    .menu-item-has-children.active .sub-menu {
                        max-height: 500px;
                        padding: 0 0 10px 15px;
                    }

                    .login-button span {
                        display: none;
                    }

                    .login-button .icon {
                        margin-right: 0;
                        font-size: 18px;
                    }

                    .login-button {
                        padding: 10px 15px;
                        margin-right: 0;
                    }
                }

                @media (max-width: 767px) {
                    .header-actions {
                        gap: 5px;
                    }
                }

                @media (max-width: 480px) {
                    .main-navigation {
                        width: 280px;
                    }
                }

                /* Animaciones */
                @keyframes slideDown {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(0); }
                }
            `}</style>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        carts: state.cartList.cart,
    };
};

export default connect(mapStateToProps, { removeFromCart })(Header);