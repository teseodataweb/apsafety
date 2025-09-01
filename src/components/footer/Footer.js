import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../img/footer/Logo-fondo-transparente.png';
import Img1 from '../../img/descarga (14).png';
import Img2 from '../../img/descarga (15).png';
import Img3 from '../../img/iron.png';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f8f9fa', padding: '3rem 1rem' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          className="row"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: '2rem',
          }}
        >
          {/* Logo y dirección */}
          <div style={{ flex: '1 1 250px', minWidth: '250px' }}>
            <img
              src={Logo}
              alt="Logo de AP Mascarillas - Fabricantes de equipo de protección"
              style={{ width: '180px', marginBottom: '1rem' }}
            />
            <p style={{ color: '#555', maxWidth: '350px' }}>
              Calle Cerro Chimalpa Manzana 50 Lote 674, Lázaro Cárdenas 1ra Secc,<br />
              54189 Tlalnepantla, Méx.
            </p>
          </div>

          {/* Contacto */}
          <div style={{ flex: '1 1 250px', minWidth: '250px' }}>
            <h4 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Contacto Directo</h4>
            <ul style={{ listStyle: 'none', padding: 0, color: '#555' }}>
              <li><strong>Correo:</strong> <a href="mailto:direccion@apmascarillas.com.mx" style={{ color: '#3a78c9' }}>direccion@apmascarillas.com.mx</a></li>
              <li><strong>Teléfonos:</strong></li>
              <li>+52 55 5718 1075</li>
              <li>+52 55 5718 4035</li>
              <li>+52 55 5384 5169</li>
              <li><strong>WhatsApp:</strong> +52 1 791 110 1246</li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div style={{ flex: '1 1 250px', minWidth: '250px' }}>
            <h4 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Redes Sociales</h4>
            <ul style={{ listStyle: 'none', padding: 0, color: '#555' }}>
              <li><strong>Facebook:</strong> <a href="https://facebook.com/APsafety1" target="_blank" rel="noopener noreferrer">@APsafety1</a></li>
              <li><strong>Instagram:</strong> <a href="https://www.instagram.com/ap.safety/" target="_blank" rel="noopener noreferrer">@apmascarillas</a></li>
              <li><strong>Tik tok:</strong> <a href="https://www.tiktok.com/@apsafety" target="_blank" rel="noopener noreferrer">@APsafety1</a></li>
            </ul>
          </div>

          {/* Certificaciones */}
          <div style={{ flex: '1 1 100%', marginTop: '1rem' }}>
            <h4 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Certificaciones</h4>
            <p style={{ color: '#555', marginBottom: '1rem' }}>
              Nuestros productos cumplen con los más altos estándares de calidad y seguridad.
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '15px',
              }}
            >
              {[Img1, Img2, Img3].map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Certificación ${index + 1}`}
                  style={{
                    width: '150px',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '4px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pie de página */}
        <div
          style={{
            textAlign: 'center',
            paddingTop: '2rem',
            borderTop: '1px solid #ddd',
            fontSize: '0.9rem',
            color: '#999',
            marginTop: '2rem',
          }}
        >
          © {new Date().getFullYear()} AP Mascarillas. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
