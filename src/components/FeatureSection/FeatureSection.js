import React from 'react';

import Feature1 from '../../img/feature/descarga (1).png';
import Feature2 from '../../img/feature/descarga (2).png';
import Feature3 from '../../img/feature/descarga.png';

const FeatureSection = () => {
  const images = [
    {
      src: Feature1,
      alt: 'Persona utilizando equipos de protección personal de AP SAFETY',
    },
    {
      src: Feature2,
      alt: 'Fachada de tienda de AP SAFETY con productos de seguridad de AP SAFETY',
    },
    {
      src: Feature3,
      alt: 'Carrito de compras con el logotipo de AP SAFETY y mensaje de compra en línea',
    },
  ];

  return (
    <section
      style={{
        width: '100%',
        padding: '40px 0',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
      }}
    >
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        {images.map((img, index) => (
          <div key={index} style={{ marginBottom: '30px' }}>
            <img
              src={img.src}
              alt={img.alt}
              style={{
                width: '100%',
                maxWidth: '100%',
                height: 'auto',
                display: 'block',
                margin: '0 auto',
                borderRadius: '12px',
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
