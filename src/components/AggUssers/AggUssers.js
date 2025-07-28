import React, { useState, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useNavigate, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import auth from '../login/firebase';
import { db } from '../login/firebase';
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

// Animaciones para el modal
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { 
    transform: translateY(-50px) scale(1.5);
    opacity: 0; 
  }
  to { 
    transform: translateY(0) scale(1);
    opacity: 1; 
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

// Componentes estilizados
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  backdrop-filter: blur(2px);
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 100px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  animation: ${slideIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  transform-origin: center;
`;

const ModalHeader = styled.div`
  padding: 22px;
  background: linear-gradient(9deg, #ff4d4d, #d93636);
  color: white;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SuccessModalHeader = styled(ModalHeader)`
  background: linear-gradient(9deg, #28a745, #218838);
`;

const InfoModalHeader = styled(ModalHeader)`
  background: linear-gradient(9deg, #17a2b8, #138496);
`;

const ModalBody = styled.div`
  padding: 30px;
  text-align: center;
`;

const ModalFooter = styled.div`
  padding: 20px 25px;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  background: #f8f9fa;
  border-top: 1px solid #eee;
`;

const DangerButton = styled.button`
  background: linear-gradient(135deg, #ff4d4d, #d93636);
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, #ff3333, #cc2a2a);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled.button`
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 25px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: #02871c;
    transform: translateY(-2px);
    color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SuccessButton = styled.button`
  background: linear-gradient(135deg, #28a745, #218838);
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: linear-gradient(135deg, #218838, #1e7e34);
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const WarningIcon = styled.div`
  font-size: 2rem;
  margin-left: 28px;
  color: #fff;
  animation: ${pulse} 1.5s infinite;
`;

const SuccessIcon = styled.div`
  font-size: 2rem;
  margin-left: 28px;
  color: #fff;
`;

const InfoIcon = styled.div`
  font-size: 2rem;
  margin-left: 28px;
  color: #fff;
`;

const AggUssers = () => {
  const [formData, setFormData] = useState({
    name: '',
    userType: '',
    email: '',
    password: '',
  });
  
  const [validator] = useState(new SimpleReactValidator());
  const [, forceUpdate] = useState();
  const [canAdd, setCanAdd] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Editado: se convirtió en estado
  const [editingUserId, setEditingUserId] = useState(null); // Nuevo: ID de usuario en modo edición
  const navigate = useNavigate();
  const location = useLocation();

  // Estados para los modales
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  useEffect(() => {
    // Obtener usuario desde location.state o params
    if (location.state?.user) {
      const { id, name, userType, email } = location.state.user;
      setFormData({ name, userType, email, password: '' });
      setEditingUserId(id); // Guardamos el ID para edición
      setIsEditing(true);
      validator.hideMessages();
      forceUpdate(1);
    } 
    // Obtener desde parámetros URL
    else {
      const searchParams = new URLSearchParams(location.search);
      const userParam = searchParams.get('user');
      
      if (userParam) {
        try {
          const user = JSON.parse(decodeURIComponent(userParam));
          const { id, name, userType, email } = user;
          setFormData({ name, userType, email, password: '' });
          setEditingUserId(id); // Guardamos el ID para edición
          setIsEditing(true);
          validator.hideMessages();
          forceUpdate(1);
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      } else {
        setIsEditing(false);
      }
    }
  }, [location.state, location.search, validator]);

  useEffect(() => {
    (async () => {
      // Solo verificar límite si estamos agregando nuevo usuario
      if (!isEditing) {
        const usersCollection = collection(db, "users");
        const snapshot = await getDocs(usersCollection);
        setCanAdd(snapshot.size < 5);
      }
    })();
  }, [isEditing]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validator.showMessageFor(name);
    forceUpdate(1);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Validación de límite solo para nuevos usuarios
    if (!canAdd && !isEditing) {
      setModalTitle('Límite alcanzado');
      setModalMessage('No se pueden agregar más usuarios. El límite es de 5 usuarios.');
      setShowInfoModal(true);
      return;
    }

    // Validación de campos
    if (!validator.allValid()) {
      validator.showMessages();
      forceUpdate(1);
      return;
    }

    try {
      // MODO EDICIÓN
      if (isEditing) {
        const userDocRef = doc(db, "users", editingUserId);
        
        await setDoc(
          userDocRef,
          {
            name: formData.name,
            userType: formData.userType,
          },
          { merge: true }
        );
        
        // Campo de contraseña opcional en edición
        if (formData.password) {
          console.log("Lógica para actualizar contraseña iría aquí");
        }
        
        setModalTitle('Usuario actualizado');
        setModalMessage('El usuario ha sido actualizado correctamente.');
        setShowSuccessModal(true);
      } 
      // MODO CREACIÓN
      else {
  const userCredential = await createUserWithEmailAndPassword(
  auth,
  formData.email,
  formData.password
);
        
        const user = userCredential.user;
        const userDocRef = doc(db, "users", user.uid);
        
        await setDoc(userDocRef, {
          uid: user.uid,
          name: formData.name,
          userType: formData.userType,
          email: formData.email,
        });
        
        setModalTitle('Usuario creado');
        setModalMessage('El usuario ha sido creado correctamente.');
        setShowSuccessModal(true);
      }
      
      // Resetear formulario después de éxito
      setFormData({ name: '', userType: '', email: '', password: '' });
      validator.hideMessages();
      forceUpdate(1);
      
    } catch (error) {
      // Manejo de errores
      if (error.code === 'auth/email-already-in-use') {
        setModalTitle('Correo en uso');
        setModalMessage('El correo electrónico ya está en uso, por favor intenta con otro');
        setShowErrorModal(true);
      } else {
        console.error("Error al crear/editar usuario:", error);
        setModalTitle('Error');
        setModalMessage('Ocurrió un error al procesar la solicitud.');
        setShowErrorModal(true);
      }
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <>
      <form id="contact-form" onSubmit={handleSubmit}>
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
                className="form-control">
                <option value="">Seleccionar tipo de usuario</option>
                <option value="admin">Administrador Principal</option>
                <option value="secundario">Administrador Secundario</option>
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
                readOnly={isEditing}
                disabled={isEditing}
              />
              {validator.message('email', formData.email, isEditing ? '' : 'required|email')}
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
                placeholder={isEditing ? "Nueva contraseña (opcional)" : "Contraseña"}
              />
              {validator.message('password', formData.password, isEditing ? '' : 'required|min:6')}
              {isEditing && <small>Dejar en blanco si no desea cambiar la contraseña.</small>}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="d-flex justify-content-between">
              <button
                type="submit"
                className="theme-btn"
                disabled={!canAdd && !isEditing}>
                {isEditing ? 'Actualizar Usuario' : 'Agregar usuario'} {/* Botón dinámico */}
              </button>
              <button type="button" className="theme-btn" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Modales de respuesta */}
      {showSuccessModal && (
        <ModalOverlay onClick={() => setShowSuccessModal(false)}>
          <ModalContainer onClick={e => e.stopPropagation()}>
            <SuccessModalHeader>
              <SuccessIcon>
                <FaCheckCircle />
              </SuccessIcon>
              <h3 style={{ letterSpacing: '0.6px', margin: 2 }}>{modalTitle}</h3>
            </SuccessModalHeader>
            <ModalBody>
              <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                {modalMessage}
              </p>
            </ModalBody>
            <ModalFooter>
              <SuccessButton onClick={() => {
                setShowSuccessModal(false);
                navigate('/admin');
              }}>
                Aceptar
              </SuccessButton>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      )}

      {showErrorModal && (
        <ModalOverlay onClick={() => setShowErrorModal(false)}>
          <ModalContainer onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <WarningIcon>
                <FaExclamationTriangle />
              </WarningIcon>
              <h3 style={{ letterSpacing: '0.6px', margin: 2 }}>{modalTitle}</h3>
            </ModalHeader>
            <ModalBody>
              <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                {modalMessage}
              </p>
            </ModalBody>
            <ModalFooter>
              <SecondaryButton onClick={() => setShowErrorModal(false)}>
                Aceptar
              </SecondaryButton>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      )}

      {showInfoModal && (
        <ModalOverlay onClick={() => setShowInfoModal(false)}>
          <ModalContainer onClick={e => e.stopPropagation()}>
            <InfoModalHeader>
              <InfoIcon>
                <FaExclamationTriangle />
              </InfoIcon>
              <h3 style={{ letterSpacing: '0.6px', margin: 2 }}>{modalTitle}</h3>
            </InfoModalHeader>
            <ModalBody>
              <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                {modalMessage}
              </p>
            </ModalBody>
            <ModalFooter>
              <SecondaryButton onClick={() => setShowInfoModal(false)}>
                Aceptar
              </SecondaryButton>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};

export default AggUssers;
