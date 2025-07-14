import React from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import bannerDoc from '../../img/AP.Safetty.png'; // Asegúrate que la ruta es correcta

const Product = ({ item, addToCart }) => {
  return (
    <div className="row g-5 align-items-center" style={{ marginBottom: '3rem' }}>
      <div className="col-lg-6">
        <div className="product-image-items text-center">
          <Zoom>
            <img
              src={bannerDoc}
              alt="Información Técnica"
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            />
          </Zoom>
        </div>
      </div>

      <div className="col-lg-6">
        <div className="product-details-content">
          <h2 style={{ fontSize: '1.6rem', fontWeight: '600', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Consulta y descarga fichas técnicas, certificados, normativas y manuales para usar y validar 
            nuestros equipos de protección personal (EPP).
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.7' }}>
            Toda la información está organizada para facilitar la toma de decisiones técnicas y cumplir con 
            regulaciones nacionales e internacionales. Explora cada apartado para conocer la documentación que 
            respalda la calidad y cumplimiento de nuestros productos. Todo validado por nuestro laboratorio acreditado.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
