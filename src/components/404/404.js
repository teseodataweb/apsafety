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
                    <h3 className="wow fadeInUp split-text right" data-wow-delay=".5s">Solo Administrador Principal</h3>
                    <Link onClick={ClickHandler} to="/productos" className="theme-btn"> Volver a Inicio</Link>
                </div>
            </div>
        </section>
    )
}

export default Error;