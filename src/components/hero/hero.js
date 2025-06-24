import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <section className="hero-section hero-1 fix bg-cover" style={{ backgroundColor: '#fff' }}>
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <div className="hero-content">
              <h1 className="wow fadeInUp">
                Equipos de Protección <br />
                Certificados para Entornos Exigentes
              </h1>
              <p className="wow fadeInUp" data-wow-delay=".3s">
                Desde respiradores N95 hasta cascos personalizados: soluciones industriales con entregas rápidas a toda la República.
              </p>
              <div className="wow fadeInUp" data-wow-delay=".5s">
                <a
                  href="/catalogo.pdf"
                  download="catalogo-ap-safety.pdf"
                  className="theme-btn me-3"
                >
                  Descargar catálogo PDF
                </a>
                <Link to="/shop" onClick={ClickHandler} className="theme-btn theme-btn-outline">
                  Explorar productos
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="hero-thumb wow fadeInUp" data-wow-delay=".4s">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/ZJos8SKiWTs?autoplay=1&mute=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h2>¿Tus proyectos industriales están desprotegidos?</h2>
          <p>
            En sectores como minería, construcción o química, usar equipo de protección no certificado puede causar accidentes, multas o pérdidas operativas.
          </p>
          <p>
            Muchas empresas no logran abastecerse a tiempo, o confían en distribuidores sin respaldo técnico.
            En AP SAFETY entendemos los riesgos. Por eso, fabricamos y distribuimos EPP con normas <strong>NOM-STPS, ANSI y ISO</strong>, con entregas en 72 horas a zonas remotas.
          </p>
        </div>

        <div className="mt-5">
          <h2>Compra tus equipos de protección directo del fabricante</h2>
          <p>
            Conoce nuestra tienda virtual y accede a productos disponibles con entrega inmediata.
          </p>
        </div>

        <div className="mt-5">
          <h3>Soluciones de Protección para Cada Riesgo</h3>
          <ul>
            <li>🦺 Cascos de seguridad certificados</li>
            <li>😷 Mascarillas N95 y respiradores reutilizables</li>
            <li>👂 Tapones auditivos y barriquejos</li>
            <li>🧤 Guantes anticorte, aluminizados y dieléctricos</li>
            <li>👁️ Protección visual y facial</li>
          </ul>
          <Link to="/shop" className="theme-btn mt-3" onClick={ClickHandler}>
            Ver todos los productos
          </Link>
        </div>

        <div className="mt-5">
          <h3>¿Necesitas la ficha técnica o precios al por mayor?</h3>
          <p>
            Descarga nuestro catálogo completo en PDF con especificaciones, normativas y tiempos de entrega.
          </p>
          <a
            href="/"
            download=""
            className="theme-btn"
          >
            Descargar catálogo
          </a>
        </div>

        <div className="mt-5">
          <h2>Calidad Verificada para Ambientes de Alto Riesgo</h2>
          <p>Todos nuestros productos cumplen con normativas nacionales e internacionales:</p>
          <ul>
            <li>NOM-STPS — Normas Oficiales Mexicanas</li>
            <li>ANSI Z87, Z89 — Estándares estadounidenses de seguridad visual y de casco</li>
            <li>ISO 11612 — Resistencia térmica para ropa de protección</li>
            <li>Certificaciones internas respaldadas por laboratorio propio acreditado ante EMA</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;
