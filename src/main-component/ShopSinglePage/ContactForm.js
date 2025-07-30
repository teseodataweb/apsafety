import React, { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        acceptedPrivacy: false,
    });

    const [validator] = useState(new SimpleReactValidator());
    const [, forceUpdate] = useState(); 

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
        validator.showMessageFor(name); 
        forceUpdate(1); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validator.allValid()) {

            setFormData({
                name: '',
                email: '',
                message: '',
                acceptedPrivacy: false,
            });
            validator.hideMessages(); 
            forceUpdate(1); 
        } else {
            validator.showMessages(); 
            forceUpdate(1); 
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row g-4">
                <div className="col-lg-6">
                    <div className="form-clt">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nombre completo"
                        />
                        {validator.message('name', formData.name, 'required|alpha_space')}
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="form-clt">
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Correo electrónico"
                        />
                        {validator.message('email', formData.email, 'required|email')}
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="form-clt-big form-clt">
                        <textarea
                            name="message"
                            id="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Mensaje"
                        ></textarea>
                        {validator.message('message', formData.message, 'required')}
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
                            <a href="https://drive.google.com/file/d/1wa8vCbADtDX_1QTV4CGDYam73scUGrQI/view" target="_blank" rel="noopener noreferrer">
                                Aviso de Privacidad
                            </a>
                        </label>
                        {validator.message('acceptedPrivacy', formData.acceptedPrivacy, 'accepted')}
                    </div>
                </div>

                <div className="col-lg-6">
                    <button
                        type="submit"
                        className="theme-btn"
                        disabled={!formData.acceptedPrivacy}
                    >
                        Enviar mensaje
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ContactForm;
