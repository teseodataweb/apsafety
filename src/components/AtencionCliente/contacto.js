import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import FormularioC from '../ContactFrom/FormularioC';
import FormularioC2 from '../ContactFrom/FormularioC2';
import FormularioC3 from '../ContactFrom/FormularioC3';
import FormularioC4 from '../ContactFrom/FormularioC4';
import './contacto.css';
import FooterS4 from '../footerS3/footerS4';




const Contacto = () =>{
    return(
           <div className="contacto-page">
                    <Helmet>
                        <title>Contacto | Oficinas y Atención al Cliente |AP SAFETY</title>
                        <meta
                            name="description"
                            content="Contacta con AP SAFETY en México, USA o Colombia. 
                            Oficina corporativa, plantas de producción, tiendas físicas y asesores internacionales.
                             ¡Estamos para ayudarte!"
                        />
                    </Helmet>
                    <Navbar hclass={'header-section'} />
                    
                                {/* Sección principal de asesoría */}
                                <section className="about-section section-padding">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-10 mx-auto">
                                                <div className="about-content">
                                                    <h1 className="wow fadeInUp main-title">Estamos para ayudarte</h1>
                                                    <div className="wow fadeInUp" data-wow-delay=".2s">
                                                        <p className="intro-text">
                                                            ¿Tienes dudas, necesitas asesoría o deseas realizar una compra? 
                                                            <p>Encuentra aquí todos nuestros canales de contacto, ya sea en México, USA o Colombia.</p> 
                                                            Nuestro equipo está listo para atenderte.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                         <div className="about-content">
                                            <h2 className="wow fadeInUp section-subtitle" data-wow-delay=".3s">
                                                Oficina Coorporativa - México
                                            </h2>

                                            <div className="direccion">
                                                <strong>Dirección:</strong><br />
                                                Cerro Chimalpa, Manzana 50, Lote 674, Col. Lázaro Cárdenas 1ra. Sección,<br />
                                                Tlalnepantla de Baz, Estado de México, C.P. 54189a
                                            </div>

                                            <div className="contact-container">
                                                <div className="contact-box telefonos">
                                                <strong>Teléfonos:</strong>
                                                <ul>
                                                    <li>+52 55 5718 1075</li>
                                                    <li>+52 55 5718 4035</li>
                                                    <li>+52 55 5384 6159</li>
                                                    <li>+52 55 8952 0360</li>
                                                    <li>+52 55 8952 0385</li>
                                                </ul>
                                                </div>

                                                <div className="contact-box correos">
                                                <strong>Correos Electrónicos:</strong>
                                                <ul>
                                                    <li>direccion@apmascarillas.com.mx</li>
                                                    <li>ccomercial@apmascarillas.com.mx</li>
                                                    <li>ccomercialsh@apmascarillas.com.mx</li>
                                                </ul>
                                                </div>
                                            </div>
                                            </div>

                                                    <div className="container">
                                                        <div className="row justify-content-center">
                                                            <div className="col-lg-8">
                                                                <div className="contact-form-items p-4 rounded">
                                                                    <div className="contact-title text-center mb-5">
                                                                        <h3 className="wow fadeInUp" data-wow-delay=".3s">
                                                                            Formulario
                                                                        </h3>
                                                                    </div>
                                                                    <FormularioC/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> 
                                        </div>
                                    </div>
                               
                        
                                        <div className="row">
                                            <div className="col-lg-10 mx-auto">
                                                <div className="about-content">
                                                    <h2 className="wow fadeInUp section-subtitle" data-wow-delay=".3s">Tienda Abierta al Público – Tlalnepantla, Edo. de México</h2>
                                                    <div className="wow fadeInUp" data-wow-delay=".2s">
                                                        <p className="wow fadeInUp" data-wow-delay=".4s">
                                                            <strong>Dirección:</strong> Cerro Chimalpa, Manzana 50, Lote 674, Col. Lázaro Cárdenas 1ra. Sección
                                                            <p>Tlalnepantla de Baz, Estado de México, C.P. 54189</p>
                                                        </p>
                                                        <p className="wow fadeInUp" data-wow-delay=".4s">
                                                            <strong>Teléfonos:</strong> <p>+52 55 2062 5440</p>                                                           
                                                        </p>
                                                        <p className="wow fadeInUp" data-wow-delay=".4s">
                                                            <strong>Correo Electrónico:</strong> 
                                                            <p>tienda.apmascarillas@hotmail.com</p>
                                                        </p>
                                                        <p className="wow fadeInUp" data-wow-delay=".4s">
                                                            <strong>Horario:</strong> 
                                                            <p>Lunes a Viernes de 9:00 a.m. a 2:00 p.m. y de 3:00 p.m. a 6:00 p.m.</p>
                                                        </p>
                                                        <p className="wow fadeInUp" data-wow-delay=".4s">
                                                            <strong>Extras:</strong> 
                                                            <p>Contamos con entrega a domicilio y precios competitivos para negocio.</p>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                 
                          
                                        <div className="row">
                                            <div className="col-lg-10 mx-auto">
                                                <div className="about-content">
                                                    <h2 className="wow fadeInUp section-subtitle" data-wow-delay=".3s">Planta 2 y Tienda 2 – Ciudad Sahagún, Hidalgo</h2>
                                                    <div className="wow fadeInUp" data-wow-delay=".2s">
                                                        <p className="wow fadeInUp" data-wow-delay=".4s">
                                                            <strong>Dirección:</strong> Manzana III, Lote 4 #4, Col. Corredor Industrial (Reserva Industrial de la 11 Hectáreas),
                                                            <p>Ciudad Sahagún, Hidalgo</p>
                                                        </p>
                                                        <p className="wow fadeInUp" data-wow-delay=".4s">
                                                            <strong>Teléfono:</strong> <p>+52 1 791 915 3713</p>                                                           
                                                        </p>
                                                        <p className="wow fadeInUp" data-wow-delay=".4s">
                                                            <p><strong>"Nuestra segunda planta y tienda también ofrecen atención directa al cliente."</strong></p>
                                                        </p>
                                                        <div className="contact-form-items form-small p-4 rounded">
                                                            <div className="contact-title text-center mb-5">
                                                                <h3 className="wow fadeInUp" data-wow-delay=".3s">Formulario de contacto rápido</h3>
                                                            </div>
                                                            <FormularioC2 />
                                                       </div>
                                                   </div>
                                                </div>
                                            </div>
                                        </div>
                                  
                                        <div className="row">
                                            <div className="col-lg-10 mx-auto">
                                                <div className="about-content">
                                                    <h2 className="wow fadeInUp section-subtitle" data-wow-delay=".3s">Oficina Comercial – AP SAFETY USA</h2>
                                                    <div className="wow fadeInUp" data-wow-delay=".2s">
                                                        <p className="wow fadeInUp" data-wow-delay=".4s">
                                                            <strong>Dirección:</strong> 4602 De Zavala, Suite 101,
                                                            <p>San Antonio, TX 78249-3545, EE. UU.</p>
                                                        </p>
                                                        <p className="wow fadeInUp" data-wow-delay=".4s">
                                                            <strong>Teléfono:</strong> <p>+1 484 343 4690</p>                                                           
                                                        </p>
                                                        <p className="wow fadeInUp" data-wow-delay=".4s">
                                                            <strong>Correo:</strong> <p>pcattori@apsafetyusa.com</p>                                                           
                                                        </p>
                                                        <p className="wow fadeInUp" data-wow-delay=".4s">
                                                            <p><strong>"Atendemos a distribuidores y compradores de Estados Unidos y Centroamérica."</strong></p>
                                                        </p>
                                                        <div className="contact-form-items form-small p-4 rounded">
                                                            <div className="contact-title text-center mb-5">
                                                                <h3 className="wow fadeInUp" data-wow-delay=".3s">Formulario de contacto rápido</h3>
                                                            </div>
                                                            <FormularioC3 />
                                                       </div>
                                                   </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                        <div className="row">
                                            <div className="col-lg-10 mx-auto">
                                                <div className="about-content">
                                                    <h2 className="wow fadeInUp section-subtitle" data-wow-delay=".3s">AP Andina SAS – Oficina Comercial en Colombia</h2>
                                                    <div className="wow fadeInUp" data-wow-delay=".2s">
                                                        <p className="wow fadeInUp" data-wow-delay=".4s">
                                                            <strong>Dirección:</strong> Transversal 93 #53-32 Bodega 24, Bogotá D.C. Colombia,
                                                            <p>C.P. 111071</p>
                                                        </p>
                                                        <p className="wow fadeInUp" data-wow-delay=".4s">
                                                            <strong>Teléfonos:</strong> <p>+57 601 466 1411</p>   
                                                            <p>+57 317 658 1689</p>                                                        
                                                        </p>
                                                        <p className="wow fadeInUp" data-wow-delay=".4s">
                                                            <strong>Correos:</strong> <p>ventas@apandina.com</p>    
                                                            <p>pprieto@apandina.com</p>                                                       
                                                        </p>
                                                        <p className="wow fadeInUp" data-wow-delay=".4s">
                                                            <p><strong>"Ofrecemos cobertura nacional en Colombia para distribución, atención comercial y soporte técnico."</strong></p>
                                                        </p>
                                                        <div className="contact-form-items form-small p-4 rounded">
                                                            <div className="contact-title text-center mb-5">
                                                                <h3 className="wow fadeInUp" data-wow-delay=".3s">Formulario de contacto rápido</h3>
                                                            </div>
                                                            <FormularioC4 />
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
    )
}

export default Contacto ;