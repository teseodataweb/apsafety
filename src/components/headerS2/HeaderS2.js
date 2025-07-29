import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import { removeFromCart } from "../../store/actions/action";
import Logo from '../../img/apsafetylogo.png';
import Home1 from '../../img/header/home-1.jpg';
import Home2 from '../../img/header/home-2.jpg';
import Home3 from '../../img/header/home-3.jpg';
import { logout } from '../../services/authService';
import { FaBars, FaTimes } from 'react-icons/fa';

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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    }, [isMobileMenuOpen]);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const isActive = (path) => {
        return location.pathname === path || 
               (path === '/home' && location.pathname === '/') ||
               (path === '/home' && location.pathname.startsWith('/home'));
    };

    return (
        <>
            {/* Overlay para el menú móvil */}
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

                            {/* Menú principal */}
                            <div className={`main-navigation ${isMobileMenuOpen ? 'active' : ''}`}>
                                <ul className="menu">
                                    <li className={`menu-item-has-children ${isActive('/home') ? 'active' : ''}`}>
                                        <Link to="/home" onClick={ClickHandler}>
                                            Inicio
                                        </Link>
                                        <ul className="sub-menu has-homemenu">
                                            <li>
                                                <div className="homemenu-items">
                                                    <div className="homemenu">
                                                        <div className="homemenu-thumb">
                                                            <img src={Home1} alt="Inicio 1" />
                                                            <div className="demo-button">
                                                                <Link to="/home" onClick={ClickHandler} className="theme-btn">
                                                                    Demo Page
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="homemenu-content text-center">
                                                            <h4 className="homemenu-title">Inicio 01</h4>
                                                        </div>
                                                    </div>
                                                    <div className="homemenu">
                                                        <div className="homemenu-thumb">
                                                            <img src={Home2} alt="Inicio 2" />
                                                            <div className="demo-button">
                                                                <Link to="/home-2" onClick={ClickHandler} className="theme-btn">
                                                                    Demo Page
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="homemenu-content text-center">
                                                            <h4 className="homemenu-title">Inicio 02</h4>
                                                        </div>
                                                    </div>
                                                    <div className="homemenu">
                                                        <div className="homemenu-thumb">
                                                            <img src={Home3} alt="Inicio 3" />
                                                            <div className="demo-button">
                                                                <Link to="/home-3" onClick={ClickHandler} className="theme-btn">
                                                                    Demo Page
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <div className="homemenu-content text-center">
                                                            <h4 className="homemenu-title">Inicio 03</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={`menu-item-has-children ${isActive('/about') || isActive('/service') || isActive('/service-details/Sticker-printing') ? 'active' : ''}`}>
                                        <Link to="/about" onClick={ClickHandler}>
                                            Nosotros
                                        </Link>
                                        <ul className="sub-menu">
                                            <li><Link to="/service" onClick={ClickHandler}>Nosotros</Link></li>
                                            <li><Link to="/service-details/Sticker-printing" onClick={ClickHandler}>Distribuidores</Link></li>
                                            <li><Link to="/service-details/Sticker-printing" onClick={ClickHandler}>Laboratorio</Link></li>
                                        </ul>
                                    </li>
                                    <li className={isActive('/productos') ? 'active' : ''}>
                                        <Link to="/productos" onClick={ClickHandler}>
                                            Productos
                                        </Link>
                                    </li>
                                    <li className={`menu-item-has-children ${isActive('/news') || isActive('/blog-single/How-To-Teach-Kids-Ramadan-Isn’t-About-Food') ? 'active' : ''}`}>
                                        <Link to="#" onClick={ClickHandler}>
                                            Contenido
                                        </Link>
                                        <ul className="sub-menu">
                                            <li><Link to="/news" onClick={ClickHandler}>Videos</Link></li>
                                            <li><Link to="/blog-single/How-To-Teach-Kids-Ramadan-Isn’t-About-Food" onClick={ClickHandler}>Noticias</Link></li>
                                            <li><Link to="/blog-single/How-To-Teach-Kids-Ramadan-Isn’t-About-Food" onClick={ClickHandler}>Blog AP</Link></li>
                                        </ul>
                                    </li>
                                    <li className={`menu-item-has-children ${isActive('/contacto') || isActive('/asesoria-tecnica') || isActive('/shop-details/Calendar-printing-design') || isActive('/quejas') ? 'active' : ''}`}>
                                        <Link to="#" onClick={ClickHandler}>
                                            Atención al cliente
                                        </Link>
                                        <ul className="sub-menu">
                                            <li><Link to="/contacto" onClick={ClickHandler}>Contacto</Link></li>
                                            <li><Link to="/asesoria-tecnica" onClick={ClickHandler}>Asesoría Técnica</Link></li>
                                            <li><Link to="/shop-details/Calendar-printing-design" onClick={ClickHandler}>Información Técnica</Link></li>
                                            <li><Link to="/quejas" onClick={ClickHandler}>Quejas</Link></li>
                                        </ul>
                                    </li>
                                    <li className={isActive('/admin') ? 'active' : ''}>
                                        <Link to="/admin" onClick={ClickHandler}>
                                            Administrar Usuarios
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="header-actions">
                                <Link to="/formProducto" onClick={ClickHandler} className="theme-btn">
                                    Agregar Producto
                                </Link>
                                <button 
                                    onClick={handleLogout} 
                                    className="theme-btn logout-button"
                                >
                                    Cerrar Sesión
                                </button>
                                <button 
                                    className="menu-toggle"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    aria-label="Toggle menu"
                                >
                                    {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <style jsx>{`
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
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                    font-family: 'Montserrat', sans-serif;
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

                .has-homemenu {
                    width: 900px;
                    left: 50%;
                    transform: translateX(-50%) translateY(10px);
                }

                .menu-item-has-children:hover .sub-menu {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }

                .has-homemenu.menu-item-has-children:hover .sub-menu {
                    transform: translateX(-50%) translateY(0);
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

                /* Home menu items */
                .homemenu-items {
                    display: flex;
                    justify-content: space-between;
                    padding: 15px;
                }

                .homemenu {
                    width: 30%;
                }

                .homemenu-thumb {
                    position: relative;
                    margin-bottom: 15px;
                    overflow: hidden;
                    border-radius: var(--border-radius);
                }

                .homemenu-thumb img {
                    width: 100%;
                    height: auto;
                    transition: var(--transition);
                }

                .homemenu-thumb:hover img {
                    transform: scale(1.05);
                }

                .demo-button {
                    position: absolute;
                    bottom: 20px;
                    left: 0;
                    right: 0;
                    text-align: center;
                }

                .homemenu-content {
                    padding: 10px 0;
                }

                .homemenu-title {
                    font-size: 16px;
                    font-weight: 500;
                    margin: 0;
                }

                /* Botón de login */
                .theme-btn {
                    background-color: var(--primary-color);
                    color: #fff;
                    border-radius: var(--border-radius);
                    padding: 12px 20px;
                    text-decoration: none;
                    font-weight: 500;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    transition: var(--transition);
                    border: none;
                    cursor: pointer;
                }

                .theme-btn:hover {
                    background-color: #026a17;
                    transform: translateY(-2px);
                    color: #fff;
                    box-shadow: var(--box-shadow);
                }

                .logout-button {
                    margin-left: 10px;
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
                        transition: var(--transition);
                        z-index: 1000;
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
                    }

                    .sub-menu {
                        position: static;
                        box-shadow: none;
                        opacity: 1;
                        visibility: visible;
                        transform: none;
                        display: none;
                        padding-left: 20px;
                        background: transparent;
                        width: 100%;
                        animation: none;
                    }

                    .has-homemenu {
                        width: 100%;
                        left: 0;
                        transform: none;
                    }

                    .homemenu-items {
                        flex-direction: column;
                    }

                    .homemenu {
                        width: 100%;
                        margin-bottom: 20px;
                    }

                    .menu-item-has-children.active .sub-menu {
                        display: block;
                    }

                    .theme-btn {
                        padding: 10px 15px;
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

            <style jsx global>{`
                body.menu-open {
                    overflow: hidden;
                }
            `}</style>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        carts: state.cartList.cart,
    };
};

export default connect(mapStateToProps, { removeFromCart })(HeaderS2);