// src/services/authService.js
import  auth  from '../components/login/firebase';
import { signOut } from 'firebase/auth';

// Cerrar sesión
export const logout = async () => {
  try {
    await signOut(auth);
    // Limpiar el temporizador de inactividad al cerrar sesión
    localStorage.removeItem('lastActivityTime');
    return true;
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    return false;
  }
};

// Configurar temporizador de inactividad
export const setupInactivityTimer = (logoutCallback) => {
  const timeout = 30 * 60 * 1000; // 30 minutos en milisegundos

  const resetTimer = () => {
    // Guardar el tiempo de la última actividad
    localStorage.setItem('lastActivityTime', Date.now().toString());
    
    // Limpiar el temporizador anterior si existe
    if (window.inactivityTimer) {
      clearTimeout(window.inactivityTimer);
    }
    
    // Establecer nuevo temporizador
    window.inactivityTimer = setTimeout(logoutCallback, timeout);
  };

  // Eventos que indican actividad del usuario
  const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
  events.forEach(event => {
    window.addEventListener(event, resetTimer);
  });

  // Inicializar el temporizador
  resetTimer();

  // Función para limpiar los event listeners
  return () => {
    events.forEach(event => {
      window.removeEventListener(event, resetTimer);
    });
    if (window.inactivityTimer) {
      clearTimeout(window.inactivityTimer);
    }
  };
};

// Verificar inactividad al cargar la página
export const checkInactivityOnLoad = (logoutCallback) => {
  const lastActivityTime = localStorage.getItem('lastActivityTime');
  if (lastActivityTime) {
    const elapsedTime = Date.now() - parseInt(lastActivityTime, 10);
    const timeout = 30 * 60 * 1000; // 30 minutos
    
    if (elapsedTime > timeout) {
      logoutCallback();
    }
  }
};