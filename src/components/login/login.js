import React, { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useNavigate } from 'react-router-dom';
import { db } from './firebase';
import auth from './firebase';
import { 
  signInWithEmailAndPassword, 
  setPersistence, 
  browserSessionPersistence 
} from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Login = () => {
    const navigate = useNavigate();

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
                const sanitizedEmail = formData.email.trim().toLowerCase();
                await setPersistence(auth, browserSessionPersistence);
                const userCredential = await signInWithEmailAndPassword(auth, sanitizedEmail, formData.password);
                
                // Verificar rol en Firestore
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("email", "==", sanitizedEmail));
                const querySnapshot = await getDocs(q);
                
                if (querySnapshot.empty) {
                    throw new Error('Usuario no encontrado en la base de datos');
                }

                const userDoc = querySnapshot.docs[0];
                const userType = userDoc.data().userType;
                
                // Redirección según rol
                if (userType === 'admin') {
                    navigate('../admin');
                } else if (userType === 'secundario') {
                    navigate('/productos');
                } else {
                    throw new Error('Tipo de usuario no válido');
                }
            } catch (error) {
                console.error('Error de autenticación:', error);
                let msg = 'Error al iniciar sesión.';
                if (error.code === 'auth/wrong-password') msg = 'Contraseña incorrecta.';
                else if (error.code === 'auth/invalid-email') msg = 'Correo electrónico inválido.';
                else if (error.code === 'auth/user-not-found') msg = 'No se encontró el usuario.';
                else if (error.code === 'auth/too-many-requests') msg = 'Demasiadas solicitudes. Intenta más tarde.';
                else if (error.code === 'auth/operation-not-allowed') msg = 'El inicio de sesión no está habilitado.';
                else if (error.message === 'Usuario no encontrado en la base de datos') msg = 'Usuario no registrado en el sistema.';
                else if (error.message === 'Tipo de usuario no válido') msg = 'El tipo de usuario no es válido.';
                
                setErrorMsg(msg);
                setFormData(prev => ({ ...prev, password: '' }));
            }
        } else {
            simpleValidator.current.showMessages();
            setFormData({ ...formData });
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card p-4" style={{ width: '100%', maxWidth: '500px' }}>
                <div className="card-body">
                    <h2 className="text-center mb-4">Inicio de Sesión</h2>
                    <form id="login-form" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <div className="d-flex align-items-center position-relative">
                                <div className="icon-container bg-light rounded-start p-3 d-flex align-items-center justify-content-center" 
                                     style={{ width: '50px', height: '50px' }}>
                                    <i className="fas fa-envelope" style={{ color: '#008A1F' }}></i>
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="form-control rounded-0 rounded-end"
                                    placeholder="Correo electrónico*"
                                    value={formData.email}
                                    onChange={handleChange}
                                    autoComplete="email"
                                    autoCapitalize="none"
                                    spellCheck="false"
                                    style={{ 
                                        height: '50px',
                                        textTransform: 'lowercase',
                                        borderLeft: 'none'
                                    }}
                                />
                            </div>
                            <div className="text-danger small mt-2 ps-2">
                                {simpleValidator.current.message('email', formData.email, 'required|email')}
                            </div>
                        </div>
                        
                        {/* Campo de contraseña */}
                        <div className="mb-4">
                            <div className="d-flex align-items-center position-relative">
                                <div className="icon-container bg-light rounded-start p-3 d-flex align-items-center justify-content-center" 
                                     style={{ width: '50px', height: '50px' }}>
                                    <i className="fas fa-lock" style={{ color: '#008A1F' }}></i>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    className="form-control rounded-0"
                                    placeholder="Contraseña*"
                                    value={formData.password}
                                    onChange={handleChange}
                                    style={{ 
                                        height: '50px',
                                        borderLeft: 'none',
                                        borderRight: 'none'
                                    }}
                                />
                                <button 
                                    type="button"
                                    className="btn bg-light rounded-end d-flex align-items-center justify-content-center"
                                    onClick={togglePasswordVisibility}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        border: '1px solid #ced4da',
                                        borderLeft: 'none'
                                    }}
                                >
                                    <i
                                        className={`fas ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
                                        style={{ color: '#008A1F' }}
                                    ></i>
                                </button>
                            </div>
                            <div className="text-danger small mt-2 ps-2">
                                {simpleValidator.current.message('password', formData.password, 'required|min:6')}
                            </div>
                        </div>
                        
                        {errorMsg && (
                            <div className="alert alert-danger mt-3">
                                {errorMsg}
                            </div>
                        )}
                        
                        <div className="d-grid gap-2 mt-4">
                            <button type="submit" className="btn btn-primary  py-3" style={{ backgroundColor: '#008A1F' }}>Iniciar Sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
