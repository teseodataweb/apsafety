import React from 'react';

import Abimg6 from '../../img/about/descarga-removebg-preview.png';
import Abimg7 from '../../img/about/descarga__1_-removebg-preview.png';
import Abimg8 from '../../img/about/E-respirador-desechable-removebg-preview.png';

import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const buttonStyle = {
    backgroundColor: '#2e9e3b',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    display: 'inline-block',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.backgroundColor = '#36C848';
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.backgroundColor = '#2e9e3b';
  };

  return (
    <section className="about-section section-padding" style={{ paddingTop: '80px' }}>
      <div className="dot-shape"></div>
      <div className="dot-shape-2"></div>
      <div className="container">
        <div className="about-wrapper">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="about-image-items">
                <div className="circle-shape float-bob-y"></div>
                <div className="cap-shape float-bob-x"></div>
                <div className="shape-img"></div>

                <div className="about-image-1 wow fadeInUp" style={{ marginBottom: '20px' }}>
                  <img
                    src={Abimg6}
                    alt="Mascarilla desechable AP SAFETY "
                    className="about-img-control"
                    style={{ width: '350px' }}
                  />
                </div>

                <div className="about-image-2" style={{ marginBottom: '20px' }}>
                  <img
                    src={Abimg7}
                    alt="Mascarilla de AP Safety"
                    className="about-img-control"
                    style={{ width: '350px' }}
                  />
                </div>

                <div className="about-image-3">
                  <img
                    src={Abimg8}
                    alt="Respirador desechable certificado AP SAFETY "
                    className="about-img-control"
                    style={{ width: '350px' }}
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="about-content">
                <div className="section-title">
                  <h2>¿Tus proyectos industriales están desprotegidos?</h2>
                </div>

                <p>
                  En sectores como minería, construcción o química, usar equipo de protección no certificado puede causar accidentes,
                  multas o pérdidas operativas. Muchas empresas no logran abastecerse a tiempo, o confían en distribuidores sin respaldo técnico.
                </p>

                <p>
                  En AP SAFETY entendemos los riesgos. Por eso, fabricamos y distribuimos EPP con
                  normas NOM-STPS, ANSI y ISO, con entregas en 72 horas a zonas remotas.
                </p>

                <div style={{ marginTop: '24px' }}>
                  <Link
                    to="/service"
                    onClick={ClickHandler}
                    style={buttonStyle}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    Nosotros
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
