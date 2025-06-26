import React, { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore'; 
import auth from '../../components/login/firebase';
import { db } from '../../components/login/firebase';

const AggUssers = () => {
    const [formData, setFormData] = useState({
        name: '',
        userType: '',
        email: '',
        password: '',
    });

    const [validator] = useState(new SimpleReactValidator());
    const [, forceUpdate] = useState();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        validator.showMessageFor(name);
        forceUpdate(1);
    };

    const getNextAdminId = async () => {
        const usersCollection = collection(db, "users");
        const snapshot = await getDocs(usersCollection);
        let maxId = 0;

        snapshot.forEach(doc => {
            const docId = doc.id;
            if (docId.startsWith("admin")) {
                const id = parseInt(docId.replace("admin", ""));
                if (!isNaN(id) && id > maxId) {
                    maxId = id;
                }
            }
        });

        return `admin${maxId + 1}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validator.allValid()) {
            try {
                // 1. Crear usuario en Firebase Authentication
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                const user = userCredential.user;

                // 2. Guardar datos adicionales en Firestore
                const nextAdminId = await getNextAdminId();
                const userDocRef = doc(db, "users", nextAdminId); // Referencia al nuevo documento "adminN"

                await setDoc(userDocRef, {
                    name: formData.name,
                    userType: formData.userType,
                    email: formData.email, // Opcional: también puedes guardar el email aquí si lo necesitas
                });

                alert('Usuario creado y datos guardados exitosamente.');
                navigate('/admin');

                setFormData({
                    name: '',
                    userType: '',
                    email: '',
                    password: '',
                });
                validator.hideMessages();
                forceUpdate(1);

            } catch (error) {
                console.error("Error al crear el usuario:", error);
                alert(`Error al crear el usuario: ${error.message}`);
            }
        } else {
            validator.showMessages();
            forceUpdate(1);
        }
    };

    const handleCancel = () => {
        navigate('/admin');
    };

    return (
        <form id="contact-form" method="POST" onSubmit={handleSubmit}>
            <div className="row g-4">
                <div className="col-lg-6">
                    <div className="form-clt">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nombre de usuario"
                        />
                        {validator.message('name', formData.name, 'required|alpha_space')}
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="form-clt">
                        <select
                            name="userType"
                            id="userType"
                            value={formData.userType}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">Seleccionar tipo de usuario</option>
                            <option value="admin">Administrador Principal</option>
                            <option value="secondary">Administrador Secundario</option>
                        </select>
                        {validator.message('userType', formData.userType, 'required')}
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="form-clt">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Correo electrónico"
                        />
                        {validator.message('email', formData.email, 'required|email')}
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="form-clt">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Contraseña"
                        />
                        {validator.message('password', formData.password, 'required|min:6')}
                    </div>
                </div>

                <div className="col-lg-12">
                    <div className="d-flex justify-content-between">
                        <button type="submit" className="theme-btn">
                            Agregar usuario
                        </button>
                        <button type="button" className="theme-btn" onClick={handleCancel}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AggUssers;