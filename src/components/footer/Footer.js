import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../img/footer/Logo-fondo-transparente.png';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f8f9fa', padding: '3rem 1rem' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>

          <div style={{ flex: '1 1 250px', marginBottom: '2rem' }}>
            <img src={Logo} alt="AP Mascarillas Logo" style={{ width: '180px', marginBottom: '1rem' }} />
            <p style={{ color: '#555', maxWidth: '350px' }}>
              Calle Cerro Chimalpa Manzana 50 Lote 674, Lázaro Cárdenas 1ra Secc,<br />
              54189 Tlalnepantla, Méx.
            </p>
          </div>

          <div style={{ flex: '1 1 250px', marginBottom: '2rem' }}>
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

          <div style={{ flex: '1 1 250px', marginBottom: '2rem' }}>
            <h4 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Redes Sociales</h4>
            <ul style={{ listStyle: 'none', padding: 0, color: '#555' }}>
              <li><strong>Facebook:</strong> <a href="https://facebook.com/APsafety1" target="_blank" rel="noopener noreferrer">@APsafety1</a></li>
              <li><strong>Instagram:</strong> <a href="https://instagram.com/apmascarillas" target="_blank" rel="noopener noreferrer">@apmascarillas</a></li>
            </ul>
          </div>

          <div style={{ flex: '1 1 250px', marginBottom: '2rem' }}>
            <h4 style={{ marginBottom: '1rem', color: '#2c3e50' }}></h4>
            <p style={{ color: '#555' }}>
          
            </p>
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          paddingTop: '2rem',
          borderTop: '1px solid #ddd',
          fontSize: '0.9rem',
          color: '#999',
        }}>
          © {new Date().getFullYear()} AP Mascarillas. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
