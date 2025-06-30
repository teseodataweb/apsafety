// Admin.jsx
import React, { useEffect, useState } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.min.css';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../components/login/firebase';
const ClickHandler = () => {
    window.scrollTo(10, 0);}
const Admin = (props) => {
    const [users, setUsers] = useState([]);
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
            },});
        loadUsers();
    }, []);
    const loadUsers = async () => {
        try {
            const snapshot = await getDocs(collection(db, "users"));
            const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(usersData);
        } catch (error) {
            console.error("Error al cargar usuarios: ", error);}};
    const handleDeleteUser = async (userId, email) => {
        if (window.confirm(`¿Estás seguro de eliminar al usuario ${email}?`)) {
            try {
                await deleteDoc(doc(db, "users", userId));
                loadUsers();
                alert('Usuario eliminado correctamente.');
            } catch (error) {
                console.error("Error al eliminar usuario: ", error);
                alert('Error al eliminar usuario.');
            }}};
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
                    <div className="swiper-wrapper">
                        {users.map((user, idx) => (
                            <div className="swiper-slide" key={idx}>
                                <div className="service-card-items">
                                    <div className="service-cotent">
                                        <h3>{user.name}</h3>
                                        <p>Email: {user.email}</p>
                                        <p>
                                          Tipo: {user.userType === "admin"
                                              ? "Administrador Principal"
                                              : user.userType === "secundario"
                                                ? "Administrador Secundario"
                                                : user.userType}
                                        </p>
                                        <p>Contraseña: ********</p>
                                    </div>
                                    <div className="service-btn">
                                        <Link
                                          onClick={ClickHandler}
                                          to="/formUsser"
                                          state={{ user }}
                                          className="link-btn">
                                            Editar Datos <i className="fa-solid fa-arrow-right"></i>
                                        </Link>
                                    </div>
                                    <div className="service-btn">
                                        <button 
                                          className="link-btn"
                                          onClick={() => handleDeleteUser(user.id, user.email)}
                                          style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
                                            Eliminar Usuario <i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );};
export default Admin;
