import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa';

const Productos = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/listar_productos.php');
                const result = await response.json();
                
                if (result.success) {
                    const processedProducts = result.productos.map(producto => {
                        if (producto.imagenPrincipal && (producto.imagenPrincipal.startsWith('/9j/') || 
                            producto.imagenPrincipal)) {
                            return {
                                ...producto,
                                imagenPrincipalUrl: `data:image/jpeg;base64,${producto.imagenPrincipal}`
                            };
                        }

                        return {
                            ...producto,
                            imagenPrincipalUrl: producto.imagenPrincipal || ''
                        };
                    });
                    
                    setProducts(processedProducts);
                } else {
                    setError(result.message || 'Error al cargar productos');
                }
            } catch (error) {
                setError('Error de conexión con el servidor');
                console.error('Error al obtener productos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleEdit = (product) => {
        navigate('/formProducto', { 
            state: { 
                producto: product,
                isEditing: true
            } 
        });
    };

    const handleDelete = async (product) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            try {
                const response = await fetch('http://localhost:5000/deleteProduct.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ruta: product.ruta })
                });
                
                const result = await response.json();
                if (result.success) {
                    alert('Producto eliminado exitosamente');
                    setProducts(products.filter(p => p.ruta !== product.ruta));
                } else {
                    alert(`Error: ${result.message}`);
                }
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
                alert('Error al conectar con el servidor');
            }
        }
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger mt-5 text-center">
                {error}
            </div>
        );
    }

    return (
        <section className="shop-page-section fix section-padding section-bg-2">
            <div className="container">
                <div className="row g-4">
                    {products.map((product, index) => (
                        <div className="col-lg-3 col-md-4 col-6" key={index}>
                            <div className="product-box-items position-relative">
                                <div className="product-image" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {product.imagenPrincipalUrl ? (
                                        <img 
                                            src={product.imagenPrincipalUrl} 
                                            alt={product.titulo} 
                                            className="img-fluid"
                                            style={{ padding: '5px', height: '180px', width: 'auto', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div className="bg-secondary d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                                            <span>Sin imagen</span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="position-absolute top-0 end-0 m-3 d-flex flex-column">
                                    <button 
                                        style={{
                                            backgroundColor: '#008A1F',
                                            color: 'white',
                                            border: 'none',
                                            padding: '10px',
                                            borderRadius: '12px',
                                            transition: 'background-color 0.3s ease',
                                            marginBottom: '5px'
                                        }}
                                        onClick={() => handleEdit(product)}
                                        title="Editar producto"
                                    >
                                        <FaEdit size={20} />
                                    </button>
                                    <button 
                                        style={{
                                            backgroundColor: '#dc3545', // Rojo para eliminar
                                            color: 'white',
                                            border: 'none',
                                            padding: '10px',
                                            borderRadius: '12px',
                                            transition: 'background-color 0.3s ease'
                                        }}
                                        onClick={() => handleDelete(product)}
                                        title="Eliminar producto"
                                    >
                                        <FaTrash size={20} />
                                    </button>
                                </div>

                                <div className="product-content p-3">
                                    <h6 className="product-name">
                                        <Link to={`/productos/${encodeURIComponent(product.titulo)}`}>
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