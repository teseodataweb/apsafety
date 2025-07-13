import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';


const Formulary= () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        product: '',
        message: '',
        file: null
    });

    const simpleValidator = useRef(new SimpleReactValidator());

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (simpleValidator.current.allValid()) {

            console.log('Formulario válido:', formData);
            alert('Queja enviada correctamente');
        } else {
            simpleValidator.current.showMessages();
            setFormData({ ...formData });
        }
    };

    return (
        <form id="complaint-form" onSubmit={handleSubmit}>
            <div className="row g-4">

                {/* Nombre completo */}
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

                {/* Correo electrónico */}
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

                {/* Teléfono */}
                <div className="col-lg-12">
                    <div className="form-clt">
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Teléfono de contacto*"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {simpleValidator.current.message('phone', formData.phone, 'required|numeric|min:10|max:15')}
                    </div>
                </div>

                {/* Producto  */}
                <div className="col-lg-12">
                    <div className="form-clt">
                        <input
                            type="text"
                            name="product"
                            placeholder="Producto o servicio relacionado*"
                            value={formData.product}
                            onChange={handleChange}
                        />
                        {simpleValidator.current.message('product', formData.product, 'required')}
                    </div>
                </div>

                {/* Detalles de queja */}
                <div className="col-lg-12">
                    <div className="form-clt-big form-clt">
                        <textarea
                            name="message"
                            placeholder="Detalles de la queja*"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                        {simpleValidator.current.message('message', formData.message, 'required|min:10|max:500')}
                    </div>
                </div>

                {/* Adjuntar archivo */}
                <div className="col-lg-12">
                    <div className="form-clt">
                        <input
                            type="file"
                            name="file"
                            onChange={handleChange}
                        />
                        <small>(Opcional)</small>
                    </div>
                </div>

                {/* Botón de envío */}
                <div className="col-lg-6">
                    <button type="submit" className="theme-btn">
                        <i className="fal fa-paper-plane"></i> Enviar Queja
                    </button>
                </div>

                {/*k*/}
                <div className="col-lg-12">
                    <small>Todos los campos son obligatorios, excepto donde se indique.</small>
                </div>
            </div>
        </form>
    );
};


export default Formulary;
