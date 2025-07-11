import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import { removeFromCart } from "../../store/actions/action";
import Logo from '../../img/apsafetylogo.png';
const HeaderAdmin = (props) => {
    const SubmitHandler = (e) => {
        e.preventDefault()}
    const ClickHandler = () => {
        window.scrollTo(10, 0);}
    const { carts } = props;
    const [isSticky, setIsSticky] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 250) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }};
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };}, []);
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
                                                <Link onClick={ClickHandler} to="/home">
                                                    Inicio
                                                </Link>
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
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="header-right d-flex justify-content-end align-items-center">   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )}
const mapStateToProps = (state) => {
    return {
        carts: state.cartList.cart,
    };};
export default connect(mapStateToProps, { removeFromCart })(HeaderAdmin);