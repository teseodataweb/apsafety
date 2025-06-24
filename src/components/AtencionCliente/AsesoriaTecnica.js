import React from 'react';
import './AsesoriaTecnica.css'; 

const AsesoriaTecnica = () => {
  return (
    <main className="asesoria-container">
      <h1>Asesoría Técnica en Seguridad Laboral Certificada</h1>
      <p className="intro">
        En AP SAFETY te acompañamos a implementar un entorno laboral seguro, cumpliendo con las normativas NOM-STPS, ANSI e ISO.
        Nuestra asesoría técnica está diseñada para empresas que requieren soluciones efectivas y adaptadas a sus procesos industriales.
      </p>

      <h2>¿Por qué confiar en nuestra asesoría?</h2>
      <p>
        Porque entendemos los riesgos que enfrentas en campo. Te ayudamos a prevenir accidentes, evitar sanciones y elevar los estándares
        de seguridad operativa con apoyo técnico especializado.
      </p>

      <h2>Servicios que ofrecemos</h2>

      <div className="servicio">
        <h3>Evaluación de Riesgos Laborales</h3>
        <p>
          Identificamos peligros críticos en tus instalaciones y diseñamos soluciones que reducen los riesgos operativos, con respaldo técnico documentado.
        </p>
      </div>

      <div className="servicio">
        <h3>Cumplimiento Normativo</h3>
        <p>
          Te asesoramos para cumplir con normativas como NOM-115-STPS, ANSI Z87/Z89 e ISO 11612. Ideal para auditorías, licitaciones y compras institucionales.
        </p>
      </div>

      <div className="servicio">
        <h3>Selección de EPP</h3>
        <p>
          Recomendamos el equipo de protección más adecuado según las tareas, el entorno y el nivel de exposición.
        </p>
      </div>

      <div className="servicio">
        <h3>Capacitación Técnica</h3>
        <p>
          Formamos a tu equipo en el uso, mantenimiento y vida útil del EPP. Cursos presenciales o virtuales adaptados a tu industria.
        </p>
      </div>

      <h2>Beneficios para tu empresa</h2>
      <ul className="beneficios">
        <li> Reducción de accidentes laborales</li>
        <li> Cumplimiento con auditorías STPS, ISO, OSHA</li>
        <li> Mejora continua en procesos de seguridad</li>
        <li> Ahorro por selección correcta de EPP</li>
      </ul>

      <h2>¿Listo para fortalecer la seguridad en tu empresa?</h2>
      <p className="cta-text">¿Listo para fortalecer la seguridad en tu empresa?</p>
      <a href="/contacto" className="botton">Solicita asesoría personalizada</a>

      <p className="cta-alt">Completa el formulario y un asesor técnico se pondrá en contacto en menos de 24 horas.</p>
      <a href="/contacto#formulario" className="botton">Agendar asesoría técnica</a>

      <footer className="contact-info">
        <p><strong>Email:</strong> direccion@apmascarillas.mx</p>
        <p><strong>Teléfono:</strong> 33-20-20-01-22</p>
      </footer>
    </main>
  );
};

export default AsesoriaTecnica;
