import React, { useEffect, useState, useMemo } from 'react';
import { Link } from "react-router-dom";
import { FaTh, FaListUl, FaSearch, FaTimes } from 'react-icons/fa';
import ShopSidebar from "./ShopSidebar";
import styled, { keyframes, css } from 'styled-components';

// Animaciones
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { 
    transform: translateY(-20px);
    opacity: 0; 
  }
  to { 
    transform: translateY(0);
    opacity: 1; 
  }
`;

// Componentes estilizados
const Card = styled.div`
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

const ProductImageContainer = styled.div`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  position: relative;
  
  ${props => props.listView && css`
    height: 150px;
    width: 220px;
    border-radius: 8px 0 0 8px;
  `}
`;

const ProductImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const EmptyStateContainer = styled.div`
  padding: 40px;
  text-align: center;
  animation: ${fadeIn} 0.5s ease;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
`;

const SearchResultsInfo = styled.div`
  background: rgba(40,167,69,0.1);
  padding: 8px 12px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  animation: ${slideIn} 0.3s ease;
`;

const ClearSearchButton = styled.button`
  background: transparent;
  border: none;
  color: #6c757d;
  margin-left: 8px;
  cursor: pointer;
  transition: color 0.2s;
  
  &:hover {
    color: #212529;
  }
`;

