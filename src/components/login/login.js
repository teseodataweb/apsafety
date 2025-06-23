import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import auth from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const simpleValidator = useRef(new SimpleReactValidator({
        messages: {
            required: 'Este campo es obligatorio.',
            email: 'Ingresa un correo electrónico válido.',
            alpha_num: 'Este campo solo puede contener letras y números.',
            min: 'Este campo debe tener al menos 6 caracteres.',
            max: 'Este campo no puede tener más de 25 caracteres.'
        }
    }));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        if (simpleValidator.current.allValid()) {
            try {
                await signInWithEmailAndPassword(auth, formData.email, formData.password);
               console.log('Signed in successfully');
                alert('¡Inicio de sesión exitoso!');
            } catch (error) {

                let msg = 'Error al iniciar sesión.';

                if (error.code === 'auth/wrong-password') msg = 'Contraseña incorrecta.';
                else if (error.code === 'auth/invalid-email') msg = 'Correo inválido.';
                setErrorMsg(msg);
            }
        } else {
            simpleValidator.current.showMessages();
            setFormData({ ...formData });
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <form id="login-form" onSubmit={handleSubmit}>
            <div className="row g-4">
                <div className="col-lg-12">
                    <div className="form-clt">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Correo electrónico*"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <div className="icon">
                            <i className="fal fa-user"></i>
                        </div>
                        <span style={{ color: '#006400' }}>
                            {simpleValidator.current.message('email', formData.email, 'required|email')}
                        </span>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="form-clt" style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="Contraseña*"
                            value={formData.password}
                            onChange={handleChange}
                            style={{ paddingRight: '30px' }}
                        />
                        <div className="icon">
                            <i className="fal fa-lock"></i>
                        </div>
                        <span style={{ color: '#008A1F' }}>
                            {simpleValidator.current.message('password', formData.password, 'required|min:6')}
                        </span>
                        <div
                            onClick={togglePasswordVisibility}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer'
                            }}
                        >
                            <i
                                className={`fal ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                            ></i>
                        </div>
                    </div>
                </div>
                {errorMsg && (
                    <div className="col-lg-12">
                        <span style={{ color: 'red', fontWeight: 600 }}>{errorMsg}</span>
                    </div>
                )}
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
