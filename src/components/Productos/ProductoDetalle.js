import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductoDetalle = () => {
    const { ruta } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await fetch(`https://apsafety.onrender.com/listar_productos.php?ruta=${encodeURIComponent(ruta)}`);
                const result = await response.json();
                
                if (result.success && result.productos.length > 0) {
                    setProducto(result.productos[0]);
                } else {
                    setError('Producto no encontrado');
                }
            } catch (err) {
                setError('Error de conexión');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducto();
    }, [ruta]);

    const base64ToImageUrl = (base64String) => {
        return `data:image/jpeg;base64,${base64String}`;
    };

    if (loading) return <div className="text-center my-5">Cargando...</div>;
    if (error) return <div className="alert alert-danger my-5 text-center">{error}</div>;
    if (!producto) return <div className="alert alert-warning my-5 text-center">Producto no encontrado</div>;

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-6">
                    {/* Imagen Principal */}
                    {producto.imagenPrincipal ? (
                        <img 
                            src={base64ToImageUrl(producto.imagenPrincipal)}
                            alt={producto.titulo}
                            className="img-fluid rounded mb-4 shadow"
                            style={{ maxHeight: '500px', objectFit: 'contain' }}
                        />
                    ) : (
                        <div className="bg-light border rounded d-flex align-items-center justify-content-center" 
                             style={{ height: '300px' }}>
                            <span className="text-muted">Imagen no disponible</span>
                        </div>
                    )}

                    {/* Galería de Imágenes */}
                    {producto.imagenes && producto.imagenes.length > 0 && (
                        <div className="mb-5">
                            <h3 className="mb-3">Galería de Producto</h3>
                            <div className="row g-3">
                                {producto.imagenes.map((img, index) => (
                                    <div className="col-md-4 col-6" key={index}>
                                        <img 
                                            src={base64ToImageUrl(img)}
                                            alt={`Vista ${index + 1} de ${producto.titulo}`}
                                            className="img-thumbnail img-fluid"
                                            style={{ height: '150px', objectFit: 'cover' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <h1 className="card-title mb-3">{producto.titulo}</h1>
                            
                            <div className="d-flex flex-wrap gap-2 mb-4">
                                <span className="badge bg-primary">{producto.clasificacion}</span>
                                <span className="badge bg-secondary">{producto.tipo}</span>
                                <span className={`badge ${producto.activo ? 'bg-success' : 'bg-danger'}`}>
                                    {producto.activo ? 'Activo' : 'Inactivo'}
                                </span>
                            </div>

                            <div className="mb-4">
                                <h3>Descripción</h3>
                                <p className="lead">{producto.descripcion}</p>
                            </div>

                            <div className="mb-4">
                                <h3>Ventajas</h3>
                                <p>{producto.ventajas || 'No disponible'}</p>
                            </div>

                            <div className="mb-4">
                                <h3>Aplicaciones</h3>
                                <p>{producto.aplicaciones || 'No disponible'}</p>
                            </div>

                            <div className="mb-4">
                                <h3>Detalles Técnicos</h3>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <strong>Unidad de medida:</strong> {producto.unidadMedida}
                                    </li>
                                    <li className="list-group-item">
                                        <strong>Fecha de creación:</strong> {producto.fechaCreacion}
                                    </li>
                                </ul>
                            </div>

                            {/* Sellos y Certificaciones */}
                            {producto.sellos && producto.sellos.length > 0 && (
                                <div className="mb-4">
                                    <h3>Certificaciones</h3>
                                    <div className="d-flex flex-wrap gap-3">
                                        {producto.sellos.map((sello, index) => (
                                            <div key={index} style={{ width: '80px' }}>
                                                <img 
                                                    src={base64ToImageUrl(sello)}
                                                    alt={`Certificación ${index + 1}`}
                                                    className="img-fluid"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Ficha Técnica */}
                            {producto.fichaTecnica && (
                                <div className="mb-4">
                                    <h3>Documentación</h3>
                                    <a 
                                        href={`data:application/pdf;base64,${producto.fichaTecnica}`}
                                        download={`Ficha_Técnica_${producto.titulo.replace(/\s+/g, '_')}.pdf`}
                                        className="btn btn-primary"
                                    >
                                        <i className="bi bi-file-earmark-pdf me-2"></i>Descargar Ficha Técnica
                                    </a>
                                </div>
                            )}

                            <div className="mt-4">
                                <Link to="/productos" className="btn btn-outline-secondary">
                                    <i className="bi bi-arrow-left me-2"></i>Volver al listado
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductoDetalle;