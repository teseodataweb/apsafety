import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Swiper from 'swiper';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import 'swiper/swiper-bundle.min.css';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../../components/login/firebase';
import { 
  FaExclamationTriangle, 
  FaCheckCircle, 
  FaSearch, 
  FaTh, 
  FaThList,
  FaEdit,
  FaTrash,
  FaUserCog,
  FaUserShield,
  FaUser,
  FaSync,
  FaMobile,
  FaSortAmountDown,
  FaSortAmountUp,
  FaChevronDown
} from 'react-icons/fa';
import styled, { keyframes, css } from 'styled-components';
import { debounce } from 'lodash';

// ==================== CONSTANTS ====================
const VIEW_MODES = {
  SMALL_GRID: 'small-grid',
  LIST: 'list'
};

const SORT_OPTIONS = {
  NAME: 'name',
  EMAIL: 'email'
};

const USER_TYPES = {
  ADMIN: 'admin',
  SECONDARY: 'secundario',
  DEFAULT: 'default'
};

// ==================== ANIMATIONS ====================
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { 
    transform: translateY(-20px) scale(1.5);
    opacity: 0; 
  }
  to { 
    transform: translateY(0) scale(1);
    opacity: 1; 
  }
`;

const pulse = keyframes`
  0% { transform: scale(1);}
  50% { transform: scale(1.1);}
  100% { transform: scale(1); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(4, 15, 28, 0.5); }
  50% { box-shadow: 0 0 10px rgba(4, 15, 28, 0.8); }
  100% { box-shadow: 0 0 5px rgba(4, 15, 28, 0.5); }
`;

// ==================== STYLED COMPONENTS ====================
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.4s ease-out;
  backdrop-filter: blur(8px);
`;

const ModalContainer = styled.div`
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 16px;
  box-shadow: 0 15px 60px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
  animation: ${slideIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.4);
  overflow: hidden;
  transform-origin: center;
`;

const ModalHeader = styled.div`
  padding: 24px;
   background: linear-gradient(9deg, #ff4d4d, #d93636);
  color: white;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const SuccessModalHeader = styled(ModalHeader)`
  background: linear-gradient(135deg, #036016, #04871c);
`;

const ErrorModalHeader = styled(ModalHeader)`
  background: linear-gradient(135deg, #f46b45, #eea849);
`;

const ModalBody = styled.div`
  padding: 30px;
  text-align: center;
  background: white;
`;

const ModalFooter = styled.div`
  padding: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  background: #f8f9fa;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
`;

const Button = styled.button`
  border: none;
  padding: 14px 32px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
  font-size: 15px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const DangerButton = styled(Button)`
  background: linear-gradient(135deg, #ff5e62, #ff4444);
  color: white;
  
  &:hover {
    background: linear-gradient(135deg, #ff4444, #ff3333);
  }
`;

const SecondaryButton = styled(Button)`
  background: #010101;
  color: white;
  
  &:hover {
    background: #2c2c2c;
  }
`;

const SuccessButton = styled(Button)`
  background: linear-gradient(135deg, #036016, #04871c);
  color: white;
  ${props => props.$animate && css`animation: ${glow} 2s infinite;`}
  
  &:hover {
    background: linear-gradient(135deg, #04871c, #036016);
    animation: none;
  }
`;

const WarningIcon = styled.div`
  font-size: 2.8rem;
  color: #fff;
  ${() => css`animation: ${pulse} 1.5s infinite;`}
`;

const SuccessIcon = styled.div`
  font-size: 2.8rem;
  color: #fff;
`;

const ErrorIcon = styled.div`
  font-size: 2.8rem;
  color: #fff;
  ${() => css`animation: ${pulse} 2s infinite;`}
`;

// ==================== CONTROL PANEL COMPONENTS ====================
const ControlPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 50px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  padding: 20px;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  gap: 20px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: 15px;
  }
  
  &:hover {
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
  }
`;

const SearchInput = styled.div`
  position: relative;
  flex: 1;
  min-width: 250px;
  max-width: 500px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
  
  input {
    width: 100%;
    padding: 14px 20px 14px 50px;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    background: rgba(0, 0, 0, 0.03);
    box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.05);
    color: #000;
    
    &:focus {
      outline: none;
      background: white;
      box-shadow: 0 0 0 3px rgba(4, 135, 28, 0.4), 
                  inset 0 3px 6px rgba(0, 0, 0, 0.05),
                  0 5px 15px rgba(4, 135, 28, 0.1);
    }
    
    &::placeholder {
      color: #999;
    }
  }
  
  svg {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: #777;
    font-size: 18px;
    transition: all 0.3s;
  }
  
  &:focus-within svg {
    color: #04871c;
    transform: translateY(-50%) scale(1.1);
  }
