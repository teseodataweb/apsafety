import React from 'react';
import mapaUbicacion from '../../img/about/descarga (3).png'; 

const ProjectSectionS2 = () => {
  const companyLocation = {
    name: "AP Mascarillas / Ironguy",
    address: "Calle Cerro Chimalpa Manzana 50 Lote 674, Lázaro Cárdenas 1ra Secc, 54189 Tlalnepantla, Méx.",
  };

  return (
    <section
      className="wpb-container"
      style={{ paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      <div className="container">
        <div className="section-title-area">
          <div className="section-title center">
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              Nuestra red de distribución en México
            </h2>
            <h5 className="wow fadeInUp" data-wow-delay=".4s">
              Contamos con distribuidores en diversas regiones del país, incluyendo Ciudad de México, Guadalajara, Monterrey, Veracruz y más.
            </h5>

            <div className="wow fadeInUp" data-wow-delay=".5s" style={{ marginTop: '30px' }}>
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '20px',
                borderRadius: '8px',
                marginBottom: '20px',
                borderLeft: '4px solid #3a78c9'
              }}>
                <h3 style={{ marginTop: '0', color: '#2c3e50' }}>{companyLocation.name}</h3>
                <p style={{ marginBottom: '0' }}>
                  <i className="fa fa-map-marker" style={{ marginRight: '8px', color: '#e74c3c' }}></i>
                  {companyLocation.address}
                </p>
              </div>

              <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                position: 'relative',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <img
                  src={mapaUbicacion}
                  alt="Mapa de ubicación AP Mascarillas"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSectionS2;
