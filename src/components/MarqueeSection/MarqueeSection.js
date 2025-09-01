import React from 'react';
import MS1 from '../../img/descarga1.png';

const MarqueeSection = (props) => {
  return (
    <div className={props.hclass || ''} style={{ width: '100%', padding: '40px 0', backgroundColor: '#fff' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          width: '90%',
        }}
      >
        <img
          src={MS1}
          alt="Logotipo de AP SAFETY en sección de marcas asociadas"
          style={{
            maxWidth: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>
    </div>
  );
};

export default MarqueeSection;