`;

const ViewControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(0, 0, 0, 0.03);
  padding: 10px;
  border-radius: 10px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const ViewButton = styled.button`
  background: ${props => props.$active ? 'linear-gradient(135deg,  #010101, #2c2c2c)' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#555'};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: ${props => props.$active ? '0 4px 15px rgba(4, 135, 28, 0.3)' : 'none'};
  
  &:hover {
    background: ${props => !props.$active && 'rgba(0, 0, 0, 0.05)'};
    transform: translateY(-2px);
    box-shadow: ${props => !props.$active && '0 4px 10px rgba(0, 0, 0, 0.1)'};
  }
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(0, 0, 0, 0.03);
  padding: 8px;
  border-radius: 10px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const SortSelect = styled.div`
  position: relative;
  min-width: 180px;
  
  @media (max-width: 768px) {
    min-width: 150px;
  }
  
  select {
    width: 100%;
    padding: 12px 40px 12px 15px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    appearance: none;
    background-color: white;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.3s;
    color: #333;
    font-weight: 500;
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(4, 135, 28, 0.3),
                  0 5px 15px rgba(0, 0, 0, 0.1);
    }
  }
  
  svg {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #555;
    transition: all 0.3s;
  }
  
  &:hover svg {
    color: #04871c;
  }
`;

const SortOrderButton = styled.button`
  background: ${props => props.$active ? 'linear-gradient(135deg,  #010101, #2c2c2c)' : 'rgba(0, 0, 0, 0.03)'};
  color: ${props => props.$active ? 'white' : '#555'};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: ${props => props.$active ? '0 4px 15px rgba(4, 135, 28, 0.3)' : '0 2px 5px rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    background: ${props => !props.$active && 'rgba(0, 0, 0, 0.05)'};
    transform: translateY(-2px);
    box-shadow: ${props => !props.$active && '0 4px 10px rgba(0, 0, 0, 0.1)'};
  }
`;

const RefreshButton = styled.button`
  background: linear-gradient(135deg, #036016, #04871c);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(4, 135, 28, 0.3);
  ${props => props.$animate && css`animation: ${glow} 3s infinite;`}
  
  &:hover {
    transform: translateY(-3px) rotate(30deg);
    box-shadow: 0 8px 25px rgba(4, 135, 28, 0.4);
    animation: none;
  }
  
  &.refreshing {
    ${() => css`
      animation: ${rotate} 1s linear infinite, ${glow} 3s infinite;
    `}
  }
`;

// ==================== USER CARD COMPONENTS ====================
const UserCardContainer = styled.div`
  margin: 15px;
  border-radius: 8px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid rgba(0, 0, 0, 0.08);
  transform: translateY(0);

  @media (max-width: 768px) {
    margin: 10px 5px;
  }

  &:hover {
    transform: translateY(-10px);
    ${() => css`animation: ${float} 4s ease-in-out infinite;`}
  }
`;

const UserCardHeader = styled.div`
  padding: 25px;
  
  ${'' /* background: linear-gradient(135deg, 
    ${props => 
      props.$userType === USER_TYPES.ADMIN ? '#036016, #04871c' : 
      props.$userType === USER_TYPES.SECONDARY ? '#15d405, #34a44c' : '#ff9a9e, #fad0c4'});
  */}
  background: #2c2c2c;
  display: flex;
   color: #fff;
  align-items: center;
  gap: 15px;
  background-size: 200% 200%;
  ${() => css`animation: ${gradient} 4s ease infinite;`}
  
  svg {
    font-size: 1.8rem;
    color: #15d405;
    flex-shrink: 0;
    ${'' /* filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2)); */}
  }
  
  h3 {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 600;
    white-space: nowrap;
     color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const UserCardBody = styled.div`
  padding: 25px;
  flex-grow: 1;
  
  p {
    margin: 16px 0;
    color: #555;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    transition: all 0.3s;
    
    &:hover {
      color: #333;
      transform: translateX(5px);
    }
    
    strong {
      color: #333;
      min-width: 110px;
      display: inline-block;
      font-weight: 600;
    }
    
    svg {
      color: #04871c;
      transition: all 0.3s;
    }
    
    &:hover svg {
      transform: scale(1.2);
    }
  }
`;

const UserCardFooter = styled.div`
  padding: 20px;
  display: flex;
  gap: 15px;
  
  @media (max-width: 480px) {
    flex-direction: inline;
    gap: 10px;
  }
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  
  &:first-child {
    background: rgba(4, 135, 28, 0.1);
    color: #04871c;
    
    &:hover {
      background: rgba(4, 135, 28, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(4, 135, 28, 0.2);
    }
  }
  
  &:last-child {
    background: rgba(255, 94, 98, 0.1);
    color: #ff5e62;
    
    &:hover {
      background: rgba(255, 94, 98, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(255, 94, 98, 0.2);
    }
  }
`;

// ==================== LIST VIEW COMPONENTS ====================
const ListContainer = styled.div`
  width: 100%;
  padding: 0 20px;
  
  @media (min-width: 768px) {
    padding: 0 50px;
  }
  
  @media (min-width: 1200px) {
    padding: 0 250px;
  }
`;

const ListItem = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  transform: translateY(0);
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ListItemAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: linear-gradient(135deg, 
    ${props => 
      props.$userType === USER_TYPES.ADMIN ? '#036016, #04871c' : 
      props.$userType === USER_TYPES.SECONDARY ? '#15d405, #8ef07f' : '#ff9a9e, #fad0c4'});
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-right: 25px;
  flex-shrink: 0;
  background-size: 200% 200%;
  ${() => css`animation: ${gradient} 4s ease infinite;`}
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 767px) {
    margin-right: 0;
    margin-bottom: 15px;
  }
`;

const ListItemContent = styled.div`
  flex-grow: 1;
  min-width: 0;
  
  h3 {
    margin: 0 0 8px 0;
    font-size: 1.3rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333;
  }
  
  p {
    margin: 8px 0;
    color: #777;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s;
    
    &:hover {
      color: #555;
    }
    
    svg {
      color: #04871c;
      transition: all 0.3s;
    }
    
    &:hover svg {
      transform: scale(1.2);
    }
  }
`;

const ListItemActions = styled.div`
  display: flex;
  gap: 12px;
  margin-left: 25px;
  flex-shrink: 0;
  
  @media (max-width: 767px) {
    margin-left: 0;
    margin-top: 15px;
    justify-content: space-between;
  }
`;

// ==================== MAIN COMPONENT ====================
const Admin = (props) => {
  // State
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.NAME);
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState(VIEW_MODES.SMALL_GRID);

  // Memoized user type display
  const getUserTypeDisplay = useCallback((userType) => {
    switch(userType) {
      case USER_TYPES.ADMIN:
        return "Administrador Principal";
      case USER_TYPES.SECONDARY:
        return "Administrador Secundario";
      default:
        return "Usuario";
    }
  }, []);

  // Memoized user icon
  const getUserIcon = useCallback((userType) => {
    switch(userType) {
      case USER_TYPES.ADMIN:
        return <FaUserShield />;
      case USER_TYPES.SECONDARY:
        return <FaUserCog />;
      default:
        return <FaUser />;
    }
  }, []);

  // Debounced search
  const debouncedSearch = useMemo(() => debounce((term) => {
    if (!term) {
      setFilteredUsers(users);
      return;
    }

    const termLower = term.toLowerCase();
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(termLower) || 
      user.email.toLowerCase().includes(termLower) ||
      getUserTypeDisplay(user.userType).toLowerCase().includes(termLower)
    );
    
    setFilteredUsers(filtered);
  }, 300), [users, getUserTypeDisplay]);

  // Load users from Firestore
  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const usersQuery = query(
        collection(db, "users"), 
        orderBy(sortBy, sortOrder)
      );
      const snapshot = await getDocs(usersQuery);
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (error) {
      console.error("Error loading users: ", error);
      setErrorMessage("Error al cargar usuarios. Intente nuevamente.");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [sortBy, sortOrder]);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadUsers();
  }, [loadUsers]);

  // Handle search term change
  const handleSearchChange = useCallback((e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  }, [debouncedSearch]);

  // Handle sort option selection
  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);

  // Toggle sort order
  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  }, []);

  // Confirm delete user
  const confirmDelete = useCallback((userId, email, userType) => {
    const adminUsers = users.filter(u => u.userType === USER_TYPES.ADMIN);
    const secondaryUsers = users.filter(u => u.userType === USER_TYPES.SECONDARY);
    
    // Validation checks
    if (userType === USER_TYPES.ADMIN && adminUsers.length <= 1 && secondaryUsers.length === 0) {
      setErrorMessage("No se puede eliminar el último administrador principal del sistema");
      setShowErrorModal(true);
      return;
    }
    
    if (userType === USER_TYPES.ADMIN && adminUsers.length <= 1 && secondaryUsers.length > 0) {
      setErrorMessage("Debe haber al menos un administrador principal.");
      setShowErrorModal(true);
      return;
    }
    
    setUserToDelete({ id: userId, email, userType });
    setShowDeleteModal(true);
  }, [users]);

  // Delete user
  const handleDeleteUser = useCallback(async () => {
    if (!userToDelete) return;
    
    const remainingUsers = users.filter(u => u.id !== userToDelete.id);
    const remainingAdmins = remainingUsers.filter(u => u.userType === USER_TYPES.ADMIN);
    const remainingSecondaries = remainingUsers.filter(u => u.userType === USER_TYPES.SECONDARY);

    if (userToDelete.userType === USER_TYPES.ADMIN) {
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
      console.error("Error deleting user: ", error);
      setErrorMessage(`Error al eliminar usuario: ${error.message}`);
      setShowErrorModal(true);
    } finally {
      setUserToDelete(null);
    }
  }, [userToDelete, users, loadUsers]);

  // Initialize and update swiper
  useEffect(() => {
    if (viewMode !== VIEW_MODES.LIST) {
      const swiper = new Swiper('.service-slider', {
        spaceBetween: 30,
        speed: 500,
        loop: false,
        pagination: { el: '.dot', clickable: true },
        navigation: { nextEl: '.array-next', prevEl: '.array-prev' },
        breakpoints: {
          1399: { slidesPerView: viewMode === VIEW_MODES.SMALL_GRID ? 5 : 3 },
          1199: { slidesPerView: viewMode === VIEW_MODES.SMALL_GRID ? 4 : 3 },
          991:  { slidesPerView: viewMode === VIEW_MODES.SMALL_GRID ? 3 : 2 },
          767:  { slidesPerView: 2 },
          575:  { slidesPerView: 2 },
          0:    { slidesPerView: 1 },
        },
      });

      return () => {
        swiper.destroy(true, true);
      };
    }
  }, [viewMode, filteredUsers]);

  // Load users on mount and when sort changes
  useEffect(() => {
    loadUsers();
  }, [loadUsers, sortBy, sortOrder]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Scroll to top handler
  const ClickHandler = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Render user cards based on view mode
  const renderUserCards = () => {
    if (loading) {
      return (
        <div style={{ 
          display: 'flex', 
          padding: '100px',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '300px',
          color: '#04871c',
          fontSize: '1.2rem',
        }}>
          Cargando usuarios...
        </div>
      );
    }

    if (filteredUsers.length === 0) {
      return (
        <div style={{ 
          display: 'flex', 
          padding: '100px',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '300px',
          color: '#777',
          fontSize: '1.2rem'
        }}>
          {searchTerm ? 'No se encontraron usuarios' : 'No hay usuarios registrados'}
        </div>
      );
    }

    if (viewMode === VIEW_MODES.LIST) {
      return (
        <ListContainer>
          {filteredUsers.map((user) => (
            <ListItem key={user.id}>
              <ListItemAvatar $userType={user.userType}>
                {getUserIcon(user.userType)}
              </ListItemAvatar>
              <ListItemContent>
                <h3>{user.name}</h3>
                <p>
                  <FaSearch /> {user.email}
                </p>
                <p>
                  {getUserIcon(user.userType)} {getUserTypeDisplay(user.userType)}
                </p>
              </ListItemContent>
              <ListItemActions>
                <ActionButton
                  onClick={() => {
                    ClickHandler();
                   Navigate('/formUsser', { state: { user } });
                  }}
                >
                  <FaEdit /> Editar
                </ActionButton>
                <ActionButton 
                  onClick={() => confirmDelete(user.id, user.email, user.userType)}
                >
                  <FaTrash /> Eliminar
                </ActionButton>
              </ListItemActions>
            </ListItem>
          ))}
        </ListContainer>
      );
    }

    return filteredUsers.map((user) => (
      <div className="swiper-slide" key={user.id}>
        <UserCardContainer>
          <UserCardHeader $userType={user.userType}>
            {getUserIcon(user.userType)}
            <h3>{user.name}</h3>
          </UserCardHeader>
          <UserCardBody>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Tipo:</strong> {getUserTypeDisplay(user.userType)}
            </p>
            <p>
              <strong>Contraseña:</strong> ********
            </p>
          </UserCardBody>
          <UserCardFooter>
            <ActionButton
              onClick={() => {
                ClickHandler();
                window.location.href = `/formUsser?user=${encodeURIComponent(JSON.stringify(user))}`;
              }}
            >
              <FaEdit /> Editar
            </ActionButton>
            <ActionButton 
              onClick={() => confirmDelete(user.id, user.email, user.userType)}
            >
              <FaTrash /> Eliminar
            </ActionButton>
          </UserCardFooter>
        </UserCardContainer>
      </div>
    ));
  };

  return (
    <section className={"" + props.hclass} style={{ backgroundImage: `url(${props.Bg})`, padding: '20px 0' }}>
      <div className="container">
        <div className="section-title-area">
          <h2 className="wow fadeInUp" data-wow-delay=".3s">Administración de Usuarios</h2>
        </div>
      </div>

      {/* Control Panel */}
      <div className="container" style={{ marginBottom: '30px' }}>
        <ControlPanel>
          <SearchInput>
            <FaSearch />
            <input 
              type="text" 
              placeholder="Buscar usuarios por nombre, email o tipo..." 
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </SearchInput>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <SortContainer>
              <SortSelect>
                <select value={sortBy} onChange={handleSortChange}>
                  <option value={SORT_OPTIONS.NAME}>Ordenar por Nombre</option>
                  <option value={SORT_OPTIONS.EMAIL}>Ordenar por Email</option>
                </select>
                <FaChevronDown />
              </SortSelect>
              
              <SortOrderButton 
                onClick={toggleSortOrder}
                $active={true}
                title={sortOrder === 'asc' ? 'Orden ascendente' : 'Orden descendente'}
              >
                {sortOrder === 'asc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
              </SortOrderButton>
            </SortContainer>
            
            <RefreshButton 
              onClick={handleRefresh}
              className={refreshing ? 'refreshing' : ''}
              title="Actualizar lista"
              $animate={!refreshing}
            >
              <FaSync />
            </RefreshButton>
            
            <ViewControls>
              <ViewButton 
                $active={viewMode === VIEW_MODES.SMALL_GRID} 
                onClick={() => setViewMode(VIEW_MODES.SMALL_GRID)}
                title="Vista compacta"
              >
                <FaTh />
              </ViewButton>
              <ViewButton 
                $active={viewMode === VIEW_MODES.LIST} 
                onClick={() => setViewMode(VIEW_MODES.LIST)}
                title="Vista de lista"
              >
                <FaThList />
              </ViewButton>
            </ViewControls>
            
            <Link 
              onClick={ClickHandler} 
              to="/formUsser" 
              className="theme-btn wow fadeInUp" 
              data-wow-delay=".5s"
              style={{
                background: 'linear-gradient(135deg, #036016, #04871c)',
                color: 'white',
                border: 'none',
                padding: '14px 30px',
                borderRadius: '6px',
                height: '60px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 8px 25px rgba(4, 135, 28, 0.3)',
                transition: 'all 0.3s ease',
                fontSize: '15px',
                whiteSpace: 'nowrap',
              }}
            >
              <FaUser /> Agregar Usuario
            </Link>  
          </div>
        </ControlPanel>
      </div>

      {/* Users List */}
      <div className="service-wrapper">
        {viewMode === VIEW_MODES.LIST ? (
          renderUserCards()
        ) : (
          <div className="swiper service-slider">
            <div className="swiper-wrapper" style={{ gap: '15px' }}>
              {renderUserCards()}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
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

      {/* Success Modal */}
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
              <SuccessButton $animate={true} onClick={() => setShowSuccessModal(false)}>
                Aceptar
              </SuccessButton>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <ModalOverlay>
          <ModalContainer>
            <ErrorModalHeader>
              <ErrorIcon>
                <FaExclamationTriangle />
              </ErrorIcon>
              <h3 style={{ letterSpacing: '0.6px', color: 'white', margin: 2 }}>Error</h3>
            </ErrorModalHeader>
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