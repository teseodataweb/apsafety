import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './portfolio.css';

const PortfolioSection = () => {
    return (
        <section className="portfolio-section section-padding pt-0">
            <div className="portfolio-content">
                <div className="catalogo-cta mt-4 wow fadeInUp" data-wow-delay=".5s">
                    <h3>¿Necesitas la ficha técnica o precios al por mayor?</h3>
                    <p>Descarga nuestro catálogo completo en PDF con especificaciones, normativas y tiempos de entrega.</p>
                    <a href="https://drive.google.com/file/d/1uj61CFRqrfQ6_exclcC-5YRTuQ6LBdOv/view?usp=sharing" className="theme-btn" download>
                    Descargar catálogo
                    </a>
                </div>
            </div>

        </section>
    );
};

export default PortfolioSection;
