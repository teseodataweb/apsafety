import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import InfIcon2 from '../../img/icon/phone_17470591.png';
import InfIcon3 from '../../img/icon/mail_10335208.png';
import ContactForm from '../ContactFrom/ContactForm';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';

const AsesoriaTecnica = () => {
  const [hover, setHover] = React.useState(false);

  const buttonStyle = {
    backgroundColor: hover ? '#36C848' : '#2e9e3b',
    color: '#fff',
    padding: '1rem 2.2rem',
    fontSize: '1.15rem',
    fontWeight: '600',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    textDecoration: 'none',
    display: 'inline-block',
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#000', lineHeight: 1.75, fontSize: '1.05rem' }}>
      <Navbar hclass={'header-section'} />

      {/* Contact Info */}
      <section
        style={{
          backgroundColor: '#f8f9fa',
          padding: '5rem 1rem 4rem',
          marginTop: '5rem',
        }}
      >
        <div className="container">
          <div className="row g-4 justify-content-center">
            {[ 
              { icon: InfIcon2, title: "Teléfono", text: "33-20-20-01-22" },
              { icon: InfIcon3, title: "Correo Electrónico", text: "direccion@apmascarillas.mx" }
            ].map((item, index) => (
              <div key={index} className="col-xl-5 col-lg-4 col-md-6 col-sm-8">
                <div
                  className="text-center h-100 p-5"
                  style={{
                    backgroundColor: '#e9f7ef',
                    borderRadius: '14px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
                  }}
                >
                  <div className="mb-3">
                    <img src={item.icon} alt={item.title} style={{ width: 60, height: 60 }} />
                  </div>
                  <h4 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '1.25rem', fontWeight: 600 }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Asesoría Técnica */}
      <section style={{ padding: '5rem 1rem' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <h1 style={{ fontSize: '4.0rem', marginBottom: '3rem', fontWeight: 'bold' }}>
                Asesoría Técnica en Seguridad Laboral Certificada
              </h1>
              <p style={{ fontSize: '1.35rem', marginBottom: '2.5rem' }}>
                En AP SAFETY te acompañamos a implementar un entorno laboral seguro, cumpliendo con las 
                normativas NOM-STPS, ANSI e ISO. Nuestra asesoría técnica está diseñada para empresas 
                que requieren soluciones efectivas y adaptadas a sus procesos industriales.
              </p>

              <h3 style={{ marginTop: '3rem', fontSize: '3.0rem', marginBottom: '1rem' }}>
                ¿Por qué confiar en nuestra asesoría?
              </h3>
              <p style={{ fontSize: '1.35rem', marginBottom: '2.5rem' }}>
                Porque entendemos los riesgos que enfrentas en campo. Te ayudamos a prevenir accidentes,
                evitar sanciones y elevar los estándares de seguridad operativa con apoyo técnico especializado.
              </p>

              <h2 style={{ marginTop: '3rem', fontSize: '3.0rem', marginBottom: '1rem' }}>
                Servicios que ofrecemos
              </h2>
              <div className="row mt-4 mb-5">
                {[
                  {
                    icon: 'fas fa-clipboard-check',
                    title: ' Evaluación de Riesgos Laborales',
                    text: 'Identificamos peligros críticos en tus instalaciones y diseñamos soluciones que reducen los riesgos operativos, con respaldo técnico documentado.',
                  },
                  {
                    icon: 'fas fa-file-contract',
                    title: 'Cumplimiento Normativo',
                    text: 'Te asesoramos para cumplir con normativas como NOM-115-STPS, ANSI Z87/Z89 e ISO 11612. Ideal para auditorías, licitaciones y compras institucionales.',
                  },
                  {
                    icon: 'fas fa-hard-hat',
                    title: 'Selección de EPP',
                    text: 'Recomendamos el equipo de protección más adecuado según las tareas, el entorno y el nivel de exposición. Asesoría para respiradores, cascos, tapones, guantes y más.',
                  },
                  {
                    icon: 'fas fa-chalkboard-teacher',
                    title: 'Capacitación Técnica',
                    text: 'Formamos a tu equipo en el uso, mantenimiento y vida útil del EPP. Cursos presenciales o virtuales adaptados a tu industria.',
                  },
                ].map((s, i) => (
                  <div key={i} className="col-md-6 col-lg-3 mb-4">
                    <div
                      className="h-100 p-4 text-center"
                      style={{
                        backgroundColor: '#f1fdf6',
                        borderRadius: '12px',
                        boxShadow: '0 0 10px rgba(0,0,0,0.05)',
                      }}
                    >
                      <div className="mb-3">
                        <i className={`${s.icon} fa-2x`} style={{ color: '#2e9e3b' }}></i>
                      </div>
                      <h5 style={{ fontWeight: 600 }}>{s.title}</h5>
                      <p>{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h2 style={{ marginTop: '3rem', fontSize: '3.0rem', marginBottom: '1rem' }}>
                Beneficios para tu empresa
              </h2>
              <div className="row mt-3 mb-5">
                <div className="col-md-6 mb-3">
                  <ul style={{ paddingLeft: '1.35rem' }}>
                    <li><span style={{ color: '#36C848' }}>✅</span> Reducción de accidentes laborales</li>
                    <li><span style={{ color: '#36C848' }}>✅</span> Cumplimiento con auditorías STPS, ISO, OSHA</li>
                  </ul>
                </div>
                <div className="col-md-6 mb-3">
                  <ul style={{ paddingLeft: '2.25rem' }}>
                    <li><span style={{ color: '#36C848' }}>✅</span> Mejora continua en procesos de seguridad</li>
                    <li><span style={{ color: '#36C848' }}>✅</span> Ahorro por selección correcta de EPP</li>
                  </ul>
                </div>
              </div>

              <div className="text-center mt-5 p-5" style={{ background: '#f1fdf6', borderRadius: '12px' }}>
                <h2 style={{ marginBottom: '1rem' }}>¿Listo para fortalecer la seguridad en tu empresa?</h2>
                <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
                  Nuestros expertos están listos para ayudarte
                </p>
                <Link
                  to="/contacto"
                  style={buttonStyle}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  Solicitar asesoría personalizada
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#f8f9fa', padding: '5rem 1rem' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div
                className="p-5"
                style={{
                  backgroundColor: '#fff',
                  borderRadius: '12px',
                  boxShadow: '0 0 10px rgba(0,0,0,0.05)',
                }}
              >
                <h3 className="text-center mb-4" style={{ fontSize: '1.4rem' }}>
                  Completa el formulario y un asesor se pondrá en contacto en menos de 24 horas
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AsesoriaTecnica;
