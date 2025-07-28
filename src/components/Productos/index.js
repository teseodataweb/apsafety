import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaTh, FaListUl, FaExclamationTriangle, FaSearch, FaTimes, FaFilter, FaSync, FaSortAmountDown, FaSortAmountUp, FaChevronDown, FaPlus } from 'react-icons/fa';
import ShopSidebar from "./ShopSidebar";
import styled, { keyframes, css } from 'styled-components';
import { debounce } from 'lodash';

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

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(4, 15, 28, 0.5); }
  50% { box-shadow: 0 0 10px rgba(4, 15, 28, 0.8); }
  100% { box-shadow: 0 0 5px rgba(4, 15, 28, 0.5); }
`;

// Componentes estilizados
const ControlPanel = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 30px;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  gap: 20px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  transition: all 0.4s ease;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: 15px;
  }
  
  &:hover {
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
  }
`;

const SearchInput = styled.div`
  position: relative;
  flex: 1;
  min-width: 250px;
  max-width: 500px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
  
  input {
    width: 100%;
    padding: 14px 20px 14px 50px;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    background: rgba(0, 0, 0, 0.03);
    box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.05);
    color: #000;
    
    &:focus {
      outline: none;
      background: white;
      box-shadow: 0 0 0 3px rgba(4, 135, 28, 0.4), 
                  inset 0 3px 6px rgba(0, 0, 0, 0.05),
                  0 5px 15px rgba(4, 135, 28, 0.1);
    }
    
    &::placeholder {
      color: #999;
    }
  }
  
  svg {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: #777;
    font-size: 18px;
    transition: all 0.3s;
  }
  
  &:focus-within svg {
    color: #04871c;
    transform: translateY(-50%) scale(1.1);
  }
`;

const ViewControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(0, 0, 0, 0.03);
  padding: 10px;
  border-radius: 10px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const ViewButton = styled.button`
  background: ${props => props.$active ? 'linear-gradient(135deg,  #010101, #2c2c2c)' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#555'};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: ${props => props.$active ? '0 4px 15px rgba(4, 135, 28, 0.3)' : 'none'};
  
  &:hover {
    background: ${props => !props.$active && 'rgba(0, 0, 0, 0.05)'};
    transform: translateY(-2px);
    box-shadow: ${props => !props.$active && '0 4px 10px rgba(0, 0, 0, 0.1)'};
  }
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(0, 0, 0, 0.03);
  padding: 8px;
  border-radius: 10px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const SortSelect = styled.div`
  position: relative;
  min-width: 180px;
  
  @media (max-width: 768px) {
    min-width: 150px;
  }
  
  select {
    width: 100%;
    padding: 12px 40px 12px 15px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    appearance: none;
    background-color: white;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.3s;
    color: #333;
    font-weight: 500;
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(4, 135, 28, 0.3),
                  0 5px 15px rgba(0, 0, 0, 0.1);
    }
  }
  
  svg {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: #555;
    transition: all 0.3s;
  }
  
  &:hover svg {
    color: #04871c;
  }
`;

const SortOrderButton = styled.button`
  background: ${props => props.$active ? 'linear-gradient(135deg,  #010101, #2c2c2c)' : 'rgba(0, 0, 0, 0.03)'};
  color: ${props => props.$active ? 'white' : '#555'};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: ${props => props.$active ? '0 4px 15px rgba(4, 135, 28, 0.3)' : '0 2px 5px rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    background: ${props => !props.$active && 'rgba(0, 0, 0, 0.05)'};
    transform: translateY(-2px);
    box-shadow: ${props => !props.$active && '0 4px 10px rgba(0, 0, 0, 0.1)'};
  }
