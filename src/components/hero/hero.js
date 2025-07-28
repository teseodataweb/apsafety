import React from 'react';
import { Link } from 'react-router-dom';
import Abimg7 from '../../img/descarga__6_-removebg-preview (1).png';

const greenButtonStyle = {
  backgroundColor: '#2e9e3b',
  color: '#fff',
  padding: '12px 24px',
  borderRadius: '12px',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  display: 'inline-block',
  transition: 'all 0.3s ease',
};

const handleHover = (e, isHovering) => {
  e.currentTarget.style.backgroundColor = isHovering ? '#36C848' : '#2e9e3b';
};

const Hero = () => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <section
      className="hero-section hero-1 fix bg-cover"
      style={{
        backgroundColor: "#fff",
        padding: "60px 0",
        textAlign: "center"
      }}
    >
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-12">
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
              <iframe
                src="https://www.youtube.com/embed/ZJos8SKiWTs?autoplay=1"
                title="YouTube video player"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none"
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-6 text-md-start text-center">
            <div className="hero-content">
              <h6 style={{ fontWeight: "bold", color: "#333" }}>AP Safety</h6>
              <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "20px 0" }}>
                Equipos de Protección <br />
                Certificados <br />
                para Entornos Exigentes
              </h1>
              <p style={{ fontSize: "1.1rem", color: "#555" }}>
                Desde respiradores N95 hasta cascos <br />
                personalizados: soluciones industriales con <br />
                entregas rápidas a toda la República.
              </p>

              <div className="btn-group mt-4 d-flex flex-column flex-md-row justify-content-center gap-3">
                <a
                  href="https://drive.google.com/file/d/1uj61CFRqrfQ6_exclcC-5YRTuQ6LBdOv/view?usp=sharing"
                  download
                  style={greenButtonStyle}
                  onMouseOver={(e) => handleHover(e, true)}
                  onMouseOut={(e) => handleHover(e, false)}
                >
                  Descargar Catálogo
                </a>

                <Link
                  to="/productosusers"
                  onClick={ClickHandler}
                  style={greenButtonStyle}
                  onMouseOver={(e) => handleHover(e, true)}
                  onMouseOut={(e) => handleHover(e, false)}
                >
                  Explorar productos
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-4 mt-md-0 text-center">
            <img
              src={Abimg7}
              alt="AP Safety equipo"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
