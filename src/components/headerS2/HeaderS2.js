import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import { removeFromCart } from "../../store/actions/action";
import Logo from '../../img/apsafetylogo.png';
import { logout } from '../../services/authService';
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const HeaderS2 = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [isSticky, setIsSticky] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    const handleScroll = () => {
        setIsSticky(window.scrollY > 250);
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const checkIfMobile = () => {
        setIsMobile(window.innerWidth <= 991);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', checkIfMobile);
        checkIfMobile(); // Verificar al cargar
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            setActiveSubmenu(null);
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

    const toggleSubmenu = (index) => {
        setActiveSubmenu(activeSubmenu === index ? null : index);
    };

    const menuItems = [
        {
            title: 'Inicio',
            path: '/home',
            submenu: null
        },
        {
            title: 'Nosotros',
            path: '/about',
            submenu: [
                { title: 'Nosotros', path: '/service' },
                { title: 'Distribuidores', path: '/service-details/Sticker-printing' },
                { title: 'Laboratorio', path: '/service-details/Sticker-printing' }
            ]
        },
        {
            title: 'Productos',
            path: '/productos',
            submenu: null
        },
        {
            title: 'Contenido',
            path: '#',
            submenu: [
                { title: 'Videos', path: '/news' },
                { title: 'Noticias', path: '/blog-single/How-To-Teach-Kids-Ramadan-Isn\'t-About-Food' },
                { title: 'Blog AP', path: '/blog-single/How-To-Teach-Kids-Ramadan-Isn\'t-About-Food' }
            ]
        },
        {
            title: 'Atención al cliente',
            path: '#',
            submenu: [
                { title: 'Contacto', path: '/contacto' },
                { title: 'Asesoría Técnica', path: '/asesoria-tecnica' },
                { title: 'Información Técnica', path: '/shop-details/Calendar-printing-design' },
                { title: 'Quejas', path: '/quejas' }
            ]
        },
        {
            title: 'Administrar Usuarios',
            path: '/admin',
            submenu: null
        }
    ];

    return (
        <>
            {isMobileMenuOpen && (
                <div 
                    className="mobile-menu-overlay"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
            
            <header className="header">
                <div className={`header-container ${isSticky ? 'sticky' : ''}`}>
                    <div className="header-content">
                        <div className="logo">
                            <Link to="/">
                                <img src={Logo} alt="logo" width={80} />
                            </Link>
                        </div>

                        <nav className={`main-navigation ${isMobileMenuOpen ? 'active' : ''}`}>
                            <ul className="menu">
                                {menuItems.map((item, index) => (
                                    <li 
                                        key={index}
                                        className={`
                                            ${isActive(item.path) ? 'active' : ''}
                                            ${item.submenu ? 'has-submenu' : ''}
                                        `}
                                    >
                                        {item.submenu ? (
                                            <>
                                                <div className="menu-item-container">
                                                    <Link to={item.path}>{item.title}</Link>
                                                    {isMobile && (
                                                        <button 
                                                            className="submenu-toggle" 
                                                            onClick={() => toggleSubmenu(index)}
                                                            aria-label={`Toggle ${item.title} submenu`}
                                                        >
                                                            {activeSubmenu === index ? <FaChevronUp /> : <FaChevronDown />}
                                                        </button>
                                                    )}
                                                </div>
                                                <ul className={`sub-menu ${activeSubmenu === index ? 'active' : ''}`}>
                                                    {item.submenu.map((subItem, subIndex) => (
                                                        <li key={subIndex}>
                                                            <Link to={subItem.path}>{subItem.title}</Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        ) : (
                                            <Link to={item.path}>{item.title}</Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="header-actions">
                            <Link to="/formProducto" className="add-product-btn">
                                Agregar Producto
                            </Link>
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
                                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                            </button>
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

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .header {
                    position: relative;
                    z-index: 1000;
                    width: 100%;
                    font-family: 'Montserrat', sans-serif;
                }

                .header-container {
                    background-color: var(--bg-color);
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    transition: var(--transition);
                    width: 100%;
                }

                .header-container.sticky {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    animation: slideDown 0.5s ease;
                    box-shadow: var(--box-shadow);
                    z-index: 1000;
                }

                .header-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px;
                    max-width: 1200px;
                    margin: 0 auto;
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

                .menu > li > a,
                .menu > li > .menu-item-container > a {
                    color: var(--text-color);
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 16px;
                    padding: 10px 15px;
                    display: block;
                    transition: var(--transition);
                    position: relative;
                }

                .menu > li.active > a,
                .menu > li.active > .menu-item-container > a {
                    color: var(--primary-color);
                }

                .menu > li.active > a:after,
                .menu > li.active > .menu-item-container > a:after {
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

                .has-submenu:hover .sub-menu {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                    color: #fff;
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

                /* Botones */
                .add-product-btn,
                .logout-button {
                    background-color: var(--primary-color);
                    color: #fff;
                    border-radius: var(--border-radius);
                    padding: 10px 15px;
                    text-decoration: none;
                    font-weight: 500;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    transition: var(--transition);
                    border: none;
                    cursor: pointer;
                    font-size: 14px;
                    margin-left: 10px;
                }

                .logout-button:hover,
                .add-product-btn:hover {
                    background-color: #026a17;
                    transform: translateY(-2px);
                    box-shadow: var(--box-shadow);
                    color: #fff;

                }

                /* Header Actions */
                .header-actions {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                /* Menú móvil */
                .menu-toggle {
                    display: none;
                    background: none;
                    border: none;
                    color: var(--text-color);
                    cursor: pointer;
                    padding: 5px;
                    z-index: 1001;
                    font-size: 24px;
                }

                .mobile-menu-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 998;
                }

                .submenu-toggle {
                    background: none;
                    border: none;
                    color: var(--text-color);
                    cursor: pointer;
                    padding: 0 5px;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
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
                        width: 300px;
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
                    }

                    .menu > li {
                        margin: 0;
                        border-bottom: 1px solid #eee;
                    }

                    .menu > li > .menu-item-container {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 15px 0;
                    }

                    .menu > li > a,
                    .menu > li > .menu-item-container > a {
                        padding: 10px 0;
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
                    }

                    .sub-menu.active {
                        display: block;
                    }

                    .has-submenu:hover .sub-menu {
                        opacity: 1;
                        visibility: visible;
                        transform: none;
                    color: #fff;

                    }

                    .add-product-btn {
                        display: none;
                    }
                }

                @media (max-width: 767px) {
                    .header-actions {
                        gap: 5px;
                    }
                    
                    .logout-button {
                        padding: 8px 12px;
                        font-size: 12px;
                    }
                }

                @media (max-width: 480px) {
                    .main-navigation {
                        width: 280px;
                    }
                }

                @keyframes slideDown {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(0); }
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