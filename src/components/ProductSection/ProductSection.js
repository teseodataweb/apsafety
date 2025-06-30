import React from 'react';
import ProdactShape from '../../img/product/shape-1.png';
import { Link } from 'react-router-dom';

const categorias = [
    {
        icono: '',
        titulo: 'Cascos de seguridad certificados',
        descripcion: 'Protección craneal con certificaciones NOM y ANSI Z89.',
    },
    {
        icono: '',
        titulo: 'Mascarillas N95 y respiradores reutilizables',
        descripcion: 'Filtración avanzada para ambientes industriales y sanitarios.',
    },
    {
        icono: '',
        titulo: 'Tapones auditivos y barriquejos',
        descripcion: 'Reducción de ruido extremo en entornos de alto riesgo.',
    },
    {
        icono: '',
        titulo: 'Guantes anticorte, aluminizados y dieléctricos',
        descripcion: 'Protección para manos en trabajos eléctricos, térmicos o mecánicos.',
    },
    {
        icono: '',
        titulo: 'Protección visual y facial',
        descripcion: 'Lentes, visores y caretas con certificación ANSI Z87.',
    }
];

const ProductSection = () => {
    return (
        <section className="product-section section-padding pt-0">
            <div className="shape-image">
                <img src={ProdactShape} alt="img" />
            </div>
            <div className="container">
                <div className="section-title text-center">
                    <h2>Soluciones de Protección para Cada Riesgo</h2>
                </div>
                <div className="row">
                    {categorias.map((cat, index) => (
                        <div className="col-xl-4 col-lg-6 col-md-6" key={index}>
                            <div className="product-box-items text-center">
                                <div className="product-image no-hover">
                                    <div className="icon-display" style={{ fontSize: '3rem' }}>{cat.icono}</div>
                                </div>
                                <div className="product-content">
                                    <h5>{cat.titulo}</h5>
                                    <p>{cat.descripcion}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="shop-button text-center mt-5">
                    <Link to="/shop" className="theme-btn">Ver todos los productos</Link>
                </div>
            </div>
        </section>
    );
};

export default ProductSection;
