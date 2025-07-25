import React from "react";
import { Link } from "react-router-dom";

const ClickHandler = () => {
  window.scrollTo(10, 0);
};

const HeroSection = () => {

    return (
        <section className="hero-section">
            <Swiper
                modules={[Navigation,  Autoplay, EffectFade]}
                loop={true}
                slidesPerView={1}
                effect="fade"
                speed={3000}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
              
            >
                <SwiperSlide>
                    <div
                        className="hero-2 bg-cover"
                        style={{ backgroundImage: `url(${hero1})` }}
                    >
                        <div className="hero-image">
                             
                            
                        </div>
                        <div className="container">
                            <div className="row justify-content-xxl-end">
                                <div className="col-lg-7">
                                    <div
                                        className="hero-content"
                                        data-animation="fadeInUp"
                                        data-delay="1.1s"
                                        style={{
                                            backgroundImage: `url(${Shapbg})`,
                                        }}
                                    >
                                        <h1 data-animation="fadeInUp" data-delay="1.5s">
                                            Conviértete en Distribuidor Oficial de AP SAFETY 
                                        </h1>
                                        <div className="hero-button">
                                            <Link onClick={ClickHandler} to="/contac"
                                                data-animation="fadeInUp"
                                                data-delay="1.9s"
                                                className="theme-btn hover-white"
                                            >
                                                Order Today
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="hero-2 bg-cover"
                        style={{ backgroundImage: `url(${hero2})` }}
                    >
                       <div className="hero-image">
                            
                        </div>
                        <div className="container">
                            <div className="row justify-content-xxl-end">
                                <div className="col-lg-7">
                                    <div
                                        className="hero-content"
                                        data-animation="fadeInUp"
                                        data-delay="1.1s"
                                        style={{
                                            backgroundImage: `url(${Shapbg})`,
                                        }}
                                    >
                                        <h5>Digital printing Service</h5>
                                        <h1 data-animation="fadeInUp" data-delay="1.5s">
                                            Get 30% off your <br /> first order
                                        </h1>
                                        <p data-animation="fadeInUp" data-delay="1.7s">
                                            Beautiful, customizable template, with a ton of web blocks <br />
                                            to create an amazing website that looks
                                        </p>
                                        <div className="hero-button">
                                            <Link onClick={ClickHandler} to="/shop"
                                                data-animation="fadeInUp"
                                                data-delay="1.9s"
                                                className="theme-btn hover-white"
                                            >
                                                Order Today
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="hero-2 bg-cover"
                        style={{ backgroundImage: `url(${hero3})` }}
                    >
                       <div className="hero-image">
                            
                        </div>
                        <div className="container">
                            <div className="row justify-content-xxl-end">
                                <div className="col-lg-7">
                                    <div
                                        className="hero-content"
                                        data-animation="fadeInUp"
                                        data-delay="1.1s"
                                        style={{
                                            backgroundImage: `url(${Shapbg})`,
                                        }}
                                    >
                                        <h5>Digital printing Service</h5>
                                        <h1 data-animation="fadeInUp" data-delay="1.5s">
                                            Get 20% off your <br /> first order
                                        </h1>
                                        <p data-animation="fadeInUp" data-delay="1.7s">
                                            Beautiful, customizable template, with a ton of web blocks <br />
                                            to create an amazing website that looks
                                        </p>
                                        <div className="hero-button">
                                            <Link onClick={ClickHandler} to="/shop"
                                                data-animation="fadeInUp"
                                                data-delay="1.9s"
                                                className="theme-btn hover-white"
                                            >
                                                Order Today
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div className="dot-2"></div>
        </section>
    );
=======
  return (
    <section
      className="hero-section"
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        color: "#000", 
      }}
    >
      <div style={{ maxWidth: "800px" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1.5rem" }}>
          Conviértete en Distribuidor Oficial de AP SAFETY
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
          Únete a nuestra red de distribuidores y ofrece equipos de protección
          personal certificados, respaldados por más de 30 años de experiencia
          en la industria.
        </p>
        <Link
          to="/contacto"
          onClick={ClickHandler}
          className="theme-btn hover-white"
          style={{
            fontSize: "1.1rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#000",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "4px",
            fontWeight: "600",
          }}
        >
          → Solicitar información para ser distribuidor
        </Link>
      </div>
    </section>
  );

};

export default HeroSection;
