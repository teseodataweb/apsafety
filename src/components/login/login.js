import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';

const Login = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''  // Campo de contraseña agregado
    });

    const simpleValidator = useRef(new SimpleReactValidator());

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
            // Aquí podrías realizar la acción que desees al enviar el formulario.
        } else {
            simpleValidator.current.showMessages();
            setFormData({ ...formData });
        }
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
                            placeholder="Nombre o usuario*"
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
                    <div className="form-clt">
                        <input
                            type="password"  // Tipo de campo cambiado a 'password'
                            name="password"
                            id="password"
                            placeholder="Contraseña*"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <div className="icon">
                            <i className="fal fa-lock"></i> {/* Icono de candado para el campo de contraseña */}
                        </div>
                        {simpleValidator.current.message('password', formData.password, 'required|min:6')}  {/* Validación para contraseña */}
                    </div>
                </div>
                <div className="col-lg-6">
                    <button type="submit" className="theme-btn">
                        <i className="fal fa-paper-plane"></i> Iniciar Sesión
                    </button>
                </div>
            </div>
        </form>
    );
};

export default Login;
