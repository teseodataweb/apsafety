import React from 'react';
import { Link } from 'react-router-dom';
import './tienda.css';
import TiendaImg1 from '../../img/descarga.png'; 
import TiendaImg2 from '../../img/descarga (1).png';       
const ServiceSection= () => {
    return (
        <section className="tienda-section section-padding">
            <div className="container text-center">
                <div className="section-title">
                    <h2>Compra tus equipos de protección directo del fabricante</h2>
                    <p className="section-description">
                        Conoce nuestra tienda virtual y accede a productos disponibles con entrega inmediata.
                    </p>
                </div>

                <div className="tienda-cards">
                    <a
                        href="https://www.aptienda.com.mx/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tienda-card"
                    >
                        <img src={TiendaImg1} alt="Tienda Virtual" />
                        <p>Tienda Virtual</p>
                    </a>

                    <a
                        href="https://www.mercadolibre.com.mx/perfil/APMASCARILLAS+OFICIAL?fbclid=IwAR2hu9dgcJa2GOmiVoaPKfybEdcNC4smPX9R40wYQk3vml6OO4g9XxJbWGI"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tienda-card"
                    >
                        <img src={TiendaImg2} alt="Amazon" />
                        <p>Compra en Amazon</p>
                    </a>
                </div>
            </div>
        </section>

    );
}

export default ServiceSection;
