import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';

const Formulary = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    message: '',
    file: null,
    acceptedPrivacy: false,
  });

  const simpleValidator = useRef(new SimpleReactValidator({
    messages: {
      required: 'Este campo es obligatorio.',
      alpha_space: 'Solo se permiten letras y espacios.',
      email: 'Debe ser un correo válido.',
      numeric: 'Debe contener solo números.',
      min: 'Debe tener al menos :min caracteres.',
      max: 'No debe exceder los :max caracteres.',
      accepted: 'Debes aceptar el aviso de privacidad.',
    },
  }));

  const [hover, setHover] = useState(false);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.acceptedPrivacy) {
      alert('Debes aceptar el Aviso de Privacidad para continuar.');
      return;
    }

    if (simpleValidator.current.allValid()) {
      console.log('Formulario válido:', formData);
      alert('Queja enviada correctamente');
    } else {
      simpleValidator.current.showMessages();
      setFormData({ ...formData });
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        maxWidth: '600px',
        margin: '60px auto',
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}
    >
      <h4 style={{ textAlign: 'center', marginBottom: '20px', color: '#222' }}>
        Enviar Queja o Comentario
      </h4>

      <input
        type="text"
        name="name"
        placeholder="Nombre completo*"
        value={formData.name}
        onChange={handleChange}
        style={inputStyle}
      />
      {simpleValidator.current.message('name', formData.name, 'required|alpha_space')}

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico*"
        value={formData.email}
        onChange={handleChange}
        style={inputStyle}
      />
      {simpleValidator.current.message('email', formData.email, 'required|email')}

      <input
        type="tel"
        name="phone"
        placeholder="Teléfono de contacto*"
        value={formData.phone}
        onChange={handleChange}
        style={inputStyle}
      />
      {simpleValidator.current.message('phone', formData.phone, 'required|numeric|min:10|max:15')}

      <input
        type="text"
        name="product"
        placeholder="Producto o servicio relacionado*"
        value={formData.product}
        onChange={handleChange}
        style={inputStyle}
      />
      {simpleValidator.current.message('product', formData.product, 'required')}

      <textarea
        name="message"
        placeholder="Detalles de la queja*"
        value={formData.message}
        onChange={handleChange}
        style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }}
      />
      {simpleValidator.current.message('message', formData.message, 'required|min:10|max:500')}

      <div style={{ marginBottom: '15px' }}>
        <input
          type="file"
          name="file"
          onChange={handleChange}
        />
        <div style={{ fontSize: '0.9rem', color: '#555', marginTop: '4px' }}>
          (Opcional) Adjuntar evidencia
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '25px',
        fontSize: '1rem',
        color: '#333'
      }}>
        <input
          type="checkbox"
          id="acceptedPrivacy"
          name="acceptedPrivacy"
          checked={formData.acceptedPrivacy}
          onChange={handleChange}
          style={{ transform: 'scale(1.2)' }}
        />
        <label htmlFor="acceptedPrivacy">
          Acepto el{' '}
          <a
            href="https://drive.google.com/file/d/1wa8vCbADtDX_1QTV4CGDYam73scUGrQI/view"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#007bff', textDecoration: 'underline' }}
          >
            Aviso de Privacidad
          </a>
        </label>
      </div>

      {/* Botón */}
      <div style={{ textAlign: 'center' }}>
        <button
          type="submit"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            backgroundColor: hover ? '#36C848' : '#2e9e3b',
            color: '#fff',
            padding: '12px 28px',
            borderRadius: '12px',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#fff" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
          Enviar Mensaje
        </button>
      </div>
    </form>
  );
};

export default Formulary;
