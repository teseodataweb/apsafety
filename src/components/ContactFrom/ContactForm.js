import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [hover, setHover] = useState(false);

    const simpleValidator = useRef(new SimpleReactValidator({
        messages: {
            required: 'Este campo es obligatorio',
            email: 'El correo electrónico no es válido',
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
            // Aquí puedes manejar el envío real
        } else {
            simpleValidator.current.showMessages();
            setFormData({ ...formData });
        }
    };

    const buttonStyle = {
        backgroundColor: hover ? '#36C848' : '#2e9e3b',
        color: '#fff',
        padding: '1rem 2.2rem',
        fontSize: '1.15rem',
        fontWeight: '600',
        borderRadius: '12px',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
    };

    return (
        <form id="contact-form" onSubmit={handleSubmit}>
            <div className="row g-4">
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
                        <div className="icon">
                            <i className="fal fa-user"></i>
                        </div>
                        {simpleValidator.current.message('name', formData.name, 'required|alpha_space')}
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
                        <div className="icon">
                            <i className="fal fa-envelope"></i>
                        </div>
                        {simpleValidator.current.message('email', formData.email, 'required|email')}
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="form-clt-big form-clt">
                        <textarea
                            name="message"
                            id="message"
                            placeholder="Escribe tu mensaje aquí"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                        <div className="icon">
                            <i className="fal fa-edit"></i>
                        </div>
                        {simpleValidator.current.message('message', formData.message, 'required|min:10|max:200')}
                    </div>
                </div>
                <div className="col-lg-6">
                    <button
                        type="submit"
                        style={buttonStyle}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    >
                        <i className="fal fa-paper-plane"></i> Enviar mensaje
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ContactForm;
