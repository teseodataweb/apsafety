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
    <>
      <style>
        {`
          .form-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          
          input, textarea {
            background-color: #fff;
            color: #000 !important; /* Forzar color negro */
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 12px 15px;
            font-size: 1rem;
            width: 100%;
            transition: all 0.3s ease;
          }

          input:focus, textarea:focus {
            border-color: #2e9e3b;
            outline: none;
            box-shadow: 0 0 0 2px rgba(46, 158, 59, 0.2);
          }

          input::placeholder,
          textarea::placeholder {
            color: #888;
            opacity: 1;
          }

          textarea {
            resize: vertical;
            min-height: 120px;
          }

          .form-check-input {
            width: 18px;
            height: 18px;
            margin-right: 8px;
            accent-color: #2e9e3b;
          }

          .form-check-label {
            font-size: 0.95rem;
            color: #000;
            display: flex;
            align-items: center;
          }

          .form-clt {
            margin-bottom: 1.5rem;
          }

          .error-message {
            color: #dc3545;
            font-size: 0.85rem;
            margin-top: 5px;
            display: block;
          }

          .row {
            display: flex;
            flex-wrap: wrap;
            margin: 0 -15px;
          }

          .col-lg-12 {
            flex: 0 0 100%;
            max-width: 100%;
            padding: 0 15px;
          }

          .text-center {
            text-align: center;
          }

          .form-title {
            text-align: center;
            margin-bottom: 30px;
            color: #2e9e3b;
          }

          @media (max-width: 768px) {
            .form-container {
              padding: 15px;
            }
            
            input, textarea {
              padding: 10px 12px;
            }
          }
        `}
      </style>

      <div className="form-container">
        <h2 className="form-title">Formulario de Contacto</h2>
        
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
                  style={{ color: '#000' }} // Asegurar color negro
                />
                <span className="error-message">
                  {simpleValidator.current.message('name', formData.name, 'required|alpha_space')}
                </span>
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
                  style={{ color: '#000' }}
                />
                <span className="error-message">
                  {simpleValidator.current.message('company', formData.company, 'required')}
                </span>
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
                  style={{ color: '#000' }}
                />
                <span className="error-message">
                  {simpleValidator.current.message('direction', formData.direction, 'required')}
                </span>
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
                  style={{ color: '#000' }}
                />
                <span className="error-message">
                  {simpleValidator.current.message('country', formData.country, 'required')}
                </span>
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
                  style={{ color: '#000' }}
                />
                <span className="error-message">
                  {simpleValidator.current.message('phone', formData.phone, 'required|numeric|min:10|max:15')}
                </span>
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
                  style={{ color: '#000' }}
                />
                <span className="error-message">
                  {simpleValidator.current.message('email', formData.email, 'required|email')}
                </span>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="form-clt">
                <textarea
                  name="comentary"
                  placeholder="Comentarios / Consulta*"
                  value={formData.comentary}
                  onChange={handleChange}
                  style={{ color: '#000' }}
                ></textarea>
                <span className="error-message">
                  {simpleValidator.current.message('comentary', formData.comentary, 'required|min:10|max:500')}
                </span>
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
                    style={{ color: '#2e9e3b', textDecoration: 'underline' }}
                  >
                    Aviso de Privacidad
                  </a>{' '}
                </label>
                <span className="error-message">
                  {simpleValidator.current.message('acceptedPrivacy', formData.acceptedPrivacy, 'accepted')}
                </span>
              </div>
            </div>

            <div className="col-lg-12 text-center" style={{ marginTop: '2rem' }}>
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
      </div>
    </>
  );
};

export default FormularioC;