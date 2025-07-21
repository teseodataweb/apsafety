import React, { useEffect, useState } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.min.css';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../components/login/firebase';
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

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
  color: white;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SuccessModalHeader = styled(ModalHeader)`
  background: linear-gradient(9deg, #28a745, #218838);
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

const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const Admin = (props) => {
    const [users, setUsers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);

    useEffect(() => {
        const serviceSlider = new Swiper('.service-slider', {
            spaceBetween: 30,
            speed: 3000,
            loop: true,
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
            },
            pagination: { el: '.dot', clickable: true },
            navigation: { nextEl: '.array-next', prevEl: '.array-prev' },
            breakpoints: {
                1399: { slidesPerView: 5 },
                1199: { slidesPerView: 4 },
                991:  { slidesPerView: 3 },
                767:  { slidesPerView: 2 },
                575:  { slidesPerView: 2 },
                0:    { slidesPerView: 1 },
            },
        });
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const snapshot = await getDocs(collection(db, "users"));
            const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(usersData);
        } catch (error) {
            console.error("Error al cargar usuarios: ", error);
            setErrorMessage("Error al cargar usuarios");
            setShowErrorModal(true);
        }
    };

    const confirmDelete = (userId, email, userType) => {
        const adminUsers = users.filter(u => u.userType === "admin");
        const secondaryUsers = users.filter(u => u.userType === "secundario");
        
        // Caso 1: Es el último admin y no hay secundarios
        if (userType === "admin" && adminUsers.length <= 1 && secondaryUsers.length === 0) {
            setErrorMessage("No se puede eliminar el último administrador principal del sistema");
            setShowErrorModal(true);
            return;
        }
        
        // Caso 2: Es el único admin pero hay secundarios
        if (userType === "admin" && adminUsers.length <= 1 && secondaryUsers.length > 0) {
            setErrorMessage("Debe haber al menos un administrador principal.");
            setShowErrorModal(true);
            return;
        }
        
        setUserToDelete({ id: userId, email, userType });
        setShowDeleteModal(true);
    };

    const handleDeleteUser = async () => {
        if (!userToDelete) return;
        
        // Validación de seguridad post-confirmación
        const remainingUsers = users.filter(u => u.id !== userToDelete.id);
        const remainingAdmins = remainingUsers.filter(u => u.userType === "admin");
        const remainingSecondaries = remainingUsers.filter(u => u.userType === "secundario");

        if (userToDelete.userType === "admin") {
            if (remainingAdmins.length === 0 && remainingSecondaries.length > 0) {
                setErrorMessage("Operación cancelada: El sistema quedaría sin administradores principales");
                setShowErrorModal(true);
                setShowDeleteModal(false);
                setUserToDelete(null);
                return;
            }

            if (remainingAdmins.length === 0 && remainingSecondaries.length === 0) {
                setErrorMessage("Operación cancelada: No se puede eliminar el último usuario del sistema");
                setShowErrorModal(true);
                setShowDeleteModal(false);
                setUserToDelete(null);
                return;
            }
        }

        try {
            await deleteDoc(doc(db, "users", userToDelete.id));
            setShowDeleteModal(false);
            setShowSuccessModal(true);
            loadUsers();
        } catch (error) {
            console.error("Error al eliminar usuario: ", error);
            setErrorMessage("Error al eliminar usuario: " + error.message);
            setShowErrorModal(true);
        } finally {
            setUserToDelete(null);
        }
    };

    return (
        <section className={"" + props.hclass} style={{ backgroundImage: `url(${props.Bg})` }}>
            <div className="container">
                <div className="section-title-area">
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">Usuarios</h2>
                    <Link onClick={ClickHandler} to="/formUsser" className="theme-btn wow fadeInUp" data-wow-delay=".5s">
                        Agregar Usuario
                    </Link>  
                </div>
            </div>
            <div className="service-wrapper">
                <div className="swiper service-slider">
                    <div className="swiper-wrapper" style={{ gap: '40px'  }} >
                        {users.map((user, idx) => (
                            <div className="swiper-slide" key={idx}>
                                <div className="service-card-items" style={{ 
                                    background: '#fff', 
                                    borderRadius: '8px', 
                                    padding: '25px', 
                                    boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
                                    margin: '80px',
                                    height: '460px',
                                    minHeight: '350px',
                                    width: '450px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}>
                                    <div className="service-cotent" style={{ textAlign: 'left' }}>
                                        <h3 style={{ color: '#333', marginBottom: '15px', textAlign: 'left' }}>{user.name}</h3>
                                        <p style={{ margin: '25px 0', color: '#555', textAlign: 'left' }}><strong>Email:</strong> {user.email}</p>
                                        <p style={{ margin: '25px 0', color: '#555', textAlign: 'left' }}>
                                            <strong>Tipo:</strong> {user.userType === "admin"
                                                ? "Administrador Principal"
                                                : user.userType === "secundario"
                                                    ? "Administrador Secundario"
                                                    : user.userType}
                                        </p>
                                        <p style={{ margin: '0px', color: '#555', textAlign: 'left' }}><strong>Contraseña:</strong> ********</p>
                                    </div>
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between',
                                        marginTop: '10px'
                                    }}>
                                        <button
                                            onClick={() => {
                                                ClickHandler();
                                                window.location.href = `/formUsser?user=${encodeURIComponent(JSON.stringify(user))}`;
                                            }}
                                            style={{
                                                background: '#4CAF50',
                                                color: 'white',
                                                border: 'none',
                                                padding: '10px 15px',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                fontWeight: 'bold',
                                                flex: '1',
                                                marginRight: '10px'
                                            }}>
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => confirmDelete(user.id, user.email, user.userType)}
                                            style={{
                                                background: '#f44336',
                                                color: 'white',
                                                border: 'none',
                                                padding: '10px 15px',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                fontWeight: 'bold',
                                                flex: '1'
                                            }}>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showDeleteModal && (
                <ModalOverlay>
                    <ModalContainer>
                        <ModalHeader>
                            <WarningIcon>
                                <FaExclamationTriangle />
                            </WarningIcon>
                            <h3 style={{ letterSpacing: '0.6px', color: 'white', margin: 2 }}>Confirmar eliminación</h3>
                        </ModalHeader>
                        <ModalBody>
                            <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                                ¿Estás seguro de eliminar al usuario <strong>"{userToDelete?.email}"</strong>?
                            </p>
                            <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                                Esta acción no se puede deshacer y el usuario será eliminado permanentemente.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <SecondaryButton onClick={() => setShowDeleteModal(false)}>
                                Cancelar
                            </SecondaryButton>
                            <DangerButton onClick={handleDeleteUser}>
                                Eliminar
                            </DangerButton>
                        </ModalFooter>
                    </ModalContainer>
                </ModalOverlay>
            )}

            {showSuccessModal && (
                <ModalOverlay>
                    <ModalContainer>
                        <SuccessModalHeader>
                            <SuccessIcon>
                                <FaCheckCircle />
                            </SuccessIcon>
                            <h3 style={{ letterSpacing: '0.6px', color: 'white', margin: 2 }}>Éxito</h3>
                        </SuccessModalHeader>
                        <ModalBody>
                            <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                                Usuario eliminado correctamente.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <SuccessButton onClick={() => setShowSuccessModal(false)}>
                                Aceptar
                            </SuccessButton>
                        </ModalFooter>
                    </ModalContainer>
                </ModalOverlay>
            )}

            {showErrorModal && (
                <ModalOverlay>
                    <ModalContainer>
                        <ModalHeader>
                            <WarningIcon>
                                <FaExclamationTriangle />
                            </WarningIcon>
                            <h3 style={{ letterSpacing: '0.6px', color: 'white', margin: 2 }}>Error</h3>
                        </ModalHeader>
                        <ModalBody>
                            <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                                {errorMessage}
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
        </section>
    );
};

export default Admin;