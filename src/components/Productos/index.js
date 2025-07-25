import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaTh, FaListUl, FaExclamationTriangle, FaSearch, FaTimes, FaFilter } from 'react-icons/fa';
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

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
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

const StatusBadge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background: ${props => props.active ? '#28a745' : '#ffc107'};
  color: ${props => props.active ? 'white' : '#212529'};
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
`;

const ActionButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  color: white;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const EditButton = styled(ActionButton)`
  background: #28a745;
  margin-bottom: 8px;
`;

const DeleteButton = styled(ActionButton)`
  background: #dc3545;
`;

const EmptyStateContainer = styled.div`
  padding: 40px;
  text-align: center;
  animation: ${fadeIn} 0.5s ease;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  backdrop-filter: blur(4px);
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  animation: ${slideIn} 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  transform-origin: center;
`;

const ModalHeader = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #ff4d4d, #d93636);
  color: white;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ModalBody = styled.div`
  padding: 30px;
  text-align: center;
`;

const ModalFooter = styled.div`
  padding: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  background: #f8f9fa;
  border-top: 1px solid #eee;
`;

const DangerButton = styled.button`
  background: linear-gradient(135deg, #dc3545, #c82333);
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, #c82333, #bd2130);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #28a745, #218838);
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, #218838, #1e7e34);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: #5a6268;
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const WarningIcon = styled.div`
  font-size: 2rem;
  color: #fff;
  animation: ${pulse} 1.5s infinite;
`;

const Productos = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOption, setSortOption] = useState('default');
    const [viewMode, setViewMode] = useState('grid');
    const [activeStatusFilter, setActiveStatusFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const url = new URL('http://localhost:5000/listar_productos.php');
                
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
                    setFilteredProducts(processedProducts);
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
    }, [selectedCategory]);

    useEffect(() => {
        let filtered = [...products];
        
        if (activeStatusFilter !== 'all') {
            filtered = filtered.filter(product => 
                activeStatusFilter === 'active' ? product.activo : !product.activo
            );
        }
        
        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(product => 
                product.titulo.toLowerCase().includes(term) ||
                (product.descripcion && product.descripcion.toLowerCase().includes(term))
            );
        }
        
        setFilteredProducts(filtered);
    }, [searchTerm, products, activeStatusFilter]);

    const filteredAndSortedProducts = useMemo(() => {
        return [...filteredProducts].sort((a, b) => {
            switch(sortOption) {
                case 'nombre_asc': return a.titulo.localeCompare(b.titulo);
                case 'nombre_desc': return b.titulo.localeCompare(a.titulo);
                case 'fecha_asc': return new Date(a.fechaCreacion) - new Date(b.fechaCreacion);
                case 'fecha_desc': return new Date(b.fechaCreacion) - new Date(a.fechaCreacion);
                default: return 0;
            }
        });
    }, [filteredProducts, sortOption]);

    const handleEdit = (product) => {
        navigate('/formProducto', { 
            state: { 
                producto: product,
                isEditing: true,
                productoOriginal: {
                    ...product,
                    fechaCreacion: product.fechaCreacion.split('T')[0]
                }
            } 
        });
    };

    const handleDelete = async () => {
        if (!productToDelete) return;

        try {
            const response = await fetch('http://localhost:5000/deleteProduct.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ruta: productToDelete.ruta })
            });
            
            const result = await response.json();
            if (result.success) {
                setProducts(prev => prev.filter(p => p.ruta !== productToDelete.ruta));
                setFilteredProducts(prev => prev.filter(p => p.ruta !== productToDelete.ruta));
                alert('Producto eliminado exitosamente');
            } else {
                throw new Error(result.message || 'Error al eliminar');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'Error al conectar con el servidor');
        } finally {
            setShowModal(false);
            setProductToDelete(null);
        }
    };

    const handleSearch = (term) => setSearchTerm(term);
    const handleCategoryChange = (category) => setSelectedCategory(prev => prev === category ? '' : category);
    const handleStatusFilterChange = (status) => setActiveStatusFilter(status);
    const openModal = (product) => {
        setProductToDelete(product);
        setShowModal(true);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="alert alert-danger mt-5 mx-auto text-center" style={{ maxWidth: '600px' }}>
            <h5 className="alert-heading">Error al cargar productos</h5>
            <p>{error}</p>
            <button className="btn btn-outline-danger" onClick={() => window.location.reload()}>
                Intentar nuevamente
            </button>
        </div>
    );

    return (
        <section className="shop-page-section fix section-padding" style={{ backgroundColor: '#f8f9fa' }}> 
            <div className="container">
                <div className="row g-4">
                    <div className="col-xl-3 col-lg-4 order-2 order-md-1">
                        <ShopSidebar 
                            onSearch={handleSearch} 
                            onCategoryChange={handleCategoryChange}
                            selectedCategory={selectedCategory}
                            onStatusFilterChange={handleStatusFilterChange}
                            activeStatusFilter={activeStatusFilter}
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
                                        <FaFilter className="me-2 text-muted" />
                                        <div className="btn-group btn-group-sm">
                                            {['all', 'active', 'inactive'].map(status => (
                                                <button
                                                    key={status}
                                                    className={`btn ${activeStatusFilter === status ? 'btn-success' : 'btn-outline-secondary'}`}
                                                    onClick={() => handleStatusFilterChange(status)}
                                                >
                                                    {status === 'all' ? 'Todos' : status === 'active' ? 'Activos' : 'Inactivos'}
                                                </button>
                                            ))}
                                        </div>
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
                            {filteredAndSortedProducts.length > 0 ? (
                                filteredAndSortedProducts.map((product, index) => (
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
                                                <StatusBadge active={product.activo}>
                                                    {product.activo ? 'Activo' : 'Inactivo'}
                                                </StatusBadge>
                                            </div>
                                            
                                            <div className={`p-3 ${viewMode === 'list' ? 'd-flex flex-column justify-content-between flex-grow-1' : ''}`}>
                                                <div>
                                                    <h5 className="mb-2">
                                                        <Link 
                                                            to={`/producto/${encodeURIComponent(product.ruta)}`}
                                                            className="text-decoration-none text-dark"
                                                        >
                                                            {product.titulo}
                                                        </Link>
                                                    </h5>
                                                    
                                                    {viewMode === 'list' && (
                                                        <p className="text-muted mb-3">
                                                            {product.descripcion?.length > 120 
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
                                                    
                                                    <div className="d-flex">
                                                        <EditButton onClick={() => handleEdit(product)} title="Editar producto">
                                                            <FaEdit size={14} />
                                                        </EditButton>
                                                        <DeleteButton onClick={() => openModal(product)} title="Eliminar producto" className="ms-2">
                                                            <FaTrash size={14} />
                                                        </DeleteButton>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                ))
                            ) : (
                                <EmptyStateContainer className="col-12 bg-white rounded shadow-sm">
                                    {searchTerm ? (
                                        <>
                                            <FaSearch size={64} className="text-muted mb-4" />
                                            <h4 className="mb-3">No se encontraron productos</h4>
                                            <p className="text-muted mb-4">
                                                No hay resultados para "{searchTerm}"{activeStatusFilter !== 'all' ? 
                                                ` en productos ${activeStatusFilter === 'active' ? 'activos' : 'inactivos'}` : ''}
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
                                                {activeStatusFilter !== 'all' ? 
                                                `No hay productos ${activeStatusFilter === 'active' ? 'activos' : 'inactivos'} en este momento.` : 
                                                'No se encontraron productos en el sistema.'}
                                            </p>
                                        </>
                                    )}
                                </EmptyStateContainer>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <ModalOverlay>
                    <ModalContainer>
                        <ModalHeader>
                            <WarningIcon>
                                <FaExclamationTriangle />
                            </WarningIcon>
                            <h3 style={{ letterSpacing: '0.6px', color: 'white', margin: 0 }}>Confirmar eliminación</h3>
                        </ModalHeader>
                        <ModalBody>
                            <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                                ¿Estás seguro de que deseas eliminar el producto <strong>"{productToDelete.titulo}"</strong>?
                            </p>
                            <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>
                                Esta acción no se puede deshacer y el producto será eliminado permanentemente.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <SecondaryButton onClick={() => setShowModal(false)}>
                                Cancelar
                            </SecondaryButton>
                            <DangerButton onClick={handleDelete}>
                                Eliminar
                            </DangerButton>
                        </ModalFooter>
                    </ModalContainer>
                </ModalOverlay>
            )}
        </section>
    );
};

export default Productos;