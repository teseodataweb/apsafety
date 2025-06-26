import React from 'react';

/* image  */
import Abimg1 from '../../img/about/dot-1.png'
import Abimg2 from '../../img/about/dot-2.png'
import Abimg3 from '../../img/about/circle.png'
import Abimg4 from '../../img/about/cap.png'
import Abimg5 from '../../img/about/shape.png'
import Abimg6 from '../../img/about/descarga.png'
import Abimg7 from '../../img/about/descarga (1).png'
import Abimg8 from '../../img/about/descarga (2).png'
import Abimg9 from '../../img/line.png'
import Abimg10 from '../../img/icon/01.svg'
import Abimg11 from '../../img/about/author.png'
import Abimg12 from '../../img/about/line.png'
import Abimg13 from '../../img/icon/02.svg'
import { Link } from 'react-router-dom';
import './About.css';



const about = () => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    return (
        <section className="about-section section-padding pt-0">
            <div className="dot-shape">
                <img src={Abimg1} alt="img" />
            </div>
            <div className="dot-shape-2">
                <img src={Abimg2} alt="img" />
            </div>
            <div className="container">
                <div className="about-wrapper">
                    <div className="row g-4">
                        <div className="col-lg-6">
                            <div className="about-image-items">
                                <div className="circle-shape float-bob-y">
                                    <img src={Abimg3} alt="img" />
                                </div>
                                <div className="cap-shape float-bob-x">
                                    <img src={Abimg4} alt="img" />
                                </div>
                                <div className="shape-img">
                                    <img src={Abimg5} alt="img" />
                                </div>
                                <div className="about-image-1 wow fadeInUp">
                                    <img src={Abimg6} alt="img" className="about-img-control" />
                                    </div>
                                    <div className="about-image-2">
                                        <img src={Abimg7} alt="img" className="about-img-control" />
                                        </div>
                                        <div className="about-image-3">
                                            <img src={Abimg8} alt="img" className="about-img-control" />
                                            </div>

                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-content">
                                <div className="section-title">
                                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                                        ¿Tus proyectos industriales están desprotegidos?
                                    </h2>
                                </div>
                                <p className="mt-3 mt-md-0 wow fadeInUp" data-wow-delay=".5s">
                                   En sectores como minería, construcción o química, usar equipo de protección no certificado puede causar accidentes,
                                    multas o pérdidas operativas. Muchas empresas no logran abastecerse a tiempo, o confían en distribuidores sin respaldo técnico.
                                </p>
                                  <p>En AP SAFETY entendemos los riesgos. Por eso, fabricamos y distribuimos EPP con
                                     normas NOM-STPS, ANSI y ISO, con entregas en 72 horas a zonas remotas.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default about;