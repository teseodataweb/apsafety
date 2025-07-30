import React from "react";
import { Link } from "react-router-dom";

const ClickHandler = () => {
  window.scrollTo(10, 0);
};

const testimonios = [
  {
    texto: `"Desde que trabajo con AP SAFETY, he podido ofrecer mejores productos a mis clientes. La calidad hace que regresen."`,
    autor: "— Juan Pérez, Distribuidor en Monterrey",
  },
  {
    texto: `"Nos han apoyado con material promocional útil y respuestas rápidas. Eso ha marcado la diferencia en nuestras ventas."`,
    autor: "— Laura Martínez, Distribuidora en Guadalajara",
  },
  {
    texto: `"Con AP SAFETY tenemos productos confiables. Eso nos permite enfocarnos en atender bien al cliente sin estar resolviendo fallas."`,
    autor: "— Roberto López, Distribuidor en CDMX",
  },
];

const ServiceSectionS2 = () => {
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
              className="green-button"
            >
              → Ver más testimonios
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceSectionS2;
