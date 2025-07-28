import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import SS1 from '../../img/feature/669053-removebg-preview.png';
import SS2 from '../../img/feature/3778694-removebg-preview.png';
import SS3 from '../../img/feature/16846910-removebg-preview.png';
import SS4 from '../../img/feature/18383895-removebg-preview.png';
import SS5 from '../../img/feature/16847001-removebg-facial.png';

const StoreSection = () => {
  const [hover, setHover] = useState(false);

  const btnStyle = {
    display: 'inline-block',
    backgroundColor: hover ? '#36C848' : '#2e9e3b',
    color: '#fff',
    padding: '12px 30px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const iconStyle = {
    maxWidth: '120px',
    height: 'auto',
    marginBottom: '1rem',
  };

  return (
    <section className="feature-section section-padding pt-0">
      <div className="container custom-container">
        <div className="feature-wrapper-2">

          <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Soluciones de Protección para Cada Riesgo
          </h3>

          <div className="row g-4">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay=".2s">
              <div className="feature-box-items-1 text-center">
                <div className="icon">
                  <img src={SS1} alt="img" style={iconStyle} />
                </div>
                <div className="content">
                  <h3>Cascos de seguridad certificados</h3>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay=".4s">
              <div className="feature-box-items-1 text-center">
                <div className="icon bg-2">
                  <img src={SS2} alt="img" style={iconStyle} />
                </div>
                <div className="content">
                  <h3>Mascarillas N95 y respiradores reutilizables</h3>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay=".6s">
              <div className="feature-box-items-1 text-center">
                <div className="icon bg-3">
                  <img src={SS3} alt="img" style={iconStyle} />
                </div>
                <div className="content">
                  <h3>Tapones auditivos y barriquejos</h3>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay=".8s">
              <div className="feature-box-items-1 text-center">
                <div className="icon bg-4">
                  <img src={SS4} alt="img" style={iconStyle} />
                </div>
                <div className="content">
                  <h3>Guantes anticorte, aluminizados y dieléctricos</h3>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 wow fadeInUp" data-wow-delay="1s">
              <div className="feature-box-items-1 text-center">
                <div className="icon bg-4">
                  <img src={SS5} alt="img" style={iconStyle} />
                </div>
                <div className="content">
                  <h3>Protección visual y facial</h3>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link
              to="/shop"
              style={btnStyle}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              Ver todos los productos
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default StoreSection;
