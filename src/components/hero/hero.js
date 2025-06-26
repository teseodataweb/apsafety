import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <section className="hero-section hero-1 fix bg-cover" style={{ backgroundColor: "#fff" }}>
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <div className="hero-content">
              <h6 className="wow fadeInUp">AP Safety</h6>
              <h1 className="wow fadeInUp" data-wow-delay=".3s">
                Equipos de Protección <br />
                Certificados <br />
                para Entornos Exigentes
              </h1>
              <p className="wow fadeInUp" data-wow-delay=".5s">
                Desde respiradores N95 hasta cascos<br />
                personalizados: soluciones industriales con <br />
                entregas rápidas a toda la República.
              </p>

              <div className="btn-group mt-4 wow fadeInUp" data-wow-delay=".7s">
                <a href="/catalogo.pdf" className="btn btn-primary me-3" download>
                  Descargar catálogo PDF
                </a>
                <Link to="/shop" className="btn btn-outline-success" onClick={ClickHandler}>
                  Explorar productos
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay=".4s">
            <div className="hero-thumb">
              <div className="wow fadeInUp" data-wow-delay=".6s">
                <iframe
                  width="980"
                  height="600"
                  src="https://www.youtube.com/embed/ZJos8SKiWTs?autoplay=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
