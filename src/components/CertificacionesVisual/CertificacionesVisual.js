import React from 'react';
import '../../css/corporate-colors.css';

const CertificacionesVisual = () => {
  const certifications = [
    {
      name: 'NOM-STPS',
      fullName: 'Normas Oficiales Mexicanas',
      description: 'Seguridad y Salud en el Trabajo',
      logo: 'NOM',
      color: 'var(--ap-green-dark)'
    },
    {
      name: 'ANSI Z87/Z89',
      fullName: 'American National Standards',
      description: 'Estándares de Seguridad Industrial',
      logo: 'ANSI',
      color: 'var(--ap-green-medium)'
    },
    {
      name: 'ISO 11612',
      fullName: 'International Organization',
      description: 'Normas Internacionales de Calidad',
      logo: 'ISO',
      color: 'var(--ap-green-dark)'
    },
    {
      name: 'EMA',
      fullName: 'Entidad Mexicana de Acreditación',
      description: 'Laboratorio Acreditado',
      logo: 'EMA',
      color: 'var(--ap-green-medium)'
    }
  ];

  return (
    <section style={{
      backgroundColor: 'var(--ap-white)',
      padding: '60px 0',
      borderTop: '1px solid var(--ap-gray-light)',
      borderBottom: '1px solid var(--ap-gray-light)'
    }}>
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-8">
            <h2 style={{
              fontSize: '2.2rem',
              fontWeight: 'var(--ap-font-weight-medium)',
              color: 'var(--ap-text-primary)',
              marginBottom: '1rem'
            }}>
              Certificaciones que Garantizan tu Seguridad
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--ap-text-secondary)',
              lineHeight: '1.6'
            }}>
              Todos nuestros productos cuentan con las certificaciones más exigentes 
              del mercado internacional
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          {certifications.map((cert, index) => (
            <div key={index} className="col-lg-3 col-md-6 mb-4">
              <div className="card-ap" style={{
                padding: '2rem 1.5rem',
                height: '100%',
                textAlign: 'center',
                border: `2px solid ${cert.color}`,
                transition: 'var(--ap-transition)',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = 'var(--ap-shadow-strong)';
                e.currentTarget.style.backgroundColor = 'var(--ap-green-extra-light)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--ap-shadow-light)';
                e.currentTarget.style.backgroundColor = 'var(--ap-white)';
              }}>
                {/* Logo Badge */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: cert.color,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '1.1rem',
                  fontWeight: 'var(--ap-font-weight-bold)',
                  color: 'var(--ap-white)',
                  letterSpacing: '1px'
                }}>
                  {cert.logo}
                </div>

                {/* Certification Name */}
                <h4 style={{
                  fontWeight: 'var(--ap-font-weight-medium)',
                  color: cert.color,
                  marginBottom: '0.5rem',
                  fontSize: '1.1rem'
                }}>
                  {cert.name}
                </h4>

                {/* Full Name */}
                <h5 style={{
                  fontWeight: 'var(--ap-font-weight-medium)',
                  color: 'var(--ap-text-primary)',
                  marginBottom: '0.75rem',
                  fontSize: '0.9rem',
                  lineHeight: '1.3'
                }}>
                  {cert.fullName}
                </h5>

                {/* Description */}
                <p style={{
                  color: 'var(--ap-text-secondary)',
                  fontSize: '0.85rem',
                  lineHeight: '1.4',
                  margin: '0'
                }}>
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="row justify-content-center mt-5">
          <div className="col-lg-10">
            <div style={{
              backgroundColor: 'var(--ap-section-ap-secondary)',
              padding: '2.5rem',
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontWeight: 'var(--ap-font-weight-medium)',
                color: 'var(--ap-text-primary)',
                marginBottom: '1rem',
                fontSize: '1.6rem'
              }}>
                Documentación Oficial Garantizada
              </h3>
              <p style={{
                color: 'var(--ap-text-secondary)',
                marginBottom: '2rem',
                fontSize: '1rem',
                lineHeight: '1.5'
              }}>
                Cada producto incluye certificados originales, códigos de verificación 
                y toda la documentación técnica necesaria para cumplir con normativas
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <a
                  href="https://drive.google.com/file/d/1uj61CFRqrfQ6_exclcC-5YRTuQ6LBdOv/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'var(--ap-gradient-primary)',
                    color: 'var(--ap-white)',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'var(--ap-font-weight-medium)',
                    display: 'inline-block',
                    transition: 'var(--ap-transition)',
                    boxShadow: 'var(--ap-shadow-green)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'var(--ap-green-dark)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'var(--ap-gradient-primary)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Ver Certificaciones Completas
                </a>
                <a
                  href="/asesoria-tecnica"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'var(--ap-green-medium)',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'var(--ap-font-weight-medium)',
                    display: 'inline-block',
                    border: '2px solid var(--ap-green-medium)',
                    transition: 'var(--ap-transition)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--ap-green-medium)';
                    e.currentTarget.style.color = 'var(--ap-white)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--ap-green-medium)';
                  }}
                >
                  Validar Certificación
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificacionesVisual;