import React, { useState } from 'react';

const LaboratorioSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videos = [
    {
      id: 'ZJos8SKiWTs',
      title: 'Pruebas de Resistencia en Respiradores N95',
      description: 'Proceso completo de certificación de nuestros respiradores bajo normativas NIOSH y NOM.',
      category: 'Protección Respiratoria',
      duration: '5:42',
      thumbnail: 'https://img.youtube.com/vi/ZJos8SKiWTs/maxresdefault.jpg'
    },
    {
      id: 'AhskAfFNtUw',
      title: 'Pruebas de Impacto en Cascos Industriales',
      description: 'Evaluación de resistencia al impacto según estándares ANSI Z89.1 en nuestro laboratorio.',
      category: 'Protección Craneal',
      duration: '4:18',
      thumbnail: 'https://img.youtube.com/vi/AhskAfFNtUw/maxresdefault.jpg'
    },
    {
      id: 'MsEPAIP0m9I',
      title: 'Control de Calidad en Guantes Industriales',
      description: 'Proceso de verificación de resistencia química y mecánica en guantes de protección.',
      category: 'Protección de Manos',
      duration: '6:25',
      thumbnail: 'https://img.youtube.com/vi/MsEPAIP0m9I/maxresdefault.jpg'
    },
    {
      id: 'd89FvbG1bfU',
      title: 'Certificación de Lentes de Seguridad',
      description: 'Pruebas de resistencia al impacto y claridad óptica en equipos de protección ocular.',
      category: 'Protección Ocular',
      duration: '3:56',
      thumbnail: 'https://img.youtube.com/vi/d89FvbG1bfU/maxresdefault.jpg'
    }
  ];

  const certifications = [
    {
      name: 'ISO 17025',
      description: 'Laboratorio acreditado para ensayos y calibración',
      icon: '🏆'
    },
    {
      name: 'NIOSH Approved',
      description: 'Certificación del Instituto Nacional de Seguridad Ocupacional',
      icon: '✅'
    },
    {
      name: 'NOM-116-STPS',
      description: 'Cumplimiento de normativas mexicanas de seguridad',
      icon: '🇲🇽'
    },
    {
      name: 'ANSI Z87.1',
      description: 'Estándar americano para protección ocular',
      icon: '👁️'
    }
  ];

  const equipment = [
    {
      name: 'Cámara de Partículas',
      description: 'Evaluación de filtración en equipos respiratorios',
      specs: 'Rango: 0.1-10 μm | Precisión: ±2%'
    },
    {
      name: 'Máquina de Impacto',
      description: 'Pruebas de resistencia mecánica',
      specs: 'Energía: 0.1-150 J | Velocidad: 5-45 m/s'
    },
    {
      name: 'Espectrofotómetro',
      description: 'Análisis de transmitancia óptica',
      specs: 'Rango: 280-2500 nm | Resolución: 0.1 nm'
    },
    {
      name: 'Cámara Climática',
      description: 'Simulación de condiciones ambientales extremas',
      specs: 'Temp: -40°C a +150°C | Humedad: 10-95%'
    }
  ];

  const openVideoModal = (video) => {
    setSelectedVideo(video);
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <section style={{ backgroundColor: '#2c3e50', padding: '80px 0', color: '#fff' }}>
        <div className="container">
          {/* Header */}
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: '#fff'
              }}>
                Laboratorio de Pruebas AP Safety
              </h2>
              <p style={{
                fontSize: '1.2rem',
                color: '#bdc3c7',
                lineHeight: '1.6'
              }}>
                Instalaciones de última generación donde cada producto es sometido 
                a las pruebas más rigurosas antes de llegar a nuestros clientes
              </p>
            </div>
          </div>

          {/* Statistics */}
          <div className="row text-center mb-5">
            <div className="col-md-3 col-6 mb-4">
              <div style={{ padding: '2rem' }}>
                <h3 style={{
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: '#2e9e3b',
                  marginBottom: '0.5rem'
                }}>
                  15K+
                </h3>
                <p style={{ color: '#bdc3c7', margin: '0' }}>Productos Certificados</p>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div style={{ padding: '2rem' }}>
                <h3 style={{
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: '#2e9e3b',
                  marginBottom: '0.5rem'
                }}>
                  8
                </h3>
                <p style={{ color: '#bdc3c7', margin: '0' }}>Normativas Aplicadas</p>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div style={{ padding: '2rem' }}>
                <h3 style={{
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: '#2e9e3b',
                  marginBottom: '0.5rem'
                }}>
                  24/7
                </h3>
                <p style={{ color: '#bdc3c7', margin: '0' }}>Operación Continua</p>
              </div>
            </div>
            <div className="col-md-3 col-6 mb-4">
              <div style={{ padding: '2rem' }}>
                <h3 style={{
                  fontSize: '3rem',
                  fontWeight: '700',
                  color: '#2e9e3b',
                  marginBottom: '0.5rem'
                }}>
                  99.8%
                </h3>
                <p style={{ color: '#bdc3c7', margin: '0' }}>Precisión en Pruebas</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="row mb-5">
            <div className="col-12">
              <h3 style={{
                textAlign: 'center',
                marginBottom: '3rem',
                fontSize: '2rem',
                fontWeight: '600'
              }}>
                Certificaciones y Acreditaciones
              </h3>
              <div className="row">
                {certifications.map((cert, index) => (
                  <div key={index} className="col-lg-3 col-md-6 mb-4">
                    <div style={{
                      backgroundColor: '#34495e',
                      padding: '2rem',
                      borderRadius: '15px',
                      textAlign: 'center',
                      height: '100%',
                      border: '3px solid #2e9e3b',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                      <div style={{
                        fontSize: '3rem',
                        marginBottom: '1rem'
                      }}>
                        {cert.icon}
                      </div>
                      <h4 style={{
                        fontWeight: '600',
                        color: '#2e9e3b',
                        marginBottom: '1rem'
                      }}>
                        {cert.name}
                      </h4>
                      <p style={{
                        color: '#bdc3c7',
                        margin: '0',
                        fontSize: '0.9rem'
                      }}>
                        {cert.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#f8f9fa', padding: '80px 0' }}>
        <div className="container">
          {/* Videos Gallery */}
          <div className="row mb-5">
            <div className="col-12">
              <h3 style={{
                textAlign: 'center',
                marginBottom: '3rem',
                fontSize: '2rem',
                fontWeight: '600',
                color: '#2c3e50'
              }}>
                Videos del Laboratorio
              </h3>
              <div className="row">
                {videos.map((video, index) => (
                  <div key={index} className="col-lg-6 col-md-6 mb-4">
                    <div style={{
                      backgroundColor: '#fff',
                      borderRadius: '15px',
                      overflow: 'hidden',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease'
                    }}
                    onClick={() => openVideoModal(video)}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}>
                      <div style={{ position: 'relative' }}>
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover'
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: 'rgba(46, 158, 59, 0.9)',
                          borderRadius: '50%',
                          width: '60px',
                          height: '60px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontSize: '1.5rem'
                        }}>
                          ▶️
                        </div>
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          color: '#fff',
                          padding: '5px 10px',
                          borderRadius: '5px',
                          fontSize: '0.8rem'
                        }}>
                          {video.duration}
                        </div>
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          left: '10px',
                          backgroundColor: '#2e9e3b',
                          color: '#fff',
                          padding: '5px 10px',
                          borderRadius: '15px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {video.category}
                        </div>
                      </div>
                      <div style={{ padding: '1.5rem' }}>
                        <h4 style={{
                          fontWeight: '600',
                          color: '#2c3e50',
                          marginBottom: '0.5rem',
                          fontSize: '1.1rem'
                        }}>
                          {video.title}
                        </h4>
                        <p style={{
                          color: '#6c757d',
                          margin: '0',
                          fontSize: '0.9rem',
                          lineHeight: '1.5'
                        }}>
                          {video.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Equipment */}
          <div className="row">
            <div className="col-12">
              <h3 style={{
                textAlign: 'center',
                marginBottom: '3rem',
                fontSize: '2rem',
                fontWeight: '600',
                color: '#2c3e50'
              }}>
                Equipos Especializados
              </h3>
              <div className="row">
                {equipment.map((item, index) => (
                  <div key={index} className="col-lg-6 col-md-6 mb-4">
                    <div style={{
                      backgroundColor: '#fff',
                      padding: '2rem',
                      borderRadius: '15px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      height: '100%',
                      borderLeft: '5px solid #2e9e3b'
                    }}>
                      <h4 style={{
                        fontWeight: '600',
                        color: '#2c3e50',
                        marginBottom: '1rem'
                      }}>
                        {item.name}
                      </h4>
                      <p style={{
                        color: '#6c757d',
                        marginBottom: '1rem',
                        lineHeight: '1.6'
                      }}>
                        {item.description}
                      </p>
                      <div style={{
                        backgroundColor: '#e8f5e8',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: '1px solid #2e9e3b'
                      }}>
                        <small style={{
                          color: '#2e9e3b',
                          fontWeight: '600',
                          fontSize: '0.85rem'
                        }}>
                          📊 {item.specs}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="row justify-content-center mt-5">
            <div className="col-lg-8 text-center">
              <div style={{
                backgroundColor: '#2c3e50',
                padding: '3rem',
                borderRadius: '20px',
                color: '#fff'
              }}>
                <h3 style={{
                  fontWeight: '600',
                  marginBottom: '1rem',
                  fontSize: '2rem'
                }}>
                  ¿Necesitas certificar tus productos?
                </h3>
                <p style={{
                  marginBottom: '2rem',
                  fontSize: '1.2rem',
                  color: '#bdc3c7'
                }}>
                  Ofrecemos servicios de certificación y pruebas para terceros
                </p>
                <a
                  href="/asesoria-tecnica"
                  style={{
                    backgroundColor: '#2e9e3b',
                    color: '#fff',
                    padding: '15px 30px',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    display: 'inline-block',
                    transition: 'all 0.3s ease',
                    fontSize: '1.1rem'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#36C848';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#2e9e3b';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  🔬 Solicitar Servicios de Laboratorio
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '9999'
        }}
        onClick={closeVideoModal}>
          <div style={{
            position: 'relative',
            width: '90%',
            maxWidth: '800px',
            backgroundColor: '#fff',
            borderRadius: '15px',
            overflow: 'hidden'
          }}
          onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeVideoModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '15px',
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                fontSize: '1.2rem',
                zIndex: '10'
              }}
            >
              ×
            </button>
            <div style={{
              position: 'relative',
              paddingBottom: '56.25%',
              height: '0',
              overflow: 'hidden'
            }}>
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
                title={selectedVideo.title}
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  width: '100%',
                  height: '100%',
                  border: 'none'
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h4 style={{
                fontWeight: '600',
                color: '#2c3e50',
                marginBottom: '0.5rem'
              }}>
                {selectedVideo.title}
              </h4>
              <p style={{
                color: '#6c757d',
                margin: '0',
                lineHeight: '1.5'
              }}>
                {selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LaboratorioSection;