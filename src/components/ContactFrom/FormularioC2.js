import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';


const FormularioC2= () => {
    const [formData, setFormData] = useState({
        name: '',
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
       <div className="contenedor-formulario-pequeno">
            <form className="formulario-pequeno" onSubmit={handleSubmit}>

                {/* Nombre completo */}
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

                {/* Correo*/}
                <div className="col-lg-12">
                    <div className="form-clt">
                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail*"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {simpleValidator.current.message('email', formData.email, 'required|email')}
                    </div>
                </div>

              {/* Comentarios */}
                        <textarea
                            name="message"
                            placeholder="Mensaje*"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                        {simpleValidator.current.message('comentary', formData.comentary, 'required|min:10|max:500')}
                    

                {/* Botón de envío */}
                <div className="boton-container">
                <button type="submit" className="theme-btn">
                    <i className="fal fa-paper-plane"></i> Enviar Mensaje
                </button>
                </div>

                
            </form>
        </div>


    );
};


export default FormularioC2;
