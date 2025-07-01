import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../login/firebase';

const Productos = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'productos'));
                const productsData = querySnapshot.docs.map(doc => doc.data());
                
                // Si las imágenes están almacenadas como Base64, convertirlas a URLs válidas
                const updatedProducts = productsData.map(product => {
                    // Convertir imagen principal si es Base64
                    if (product.imagenPrincipalUrl) {
                        // Comprobar si la URL está en Base64
                        if (product.imagenPrincipalUrl.startsWith('data:image')) {
                            // Si es Base64, no hacer nada, ya está en formato correcto
                        } else {
                            // Si es URL de almacenamiento de Firebase o URL pública
                            product.imagenPrincipalUrl = product.imagenPrincipalUrl;
                        }
                    }
                    return product;
                });

                setProducts(updatedProducts);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section className="shop-page-section fix section-padding section-bg-2">
            <div className="container">
                <div className="row g-4">
                    {products.map((product, index) => (
                        <div className="col-lg-3 col-md-4 col-6" key={index}>
                            <div className="product-box-items">
                                <div className="product-image">
                                    {/* Mostrar la imagen principal */}
                                    <img src={product.imagenPrincipalUrl} alt={product.titulo} className="img-fluid" />
                                </div>
                                <div className="product-content">
                                    <h6 className="product-name">
                                        <Link to={`/productos/${product.titulo}`}>
                                            {product.titulo}
                                        </Link>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Productos;
