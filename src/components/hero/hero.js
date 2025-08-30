import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  RespiratoryRiskIcon, 
  ImpactRiskIcon, 
  ElectricalRiskIcon,
  CertificationIcon,
  FastShippingIcon,
  TechnicalSupportIcon
} from '../Icons/CorporateIcons';
import HeroImg from '../../img/hero/hero-1.jpg';
import '../../css/corporate-colors.css';

const buttonStyles = {
  primary: {
    background: 'var(--ap-gradient-primary)',
    color: 'var(--ap-white)',
    padding: '14px 28px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: 'var(--ap-font-weight-medium)',
    fontSize: '1.1rem',
    display: 'inline-block',
    transition: 'var(--ap-transition)',
    border: 'none',
    cursor: 'pointer',
    boxShadow: 'var(--ap-shadow-green)'
  },
  secondary: {
    backgroundColor: 'transparent',
    color: 'var(--ap-green-medium)',
    padding: '14px 28px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: 'var(--ap-font-weight-medium)',
    fontSize: '1.1rem',
    display: 'inline-block',
    transition: 'var(--ap-transition)',
    border: '2px solid var(--ap-green-medium)',
    cursor: 'pointer'
  }
};

const sectionStyles = {
  hero: {
    background: 'var(--ap-gradient-light)',
    padding: '80px 0 60px',
    position: 'relative',
    overflow: 'hidden'
  },
  problemSection: {
    backgroundColor: 'var(--ap-white)',
    padding: '60px 0',
    borderTop: '1px solid var(--ap-gray-medium)'
  },
  solutionSection: {
    backgroundColor: 'var(--ap-section-ap-secondary)',
    padding: '60px 0'
  }
};

const Hero = () => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const handleHover = (e, isHovering, buttonType) => {
    if (buttonType === 'primary') {
      e.currentTarget.style.background = isHovering ? 'var(--ap-green-dark)' : 'var(--ap-gradient-primary)';
      e.currentTarget.style.transform = isHovering ? 'translateY(-2px)' : 'translateY(0)';
    } else {
      e.currentTarget.style.backgroundColor = isHovering ? 'var(--ap-green-medium)' : 'transparent';
      e.currentTarget.style.color = isHovering ? 'var(--ap-white)' : 'var(--ap-green-medium)';
    }
  };

  return (
    <>
      <Helmet>
        <title>AP Safety - Equipos de Protección Personal Certificados | EPP Industrial</title>
        <meta name="description" content="Fabricamos y distribuimos EPP certificados con entrega en 72 horas. Respiradores N95, cascos, guantes industriales y más. Normativas NOM, ANSI, ISO." />
        <meta name="keywords" content="EPP, equipos protección personal, respiradores N95, cascos industriales, AP Safety" />
        <meta property="og:title" content="AP Safety - Equipos de Protección Personal Certificados" />
        <meta property="og:description" content="Fabricamos y distribuimos EPP certificados con entrega en 72 horas" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://apsafety.com" />
      </Helmet>

      <section className="hero-section hero-1 fix bg-cover" style={sectionStyles.hero}>
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-12 col-md-12">
              <div className="hero-content text-center">
                <h6 style={{ 
                  fontWeight: 'var(--ap-font-weight-medium)', 
                  color: 'var(--ap-green-medium)', 
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontSize: '0.9rem',
                  marginBottom: '1rem'
                }}>
                  AP Safety - Líderes en EPP
                </h6>
                <h1 style={{ 
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
                  fontWeight: 'var(--ap-font-weight-medium)', 
                  lineHeight: '1.2',
                  marginBottom: '1.5rem',
                  color: 'var(--ap-text-primary)'
                }}>
                  Equipos de Protección Certificados 
                  <span style={{ color: 'var(--ap-green-medium)' }}> para Entornos Exigentes</span>
                </h1>
                <p style={{ 
                  fontSize: '1.2rem', 
                  color: 'var(--ap-text-secondary)',
                  lineHeight: '1.6',
                  marginBottom: '2rem',
                  fontWeight: 'var(--ap-font-weight-normal)'
                }}>
                  Desde respiradores N95 hasta cascos personalizados: soluciones industriales con entregas rápidas a toda la República.
                </p>

                <div className="btn-group d-flex flex-column flex-sm-row gap-3 mb-4">
                  <a
                    href="https://drive.google.com/file/d/1uj61CFRqrfQ6_exclcC-5YRTuQ6LBdOv/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={buttonStyles.primary}
                    onMouseOver={(e) => handleHover(e, true, 'primary')}
                    onMouseOut={(e) => handleHover(e, false, 'primary')}
                    aria-label="Descargar catálogo de productos AP Safety en PDF"
                  >
                    Descargar Catálogo PDF
                  </a>

                  <Link
                    to="/productosusers"
                    onClick={ClickHandler}
                    style={buttonStyles.secondary}
                    onMouseOver={(e) => handleHover(e, true, 'secondary')}
                    onMouseOut={(e) => handleHover(e, false, 'secondary')}
                    aria-label="Explorar catálogo de productos de protección personal"
                  >
                    Explorar Productos
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section style={sectionStyles.problemSection}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'var(--ap-font-weight-medium)', 
                color: 'var(--ap-danger)',
                marginBottom: '2rem'
              }}>
                ¿Tus proyectos industriales están desprotegidos?
              </h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--ap-text-secondary)', marginBottom: '3rem' }}>
                Usar equipo no certificado puede generar accidentes. Riesgos: multas, pérdidas operativas, lesiones graves.
              </p>
              
              <div className="row">
                <div className="col-md-4 mb-4">
                  <div className="card-ap" style={{ padding: '2rem', backgroundColor: 'var(--ap-green-extra-light)', height: '100%' }}>
                    <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                      <RespiratoryRiskIcon size={48} color="var(--ap-green-dark)" />
                    </div>
                    <h4 style={{ color: 'var(--ap-green-dark)', fontWeight: 'var(--ap-font-weight-medium)', textAlign: 'center' }}>Riesgos Respiratorios</h4>
                    <p style={{ color: 'var(--ap-text-secondary)', textAlign: 'center' }}>Partículas tóxicas, vapores químicos y contaminantes aéreos</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="card-ap" style={{ padding: '2rem', backgroundColor: 'var(--ap-green-extra-light)', height: '100%' }}>
                    <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                      <ImpactRiskIcon size={48} color="var(--ap-green-dark)" />
                    </div>
                    <h4 style={{ color: 'var(--ap-green-dark)', fontWeight: 'var(--ap-font-weight-medium)', textAlign: 'center' }}>Impactos y Caídas</h4>
                    <p style={{ color: 'var(--ap-text-secondary)', textAlign: 'center' }}>Objetos en altura, maquinaria pesada y superficies resbaladizas</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="card-ap" style={{ padding: '2rem', backgroundColor: 'var(--ap-green-extra-light)', height: '100%' }}>
                    <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                      <ElectricalRiskIcon size={48} color="var(--ap-green-dark)" />
                    </div>
                    <h4 style={{ color: 'var(--ap-green-dark)', fontWeight: 'var(--ap-font-weight-medium)', textAlign: 'center' }}>Riesgos Eléctricos</h4>
                    <p style={{ color: 'var(--ap-text-secondary)', textAlign: 'center' }}>Descargas eléctricas, arcos voltaicos y quemaduras</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={sectionStyles.solutionSection}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'var(--ap-font-weight-medium)', 
                color: 'var(--ap-green-medium)',
                marginBottom: '2rem'
              }}>
                Fabricamos y distribuimos EPP con entrega en 72 horas
              </h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--ap-text-secondary)', marginBottom: '2rem' }}>
                Protección confiable, calidad comprobada
              </p>

              <div className="row">
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div style={{ 
                      width: '50px', 
                      height: '50px', 
                      backgroundColor: 'var(--ap-green-medium)', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      marginRight: '1rem'
                    }}>
                      <CertificationIcon size={24} color="var(--ap-white)" />
                    </div>
                    <div>
                      <h5 style={{ fontWeight: 'var(--ap-font-weight-medium)', marginBottom: '0.5rem' }}>Normativas NOM-STPS, ANSI, ISO</h5>
                      <p style={{ color: 'var(--ap-text-secondary)', margin: '0', fontSize: '0.9rem' }}>Certificaciones validadas</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div style={{ 
                      width: '50px', 
                      height: '50px', 
                      backgroundColor: 'var(--ap-green-medium)', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      marginRight: '1rem'
                    }}>
                      <FastShippingIcon size={24} color="var(--ap-white)" />
                    </div>
                    <div>
                      <h5 style={{ fontWeight: 'var(--ap-font-weight-medium)', marginBottom: '0.5rem' }}>Envíos a zonas remotas</h5>
                      <p style={{ color: 'var(--ap-text-secondary)', margin: '0', fontSize: '0.9rem' }}>72 horas garantizadas</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div style={{ 
                      width: '50px', 
                      height: '50px', 
                      backgroundColor: 'var(--ap-green-medium)', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      marginRight: '1rem'
                    }}>
                      <TechnicalSupportIcon size={24} color="var(--ap-white)" />
                    </div>
                    <div>
                      <h5 style={{ fontWeight: 'var(--ap-font-weight-medium)', marginBottom: '0.5rem' }}>Soporte técnico</h5>
                      <p style={{ color: 'var(--ap-text-secondary)', margin: '0', fontSize: '0.9rem' }}>Asesoría especializada</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6 text-center">
              <div style={{ position: 'relative' }}>
                <img
                  src={HeroImg}
                  alt="Trabajador industrial usando equipo de protección personal AP Safety"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '20px',
                    boxShadow: 'var(--ap-shadow-medium)'
                  }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
