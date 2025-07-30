import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';

const FormularioC4 = () => {
  const [formData, setFormData] = useState({
    name: '',
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
    <div className="contenedor-formulario-pequeno">
      <form className="formulario-pequeno" onSubmit={handleSubmit}>

        <div className="col-lg-12">
          <div className="form-clt">
            <input
              type="text"
              name="name"
              placeholder="Nombre *"
              value={formData.name}
              onChange={handleChange}
            />
            {simpleValidator.current.message('name', formData.name, 'required|alpha_space')}
          </div>
        </div>

        <div className="col-lg-12">
          <div className="form-clt">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico *"
              value={formData.email}
              onChange={handleChange}
            />
            {simpleValidator.current.message('email', formData.email, 'required|email')}
          </div>
        </div>

        <div className="col-lg-12">
          <div className="form-clt">
            <textarea
              name="comentary"
              placeholder="Mensaje *"
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

        <div className="col-lg-12" style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <i className="fal fa-paper-plane"></i> Enviar Mensaje
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioC4;
