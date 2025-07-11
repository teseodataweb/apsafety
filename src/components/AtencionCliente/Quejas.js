import React, { Fragment } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import ContactForm from '../ContactFrom/Formulary';
import { Link } from 'react-router-dom';
import './Quejas.css';



const Quejas = () => {
    return (
        <div className="asesoria-tecnica-page">
                                <Navbar hclass={'header-section'} />
            {/* Sección principal de asesoría */}
                    <section className="about-section section-padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-10 mx-auto">
                                    <div className="about-content">
                                        <h1 className="wow fadeInUp main-title">Tu opinión nos importa</h1>
                                        
                                        <div className="wow fadeInUp" data-wow-delay=".2s">
                                            <p className="intro-text">
                                                En AP SAFETY, valoramos tus comentarios y estamos comprometidos con la mejora continua de nuestros productos y servicios. 
                                                Si has tenido alguna experiencia que no cumplió con tus expectativas, por favor, háznoslo saber.
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
                                            <h3 className="wow fadeInUp" data-wow-delay=".3s">Completa el formulario y un asesor técnico se pondrá en contacto en menos de 24 horas</h3>
                                        </div>
                                        <ContactForm/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            );
}