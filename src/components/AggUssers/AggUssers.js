import React, { useState, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useNavigate, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import auth from '../login/firebase';
import { db } from '../login/firebase';
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

const FormContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 30px;
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s;
  color: #333;
  
  &:focus {
    border-color: #007bff;
    outline: none;
    color: #333;
  }
  
  &:disabled {
    background-color: #f8f9fa;
    opacity: 1;
    color: #333; 
  }
`;
const FormSelect = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: all 0.3s;
  color: #333;
  font-weight: normal !important;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;
const ErrorMessage = styled.span`
  display: block;
  margin-top: 8px;
  color: #dc3545;
  font-size: 14px;
`;

const PrivacyLink = styled.a`
  color: #007bff;
  text-decoration: underline;
  transition: color 0.2s;
  
  &:hover {
    color: #0056b3;
    text-decoration: none;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  input[type="checkbox"] {
    margin-right: 10px;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  
  label {
    cursor: pointer;
    user-select: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 20px;
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #28a745, #218838);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  font-size: 16px;
  flex: 1;
  
  &:hover {
    background: linear-gradient(135deg, #218838, #1e7e34);
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const SecondaryButton = styled.button`
  background: #000;
  color: #fff;
  border: none;
  padding: 12px 25px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  font-size: 16px;
  flex: 1;
  
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

const RequiredField = styled.span`
  color: #dc3545;
  margin-left: 4px;
`;

const PasswordHint = styled.small`
  display: block;
  margin-top: 5px;
  color: #6c757d;
  font-size: 13px;
`;

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
  color: #fff;
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

const ModalSecondaryButton = styled.button`
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
  
  const [, forceUpdate] = useState();
  const [validator] = useState(
    new SimpleReactValidator({
      autoForceUpdate: { forceUpdate }, // Corrección clave aquí
      messages: {
        required: 'Este campo es obligatorio',
        email: 'Debe ser un correo electrónico válido',
        min: 'La contraseña debe tener al menos 6 caracteres',
        alpha_space: 'Solo se permiten letras y espacios'
      },
      element: message => <ErrorMessage>{message}</ErrorMessage>
    })
  );
  
  const [canAdd, setCanAdd] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Estados para los modales
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    userType: false,
    email: false,
    password: false
  });

  useEffect(() => {
    if (location.state?.user) {
      const { id, name, userType, email } = location.state.user;
      setFormData({ name, userType, email, password: '' });
      setEditingUserId(id); 
      setIsEditing(true);
      validator.hideMessages();
      forceUpdate(1);
    } 
    else {
      const searchParams = new URLSearchParams(location.search);
      const userParam = searchParams.get('user');
      
      if (userParam) {
        try {
          const user = JSON.parse(decodeURIComponent(userParam));
          const { id, name, userType, email } = user;
          setFormData({ name, userType, email, password: '' });
          setEditingUserId(id); 
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
    setTouchedFields({ ...touchedFields, [name]: true });
    validator.showMessageFor(name);
    forceUpdate(1);
  };

  const handleBlur = e => {
    const { name } = e.target;
    setTouchedFields({ ...touchedFields, [name]: true });
    validator.showMessageFor(name);
    forceUpdate(1);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (!canAdd && !isEditing) {
      setModalTitle('Límite alcanzado');
      setModalMessage('No se pueden agregar más usuarios. El límite es de 5 usuarios.');
      setShowInfoModal(true);
      return;
    }

    // Validación condicional basada en si estamos editando o no
    const isValid = isEditing 
      ? validator.allValid({
          name: 'required|alpha_space',
          userType: 'required'
        })
      : validator.allValid({
          name: 'required|alpha_space',
          userType: 'required',
          email: 'required|email',
          password: 'required|min:6'
        });

    if (!isValid) {
      validator.showMessages();
      forceUpdate(1);
      
      setModalTitle('Error de validación');
      setModalMessage('Por favor complete todos los campos requeridos correctamente.');
      setShowErrorModal(true);
      return;
    }

    try {
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
        
        if (formData.password) {
          console.log("Lógica para actualizar contraseña iría aquí");
        }
        
        setModalTitle('Usuario actualizado');
        setModalMessage('El usuario ha sido actualizado correctamente.');
        setShowSuccessModal(true);
      } 
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
      setTouchedFields({
        name: false,
        userType: false,
        email: false,
        password: false
      });
      validator.hideMessages();
      forceUpdate(1);
      
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setModalTitle('Correo en uso');
        setModalMessage('El correo electrónico ya está en uso, por favor intenta con otro');
        setShowErrorModal(true);
      } else if (error.code === 'auth/weak-password') {
        setModalTitle('Contraseña débil');
        setModalMessage('La contraseña debe tener al menos 6 caracteres');
        setShowErrorModal(true);
      } else {
        console.error("Error al crear/editar usuario:", error);
        setModalTitle('Error');
        setModalMessage('Ocurrió un error al procesar la solicitud: ' + error.message);
        setShowErrorModal(true);
      }
    }
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <div className="container">
      <form id="contact-form" onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-lg-6">
            <FormGroup>
              <FormLabel htmlFor="name">
                Nombre completo <RequiredField>*</RequiredField>
              </FormLabel>
              <FormInput
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ej: Eduardo Soto"
              />
              {validator.message('name', formData.name, 'required|alpha_space')}
            </FormGroup>
          </div>

          <div className="col-lg-6">
            <FormGroup>
              <FormLabel htmlFor="userType">
                Tipo de usuario <RequiredField>*</RequiredField>
              </FormLabel>
              <FormSelect
                name="userType"
                id="userType"
                value={formData.userType}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Seleccionar tipo de usuario</option>
                <option value="admin">Administrador Principal</option>
                <option value="secundario">Administrador Secundario</option>
              </FormSelect>
              {validator.message('userType', formData.userType, 'required')}
            </FormGroup>
          </div>

          <div className="col-lg-6">
            <FormGroup>
              <FormLabel htmlFor="email">
                Correo electrónico {!isEditing && <RequiredField>*</RequiredField>}
              </FormLabel>
              <FormInput
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Ej: apsafety@gmail.com"
                readOnly={isEditing}
                disabled={isEditing}
              />
              {!isEditing && validator.message('email', formData.email, 'required|email')}
            </FormGroup>
          </div>
          
          <div className="col-lg-6">
            <FormGroup>
              <FormLabel htmlFor="password">
                {isEditing ? 'Nueva contraseña' : 'Contraseña'} {!isEditing && <RequiredField>*</RequiredField>}
              </FormLabel>
              <FormInput
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={isEditing ? "Opcional" : "Mínimo 6 caracteres"}
              />
              {!isEditing && validator.message('password', formData.password, 'required|min:6')}
              {isEditing && <PasswordHint>Dejar en blanco si no desea cambiar la contraseña</PasswordHint>}
            </FormGroup>
          </div>
          
          <div className="col-lg-12">
            <CheckboxContainer>
              <input 
                type="checkbox" 
                id="termsCheckbox" 
                required
              />
              <label htmlFor="termsCheckbox">
                Acepto términos y <PrivacyLink href="https://drive.google.com/file/d/1wa8vCbADtDX_1QTV4CGDYam73scUGrQI/view">aviso de privacidad</PrivacyLink> <RequiredField>*</RequiredField>
              </label>
            </CheckboxContainer>
          </div>
          
          <div className="col-lg-12">
            <ButtonGroup>
              <PrimaryButton
                type="submit"
                disabled={!canAdd && !isEditing}
              >
                {isEditing ? 'Actualizar Usuario' : 'Agregar Usuario'}
              </PrimaryButton>
              <SecondaryButton type="button" onClick={handleCancel}>
                Cancelar
              </SecondaryButton>
            </ButtonGroup>
          </div>
        </div>
      </form>

      {/* Modales se mantienen igual */}
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
              <ModalSecondaryButton onClick={() => setShowErrorModal(false)}>
                Aceptar
              </ModalSecondaryButton>
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
              <ModalSecondaryButton onClick={() => setShowInfoModal(false)}>
                Aceptar
              </ModalSecondaryButton>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      )}
    </div>
  );
};

export default AggUssers;
