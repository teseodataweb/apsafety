import React, { useState } from 'react';
import './tienda.css';
import TiendaImg1 from '../../img/descarga.png'; 
import TiendaImg2 from '../../img/descarga (1).png';       

const ServiceSection = () => {
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

  const textBoxBaseStyle = {
    backgroundColor: '#2e9e3b',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    display: 'inline-block',
    marginTop: '1rem',
    transition: 'background-color 0.3s ease',
  };

  const getStyle = (isHovering) => ({
    ...textBoxBaseStyle,
    backgroundColor: isHovering ? '#36C848' : '#2e9e3b',
  });

  const imageStyle = {
    width: '100%',
    maxWidth: '300px',
    height: 'auto',
    objectFit: 'contain',
  };

  return (
    <section className="tienda-section section-padding">
      <div className="container text-center">
        <div className="section-title">
          <h2>Compra tus equipos de protección directo del fabricante</h2>
          <p className="section-description">
            Conoce nuestra tienda virtual y accede a productos disponibles con entrega inmediata.
          </p>
        </div>

        <div
          className="tienda-cards"
          style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <a
            href="https://www.aptienda.com.mx/"
            target="_blank"
            rel="noopener noreferrer"
            className="tienda-card"
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
            style={{ textDecoration: 'none', textAlign: 'center' }}
          >
            <img src={TiendaImg1} alt="Tienda Virtual" style={imageStyle} />
            <p style={getStyle(hover1)}>Tienda en línea</p>
          </a>

          <a
            href="https://www.mercadolibre.com.mx/perfil/APMASCARILLAS+OFICIAL?fbclid=IwAR2hu9dgcJa2GOmiVoaPKfybEdcNC4smPX9R40wYQk3vml6OO4g9XxJbWGI"
            target="_blank"
            rel="noopener noreferrer"
            className="tienda-card"
            onMouseEnter={() => setHover2(true)}
            onMouseLeave={() => setHover2(false)}
            style={{ textDecoration: 'none', textAlign: 'center' }}
          >
            <img src={TiendaImg2} alt="Amazon" style={imageStyle} />
            <p style={getStyle(hover2)}>Compra en Amazon</p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
