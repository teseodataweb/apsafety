import React from 'react';
import '../../css/corporate-colors.css';

const CertificationsSection = () => {
  const certifications = [
    {
      name: 'NOM-STPS',
      description: 'Normas Oficiales Mexicanas de Seguridad y Salud en el Trabajo',
      icon: 'NOM',
      color: 'var(--ap-green-dark)'
    },
    {
      name: 'ANSI Z87 / Z89',
      description: 'Estándares internacionales de seguridad industrial',
      icon: 'ANSI',
      color: 'var(--ap-green-medium)'
    },
    {
      name: 'ISO 11612',
      description: 'Normas internacionales de calidad y seguridad',
      icon: 'ISO',
      color: 'var(--ap-green-dark)'
    },
    {
      name: 'EMA (Laboratorio Acreditado)',
      description: 'Entidad Mexicana de Acreditación',
      icon: 'EMA',
      color: 'var(--ap-green-medium)'
    }
  ];

  return (
    <section className="section-ap-primary" style={{ 
      padding: '60px 0'
    }}>
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-8">
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'var(--ap-font-weight-medium)', 
              marginBottom: '1rem',
              color: 'var(--ap-white)'
            }}>
              Calidad Verificada para Ambientes de Alto Riesgo
            </h2>
            <p style={{ 
              fontSize: '1.2rem', 
              color: 'var(--ap-white)',
              lineHeight: '1.6',
              opacity: '0.9'
            }}>
              Todos nuestros productos cuentan con las certificaciones internacionales 
              más exigentes del mercado
            </p>
          </div>
        </div>

        <div className="row">
          {certifications.map((cert, index) => (
            <div key={index} className="col-lg-3 col-md-6 mb-4">
              <div className="card-ap" style={{
                backgroundColor: 'var(--ap-white)',
                padding: '2rem',
                height: '100%',
                border: `3px solid ${cert.color}`,
                transition: 'var(--ap-transition)',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = 'var(--ap-shadow-strong)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--ap-shadow-light)';
              }}>
                <div style={{ 
                  fontSize: '2rem', 
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                  fontWeight: 'var(--ap-font-weight-bold)',
                  color: cert.color,
                  backgroundColor: 'var(--ap-green-extra-light)',
                  padding: '1rem',
                  borderRadius: '50%',
                  width: '80px',
                  height: '80px',
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {cert.icon}
                </div>
                <h4 style={{ 
                  fontWeight: 'var(--ap-font-weight-medium)', 
                  marginBottom: '1rem',
                  color: cert.color,
                  textAlign: 'center',
                  fontSize: '1.2rem'
                }}>
                  {cert.name}
                </h4>
                <p style={{ 
                  color: 'var(--ap-text-secondary)', 
                  fontSize: '0.95rem',
                  lineHeight: '1.5',
                  textAlign: 'center',
                  margin: '0'
                }}>
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="row justify-content-center align-items-center mt-5">
          <div className="col-lg-6">
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '2rem',
              borderRadius: '15px',
              border: '2px solid var(--ap-white)'
            }}>
              <h3 style={{ 
                color: 'var(--ap-white)', 
                fontWeight: 'var(--ap-font-weight-medium)',
                marginBottom: '1rem'
              }}>
                ¿Necesitas validar una certificación?
              </h3>
              <p style={{ 
                color: 'var(--ap-white)',
                marginBottom: '1.5rem',
                fontSize: '1.1rem',
                opacity: '0.9'
              }}>
                Proporcionamos toda la documentación oficial y códigos de verificación 
                para cada producto certificado
              </p>
              <a
                href="/asesoria-tecnica"
                className="btn-ap-primary"
                style={{
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                Solicitar Asesoría Técnica
              </a>
            </div>
          </div>
          <div className="col-lg-6 text-center">
            <div style={{
              padding: '2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '15px',
              border: '2px solid var(--ap-green-light)'
            }}>
              <div style={{
                fontSize: '4rem',
                color: 'var(--ap-white)',
                marginBottom: '1rem'
              }}>
                🏆
              </div>
              <h4 style={{
                color: 'var(--ap-white)',
                fontWeight: 'var(--ap-font-weight-medium)',
                marginBottom: '1rem'
              }}>
                Certificaciones Garantizadas
              </h4>
              <p style={{
                color: 'var(--ap-white)',
                opacity: '0.9',
                fontSize: '0.95rem'
              }}>
                Cada producto incluye documentación completa y códigos de verificación oficiales
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;