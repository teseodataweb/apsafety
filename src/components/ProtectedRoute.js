import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {  db } from '../components/login/firebase';
import auth from '../components/login/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const usersRef = collection(db, 'users');
          const q = query(usersRef, where('email', '==', user.email));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUserRole(userData.userType);
          } else {
            setUserRole(null);
          }
        } catch (error) {
          console.error("Error obteniendo rol de usuario:", error);
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Cargando...</div>;
  }

  if (userRole === null) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/404" replace />;
  }

  return children;
};
export default ProtectedRoute;