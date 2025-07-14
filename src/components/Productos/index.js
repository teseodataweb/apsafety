import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaTh, FaListUl } from 'react-icons/fa';
import ShopSidebar from "./ShopSidebar";

const Productos = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOption, setSortOption] = useState('default');
    const [viewMode, setViewMode] = useState('grid');
    const [activeStatusFilter, setActiveStatusFilter] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const url = new URL('https://apsafety.onrender.com/listar_productos.php');
                
                if (searchTerm) url.searchParams.append('query', searchTerm);
                if (selectedCategory) url.searchParams.append('clasificacion', selectedCategory);

                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                
                const result = await response.json();
                
                if (result.success) {
                    const processedProducts = result.productos.map(producto => ({
                        ...producto,
                        imagenPrincipalUrl: producto.imagenPrincipal 
                            ? `data:image/jpeg;base64,${producto.imagenPrincipal}`
                            : '',
                        fechaCreacion: new Date(producto.fechaCreacion).toLocaleDateString(),
                        activo: typeof producto.activo === 'string' 
                            ? producto.activo.toLowerCase() === 'true'
                            : Boolean(producto.activo)
                    }));
                    
                    setProducts(processedProducts);
                } else {
                    setError(result.message || 'Error al cargar productos');
                }
            } catch (error) {
                console.error('Error al obtener productos:', error);
                setError('Error de conexión con el servidor');
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(fetchProducts, 300);
        return () => clearTimeout(timer);
    }, [searchTerm, selectedCategory]);

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = [...products];
        if (activeStatusFilter !== 'all') {
            filtered = filtered.filter(product => 
                activeStatusFilter === 'active' ? product.activo : !product.activo
            );
        }

        return filtered.sort((a, b) => {
            switch(sortOption) {
                case 'nombre_asc': return a.titulo.localeCompare(b.titulo);
                case 'nombre_desc': return b.titulo.localeCompare(a.titulo);
                case 'fecha_asc': return new Date(a.fechaCreacion) - new Date(b.fechaCreacion);
                case 'fecha_desc': return new Date(b.fechaCreacion) - new Date(a.fechaCreacion);
                default: return 0;
            }
        });
    }, [products, sortOption, activeStatusFilter]);

    const handleEdit = (product) => {
        navigate('/formProducto', { 
            state: { 
                producto: product,
                isEditing: true,
                productoOriginal: {
                    ...product,
                    fechaCreacion: product.fechaCreacion.split('T')[0] // Formato para input date
                }
            } 
        });
    };

    const handleDelete = async (product) => {
        if (window.confirm(`¿Estás seguro de eliminar "${product.titulo}"?`)) {
            try {
                const response = await fetch('https://apsafety.onrender.com/deleteProduct.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ruta: product.ruta })
                });
                
                const result = await response.json();
                if (result.success) {
                    setProducts(prev => prev.filter(p => p.ruta !== product.ruta));
                    alert('Producto eliminado exitosamente');
                } else {
                    throw new Error(result.message || 'Error al eliminar');
                }
            } catch (error) {
                console.error('Error:', error);
                alert(error.message || 'Error al conectar con el servidor');
            }
        }
    };

    const handleSearch = (term) => setSearchTerm(term);
    const handleCategoryChange = (category) => setSelectedCategory(prev => prev === category ? '' : category);
    const handleStatusFilterChange = (status) => setActiveStatusFilter(status);

    if (loading) return (
        <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="alert alert-danger mt-5 text-center">
            {error}
        </div>
    );

    return (
        <section className="shop-page-section fix section-padding section-bg-2"> 
            <div className="container">
                <div className="row g-4">
                    <div className="col-xl-3 col-lg-4 order-2 order-md-1">
                        <ShopSidebar 
                            onSearch={handleSearch} 
                            onCategoryChange={handleCategoryChange}
                            selectedCategory={selectedCategory}
                            onStatusFilterChange={handleStatusFilterChange}
                            activeStatusFilter={activeStatusFilter}
                        />
                    </div>

                    <div className="col-xl-9 col-lg-8 order-1 order-md-2">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <span className="me-2">Filtrar por:</span>
                                <div className="btn-group btn-group-sm">
                                    {['all', 'active', 'inactive'].map(status => (
                                        <button
                                            key={status}
                                            className={`btn ${activeStatusFilter === status ? 'btn-primary' : 'btn-outline-secondary'}`}
                                            onClick={() => handleStatusFilterChange(status)}
                                        >
                                            {status === 'all' ? 'Todos' : status === 'active' ? 'Activos' : 'Inactivos'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="d-flex">
                                <div className="me-3">
                                    <select 
                                        className="form-select"
                                        value={sortOption}
                                        onChange={(e) => setSortOption(e.target.value)}
                                        style={{ borderColor: '#dee2e6', borderRadius: '5px', padding: '8px 12px', height: '40px' }}
                                    >
                                        <option value="default">Ordenar por</option>
                                        <option value="nombre_asc">Nombre A-Z</option>
                                        <option value="nombre_desc">Nombre Z-A</option>
                                        <option value="fecha_asc">Fecha más antigua</option>
                                        <option value="fecha_desc">Fecha más reciente</option>
                                    </select>
                                </div>
                                
                                <div className="btn-group">
                                    <button 
                                        className={`btn btn-outline-secondary ${viewMode === 'grid' ? 'active' : ''}`}
                                        onClick={() => setViewMode('grid')}
                                        style={{ padding: '5px 10px', borderWidth: '1px', borderColor: viewMode === 'grid' ? '#0d6efd' : '#dee2e6' }}
                                    >
                                        <FaTh />
                                    </button>
                                    <button 
                                        className={`btn btn-outline-secondary ${viewMode === 'list' ? 'active' : ''}`}
                                        onClick={() => setViewMode('list')}
                                        style={{ padding: '5px 10px', borderWidth: '1px', borderColor: viewMode === 'list' ? '#0d6efd' : '#dee2e6' }}
                                    >
                                        <FaListUl />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            {filteredAndSortedProducts.length > 0 ? (
                                filteredAndSortedProducts.map((product, index) => (
                                    <ProductCard 
                                        key={index}
                                        product={product}
                                        viewMode={viewMode}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                    />
                                ))
                            ) : (
                                <div className="col-12 text-center">
                                    <p>No se encontraron productos{activeStatusFilter !== 'all' ? ` ${activeStatusFilter === 'active' ? 'activos' : 'inactivos'}` : ''}.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ProductCard = ({ product, viewMode, onEdit, onDelete }) => (
    <div className={viewMode === 'grid' ? 'col-lg-3 col-md-4 col-6 mb-4' : 'col-12 mb-4'}>
        <div className={`product-box-items position-relative ${viewMode === 'list' ? 'd-flex' : ''}`}
             style={viewMode === 'list' ? { 
                 maxHeight: '200px', 
                 padding: '15px',
                 backgroundColor: '#fff',
                 borderRadius: '10px',
                 boxShadow: '0 0 10px rgba(0,0,0,0.05)'
             } : {}}>
             
            <div className="product-image" 
                 style={{ 
                     display: 'flex', 
                     justifyContent: 'center', 
                     alignItems: 'center',
                     flex: viewMode === 'list' ? '0 0 180px' : 'auto'
                 }}>
                {product.imagenPrincipalUrl ? (
                    <img 
                        src={product.imagenPrincipalUrl} 
                        alt={product.titulo} 
                        className="img-fluid"
                        style={{ 
                            padding: '5px', 
                            height: viewMode === 'list' ? '150px' : '180px', 
                            width: 'auto', 
                            objectFit: 'cover' 
                        }}
                    />
                ) : (
                    <div className="bg-secondary d-flex align-items-center justify-content-center" 
                         style={{ 
                             height: viewMode === 'list' ? '150px' : '200px',
                             width: viewMode === 'list' ? '180px' : '100%',
                             minWidth: viewMode === 'list' ? '180px' : 'auto'
                         }}>
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
                        padding: viewMode === 'list' ? '7px' : '10px',
                        borderRadius: '12px',
                        transition: 'background-color 0.3s ease',
                        marginBottom: '5px'
                    }}
                    onClick={() => onEdit(product)}
                    title="Editar producto"
                >
                    <FaEdit size={viewMode === 'list' ? 18 : 20} />
                </button>
                <button 
                    style={{
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: viewMode === 'list' ? '7px' : '10px',
                        borderRadius: '12px',
                        transition: 'background-color 0.3s ease'
                    }}
                    onClick={() => onDelete(product)}
                    title="Eliminar producto"
                >
                    <FaTrash size={viewMode === 'list' ? 18 : 20} />
                </button>
            </div>

            <div className={`product-content p-3 ${viewMode === 'list' ? 'd-flex flex-column justify-content-center' : ''}`}>
                <h6 className="product-name" style={viewMode === 'list' ? { fontSize: '1.2rem' } : {}}>
                    <Link to={`/producto/${encodeURIComponent(product.ruta)}`}>
                        {product.titulo}
                    </Link>
                    {!product.activo && (
                        <span className="badge bg-warning text-dark ms-2">Inactivo</span>
                    )}
                </h6>
                
                {viewMode === 'list' && (
                    <div className="mt-2">
                        <p className="mb-1" style={{ fontSize: '0.9rem' }}>
                            {product.descripcion?.length > 120 
                             ? `${product.descripcion.substring(0, 120)}...` 
                             : product.descripcion}
                        </p>
                        <div>
                            <span className="badge bg-light text-dark me-2">
                                {product.clasificacion}
                            </span>
                            <span className="badge bg-light text-dark">
                                {product.fechaCreacion}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
);

export default Productos;