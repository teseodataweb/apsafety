import React from 'react';
import { Link } from 'react-router-dom';
import abImg from '../../img/about/descarga (1).png';

const About2 = (props) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    };

    return (
        <>
            <style>{`
                .about-image::before,
                .about-image-items::before {
                    display: none !important;
                    content: none !important;
                    background: none !important;
                }
            `}</style>

            <section className={"" + props.hclass}>
                <div className="container">
                    <div className="about-wrapper-2">
                        <div className="row g-4 align-items-center">
                            <div className="col-lg-6">
                                <div className="about-image-items">
                                    <div
                                        className="about-image wow img-custom-anim-top"
                                        style={{ textAlign: 'center' }}
                                    >
                                        <img
                                            src={abImg}
                                            alt="img"
                                            style={{
                                                maxWidth: '70%',
                                                height: 'auto',
                                                borderRadius: '12px',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="about-content">
                                    <div className="section-title">
                                        <h2 className="wow fadeInUp">
                                            Beneficios de Ser Distribuidor
                                        </h2>
                                    </div>
                                    <p className="mt-3 mt-md-0 wow fadeInUp">
                                        ¿Por qué asociarte con AP SAFETY?
                                    </p>
                                    <ul className="about-list wow fadeInUp">
                                        <li><i className="fa-solid fa-check"></i>Acceso a productos certificados bajo NOM y ISO.</li>
                                        <li><i className="fa-solid fa-check"></i>Soporte técnico y asesoría personalizada.</li>
                                        <li><i className="fa-solid fa-check"></i>Material promocional y capacitaciones exclusivas.</li>
                                        <li><i className="fa-solid fa-check"></i>Precios preferenciales y promociones especiales.</li>
                                        <li><i className="fa-solid fa-check"></i>Presencia en eventos y ferias del sector.</li>
                                    </ul>
                                    <div className="about-author">
                                        <Link
                                        onClick={ClickHandler}
                                        to="/shop-details/Calendar-printing-design"
                                        className="theme-btn wow fadeInUp"
                                        style={{
                                            borderRadius: '6px', 
                                            padding: '0.75rem 1.5rem',
                                            fontWeight: '600',
                                            fontSize: '1rem',
                                            textDecoration: 'none',
                                            }}>
                                                Conoce nuestras certificaciones
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About2;
