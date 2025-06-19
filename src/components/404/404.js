import React from 'react'
import {Link} from 'react-router-dom'


const Error = (props) => {
    const ClickHandler = () =>{
        window.scrollTo(10, 0);
     }

    return(
        <section className="error-section section-bg-2 section-padding fix">
            <div className="container">
                <div className="error-content text-center">
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">404</h2>
                    <h3 className="wow fadeInUp split-text right" data-wow-delay=".5s">Lo sentimos, Página no encontrada</h3>
                    <Link onClick={ClickHandler} to="/home" className="theme-btn"> Volver a Inicio</Link>
                </div>
            </div>
        </section>
    )
}

export default Error;