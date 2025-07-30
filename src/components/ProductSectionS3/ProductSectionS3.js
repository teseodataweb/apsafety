import React from 'react';
import { Link } from 'react-router-dom';
import 'swiper/swiper-bundle.min.css';

const ProductSectionS3 = ({ products }) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <>
      <style>{`
        .green-button {
          background-color: #2e9e3b;
          color: #fff !important; /* Forzar texto blanco */
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
          color: #fff !important; /* Forzar texto blanco en hover */
        }
      `}</style>

      <section
        className="shop-section bg-cover section-padding"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '4rem 1rem',
          color: '#000',
          backgroundColor: '#fff',
        }}
      >
        <div className="container">
          <div className="section-title text-center" style={{ marginBottom: '3rem' }}>
            <h6 className="wow fadeInUp" style={{ fontSize: '1.1rem', color: '#fff' }}>
              Proceso para Convertirse en Distribuidor
            </h6>
            <h2
              className="wow fadeInUp"
              data-wow-delay=".3s"
              style={{ fontWeight: '700', color: '#000' }}
            >
              ¿Cómo unirte a nuestra red de distribuidores?
            </h2>
          </div>

          <div
            className="seccion-pasos text-center"
            style={{ maxWidth: '700px', margin: '0 auto' }}
          >
            <h4 className="wow fadeInUp" data-wow-delay=".3s" style={{ marginBottom: '2rem' }}>
              Pasos
            </h4>
            <ul
              className="about-list wow fadeInUp"
              style={{
                listStyle: 'none',
                padding: 0,
                textAlign: 'left',
                color: '#000',
                fontSize: '1.1rem',
                lineHeight: '1.8',
              }}
            >
              <li>
                <i
                  className="fa-solid fa-check"
                  style={{ color: '#00cc66', marginRight: '0.5rem' }}
                ></i>
                Completa el formulario de solicitud en nuestra página de contacto.
              </li>
              <li>
                <i
                  className="fa-solid fa-check"
                  style={{ color: '#00cc66', marginRight: '0.5rem' }}
                ></i>
                Nuestro equipo evaluará tu solicitud y se pondrá en contacto contigo.
              </li>
              <li>
                <i
                  className="fa-solid fa-check"
                  style={{ color: '#00cc66', marginRight: '0.5rem' }}
                ></i>
                Recibirás capacitación y materiales necesarios para comenzar.
              </li>
            </ul>
          </div>

          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link
              onClick={ClickHandler}
              to="/contact"
              className="green-button"
            >
              → Ir al formulario de solicitud
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductSectionS3;
