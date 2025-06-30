import React, { Fragment } from 'react';
import NavbarS2 from '../../components/NavbarS2/NavbarS2';
import PageTitle from '../../components/pagetitle/PageTitle'
import { useParams } from 'react-router-dom'
import VideoModal from '../../components/ModalVideo/VideoModal';
import Services from '../../api/Services';
import ServiceSidebar from './sidebar'


import FooterS3 from '../../components/footerS3/FooterS3';

import Video from '../../img/service/details-2.jpg'

import InfIcon1 from '../../img/icon/location.png'
import InfIcon2 from '../../img/icon/12.svg'
import InfIcon3 from '../../img/icon/13.svg'

const ServiceSinglePage = (props) => {
    const { slug } = useParams()

    const serviceDetails = Services.find(item => item.slug === slug)

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }
    return (
        <Fragment>
            <NavbarS2 hclass={'header-section-2 style-two'} />
            <PageTitle pageTitle={'Laboratorio de Pruebas Certificadas para Equipos de Protección Personal'} pagesub={serviceDetails.title} />
            <section className="service-details-section fix section-padding section-bg-2">
                <div className="container">
                    <div className="service-details-wrapper">
                        <div className="row g-5">
                            <div className="col-lg-4 order-2 order-md-1">
                                <ServiceSidebar />
                            </div>
                            <div className="col-lg-8 order-1 order-md-2">
                                <div className="service-details-image">
                                    <img src={serviceDetails.sSImg} alt="img" />
                                </div>
                                <div className="service-details-content">
                                    <p className="mt-3">
                                       En AP SAFETY, contamos con un laboratorio de pruebas acreditado por la Entidad Mexicana de Acreditación (EMA), 
                                       especializado en evaluar la eficacia y seguridad de equipos de protección personal (EPP). Nuestro compromiso
                                        es garantizar que cada producto cumpla con las normativas nacionales e internacionales más exigentes.
                                    </p>
                                    <h2 className="mt-5 split-text right">Servicios de Pruebas de Laboratorio</h2>
                                    <h3 className="mt-5 split-text right">Pruebas de Eficiencia de Filtración</h3>
                                    <p className="mt-3">
                                        Evaluamos la capacidad de los filtros para retener partículas nocivas, 
                                        asegurando que los respiradores cumplan con los estándares de eficiencia requeridos.
                                    </p>
                                    <p className="mt-3">
                                        Realizamos pruebas para verificar el ajuste adecuado de los equipos de protección respiratoria, 
                                        garantizando una protección efectiva para el usuario.
                                    </p>
                                    <p className="mt-3">
                                        Medimos la resistencia al flujo de aire durante la inhalación y exhalación, asegurando la comodidad 
                                        y seguridad del usuario durante el uso prolongado del EPP.
                                    </p>
                                    <p className="mt-3">
                                        Evaluamos la resistencia de los materiales del EPP al fuego, garantizando su desempeño en ambientes
                                         con riesgos de incendio.
                                    </p>
                                    <div className="service-details-video">
                                        <div className="row g-4 align-items-center">
                                            <div className="col-lg-8">
                                                <div className="video-image">
                                                    <img src={Video} alt="img" />
                                                    <div className="video-box">
                                                        <VideoModal/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-15">
                                                <div className="details-video-content">
                                                    <h2 className="mb-3 split-text right">Beneficios de Nuestro Laboratorio</h2>
                                                    <ul>
                                                        <li>
                                                            <i className="fa-solid fa-circle-check"></i>
                                                            Acreditación por la EMA, asegurando la validez y reconocimiento de nuestras pruebas.
                                                        </li>
                                                        <li>
                                                            <i className="fa-solid fa-circle-check"></i>
                                                            Equipos de última generación para pruebas precisas y confiables.
                                                        </li>
                                                        <li>
                                                            <i className="fa-solid fa-circle-check"></i>
                                                            Personal altamente capacitado y comprometido con la calidad.
                                                        </li>
                                                        <li>
                                                            <i className="fa-solid fa-circle-check"></i>
                                                            Cumplimiento con normativas como NOM-STPS, ANSI e ISO.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                         <section className="contact-info-section fix section-padding section-bg-2">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-6col-md-6 wow fadeInUp" data-wow-delay=".3s">
                            <div className="contact-info-items text-center">
                                <div className="icon">
                                    <img src={InfIcon1} alt="icon-img" />
                                </div>
                                <div className="content">
                                    <h3>Ubicación</h3>
                                    <p>
                                        Nuestro laboratorio se encuentra en la Reserva Industrial de las 11 Hectáreas,  <br />
                                        Lote 4, Manzana 3, C.P. 43998, Tepeapulco Centro, Hidalgo, México.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".5s">
                            <div className="contact-info-items active text-center">
                                <div className="icon">
                                      <img src={InfIcon2} alt="icon-img" />
                                </div>
                                <div className="content">
                                    <h3>Numero de Telefono</h3>
                                    <p>
                                        +52 5611262476
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".7s">
                            <div className="contact-info-items text-center">
                                <div className="icon">
                                       <img src={InfIcon3} alt="icon-img" />
                                </div>
                                <div className="content">
                                    <h3>Correo Electronico</h3>
                                    <p>
                                        ap_testinglab@outlook.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="contact-section section-padding pt-0 section-bg-2">
                <div className="contact-title">
                    <p> ¿Necesitas certificar tus equipos de protección personal? <br/>
                    Contáctanos para obtener más información sobre nuestros servicios de pruebas de laboratorio.</p>
                <a href="/contact" role="button">Solicitar Información</a>
                
                                                    </div>
                                                </section>
                                            </div>
                                         </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </section>
            <FooterS3 />
        </Fragment>
    )
};
export default ServiceSinglePage;
