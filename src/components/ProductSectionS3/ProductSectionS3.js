import React from 'react';
import { Link } from 'react-router-dom';
import 'swiper/swiper-bundle.min.css';


const ProductSectionS3 = ({ products }) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <section
      className="shop-section bg-cover section-padding"
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '4rem 1rem',
        color: '#000', 
        backgroundColor: '#fff', 
      }}>
      <div className="container">
        <div className="section-title text-center" style={{ marginBottom: '3rem' }}>
          <h6 className="wow fadeInUp" style={{ fontSize: '1.1rem', color: '#fff' }}>
            Proceso para Convertirse en Distribuidor
          </h6>
          <h2 className="wow fadeInUp" data-wow-delay=".3s" style={{ fontWeight: '700', color: '#000' }}>
            ¿Cómo unirte a nuestra red de distribuidores?
          </h2>
        </div>

        <div className="seccion-pasos text-center" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h4 className="wow fadeInUp" data-wow-delay=".3s" style={{ marginBottom: '2rem', color: '#000' }}>
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
            }}>
            <li>
              <i className="fa-solid fa-check" style={{ color: '#00cc66', marginRight: '0.5rem' }}></i>
              Completa el formulario de solicitud en nuestra página de contacto.
            </li>
            <li>
              <i className="fa-solid fa-check" style={{ color: '#00cc66', marginRight: '0.5rem' }}></i>
              Nuestro equipo evaluará tu solicitud y se pondrá en contacto contigo.
            </li>
            <li>
              <i className="fa-solid fa-check" style={{ color: '#00cc66', marginRight: '0.5rem' }}></i>
              Recibirás capacitación y materiales necesarios para comenzar.
            </li>
          </ul>
        </div>

        <div className="text-center" style={{ marginTop: '3rem' }}>
          <Link
            onClick={ClickHandler}
            to="/contact"
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
            }}>
            → Ir al formulario de solicitud
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductSectionS3;
