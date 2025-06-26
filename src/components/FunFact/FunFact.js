import React from 'react'
import CountUp from 'react-countup';
const FunFact = (props) => {

    return (
        <section className={"" + props.hclass}>
            <div className="container">
                <div className="counter-text text-center">
                    <h2 className="wow fadeInUp">Calidad Verificada para Ambientes de Alto Riesgo</h2>
                </div>
                <div className="row">
                    <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".2s">
                        <div className="counter-items">
                            <div className="counter-title">
                                <h2>NOM-STPS</h2>
                            </div>
                            <p className="text-center">Normas Oficiales Mexicanas</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".4s">
                        <div className="counter-items">
                            <div className="counter-title bg-2">
                                <h2>ANSI Z87, Z89</h2>
                            </div>
                            <p className="text-center">Estándares estadounidenses de seguridad visual y de casco</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".6s">
                        <div className="counter-items">
                            <div className="counter-title bg-3">
                                <h2>ISO - 11612</h2>
                            </div>
                            <p className="text-center">Resistencia térmica para ropa de protección</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default FunFact;