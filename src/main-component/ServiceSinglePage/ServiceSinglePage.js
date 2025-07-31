import React, { Fragment, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar'
import PageTitle from '../../components/pagetitle/PageTitle';
import Footer from '../../components/footer/Footer';
import InfIcon1 from '../../img/icon/location_8563980.png';
import InfIcon2 from '../../img/icon/phone_17470591.png';
import InfIcon3 from '../../img/icon/mail_10335208.png';
import LabImage from '../../img/AP.Safetty.png';
import FiltracionImg from '../../img/AP.Safetty.png';
import AjusteImg from '../../img/apsafety.png';
import ResistenciaImg from '../../img/AP.Safetty.png';
import FlamabilidadImg from '../../img/AP.Safetty.png';
import CatalogoImg from '../../img/descarga (8).png';

const ServiceSinglePage = () => {
  const { slug } = useParams();

  const serviceDetails = {
    title: 'Laboratorio de Pruebas Certificadas',
    sSImg: LabImage,
  };

  const [hover, setHover] = useState(false);

  const btnStyle = {
  backgroundColor: hover ? '#36C848' : '#2e9e3b',
  color: '#fff',
  padding: '0.75rem 1.5rem',
  fontSize: '1.1rem',
  fontWeight: '600',
  borderRadius: '12px',
  textDecoration: 'none',
  display: 'inline-block',
  transition: 'background-color 0.3s ease',
};
  const catalogoLink = 'https://drive.google.com/file/d/1P6Wq2vFjvqcY8q5EMs9-BgUWjwbBm_kq/view';
  const videoLinks = [
  'https://www.youtube.com/embed/MsEPAIP0m9I',
  'https://www.youtube.com/embed/-paqvItAnP8',
  'https://www.youtube.com/embed/AhskAfFNtUw',
  'https://www.youtube.com/embed/d89FvbG1bfU',
];

  return (
    <Fragment>
      <Navbar hclass={'header-section-2 style-two'} />
      <PageTitle
        pageTitle={'Laboratorio de Pruebas Certificadas para Equipos de Protección Personal'}
        pagesub={serviceDetails.title}
      />

      <section style={{ padding: '60px 0', backgroundColor: '#f9f9f9' }}>
        <div className="container">
          <div className="row align-items-center">

            <div className="col-lg-6 mb-4 mb-lg-0">
              <img
                src={serviceDetails.sSImg}
                alt="Personal Y equipo de AP SAFETY"
                style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
              />
            </div>

            <div className="col-lg-6">
              <h2 className="mb-4">Servicios de Pruebas de Laboratorio</h2>
              <p>
                En <strong>AP SAFETY</strong>, contamos con un laboratorio de pruebas acreditado por la{' '}
                Entidad Mexicana de Acreditación (EMA), especializado en evaluar la eficacia y seguridad{' '}
                de equipos de protección personal (EPP).
              </p>
              <p>
                Nuestro compromiso es garantizar que cada producto cumpla con las normativas nacionales e{' '}
                internacionales más exigentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="service-details-section fix section-padding section-bg-2">
        <div className="container">
          <div className="service-details-wrapper">
            <h2 className="mb-5 text-center">Tipos de Pruebas de Laboratorio</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '40px',
                textAlign: 'center',
              }}
            >
              {/* Prueba 1 */}
              <div>
                <img
                  src={FiltracionImg}
                  alt="Personal Y equipo de AP SAFETY"
                  style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '8px', margin: '0 auto 1rem' }}
                />
                <h4>Pruebas de Eficiencia de Filtración</h4>
                <p>
                  Evaluamos la capacidad de los filtros para retener partículas nocivas, asegurando que los respiradores cumplan con los estándares de eficiencia requeridos.
                </p>
              </div>

              {/* Prueba 2 */}
              <div>
                <img
                  src={AjusteImg}
                  alt="Logo de AP SAFETY"
                  style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '8px', margin: '0 auto 1rem' }}
                />
                <h4>Pruebas de Ajuste Cualitativo y Cuantitativo</h4>
                <p>
                  Verificamos el ajuste adecuado de los equipos de protección respiratoria, garantizando una protección efectiva para el usuario.
                </p>
              </div>

              {/* Prueba 3 */}
              <div>
                <img
                  src={ResistenciaImg}
                  alt="Personal Y equipo de AP SAFETY"
                  style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '8px', margin: '0 auto 1rem' }}
                />
                <h4>Pruebas de Resistencia a la Inhalación y Exhalación</h4>
                <p>
                  Medimos la resistencia al flujo de aire durante la inhalación y exhalación para asegurar la comodidad y seguridad del usuario.
                </p>
              </div>

              {/* Prueba 4 */}
              <div>
                <img
                  src={FlamabilidadImg}
                  alt="Personal Y equipo de AP SAFETY"
                  style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '8px', margin: '0 auto 1rem' }}
                />
                <h4>Pruebas de Flamabilidad</h4>
                <p>
                  Evaluamos la resistencia al fuego de los materiales de los equipos de protección para prevenir riesgos en entornos peligrosos.
                </p>
              </div>
            </div>
            <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 2fr))',
              gap: '20px',
              marginTop: '2rem',
              justifyItems: 'center',
              }}
              >
                {videoLinks.map((link, index) => (
                  <div key={index} style={{ width: '100%' }}>
                    <iframe
                    width="100%"
                    height="280"
                    src={link}
                    title={`Video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    style={{ borderRadius: '8px' }}
                    ></iframe>
                    <p
                    style={{
                      textAlign: 'center',
                      marginTop: '0.75rem',
                      fontSize: '1rem',
                      color: '#444',
                      lineHeight: '1.5',}}>
                        {[
                          'LA ÚNICA PRUEBA REAL A MASCARILLAS N95.',
                          'Esta es nuestra cámara de Pre - acondicionamiento de nuestro laboratorio.',
                          'Mesa Vibratoria con la que hacemos pruebas en todos nuestros equipos. en nuestro #AP Testing Lab.',
                          'TEASER AP TESTING LAB.'
                          ][index]}
                          </p>
                          </div>
                        ))}
                        </div>
              <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2rem',
                marginTop: '3rem',
                flexWrap: 'wrap',
                maxWidth: '900px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              <div style={{ flex: '1 1 400px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                  Beneficios de Nuestro Laboratorio
                </h2>
                <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '1.1rem', lineHeight: '1.6', margin: 0 }}>
                  <li>✅ Acreditación por la EMA, asegurando la validez y reconocimiento de nuestras pruebas.</li>
                  <li>✅ Equipos de última generación para pruebas precisas y confiables.</li>
                  <li>✅ Personal altamente capacitado y comprometido con la calidad.</li>
                  <li>✅ Cumplimiento con normativas como NOM-STPS, ANSI e ISO.</li>
                </ul>
              </div>

              <div style={{ flex: '0 0 500x', textAlign: 'center' }}>
                <a
                  href={catalogoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Descargar Catálogo"
                  style={{ cursor: 'pointer', display: 'inline-block' }}
                >
                  <img
                    src={CatalogoImg}
                    alt="Descargar catálogo"
                    style={{ width: '100%', maxWidth: '500px', height: 'auto', borderRadius: '8px' }}
                  />
                </a>
              </div>
            </div>

            <div style={{ marginTop: '4rem' }}>
              <div className="row g-4">
                <div className="col-lg-4 text-center">
                  <img src={InfIcon1} alt="icon" style={{ maxWidth: 50 }} />
                  <h4>Ubicación</h4>
                  <p>
                    La Reserva Industrial de las 11 Hectáreas, Lote 4, Manzana
                    <br />
                    3, C.P. 43998, Tepeapulco Centro, Hidalgo, México.
                  </p>
                </div>
                <div className="col-lg-4 text-center">
                  <img src={InfIcon2} alt="icon" style={{ maxWidth: 50 }} />
                  <h4>Teléfono</h4>
                  <p>+52 5611262476</p>
                </div>
                <div className="col-lg-4 text-center">
                  <img src={InfIcon3} alt="icon" style={{ maxWidth: 50 }} />
                  <h4>Correo</h4>
                  <p>ap_testinglab@outlook.com</p>
                </div>
              </div>
            </div>
            <p
              style={{
                marginTop: '2rem',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
                textAlign: 'center',
              }}
            >
              ¿Necesitas certificar tus equipos de protección personal? Contáctanos para obtener más información sobre nuestros servicios de pruebas de laboratorio.
            </p>

            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
              <Link
              to="/contacto"
              style={btnStyle}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)} >
                → Solicitar Información
                </Link>
                </div>
          </div>
        </div>
      </section>

      <Footer />
    </Fragment>
  );
};

export default ServiceSinglePage;
