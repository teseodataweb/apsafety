import React from 'react'

const FunFact = (props) => {

    return (
        <section className={"" + props.hclass} style={{ textAlign: 'center' }}>
            <div className="container">
                <div className="counter-text" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 className="wow fadeInUp">Calidad Verificada para Ambientes de Alto Riesgo</h2>
                </div>
                <div
                  className="row"
                  style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}
                >
                    <div
                      className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp"
                      data-wow-delay=".4s"
                      style={{ flex: '0 1 300px', maxWidth: '300px' }}
                    >
                        <div className="counter-items" style={{ textAlign: 'center' }}>
                            <div className="counter-title bg-3">
                                <h3>NOM-STPS</h3>
                            </div>
                            <p>Normas Oficiales Mexicanas</p>
                        </div>
                    </div>
                    <div
                      className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp"
                      data-wow-delay=".4s"
                      style={{ flex: '0 1 300px', maxWidth: '300px' }}
                    >
                        <div className="counter-items" style={{ textAlign: 'center' }}>
                            <div className="counter-title bg-3">
                                <h3>ANSI Z87, Z89</h3>
                            </div>
                            <p>Estándares estadounidenses de seguridad visual y de casco</p>
                        </div>
                    </div>
                    <div
                      className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp"
                      data-wow-delay=".4s"
                      style={{ flex: '0 1 300px', maxWidth: '300px' }}
                    >
                        <div className="counter-items" style={{ textAlign: 'center' }}>
                            <div className="counter-title bg-3">
                                <h3>ISO - 11612</h3>
                            </div>
                            <p>Resistencia térmica para ropa de protección</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FunFact;
