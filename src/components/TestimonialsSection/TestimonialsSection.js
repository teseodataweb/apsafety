import React, { useState, useEffect } from 'react';
import '../../css/corporate-colors.css';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'María González',
      company: 'Industrias Químicas del Norte',
      position: 'Coordinadora de Seguridad Industrial',
      testimonial: 'Los respiradores N95 de AP Safety han superado todas nuestras expectativas. La calidad es excepcional y las entregas siempre puntuales. Llevamos 3 años trabajando con ellos.',
      rating: 5,
      industry: 'Químicos'
    },
    {
      name: 'Carlos Ramírez',
      company: 'Construcción y Desarrollo SA',
      position: 'Gerente de Obra',
      testimonial: 'El servicio de personalización de cascos nos permitió mejorar la identificación de nuestros equipos. Excelente calidad y soporte técnico de primera.',
      rating: 5,
      industry: 'Construcción'
    },
    {
      name: 'Ana Rodríguez',
      company: 'Minera Los Andes',
      position: 'Jefa de Seguridad e Higiene',
      testimonial: 'AP Safety entiende las necesidades específicas de la industria minera. Sus productos certificados nos dan la confianza que necesitamos para proteger a nuestro equipo.',
      rating: 5,
      industry: 'Minería'
    },
    {
      name: 'Roberto Silva',
      company: 'Manufactura Industrial MX',
      position: 'Director de Operaciones',
      testimonial: 'La rapidez de entrega en 72 horas nos ha salvado en múltiples ocasiones cuando necesitamos EPP urgente. Calidad y servicio excepcionales.',
      rating: 5,
      industry: 'Manufactura'
    },
    {
      name: 'Patricia Hernández',
      company: 'Petroquímica Nacional',
      position: 'Especialista en Seguridad',
      testimonial: 'Los guantes industriales y equipos de protección respiratoria de AP Safety cumplen con los más altos estándares de nuestra industria. Recomendados al 100%.',
      rating: 5,
      industry: 'Petroquímica'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        style={{ 
          color: index < rating ? '#f39c12' : '#ddd',
          fontSize: '1.2rem',
          marginRight: '2px'
        }}
      >
        ★
      </span>
    ));
  };

  const getIndustryColor = (industry) => {
    const colors = {
      'Químicos': '#e74c3c',
      'Construcción': '#3498db',
      'Minería': '#8e44ad',
      'Manufactura': '#2e9e3b',
      'Petroquímica': '#f39c12'
    };
    return colors[industry] || '#2c3e50';
  };

  return (
    <section style={{
      backgroundColor: 'var(--ap-section-ap-secondary)',
      padding: '80px 0',
      position: 'relative'
    }}>
      <div className="container">
        <div className="row justify-content-center text-center mb-5">
          <div className="col-lg-8">
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'var(--ap-font-weight-medium)',
              marginBottom: '1rem',
              color: 'var(--ap-text-primary)'
            }}>
              Lo que opinan nuestros clientes
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: 'var(--ap-text-secondary)',
              lineHeight: '1.6'
            }}>
              Más de 500 empresas confían en AP Safety para la protección 
              de sus trabajadores
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card-ap" style={{
              position: 'relative',
              padding: '3rem',
              minHeight: '300px',
              display: 'flex',
              alignItems: 'center'
            }}>
              {/* Testimonial Content */}
              <div className="w-100 text-center">
                <div style={{
                  display: 'inline-block',
                  backgroundColor: getIndustryColor(testimonials[currentTestimonial].industry),
                  color: '#fff',
                  padding: '5px 15px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  marginBottom: '1.5rem'
                }}>
                  {testimonials[currentTestimonial].industry}
                </div>

                <blockquote style={{
                  fontSize: '1.3rem',
                  fontStyle: 'italic',
                  color: 'var(--ap-text-primary)',
                  marginBottom: '2rem',
                  lineHeight: '1.6',
                  fontWeight: 'var(--ap-font-weight-normal)'
                }}>
                  "{testimonials[currentTestimonial].testimonial}"
                </blockquote>

                <div style={{ marginBottom: '1rem' }}>
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>

                <div>
                  <h4 style={{
                    fontWeight: 'var(--ap-font-weight-medium)',
                    color: 'var(--ap-text-primary)',
                    marginBottom: '0.5rem',
                    fontSize: '1.2rem'
                  }}>
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p style={{
                    color: 'var(--ap-text-secondary)',
                    fontSize: '0.95rem',
                    marginBottom: '0.25rem'
                  }}>
                    {testimonials[currentTestimonial].position}
                  </p>
                  <p style={{
                    color: 'var(--ap-green-medium)',
                    fontSize: '0.9rem',
                    fontWeight: 'var(--ap-font-weight-medium)',
                    margin: '0'
                  }}>
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevTestimonial}
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'var(--ap-green-medium)',
                  color: 'var(--ap-white)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  transition: 'var(--ap-transition)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--ap-shadow-light)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--ap-green-dark)';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--ap-green-medium)';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
                aria-label="Testimonio anterior"
              >
                ←
              </button>

              <button
                onClick={nextTestimonial}
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'var(--ap-green-medium)',
                  color: 'var(--ap-white)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  transition: 'var(--ap-transition)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--ap-shadow-light)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--ap-green-dark)';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--ap-green-medium)';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }}
                aria-label="Siguiente testimonio"
              >
                →
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="text-center mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: 'none',
                    margin: '0 5px',
                    backgroundColor: index === currentTestimonial ? 'var(--ap-green-medium)' : 'var(--ap-gray-medium)',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                  }}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="row justify-content-center mt-5">
          <div className="col-lg-8 text-center">
            <div className="section-ap-primary" style={{
              padding: '2.5rem',
              borderRadius: '15px'
            }}>
              <h3 style={{
                fontWeight: 'var(--ap-font-weight-medium)',
                marginBottom: '1rem',
                fontSize: '1.8rem'
              }}>
                ¿Quieres proteger tu operación con equipo certificado?
              </h3>
              <p style={{
                marginBottom: '2rem',
                fontSize: '1.1rem',
                opacity: '0.9'
              }}>
                Solicita una asesoría técnica gratuita o conviértete en distribuidor
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <a
                  href="/asesoria-tecnica"
                  style={{
                    backgroundColor: 'var(--ap-white)',
                    color: 'var(--ap-green-medium)',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'var(--ap-font-weight-medium)',
                    display: 'inline-block',
                    transition: 'var(--ap-transition)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = 'var(--ap-shadow-medium)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Solicita Asesoría Técnica
                </a>
                <a
                  href="/about"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'var(--ap-white)',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'var(--ap-font-weight-medium)',
                    display: 'inline-block',
                    border: '2px solid var(--ap-white)',
                    transition: 'var(--ap-transition)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--ap-white)';
                    e.currentTarget.style.color = 'var(--ap-green-medium)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--ap-white)';
                  }}
                >
                  Conviértete en Distribuidor
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;