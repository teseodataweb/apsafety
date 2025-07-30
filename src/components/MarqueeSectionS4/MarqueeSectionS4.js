import React from 'react';
import { Link } from 'react-router-dom';

const MarqueeSectionS4 = () => {
  return (
    <>
      <style>{`
        .green-button {
          background-color: #2e9e3b;
          color: #fff !important;
          padding: 0.75rem 1.5rem;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 12px;
          text-decoration: none;
          display: inline-block;
          transition: background-color 0.3s ease;
        }

        .green-button:hover {
          background-color: #36C848;
          color: #fff !important;
        }
      `}</style>

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
            className="green-button"
          >
            → Contactar al equipo de distribución
          </Link>
        </div>
      </section>
    </>
  );
};

export default MarqueeSectionS4;
