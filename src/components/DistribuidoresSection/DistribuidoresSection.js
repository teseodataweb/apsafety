import React, { useState } from 'react';

const DistribuidoresSection = () => {
  const [activeTab, setActiveTab] = useState('benefits');

  const distributorTestimonials = [
    {
      name: 'Juan Carlos Mendoza',
      company: 'Distribuidora Industrial del Norte',
      location: 'Monterrey, N.L.',
      years: '5 años',
      testimonial: 'AP Safety nos ha permitido crecer nuestro negocio de forma sostenible. Los márgenes son excelentes y el soporte técnico es incomparable.',
      products: 'Respiradores, Cascos, Guantes'
    },
    {
      name: 'María Elena Vásquez',
      company: 'Seguridad Industrial del Bajío',
      location: 'León, Guanajuato',
      years: '3 años',
      testimonial: 'La calidad constante de los productos y la rapidez en las entregas nos han convertido en líderes en nuestra región.',
      products: 'EPP Completo, Protección Auditiva'
    },
    {
      name: 'Roberto Hernández',
      company: 'Equipos de Protección SA',
      location: 'Guadalajara, Jalisco',
      years: '4 años',
      testimonial: 'AP Safety entiende las necesidades del distribuidor. Su programa de capacitación nos ha ayudado a ser más competitivos.',
      products: 'Protección Respiratoria, Lentes'
    }
  ];

  const benefits = [
    {
      icon: '💰',
      title: 'Márgenes Atractivos',
      description: 'Hasta 40% de margen en productos seleccionados'
    },
    {
      icon: '📦',
      title: 'Inventario Garantizado',
      description: 'Stock disponible 24/7 con reposición automática'
    },
    {
      icon: '🎓',
      title: 'Capacitación Técnica',
      description: 'Programas de entrenamiento para tu equipo de ventas'
    },
    {
      icon: '🚚',
      title: 'Logística Optimizada',
      description: 'Entregas directas a tus clientes con tu marca'
    },
    {
      icon: '📱',
      title: 'Herramientas Digitales',
      description: 'Plataforma B2B para pedidos y seguimiento'
    },
    {
      icon: '🛡️',
      title: 'Soporte Técnico',
      description: 'Asesoría especializada para tus clientes'
    }
  ];

  const requirements = [
    'RFC activo y comprobante de domicilio',
    'Experiencia mínima 2 años en venta de EPP',
    'Local comercial o bodega establecida',
    'Equipo de ventas capacitado',
    'Compromiso de compra mínima mensual',
    'Cobertura geográfica definida'
  ];

  const steps = [
    {
      step: 1,
      title: 'Solicitud',
      description: 'Envía tu solicitud con documentos requeridos'
    },
    {
      step: 2,
      title: 'Evaluación',
      description: 'Revisamos tu perfil y capacidad comercial'
    },
    {
      step: 3,
      title: 'Visita',
      description: 'Visita técnica a tus instalaciones'
    },
    {
      step: 4,
      title: 'Contrato',
      description: 'Firma del acuerdo de distribución'
    },
    {
      step: 5,
      title: 'Capacitación',
      description: 'Entrenamiento en productos y ventas'
    },
    {
      step: 6,
      title: 'Lanzamiento',
      description: 'Inicio de operaciones comerciales'
    }
  ];

  return (
    <section style={{ backgroundColor: '#f8f9fa', padding: '80px 0' }}>
      <div className="container">
        {/* Header */}
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-8">
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#2c3e50',
              marginBottom: '1rem'
            }}>
              Programa de Distribuidores
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#6c757d',
              lineHeight: '1.6'
            }}>
              Únete a nuestra red nacional de distribuidores y haz crecer tu negocio 
              con los productos de mayor demanda en seguridad industrial
            </p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-8">
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
              backgroundColor: '#fff',
              padding: '10px',
              borderRadius: '15px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
            }}>
              {[
                { key: 'benefits', label: '💼 Beneficios' },
                { key: 'testimonials', label: '💬 Testimonios' },
                { key: 'requirements', label: '📋 Requisitos' },
                { key: 'process', label: '🚀 Proceso' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    backgroundColor: activeTab === tab.key ? '#2e9e3b' : 'transparent',
                    color: activeTab === tab.key ? '#fff' : '#2c3e50',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    fontSize: '0.95rem'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Tab */}
        {activeTab === 'benefits' && (
          <div className="row">
            <div className="col-12">
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '20px',
                padding: '3rem',
                boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{
                  textAlign: 'center',
                  marginBottom: '3rem',
                  color: '#2c3e50',
                  fontSize: '2rem',
                  fontWeight: '600'
                }}>
                  ¿Por qué elegir AP Safety?
                </h3>
                <div className="row">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="col-lg-4 col-md-6 mb-4">
                      <div style={{
                        textAlign: 'center',
                        padding: '2rem',
                        height: '100%',
                        borderRadius: '15px',
                        backgroundColor: '#f8f9fa',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}>
                        <div style={{
                          fontSize: '3rem',
                          marginBottom: '1rem'
                        }}>
                          {benefit.icon}
                        </div>
                        <h4 style={{
                          fontWeight: '600',
                          color: '#2c3e50',
                          marginBottom: '1rem'
                        }}>
                          {benefit.title}
                        </h4>
                        <p style={{
                          color: '#6c757d',
                          margin: '0',
                          lineHeight: '1.6'
                        }}>
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div className="row">
            <div className="col-12">
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '20px',
                padding: '3rem',
                boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{
                  textAlign: 'center',
                  marginBottom: '3rem',
                  color: '#2c3e50',
                  fontSize: '2rem',
                  fontWeight: '600'
                }}>
                  Lo que dicen nuestros distribuidores
                </h3>
                <div className="row">
                  {distributorTestimonials.map((testimonial, index) => (
                    <div key={index} className="col-lg-4 col-md-6 mb-4">
                      <div style={{
                        backgroundColor: '#f8f9fa',
                        padding: '2rem',
                        borderRadius: '15px',
                        height: '100%',
                        position: 'relative'
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '-15px',
                          left: '20px',
                          backgroundColor: '#2e9e3b',
                          color: '#fff',
                          padding: '5px 15px',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {testimonial.years} con AP Safety
                        </div>
                        <blockquote style={{
                          fontStyle: 'italic',
                          color: '#2c3e50',
                          marginBottom: '1.5rem',
                          marginTop: '1rem',
                          lineHeight: '1.6'
                        }}>
                          "{testimonial.testimonial}"
                        </blockquote>
                        <div>
                          <h5 style={{
                            fontWeight: '600',
                            color: '#2c3e50',
                            marginBottom: '0.5rem'
                          }}>
                            {testimonial.name}
                          </h5>
                          <p style={{
                            color: '#2e9e3b',
                            fontWeight: '600',
                            marginBottom: '0.25rem',
                            fontSize: '0.9rem'
                          }}>
                            {testimonial.company}
                          </p>
                          <p style={{
                            color: '#6c757d',
                            fontSize: '0.85rem',
                            marginBottom: '0.5rem'
                          }}>
                            📍 {testimonial.location}
                          </p>
                          <p style={{
                            color: '#6c757d',
                            fontSize: '0.85rem',
                            margin: '0'
                          }}>
                            🛡️ {testimonial.products}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Requirements Tab */}
        {activeTab === 'requirements' && (
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '20px',
                padding: '3rem',
                boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{
                  textAlign: 'center',
                  marginBottom: '3rem',
                  color: '#2c3e50',
                  fontSize: '2rem',
                  fontWeight: '600'
                }}>
                  Requisitos para ser Distribuidor
                </h3>
                <div className="row">
                  <div className="col-12">
                    {requirements.map((requirement, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '1.5rem',
                        padding: '1rem',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '10px'
                      }}>
                        <div style={{
                          backgroundColor: '#2e9e3b',
                          color: '#fff',
                          borderRadius: '50%',
                          width: '30px',
                          height: '30px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '1rem',
                          fontWeight: '600',
                          fontSize: '0.9rem'
                        }}>
                          {index + 1}
                        </div>
                        <p style={{
                          margin: '0',
                          color: '#2c3e50',
                          fontWeight: '500'
                        }}>
                          {requirement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{
                  backgroundColor: '#e8f5e8',
                  padding: '2rem',
                  borderRadius: '15px',
                  marginTop: '2rem',
                  border: '2px solid #2e9e3b'
                }}>
                  <h4 style={{
                    color: '#2e9e3b',
                    fontWeight: '600',
                    marginBottom: '1rem'
                  }}>
                    💡 Nota Important:
                  </h4>
                  <p style={{
                    color: '#2c3e50',
                    margin: '0',
                    lineHeight: '1.6'
                  }}>
                    Evaluamos cada solicitud individualmente. Aunque estos son los requisitos generales, 
                    consideramos casos especiales con gran potencial de crecimiento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Process Tab */}
        {activeTab === 'process' && (
          <div className="row">
            <div className="col-12">
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '20px',
                padding: '3rem',
                boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{
                  textAlign: 'center',
                  marginBottom: '3rem',
                  color: '#2c3e50',
                  fontSize: '2rem',
                  fontWeight: '600'
                }}>
                  Proceso de Incorporación
                </h3>
                <div className="row">
                  {steps.map((step, index) => (
                    <div key={index} className="col-lg-4 col-md-6 mb-4">
                      <div style={{
                        textAlign: 'center',
                        padding: '2rem',
                        position: 'relative'
                      }}>
                        <div style={{
                          backgroundColor: '#2e9e3b',
                          color: '#fff',
                          borderRadius: '50%',
                          width: '60px',
                          height: '60px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 1.5rem',
                          fontSize: '1.5rem',
                          fontWeight: '700',
                          boxShadow: '0 5px 15px rgba(46, 158, 59, 0.3)'
                        }}>
                          {step.step}
                        </div>
                        <h4 style={{
                          fontWeight: '600',
                          color: '#2c3e50',
                          marginBottom: '1rem'
                        }}>
                          {step.title}
                        </h4>
                        <p style={{
                          color: '#6c757d',
                          margin: '0',
                          lineHeight: '1.6'
                        }}>
                          {step.description}
                        </p>
                        {index < steps.length - 1 && (
                          <div style={{
                            position: 'absolute',
                            top: '50%',
                            right: '-25px',
                            transform: 'translateY(-50%)',
                            color: '#2e9e3b',
                            fontSize: '1.5rem',
                            display: window.innerWidth > 991 ? 'block' : 'none'
                          }}>
                            →
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="row justify-content-center mt-5">
          <div className="col-lg-8 text-center">
            <div style={{
              backgroundColor: '#2e9e3b',
              padding: '3rem',
              borderRadius: '20px',
              color: '#fff'
            }}>
              <h3 style={{
                fontWeight: '600',
                marginBottom: '1rem',
                fontSize: '2rem'
              }}>
                ¿Listo para ser parte de la familia AP Safety?
              </h3>
              <p style={{
                marginBottom: '2rem',
                fontSize: '1.2rem',
                opacity: '0.9'
              }}>
                Completa el formulario y un especialista se contactará contigo en menos de 24 horas
              </p>
              <a
                href="mailto:distribuidores@apsafety.com?subject=Solicitud de Distribuidor"
                style={{
                  backgroundColor: '#fff',
                  color: '#2e9e3b',
                  padding: '15px 30px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  fontSize: '1.1rem'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                🤝 Solicitar Información
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DistribuidoresSection;