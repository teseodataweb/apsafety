import React, { useState, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useNavigate, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
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
  const [canAdd, setCanAdd] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = !!location.state?.user;
  useEffect(() => {
    if (isEditing) {
      const { name, userType, email } = location.state.user;
      setFormData({ name, userType, email, password: '' });
      validator.hideMessages();
      forceUpdate(1);}
  }, [location.state, isEditing, validator]);
  useEffect(() => {
    (async () => {
      if (!isEditing) {
        const usersCollection = collection(db, "users");
        const snapshot = await getDocs(usersCollection);
        setCanAdd(snapshot.size < 5);
      }})();
  }, [isEditing]);
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validator.showMessageFor(name);
    forceUpdate(1);};
  const handleSubmit = async e => {
    e.preventDefault();
    if (!canAdd && !isEditing) return;

    if (!validator.allValid()) {
      validator.showMessages();
      forceUpdate(1);
      return;
    }
    try {
      if (isEditing) {
        const userDocRef = doc(db, "users", location.state.user.id);
        await setDoc(
          userDocRef,
          {
            name: formData.name,
            userType: formData.userType,
          },
          { merge: true });
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password);
        const user = userCredential.user;
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, {
          uid: user.uid,
          name: formData.name,
          userType: formData.userType,
          email: formData.email,
        });}
      setFormData({ name: '', userType: '', email: '', password: '' });
      validator.hideMessages();
      forceUpdate(1);
      navigate('/admin');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        const shouldUpdate = alert(
          'El correo electrónico ya está en uso, por favor intenta con otro');
        if (shouldUpdate) {
          try {
            const usersCollection = collection(db, "users");
            const querySnapshot = await getDocs(usersCollection);
            let existingDocId = null;
            let existingData = null;
            querySnapshot.forEach(docSnap => {
              const data = docSnap.data();
              if (data.email === formData.email) {
                existingDocId = docSnap.id;
                existingData = data;
              }});
            if (existingDocId) {
              await setDoc(
                doc(db, "users", existingDocId),
                {
                  ...existingData,
                  name: formData.name,
                  userType: formData.userType,
                },
                { merge: true });
              navigate('/admin');
            }
          } catch (firestoreError) {
            console.error("Error al actualizar en Firestore:", firestoreError);
          }}
      } else {
        console.error("Error al crear/editar usuario:", error);
      }}};
  const handleCancel = () => {
    navigate('/admin');};
  return (
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
              placeholder="Nombre de usuario"/>
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
              {isEditing ? 'Actualizar Usuario' : 'Agregar usuario'}
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