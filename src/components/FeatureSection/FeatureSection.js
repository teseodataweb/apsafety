import React from 'react';
import './FeatureSection.css';


import Feature1 from '../../img/feature/descarga (1).png'
import Feature2 from '../../img/feature/descarga (2).png'
import Feature3 from '../../img/feature/descarga.png'

const FeatureSection = () => {
    return (
        <section className="feature-section fix section-padding">
            <div className="container">
                <div className="feature-wrapper">
                    <div className="row g-4">
                        <div className="col-12">

                            <div className="feature-box-items">
                                <div className="icon">
                                    <img src={Feature1} alt="img" />
                                </div>
                            
                            </div>
                        </div>
                                     <div className="col-12">
                            <div className="feature-box-items">
                                <div className="icon">
                                    <img src={Feature2} alt="img" />
                                </div>
                                
                            </div>
                        </div>
                                <div className="col-12">
                            <div className="feature-box-items">
                                <div className="icon">
                                    <img src={Feature3} alt="img" />
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;