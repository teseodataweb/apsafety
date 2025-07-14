import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';


const FormularioC= () => {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        direction: '',
        country:'',
        phone: '',
        email: '',
        comentary: '',
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

                {/* Empresa */}
                <div className="col-lg-12">
                    <div className="form-clt">
                        <input
                            type="text"
                            name="company"
                            placeholder="Empresa- Requerido*"
                            value={formData.company}
                            onChange={handleChange}
                        />
                        {simpleValidator.current.message('company', formData.company, 'required')}
                    </div>
                </div>

                   {/* Dirección */}
                <div className="col-lg-12">
                    <div className="form-clt">
                        <input
                            type="text"
                            name="direction "
                            placeholder="Dirección completa (Estado, Ciudad, Código Postal)*"
                            value={formData.direction}
                            onChange={handleChange}
                        />
                        {simpleValidator.current.message('direction', formData.direction, 'required')}
                    </div>
                </div>

                {/* País */}
                <div className="col-lg-12">
                    <div className="form-clt">
                        <input
                            type="text"
                            name="country"
                            placeholder="País (requerido)*"
                            value={formData.country}
                            onChange={handleChange}
                        />
                        {simpleValidator.current.message('country', formData.country, 'required')}
                    </div>
                </div>

                {/* Teléfono */}
                <div className="col-lg-12">
                    <div className="form-clt">
                        <input
                            type="text"
                            name="phone"
                            placeholder="Teléfono (requerido)*"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {simpleValidator.current.message('phone', formData.phone, 'required|numeric|min:10|max:15')}
                    </div>
                </div>

                {/* Correo*/}
                <div className="col-lg-12">
                    <div className="form-clt">
                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail (requerido)*"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {simpleValidator.current.message('email', formData.email, 'required|email')}
                    </div>
                </div>

              {/* Comentarios */}
                <div className="col-lg-12">
                    <div className="form-clt-big form-clt">
                        <textarea
                            name="comentary"
                            placeholder="Comentarios / Consulta (requerido)*"
                            value={formData.comentary}
                            onChange={handleChange}
                        ></textarea>
                        {simpleValidator.current.message('comentary', formData.comentary, 'required|min:10|max:500')}
                    </div>
                </div>

                 {/* Enviar Mensaje */}
               <div className="boton-container">
                <button type="submit" className="theme-btn">
                    <i className="fal fa-paper-plane"></i> Enviar Mensaje
                </button>
                </div>



              
            </div>
        </form>
    );
};


export default FormularioC;