`;

const RefreshButton = styled.button`
  background: linear-gradient(135deg, #036016, #04871c);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(4, 135, 28, 0.3);
  ${props => props.$animate && css`animation: ${glow} 3s infinite;`}
  
  &:hover {
    transform: translateY(-3px) rotate(30deg);
    box-shadow: 0 8px 25px rgba(4, 135, 28, 0.4);
    animation: none;
  }
  
  &.refreshing {
    ${() => css`
      animation: ${rotate} 1s linear infinite, ${glow} 3s infinite;
    `}
  }
`;

const Button = styled.button`
  border: none;
  padding: 14px 32px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(0);
  font-size: 15px;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const SuccessButton = styled(Button)`
  background: linear-gradient(135deg, #036016, #04871c);
  color: white;
  ${props => props.$animate && css`animation: ${glow} 2s infinite;`}
  
  &:hover {
    background: linear-gradient(135deg, #04871c, #036016);
    animation: none;
  }
`;

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

const ActionButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  margin-left: -18px; 
  
  @media (max-width: 768px) {
    gap: 3px;
    margin-left: -3px;
  }
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
  margin: 2px;
  
  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 992px) {
    width: 34px;
    height: 34px;
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

const EditButton = styled(ActionButton)`
  background: #28a745;
  &:hover {
    background: #218838;
    box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.3);
  }
`;

const DeleteButton = styled(ActionButton)`
  background: #dc3545;
  &:hover {
    background: #c82333;
    box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.3);
  }
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
    const [sortOption, setSortOption] = useState('nombre_desc');
    const [sortOrder, setSortOrder] = useState('asc');
    const [viewMode, setViewMode] = useState('grid');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
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
                setRefreshing(false);
            }
        };

        const timer = setTimeout(fetchProducts, 300);
        return () => clearTimeout(timer);
    }, [selectedCategory]);

    useEffect(() => {
        let filtered = [...products];
        
        if (statusFilter !== 'all') {
            filtered = filtered.filter(product => 
                statusFilter === 'active' ? product.activo : !product.activo
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
    }, [searchTerm, products, statusFilter]);

    const filteredAndSortedProducts = useMemo(() => {
        return [...filteredProducts].sort((a, b) => {
            switch(sortOption) {
                case 'nombre_asc': 
                    return a.titulo.localeCompare(b.titulo) * (sortOrder === 'asc' ? 1 : -1);
                case 'nombre_desc': 
                    return b.titulo.localeCompare(a.titulo) * (sortOrder === 'asc' ? 1 : -1);
                case 'fecha_asc': 
                    return (new Date(a.fechaCreacion) - new Date(b.fechaCreacion)) * (sortOrder === 'asc' ? 1 : -1);
                case 'fecha_desc': 
                    return (new Date(b.fechaCreacion) - new Date(a.fechaCreacion)) * (sortOrder === 'asc' ? 1 : -1);
                default: 
                    return 0;
            }
        });
    }, [filteredProducts, sortOption, sortOrder]);

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
    const openModal = (product) => {
        setProductToDelete(product);
        setShowModal(true);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    const handleRefresh = () => {
        setRefreshing(true);
        const url = new URL('http://localhost:5000/listar_productos.php');
        if (selectedCategory) url.searchParams.append('clasificacion', selectedCategory);
        
        fetch(url)
            .then(response => response.json())
            .then(result => {
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
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setError('Error al actualizar productos');
            })
            .finally(() => {
                setRefreshing(false);
            });
    };

    const toggleSortOrder = () => {
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
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
                <div className="row">
                    <div className="col-12">
                        <ControlPanel>
                            <SearchInput>
                                <FaSearch />
                                <input 
                                    type="text" 
                                    placeholder="Buscar productos por nombre o descripción..." 
                                    value={searchTerm}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            </SearchInput>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                                {/* Selector de filtro por estado */}
                                <SortSelect>
                                    <select 
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="all">Todos</option>
                                        <option value="active">Activos</option>
                                        <option value="inactive">Inactivos</option>
                                    </select>
                                    <FaFilter />
                                </SortSelect>

                                {/* Selector de ordenamiento */}
                                <SortContainer>
                                    <SortSelect>
                                        <select 
                                            value={sortOption}
                                            onChange={(e) => setSortOption(e.target.value)}
                                        >
                                            <option value="nombre_asc">Nombre</option>
                                            <option value="fecha_asc">Fecha</option>
                                        </select>
                                        <FaChevronDown />
                                    </SortSelect>
                                    
                                    <SortOrderButton 
                                        onClick={toggleSortOrder}
                                        $active={true}
                                        title={sortOrder === 'asc' ? 'Orden ascendente' : 'Orden descendente'}
                                    >
                                        {sortOrder === 'asc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
                                    </SortOrderButton>
                                </SortContainer>
                                
                                <RefreshButton 
                                    onClick={handleRefresh}
                                    className={refreshing ? 'refreshing' : ''}
                                    title="Actualizar lista"
                                    $animate={!refreshing}
                                >
                                    <FaSync />
                                </RefreshButton>
                                
                                <ViewControls>
                                    <ViewButton 
                                        $active={viewMode === 'grid'} 
                                        onClick={() => setViewMode('grid')}
                                        title="Vista de cuadrícula"
                                    >
                                        <FaTh />
                                    </ViewButton>
                                    <ViewButton 
                                        $active={viewMode === 'list'} 
                                        onClick={() => setViewMode('list')}
                                        title="Vista de lista"
                                    >
                                        <FaListUl />
                                    </ViewButton>
                                </ViewControls>
                                
                                <Link 
                                    to="/formProducto" 
                                    className="theme-btn wow fadeInUp" 
                                    data-wow-delay=".5s"
                                    style={{
                                        background: 'linear-gradient(135deg, #036016, #04871c)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '14px 30px',
                                        borderRadius: '6px',
                                        height: '60px',
                                        textDecoration: 'none',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        boxShadow: '0 8px 25px rgba(4, 135, 28, 0.3)',
                                        transition: 'all 0.3s ease',
                                        fontSize: '15px',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    <FaPlus /> Agregar Producto
                                </Link>  
                            </div>
                        </ControlPanel>
                    </div>
                </div>

                <div className="row g-4">
                    {/* Barra lateral */}
                    <div className="col-xl-3 col-lg-4 order-2 order-md-1">
                        <ShopSidebar 
                            onSearch={handleSearch} 
                            onCategoryChange={handleCategoryChange}
                            selectedCategory={selectedCategory}
                            searchTerm={searchTerm}
                        />
                    </div>

                    {/* Contenido principal */}
                    <div className="col-xl-9 col-lg-8 order-1 order-md-2">
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
                                                      
<ActionButtonsContainer>
        <EditButton onClick={() => handleEdit(product)} title="Editar producto">
          <FaEdit size={14} />
        </EditButton>
        <DeleteButton onClick={() => openModal(product)} title="Eliminar producto">
          <FaTrash size={14} />
        </DeleteButton>
      </ActionButtonsContainer>
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
                                                No hay resultados para "{searchTerm}"{statusFilter !== 'all' ? 
                                                ` en productos ${statusFilter === 'active' ? 'activos' : 'inactivos'}` : ''}
                                            </p>
                                            <button 
                                                onClick={() => {
                                                    clearSearch();
                                                    setStatusFilter('all');
                                                }}
                                                className="btn btn-success px-4 py-2"
                                            >
                                                Mostrar todos los productos
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <h4 className="mb-3">No hay productos disponibles</h4>
                                            <p className="text-muted">
                                                {statusFilter !== 'all' ? 
                                                `No hay productos ${statusFilter === 'active' ? 'activos' : 'inactivos'} en este momento.` : 
                                                'No se encontraron productos en el sistema.'}
                                            </p>
                                            {statusFilter !== 'all' && (
                                                <button 
                                                    onClick={() => setStatusFilter('all')}
                                                    className="btn btn-success px-4 py-2 mt-3"
                                                >
                                                    Mostrar todos los estados
                                                </button>
                                            )}
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