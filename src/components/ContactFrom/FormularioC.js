import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';

const FormularioC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    direction: '',
    country: '',
    phone: '',
    email: '',
    comentary: '',
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
      alert('Mensaje enviado correctamente');
    } else {
      simpleValidator.current.showMessages();
      setFormData({ ...formData });
    }
  };

  const buttonStyle = {
    backgroundColor: hover ? '#36C848' : '#2e9e3b',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    borderRadius: '12px',
    textDecoration: 'none',
    display: 'inline-block',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  return (
    <form id="complaint-form" onSubmit={handleSubmit}>
      <div className="row g-4">

        <div className="col-lg-12">
          <div className="form-clt">
            <input
              type="text"
              name="name"
              placeholder="Nombre completo*"
              value={formData.name}
              onChange={handleChange}
            />
            {simpleValidator.current.message('name', formData.name, 'required|alpha_space')}
          </div>
        </div>

        <div className="col-lg-12">
          <div className="form-clt">
            <input
              type="text"
              name="company"
              placeholder="Empresa*"
              value={formData.company}
              onChange={handleChange}
            />
            {simpleValidator.current.message('company', formData.company, 'required')}
          </div>
        </div>

        <div className="col-lg-12">
          <div className="form-clt">
            <input
              type="text"
              name="direction"
              placeholder="Dirección completa (Estado, Ciudad, Código Postal)*"
              value={formData.direction}
              onChange={handleChange}
            />
            {simpleValidator.current.message('direction', formData.direction, 'required')}
          </div>
        </div>

        <div className="col-lg-12">
          <div className="form-clt">
            <input
              type="text"
              name="country"
              placeholder="País*"
              value={formData.country}
              onChange={handleChange}
            />
            {simpleValidator.current.message('country', formData.country, 'required')}
          </div>
        </div>

        <div className="col-lg-12">
          <div className="form-clt">
            <input
              type="text"
              name="phone"
              placeholder="Teléfono*"
              value={formData.phone}
              onChange={handleChange}
            />
            {simpleValidator.current.message('phone', formData.phone, 'required|numeric|min:10|max:15')}
          </div>
        </div>

        <div className="col-lg-12">
          <div className="form-clt">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico*"
              value={formData.email}
              onChange={handleChange}
            />
            {simpleValidator.current.message('email', formData.email, 'required|email')}
          </div>
        </div>

        <div className="col-lg-12">
          <div className="form-clt-big form-clt">
            <textarea
              name="comentary"
              placeholder="Comentarios / Consulta*"
              value={formData.comentary}
              onChange={handleChange}
            ></textarea>
            {simpleValidator.current.message('comentary', formData.comentary, 'required|min:10|max:500')}
          </div>
        </div>

        <div className="col-lg-12">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="acceptedPrivacy"
              name="acceptedPrivacy"
              checked={formData.acceptedPrivacy}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="acceptedPrivacy">
              Acepto el{' '}
              <a
                href="https://drive.google.com/file/d/1wa8vCbADtDX_1QTV4CGDYam73scUGrQI/view"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#007bff', textDecoration: 'underline' }} 
              >
                Aviso de Privacidad
              </a>{' '}
              
            </label>
            {simpleValidator.current.message('acceptedPrivacy', formData.acceptedPrivacy, 'accepted')}
          </div>
        </div>

        <div className="col-lg-12 text-center" style={{ marginTop: '1.5rem' }}>
          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <i className="fal fa-paper-plane"></i> Enviar Mensaje
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormularioC;
