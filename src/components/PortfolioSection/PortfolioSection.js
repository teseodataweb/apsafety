import React from 'react';
import './portfolio.css';

const PortfolioSection = () => {
    const greenButtonStyle = {
        backgroundColor: '#2e9e3b',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        display: 'inline-block',
        transition: 'all 0.3s ease',
        marginTop: '1rem',
    };

    const handleHover = (e, isHovering) => {
        e.currentTarget.style.backgroundColor = isHovering ? '#36C848' : '#2e9e3b';
    };

    return (
        <section className="portfolio-section section-padding pt-0">
            <div className="portfolio-content">
                <div className="catalogo-cta mt-4 wow fadeInUp" data-wow-delay=".5s">
                    <h3>¿Necesitas la ficha técnica o precios al por mayor?</h3>
                    <p>Descarga nuestro catálogo completo en PDF con especificaciones, normativas y tiempos de entrega.</p>
                    <a
                        href="https://drive.google.com/file/d/1uj61CFRqrfQ6_exclcC-5YRTuQ6LBdOv/view?usp=sharing"
                        download
                        style={greenButtonStyle}
                        onMouseOver={(e) => handleHover(e, true)}
                        onMouseOut={(e) => handleHover(e, false)}
                    >
                        Descargar catálogo
                    </a>
                </div>
            </div>
        </section>
    );
};

export default PortfolioSection;
