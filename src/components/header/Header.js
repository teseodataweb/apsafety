import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { removeFromCart } from "../../store/actions/action";
import HeaderTopbar from '../HeaderTopbar/HeaderTopbar';
import Logo from '../../img/apsafetylogo.png';
import Home1 from '../../img/header/home-1.jpg';
import Home2 from '../../img/header/home-2.jpg';
import Home3 from '../../img/header/home-3.jpg';
import SearchComponent from './search';

import MobileMenu from '../MobileMenu/MobileMenu';



const Header = (props) => {


    const SubmitHandler = (e) => {
        e.preventDefault()
    }

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

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
            {/* <HeaderTopbar /> */}
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
                                            {/* <li>
                                                <Link onClick={ClickHandler} to="#">
                                                    Services
                                                </Link>
                                                <ul className="submenu">
                                                    <li><Link onClick={ClickHandler} to="/service">Services</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/service-details/Sticker-printing">Service Details</Link></li>
                                                </ul>
                                            </li>
                                            <li className="has-dropdown">
                                                <Link onClick={ClickHandler} to="#">
                                                    Pages
                                                </Link>
                                                <ul className="submenu">
                                                    <li><Link onClick={ClickHandler} to="/project">Projects</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/project-details/3d-Genareted-Cate">Project Details</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/404">404 Page</Link></li>
                                                </ul>
                                            </li> */}
                                            <li>
                                                <Link onClick={ClickHandler} to="#">
                                                    Productos
                                                </Link>
                                                <ul className="submenu">
                                                    <li><Link onClick={ClickHandler} to="/shop">Productos</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/shop-details/Calendar-printing-design">Información Técnica</Link></li>
                                                    {/* <li><Link onClick={ClickHandler} to="/shop-cart">Shop Cart</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/checkout">Checkout</Link></li> */}
                                                </ul>
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


 {/* <li>
                                          <li>
                                                <Link onClick={ClickHandler} to="/Login">Acceder</Link>
                                            </li> 
                                            </li> */}
                                            <li className="has-dropdown">
                                                <Link onClick={ClickHandler} to="#">Atención al cliente</Link>
                                                <ul className="submenu">
                                                    <li><Link onClick={ClickHandler} to="/contacto">Contacto</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/asesoria-tecnica">Asesoría Técnica</Link></li>
                                                    <li><Link onClick={ClickHandler} to="/quejas">Quejas</Link></li>
                                                    </ul>
                                                    </li>

                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="header-right d-flex justify-content-end align-items-center">
                                <SearchComponent />
                                <h5 className="cart-title"><Link onClick={ClickHandler} to="/shop-cart">Cart <span className='cart-count'>{carts.length}</span></Link></h5>
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
    )
}
const mapStateToProps = (state) => {
    return {
        carts: state.cartList.cart,
    };
};


export default connect(mapStateToProps, { removeFromCart })(Header);









