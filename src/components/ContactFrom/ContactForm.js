import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [hover, setHover] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const simpleValidator = useRef(new SimpleReactValidator({
        messages: {
            required: 'Este campo es obligatorio',
            email: 'El correo electrónico no es válido',
            alpha_space: 'Solo se permiten letras y espacios',
            min: 'Mínimo :min caracteres requeridos',
            max: 'Máximo :max caracteres permitidos'
        }
    }));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {
            setTimeout(() => {
                setShowSuccess(true);
                setTimeout(() => {
                    setFormData({ name: '', email: '', message: '' });
                    setShowSuccess(false);
                }, 3000);
            }, 1000);
        } else {
            simpleValidator.current.showMessages();
            setFormData({ ...formData });
        }
    };

    const buttonStyle = {
        backgroundColor: hover ? '#36C848' : '#2e9e3b',
        color: '#fff',
        padding: '12px 24px',
        fontSize: '1rem',
        fontWeight: '600',
        borderRadius: '8px',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        minWidth: '200px',
        marginTop: '10px'
    };

    return (
        <>
            <style>
                {`
                    #contact-form {
                        max-width: 800px;
                        margin: 2rem auto;
                        padding: 2rem;
                        background-color: #f9f9f9;
                        border-radius: 12px;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    }

                    .form-clt {
                        position: relative;
                        margin-bottom: 2rem;
                    }

                    input, textarea {
                        width: 100%;
                        padding: 14px 15px 14px 50px;
                        font-size: 1rem;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        background-color: #fff;
                        color: #333 !important;
                        transition: all 0.3s ease;
                        font-family: inherit;
                    }

                    input:focus, textarea:focus {
                        border-color: #2e9e3b;
                        outline: none;
                        box-shadow: 0 0 0 3px rgba(46, 158, 59, 0.2);
                    }

                    textarea {
                        min-height: 180px;
                        resize: vertical;
                        padding-top: 15px;
                        line-height: 1.5;
                    }

                    .icon {
                        position: absolute;
                        left: 15px;
                        top: 50%;
                        transform: translateY(-50%);
                        color: #777;
                        z-index: 2;
                        font-size: 1.1rem;
                    }

                    .form-clt-big .icon {
                        top: 20px;
                        transform: none;
                    }

                    .error-message {
                        color: #dc3545;
                        font-size: 0.85rem;
                        margin-top: 8px;
                        display: block;
                    }

                    .success-alert {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background-color: #2e9e3b;
                        color: white;
                        padding: 15px 25px;
                        border-radius: 8px;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        z-index: 1000;
                        animation: slideIn 0.3s ease-out;
                    }

                    @keyframes slideIn {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }

                    .success-icon {
                        font-size: 1.5rem;
                    }

                    .row {
                        display: flex;
                        flex-wrap: wrap;
                        margin: 0 -10px;
                    }

                    .col-lg-12 {
                        flex: 0 0 100%;
                        max-width: 100%;
                        padding: 0 10px;
                    }

                    .text-center {
                        text-align: center;
                        margin-top: 1rem;
                    }

                    @media (max-width: 768px) {
                        #contact-form {
                            padding: 1.5rem;
                            margin: 1rem auto;
                        }
                        
                        input, textarea {
                            padding: 12px 12px 12px 45px;
                        }
                    }

                    @media (max-width: 480px) {
                        #contact-form {
                            padding: 1rem;
                        }
                        
                        .form-clt {
                            margin-bottom: 1.5rem;
                        }
                    }
                `}
            </style>

            <form id="contact-form" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="form-clt">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Tu Nombre*"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <span className="error-message">
                                {simpleValidator.current.message('name', formData.name, 'required|alpha_space')}
                            </span>
                        </div>
                    </div>
                    
                    <div className="col-lg-12">
                        <div className="form-clt">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Correo Electrónico*"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        
                            <span className="error-message">
                                {simpleValidator.current.message('email', formData.email, 'required|email')}
                            </span>
                        </div>
                    </div>
                    
                    <div className="col-lg-12">
                        <div className="form-clt form-clt-big">
                            <textarea
                                name="message"
                                id="message"
                                placeholder="Escribe tu mensaje aquí*"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                            <span className="error-message">
                                {simpleValidator.current.message('message', formData.message, 'required|min:10|max:200')}
                            </span>
                        </div>
                    </div>
                    
                    <div className="col-lg-12 text-center">
                        <button
                            type="submit"
                            style={buttonStyle}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        >
                            <i className="fal fa-paper-plane" style={{ marginRight: '8px' }}></i> 
                            Enviar mensaje
                        </button>
                    </div>
                </div>
            </form>

            {showSuccess && (
                <div className="success-alert">
                    <i className="fas fa-check-circle success-icon"></i>
                    <div>
                        <strong>¡Mensaje enviado!</strong>
                        <p style={{ margin: 0, fontSize: '0.9rem' }}>Nos pondremos en contacto contigo pronto.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContactForm;