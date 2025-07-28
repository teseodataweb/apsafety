import React, { Fragment } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import InfIcon2 from '../../img/icon/phone_17470591.png';
import InfIcon3 from '../../img/icon/mail_10335208.png';
import ContactForm from '../ContactFrom/ContactForm';
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import './AsesoriaTecnica.css';

const AsesoriaTecnica = () => {
    return (
        <div className="asesoria-tecnica-page">
            <Navbar hclass={'header-section'} />

            <section className="contact-info-section fix section-padding section-bg-2">
                <div className="container">
                    <div className="row g-4 justify-content-center">
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".5s">
                            <div className="contact-info-items info-card-green text-center">
                                <div className="icon">
                                    <img src={InfIcon2} alt="Teléfono" className="green-icon" />
                                </div>
                                <div className="content">
                                    <h3>Teléfono</h3>
                                    <p>33-20-20-01-22</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".7s">
                            <div className="contact-info-items info-card-green text-center">
                                <div className="icon">
                                    <img src={InfIcon3} alt="Correo electrónico" className="green-icon" />
                                </div>
                                <div className="content">
                                    <h3>Correo Electrónico</h3>
                                    <p>direccion@apmascarillas.mx</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección principal de asesoría */}
            <section className="about-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 mx-auto">
                            <div className="about-content">
                                <h1 className="wow fadeInUp main-title">Asesoría Técnica en Seguridad Laboral Certificada</h1>
                                
                                <div className="wow fadeInUp" data-wow-delay=".2s">
                                    <p className="intro-text">
                                        En AP SAFETY te acompañamos a implementar un entorno laboral seguro, cumpliendo con las normativas NOM-STPS, ANSI e ISO. Nuestra asesoría técnica está diseñada para empresas que requieren soluciones efectivas y adaptadas a sus procesos industriales.
                                    </p>
                                </div>
                                
                                <h2 className="wow fadeInUp section-subtitle" data-wow-delay=".3s">¿Por qué confiar en nuestra asesoría?</h2>
                                <p className="wow fadeInUp" data-wow-delay=".4s">
                                    Porque entendemos los riesgos que enfrentas en campo. Te ayudamos a prevenir accidentes, evitar sanciones y elevar los estándares de seguridad operativa con apoyo técnico especializado.
                                </p>
                                
                                <h2 className="wow fadeInUp section-subtitle mt-5" data-wow-delay=".5s">Servicios que ofrecemos</h2>
                                
                                <div className="row mt-4">
                                    <div className="col-md-6 col-lg-3 mb-4 wow fadeInUp" data-wow-delay=".3s">
                                        <div className="service-card h-100 p-4 rounded">
                                            <div className="service-icon green-text mb-3">
                                                <i className="fas fa-clipboard-check fa-2x"></i>
                                            </div>
                                            <h3>Evaluación de Riesgos</h3>
                                            <p>Identificamos peligros críticos en tus instalaciones con respaldo técnico documentado.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-3 mb-4 wow fadeInUp" data-wow-delay=".4s">
                                        <div className="service-card h-100 p-4 rounded">
                                            <div className="service-icon green-text mb-3">
                                                <i className="fas fa-file-contract fa-2x"></i>
                                            </div>
                                            <h3>Cumplimiento Normativo</h3>
                                            <p>Asesoría en NOM-115-STPS, ANSI Z87/Z89 e ISO 11612 para auditorías y licitaciones.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-3 mb-4 wow fadeInUp" data-wow-delay=".5s">
                                        <div className="service-card h-100 p-4 rounded">
                                            <div className="service-icon green-text mb-3">
                                                <i className="fas fa-hard-hat fa-2x"></i>
                                            </div>
                                            <h3>Selección de EPP</h3>
                                            <p>Recomendamos el equipo de protección más adecuado para tus necesidades específicas.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-lg-3 mb-4 wow fadeInUp" data-wow-delay=".6s">
                                        <div className="service-card h-100 p-4 rounded">
                                            <div className="service-icon green-text mb-3">
                                                <i className="fas fa-chalkboard-teacher fa-2x"></i>
                                            </div>
                                            <h3>Capacitación Técnica</h3>
                                            <p>Cursos presenciales o virtuales adaptados a tu industria y procesos.</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <h2 className="wow fadeInUp section-subtitle mt-5" data-wow-delay=".7s">Beneficios para tu empresa</h2>
                                <div className="row wow fadeInUp benefits-container" data-wow-delay=".8s">
                                    <div className="col-md-6">
                                        <ul className="benefits-list">
                                            <li className="mb-3"><i className="fas fa-check-circle green-text me-2"></i> Reducción de accidentes laborales</li>
                                            <li className="mb-3"><i className="fas fa-check-circle green-text me-2"></i> Cumplimiento con auditorías</li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <ul className="benefits-list">
                                            <li className="mb-3"><i className="fas fa-check-circle green-text me-2"></i> Mejora continua en seguridad</li>
                                            <li className="mb-3"><i className="fas fa-check-circle green-text me-2"></i> Ahorro por selección correcta de EPP</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="cta-section text-center mt-5 py-5 wow fadeInUp" data-wow-delay=".9s">
                                    <h2 className="mb-4">¿Listo para fortalecer la seguridad en tu empresa?</h2>
                                    <p className="lead mb-4">Nuestros expertos están listos para ayudarte</p>
                                    <Link to="/contacto" className="btn btn-primary btn-lg green-btn">
                                        Solicitar asesoría personalizada
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact-section section-padding pt-0 section-bg-2">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="contact-form-items p-4 rounded">
                                <div className="contact-title text-center mb-5">
                                    <h3 className="wow fadeInUp" data-wow-delay=".3s">
                                        Completa el formulario y un asesor técnico se pondrá en contacto en menos de 24 horas
                                    </h3>
                                </div>
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