const ProductosUsers = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOption, setSortOption] = useState('default');
    const [viewMode, setViewMode] = useState('grid');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = new URL('http://localhost:5000/listar_productos.php');
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
                        // Convertir el estado activo a booleano
                        const isActive = typeof producto.activo === 'string' 
                            ? producto.activo.toLowerCase() === 'true'
                            : Boolean(producto.activo);
                            
                        if (producto.imagenPrincipal) {
                            return {
                                ...producto,
                                imagenPrincipalUrl: `data:image/jpeg;base64,${producto.imagenPrincipal}`,
                                activo: isActive
                            };
                        }
                        return {
                            ...producto,
                            imagenPrincipalUrl: producto.imagenPrincipal || '',
                            activo: isActive
                        };
                    });
                    
                    // Filtrar solo los productos activos
                    const activeProducts = processedProducts.filter(product => product.activo);
                    setProducts(activeProducts);
                    setFilteredProducts(activeProducts);
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
    }, [searchTerm, selectedCategory]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => 
                product.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.descripcion && product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setFilteredProducts(filtered);
        }
    }, [searchTerm, products]);

    const sortedProducts = useMemo(() => {
        return [...filteredProducts].sort((a, b) => {
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
    }, [filteredProducts, sortOption]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(prev => prev === category ? '' : category);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}>
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger mt-5 mx-auto text-center" style={{ maxWidth: '600px' }}>
                <h5 className="alert-heading">Error al cargar productos</h5>
                <p>{error}</p>
                <button className="btn btn-outline-danger" onClick={() => window.location.reload()}>
                    Intentar nuevamente
                </button>
            </div>
        );
    }

    return (
        <section className="shop-page-section fix section-padding" style={{ backgroundColor: '#f8f9fa' }}> 
            <div className="container">
                <div className="row g-4">
                    <div className="col-xl-3 col-lg-4 order-2 order-md-1">
                        <ShopSidebar 
                            onSearch={handleSearch} 
                            onCategoryChange={handleCategoryChange}
                            selectedCategory={selectedCategory}
                            searchTerm={searchTerm}
                        />
                    </div>
                    <div className="col-xl-9 col-lg-8 order-1 order-md-2">
                        <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white rounded shadow-sm">
                            <div className="d-flex align-items-center">
                                {searchTerm ? (
                                    <SearchResultsInfo>
                                        <span className="badge bg-success me-2">
                                            {filteredProducts.length} {filteredProducts.length === 1 ? 'resultado' : 'resultados'}
                                        </span>
                                        <span className="me-2">para "{searchTerm}"</span>
                                        <ClearSearchButton onClick={clearSearch} title="Limpiar búsqueda">
                                            <FaTimes />
                                        </ClearSearchButton>
                                    </SearchResultsInfo>
                                ) : (
                                    <div className="d-flex align-items-center">
                                        <span className="me-2 text-muted">Mostrando {filteredProducts.length} productos</span>
                                    </div>
                                )}
                            </div>
                            <div className="d-flex">
                                <div className="me-3">
                                    <select 
                                        className="form-select shadow-sm"
                                        value={sortOption}
                                        onChange={(e) => setSortOption(e.target.value)}
                                        style={{ 
                                            borderColor: '#dee2e6', 
                                            borderRadius: '8px',
                                            padding: '8px 12px',
                                            height: '40px',
                                            minWidth: '180px'
                                        }}
                                    >
                                        <option value="default">Ordenar por</option>
                                        <option value="nombre_asc">Nombre A-Z</option>
                                        <option value="nombre_desc">Nombre Z-A</option>
                                        <option value="fecha_asc">Fecha más antigua</option>
                                        <option value="fecha_desc">Fecha más reciente</option>
                                    </select>
                                </div>  
                                <div className="btn-group shadow-sm">
                                    <button 
                                        className={`btn ${viewMode === 'grid' ? 'btn-success' : 'btn-outline-secondary'}`}
                                        onClick={() => setViewMode('grid')}
                                        style={{ 
                                            padding: '8px 12px',
                                            borderWidth: '1px'
                                        }}
                                    >
                                        <FaTh />
                                    </button>
                                    <button 
                                        className={`btn ${viewMode === 'list' ? 'btn-success' : 'btn-outline-secondary'}`}
                                        onClick={() => setViewMode('list')}
                                        style={{
                                            padding: '8px 12px',
                                            borderWidth: '1px'
                                        }}
                                    >
                                        <FaListUl />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {sortedProducts.length > 0 ? sortedProducts.map((product, index) => (
                                <div 
                                    className={viewMode === 'grid' ? 'col-lg-4 col-md-6 mb-4' : 'col-12 mb-4'} 
                                    key={index}
                                >
                                    <Card className={`bg-white rounded shadow-sm overflow-hidden h-100 ${viewMode === 'list' ? 'd-flex' : ''}`}>
                                        <div className="position-relative" style={{ flex: viewMode === 'list' ? '0 0 220px' : 'auto' }}>
                                            <ProductImageContainer listView={viewMode === 'list'}>
                                                {product.imagenPrincipalUrl ? (
                                                    <ProductImage 
                                                        src={product.imagenPrincipalUrl} 
                                                        alt={product.titulo} 
                                                    />
                                                ) : (
                                                    <div className="d-flex flex-column align-items-center justify-content-center text-muted">
                                                        <FaSearch size={24} className="mb-2" />
                                                        <span>Imagen no disponible</span>
                                                    </div>
                                                )}
                                            </ProductImageContainer>
                                        </div>
                                        
                                        <div className={`p-3 ${viewMode === 'list' ? 'd-flex flex-column justify-content-between flex-grow-1' : ''}`}>
                                            <div>
                                                <h5 className="mb-2">
                                                    <Link 
                                                        to={`/productous/${encodeURIComponent(product.ruta)}`}
                                                        className="text-decoration-none text-dark"
                                                    >
                                                        {product.titulo}
                                                    </Link>
                                                </h5>
                                                
                                                {viewMode === 'list' && (
                                                    <p className="text-muted mb-3">
                                                        {product.descripcion && product.descripcion.length > 120 
                                                         ? `${product.descripcion.substring(0, 120)}...` 
                                                         : product.descripcion}
                                                    </p>
                                                )}
                                            </div>
                                            
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <span className="badge bg-light text-dark me-2">
                                                        {product.clasificacion}
                                                    </span>
                                                    <span className="badge bg-light text-dark">
                                                        {product.fechaCreacion}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            )) : (
                                <EmptyStateContainer className="col-12 rounded shadow-sm">
                                    {searchTerm ? (
                                        <>
                                            <FaSearch size={64} className="text-muted mb-4" />
                                            <h4 className="mb-3">No se encontraron productos</h4>
                                            <p className="text-muted mb-4">
                                                No hay resultados para "{searchTerm}"
                                            </p>
                                            <button 
                                                onClick={clearSearch}
                                                className="btn btn-success px-4 py-2"
                                            >
                                                Mostrar todos los productos
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <h4 className="mb-3">No hay productos disponibles</h4>
                                            <p className="text-muted">
                                                No se encontraron productos activos en el sistema.
                                            </p>
                                        </>
                                    )}
                                </EmptyStateContainer>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductosUsers;