import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar/Navbar';
import ContactForm from '../ContactFrom/Formulary';
import { Link } from 'react-router-dom';
import './Quejas.css';
import Formulary from '../ContactFrom/Formulary';
import FooterS4 from '../footerS3/footerS4';

const Quejas = () => {
    return (
        <div className="asesoria-tecnica-page">
            <Helmet>
                <title>Quejas y Sugerencias | AP SAFETY</title>
                <meta
                    name="description"
                    content="Envía tus quejas o sugerencias a AP SAFETY. Estamos comprometidos con la mejora continua y valoramos tus comentarios para ofrecerte un mejor servicio."
                />
            </Helmet>

            <Navbar hclass={'header-section'} />

            {/* Sección principal de asesoría */}
            <section className="about-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <div className="about-content">
                                <h1 className="wow fadeInUp main-title">Tu opinión nos importa</h1>
                                <div className="wow fadeInUp" data-wow-delay=".2s">
                                    <p className="intro-text">
                                        En AP SAFETY, valoramos tus comentarios y estamos comprometidos con la mejora continua de nuestros productos y servicios. 
                                        <p>Si has tenido alguna experiencia que no cumplió con tus expectativas, por favor, háznoslo saber.</p>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact-section section-padding pt-0 section-bg-2">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="contact-form-items p-4 rounded">
                                <div className="contact-title text-center mb-5">
                                    <h3 className="wow fadeInUp" data-wow-delay=".2s">
                                        Completa el formulario y un asesor técnico se pondrá en contacto en menos de 24 horas
                                    </h3>
                                </div>
                                <Formulary/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 mx-auto">
                            <div className="about-content">
                                <h2 className="wow fadeInUp section-subtitle" data-wow-delay=".3s">¿Cómo gestionamos tu queja?</h2>
                                <div className="wow fadeInUp" data-wow-delay=".2s">
                                    <p className="wow fadeInUp" data-wow-delay=".4s">
                                        <strong>1. Recepción:</strong> Confirmamos la recepción de tu queja en un plazo máximo de 24 horas hábiles.
                                    </p>
                                    <p className="wow fadeInUp" data-wow-delay=".4s">
                                        <strong>2. Análisis:</strong> Nuestro equipo evaluará la información proporcionada para comprender la situación.
                                    </p>
                                    <p className="wow fadeInUp" data-wow-delay=".4s">
                                        <strong>3. Respuesta:</strong> Te proporcionaremos una respuesta o solución en un plazo de 5 días hábiles.
                                    </p>
                                    <p className="wow fadeInUp" data-wow-delay=".4s">
                                        <strong>4. Seguimiento:</strong> Nos aseguraremos de que la solución propuesta haya resuelto tu inquietud.
                                    </p>

                                    <h2 className="wow fadeInUp section-subtitle" data-wow-delay=".3s">¿Prefieres otro medio de contacto?</h2>
                                    <div className="wow fadeInUp" data-wow-delay=".2s">
                                        <p className="wow fadeInUp" data-wow-delay=".4s">
                                            Si lo deseas, también puedes comunicarte con nosotros a través de los siguientes canales:
                                        </p>
                                        <p className="wow fadeInUp" data-wow-delay=".4s">
                                            <strong>Correo electrónico: </strong> quejas@apsafety.com.mx
                                        </p>
                                        <p className="wow fadeInUp" data-wow-delay=".4s">
                                            <strong>Teléfono: </strong> +52 55 5718 1075
                                        </p>
                                        <p className="wow fadeInUp" data-wow-delay=".4s">
                                            <strong>WhatsApp: </strong> +52 1 791 110 1246
                                        </p>

                                        <h2 className="wow fadeInUp section-subtitle" data-wow-delay=".3s">Nuestro Compromiso</h2>
                                        <div className="wow fadeInUp" data-wow-delay=".2s">
                                            <p className="wow fadeInUp" data-wow-delay=".4s">
                                                En AP SAFETY, nos esforzamos por ofrecer productos y servicios de la más alta calidad. 
                                                Tus comentarios son esenciales para ayudarnos a identificar áreas de mejora y garantizar la satisfacción de nuestros clientes.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div>
                <FooterS4/>
            </div>
        </div>
    );
}

export default Quejas;
