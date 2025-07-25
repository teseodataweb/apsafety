import React from "react";
import { Link } from "react-router-dom";

const ClickHandler = () => {
  window.scrollTo(10, 0);
};

const testimonios = [
  {
    texto: `"Desde que me uní a AP SAFETY, he visto un crecimiento significativo en mi negocio gracias al respaldo y la calidad de sus productos."`,
    autor: "— Juan Pérez, Distribuidor en Monterrey",
  },
  {
    texto: `"La atención personalizada y el material promocional que recibimos nos han ayudado a destacar frente a la competencia."`,
    autor: "— Laura Martínez, Distribuidora en Guadalajara",
  },
  {
    texto: `"Con AP SAFETY no solo vendemos EPP, ofrecemos confianza y seguridad a nuestros clientes."`,
    autor: "— Roberto López, Distribuidor en CDMX",
  },
];

const ServiceSectionS2 = () => {
  return (
    <section
      className="service-section fix"
      style={{
        backgroundColor: '#f9f9f9',
        paddingTop: '6rem',
        paddingBottom: '6rem',
      }}
    >

      <div className="container">
        <div className="section-title text-center" style={{ marginBottom: '3rem' }}>
          <h2>Testimonios de Distribuidores</h2>
        </div>

        <div className="row">
          {testimonios.map((testimonio, index) => (
            <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
              <div
                className="service-card-items-2"
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  marginBottom: '2rem',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
                  height: '100%',
                }}
              >
                <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>{testimonio.texto}</p>
                <strong style={{ color: '#555', fontSize: '0.95rem' }}>{testimonio.autor}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: '4rem' }}>
          <Link
            onClick={ClickHandler}
            to="/checkout"
            className="theme-btn hover-white"
            style={{
              backgroundColor: '#000',
              color: '#fff',
              padding: '0.75rem 1.5rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              borderRadius: '4px',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.3s ease',
            }}
          >
            → Ver más testimonios
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceSectionS2;
