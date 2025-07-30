import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import { removeFromCart } from "../../store/actions/action";
import Logo from '../../img/apsafetylogo.png';
import { logout } from '../../services/authService';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';

const HeaderAdmin = (props) => {
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
    const [activeSubmenu, setActiveSubmenu] = useState(null);

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
        setActiveSubmenu(null);
    }, [location]);

    const toggleSubmenu = (index) => {
        setActiveSubmenu(activeSubmenu === index ? null : index);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <div 
                className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <header className={props.hclass}>
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
                                        <Link to="#" onClick={(e) => {
                                            e.preventDefault();
                                            toggleSubmenu(0);
                                        }}>Nosotros</Link>
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
                                            to="/productos" 
                                            className={isActive('/productos') ? 'active' : ''}
                                            onClick={ClickHandler}
                                        >
                                            Productos
                                        </Link>
                                    </li>
                                    <li className={`menu-item-has-children ${activeSubmenu === 1 ? 'active' : ''}`}>
                                        <Link to="#" onClick={(e) => {
                                            e.preventDefault();
                                            toggleSubmenu(1);
                                        }}>Contenido</Link>
                                        <ul className="sub-menu">
                                            <li>
                                                <Link to="/news" onClick={ClickHandler}>Videos</Link>
                                            </li>
                                            <li>
                                                <Link to="#" onClick={ClickHandler}>Blog AP</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={`menu-item-has-children ${activeSubmenu === 2 ? 'active' : ''}`}>
                                        <Link to="#" onClick={(e) => {
                                            e.preventDefault();
                                            toggleSubmenu(2);
                                        }}>Atención al cliente</Link>
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
                                <button 
                                    onClick={handleLogout} 
                                    className="logout-button"
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

                /* Botón de logout */
                .logout-button {
                    background-color: var(--primary-color);
                    color: #fff;
                    border: none;
                    border-radius: var(--border-radius);
                    padding: 12px 20px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: var(--transition);
                    margin-right: 10px;
                }

                .logout-button:hover {
                    background-color: #026a17;
                    transform: translateY(-2px);
                    color: #fff;
                    box-shadow: var(--box-shadow);
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
                    z-index: 999;
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
                        right: -320px;
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
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    .menu-item-has-children > a:after {
                        content: '+';
                        display: inline-block;
                        margin-left: 10px;
                        transition: var(--transition);
                    }

                    .menu-item-has-children.active > a:after {
                        content: '-';
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
                        margin-top: 10px;
                    }

                    .menu-item-has-children.active .sub-menu {
                        display: block;
                    }

                    .logout-button {
                        padding: 10px 15px;
                        margin-right: 0;
                    }
                }

                @media (max-width: 767px) {
                    .header-actions {
                        gap: 5px;
                    }
                    
                    .logout-button {
                        padding: 8px 12px;
                        font-size: 14px;
                    }
                }

                @media (max-width: 480px) {
                    .main-navigation {
                        width: 280px;
                    }
                    
                    .logo img {
                        width: 70px;
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
                    position: fixed;
                    width: 100%;
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

export default connect(mapStateToProps, { removeFromCart })(HeaderAdmin);