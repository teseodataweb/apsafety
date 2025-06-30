import React from 'react';

import Feature1 from '../../img/feature/descarga (1).png';
import Feature2 from '../../img/feature/descarga (2).png';
import Feature3 from '../../img/feature/descarga.png';

const FeatureSection = () => {
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
        {[Feature1, Feature2, Feature3].map((img, index) => (
          <div key={index} style={{ marginBottom: '30px' }}>
            <img
              src={img}
              alt={`feature${index + 1}`}
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
