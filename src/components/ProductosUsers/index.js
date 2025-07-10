import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaTh, FaListUl } from 'react-icons/fa';
import ShopSidebar from "./ShopSidebar";
const ProductosUsers = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOption, setSortOption] = useState('default');
    const [viewMode, setViewMode] = useState('grid');
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = new URL('https://apsafety.onrender.com/listar_productos.php');
                if (searchTerm) {
                    url.searchParams.append('search', searchTerm);
                }
                if (selectedCategory) {
                    url.searchParams.append('clasificacion', selectedCategory);
                }
                const response = await fetch(url);
                const result = await response.json();
                if (result.success) {
                    const processedProducts = result.productos.map(producto => {
                        if (producto.imagenPrincipal && (producto.imagenPrincipal || 
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
            }};
        fetchProducts();
    }, [searchTerm, selectedCategory]);
    const sortedProducts = useMemo(() => {
        return [...products].sort((a, b) => {
            switch(sortOption) {
                case 'nombre_asc':
                    return a.titulo.localeCompare(b.titulo);
                case 'nombre_desc':
                    return b.titulo.localeCompare(a.titulo);
                case 'fecha_asc':
                    return new Date(a.fechaCreacion) - new Date(b.fechaCreacion);
                case 'fecha_desc':
                    return new Date(b.fechaCreacion) - new Date(a.fechaCreacion);
                default:
                    return 0;
            }
        });
    }, [products, sortOption]);
    const handleEdit = (product) => {
        navigate('/formProducto', { 
            state: { 
                producto: product,
                isEditing: true
            } }); };
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
                }} catch (error) {
                console.error('Error al eliminar el producto:', error);
                alert('Error al conectar con el servidor');
            }}};
    const handleSearch = (term) => {
        setSearchTerm(term);
    };
    const handleCategoryChange = (category) => {
        setSelectedCategory(prev => prev === category ? '' : category);
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
                    <div className="col-xl-3 col-lg-4 order-2 order-md-1">
                        <ShopSidebar 
                            onSearch={handleSearch} 
                            onCategoryChange={handleCategoryChange}
                            selectedCategory={selectedCategory}
                        />
                    </div>
                    <div className="col-xl-9 col-lg-8 order-1 order-md-2">
                        <div className="d-flex justify-content-end mb-4">
                            <div className="me-3">
                                <select 
                                    className="form-select"
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                    style={{ 
                                        borderColor: '#dee2e6', 
                                        borderRadius: '5px',
                                        padding: '8px 12px',
                                        height: '40px'
                                    }}
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
                                    style={{ 
                                        padding: '5px 10px',
                                        borderWidth: '1px',
                                        borderColor: viewMode === 'grid' ? '#0d6efd' : '#dee2e6'
                                    }}
                                >
                                    <FaTh />
                                </button>
                                <button 
                                    className={`btn btn-outline-secondary ${viewMode === 'list' ? 'active' : ''}`}
                                    onClick={() => setViewMode('list')}
                                    style={{
                                        padding: '5px 10px',
                                        borderWidth: '1px',
                                        borderColor: viewMode === 'list' ? '#0d6efd' : '#dee2e6'
                                    }}
                                >
                                    <FaListUl />
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            {sortedProducts.length > 0 ? sortedProducts.map((product, index) => (
                                <div className={viewMode === 'grid' ? 'col-lg-3 col-md-4 col-6 mb-4' : 'col-12 mb-4'} key={index}>
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
                                        <div className={`product-content p-3 ${viewMode === 'list' ? 'd-flex flex-column justify-content-center' : ''}`}>
                                            <h6 className="product-name" style={viewMode === 'list' ? { fontSize: '1.2rem' } : {}}>
                                               <Link to={`/productous/${encodeURIComponent(product.ruta)}`}>{product.titulo}</Link>
                                            </h6>
                                            {viewMode === 'list' && (
                                                <div className="mt-2">
                                                    <p className="mb-1" style={{ fontSize: '0.9rem' }}>
                                                        {product.descripcion && product.descripcion.length > 120 
                                                         ? `${product.descripcion.substring(0, 120)}...` 
                                                         : product.descripcion}
                                                    </p>
                                                    <div>
                                                        <span className="badge">
                                                            {product.clasificacion}
                                                        </span>
                                                        <span className="badge">
                                                            {product.fechaCreacion}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-12 text-center">
                                    <p>No se encontraron productos.</p>
                                </div> )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );};
export default ProductosUsers;