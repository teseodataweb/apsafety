import React from "react";
import { Link } from "react-router-dom";

const ClickHandler = () => {
  window.scrollTo(10, 0);
};

const HeroSection = () => {
  const handleMouseOver = (e) => {
    e.currentTarget.style.backgroundColor = "#36C848";
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.backgroundColor = "#2e9e3b";
  };

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
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "1.5rem",
          }}
        >
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
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          style={{
            fontSize: "1.1rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#2e9e3b",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "12px",
            fontWeight: "bold",
            transition: "background-color 0.3s ease",
            display: "inline-block",
          }}
        >
          → Solicitar información para ser distribuidor
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
