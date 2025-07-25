import React from 'react';
import { Link } from 'react-router-dom';

const MarqueeSectionS4 = () => {
  return (
    <section
      className="contacto-directo-section"
      style={{
        backgroundColor: '#f4f7fa',
        padding: '5rem 1.5rem',
        textAlign: 'center',
      }}
    >
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#2c3e50' }}>
          ¿Tienes preguntas? Estamos para ayudarte
        </h2>
        <p style={{ fontSize: '1.125rem', color: '#555', marginBottom: '2.5rem' }}>
          Si deseas más información sobre cómo convertirte en distribuidor o tienes alguna duda,
          no dudes en contactarnos.
        </p>
        <Link
          to="/contacto"
          className="theme-btn"
          style={{
            backgroundColor: '#000',
            color: 'white',
            padding: '0.75rem 1.5rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            borderRadius: '4px',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            display: 'inline-block',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#222')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#000')}
        >
          → Contactar al equipo de distribución
        </Link>
      </div>
    </section>
  );
};

export default MarqueeSectionS4;
