import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Navbar from '../../components/NavbarS2/NavbarS2';


import { FaArrowLeft, FaFilePdf, FaTags, FaInfoCircle, FaCheck, FaCertificate, FaFileDownload, FaRuler, FaCalendarAlt, FaDownload, FaAward, FaLeaf, FaShieldAlt } from 'react-icons/fa';

// Paleta de colores mejorada
const colors = {
  primary: '#27ae60',
  primaryLight: '#58e68e',
  primaryDark: '#1e8449',
  secondary: '#3498db',
  accent: '#9b59b6',
  dark: '#2c3e50',
  light: '#f5f7fa',
  gray: '#95a5a6',
  white: '#ffffff',
   orange: '#f39c12', 
  orangeLight: '#f5b041'
};

// Animaciones mejoradas
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(39, 174, 96, 0.4); }
  70% { transform: scale(1.02); box-shadow: 0 0 0 12px rgba(39, 174, 96, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(39, 174, 96, 0); }
`;

// Componentes estilizados
const ProductDetailContainer = styled.div`
  max-width: 1400px;
  margin: 8rem auto;
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ImageSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4.5rem;
`;

const MainImageContainer = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 560px;
  width: 560px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  animation: ${slideUp} 0.8s ease-out;
  border: 2px solid rgba(39, 174, 96, 0.15);

  img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }
`;

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  animation: ${fadeIn} 0.8s ease-out 0.2s both;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Thumbnail = styled.div`
  border-radius: 12px;
  overflow: hidden;
  height: 120px;
  background: linear-gradient(145deg, #f0f3f5, #e1e7ec);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(39, 174, 96, 0.1);
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
    border-color: ${colors.primaryLight};
  }

  img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }
`;

const InfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ProductHeader = styled.div`
  padding: 2rem;
  background: ${colors.white};
  border-radius: 16px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.06);
  animation: ${fadeIn} 0.6s ease-out;
`;

const ProductTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: ${colors.dark};
  margin-bottom: 1.5rem;
  line-height: 1.3;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.6rem 1.2rem;
  border-radius: 5px;
  font-size: 0.9rem;
  font-weight: 600;
  background: ${props => props.primary ? colors.primary : props.secondary ? colors.secondary : props.accent ? colors.accent : colors.gray};
  color: ${colors.white};
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);

  svg {
    margin-right: 0.6rem;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const ContentCard = styled.div`
  background: ${colors.white};
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0,0,0,0.06);
  animation:  0.8s ease-out;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  color: ${colors.primary};

  svg {
    font-size: 1.8rem;
    margin-right: 1rem;
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    margin: 0;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  justifyContent: center;
  padding: 25px;
  background: rgba(39, 174, 96, 0.05);
  border-radius: 10px;

  svg {
    color: ${colors.primary};
    margin-right: 1rem;

    flex-shrink: 0;
  }
`;

const CertificationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const CertificationItem = styled.div`
  background: ${colors.white};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  animation: ${fadeIn} 0.6s ease-out;
  border: 1px solid rgba(0,0,0,0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  }

  img {
    max-width: 100%;
    max-height: 80px;
    object-fit: contain;
    margin-bottom: 1rem;
  }

  span {
    font-size: 0.9rem;
    color: ${colors.dark};
    text-align: center;
  }
`;

const DownloadButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark});
  color: ${colors.white};
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 5px 20px rgba(39, 174, 96, 0.3);
  margin-top: 1.5rem;
  width: 100%;

  &:hover {
    background: linear-gradient(135deg, ${colors.primaryLight}, ${colors.primary});
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(39, 174, 96, 0.4);
  color: ${colors.white};

  }

  svg {
    margin-right: 0.8rem;
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background: #2c2c2c;
  color: ${colors.white};
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-top: 3rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);

  &:hover {
    background: ${colors.dark};
    color: ${colors.white};
    transform: translateX(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }

  svg {
    margin-right: 0.8rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  flex-direction: column;
`;

const LoadingSpinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 4px solid rgba(39, 174, 96, 0.2);
  border-radius: 50%;
  border-top-color: ${colors.primary};
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  color: ${colors.primary};
  font-size: 1.1rem;
`;

const ErrorContainer = styled.div`
  background: ${colors.white};
  border-radius: 16px;
  padding: 3rem;
  max-width: 600px;
  margin: 2rem auto;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0,0,0,0.1);
  border: 2px solid rgba(39, 174, 96, 0.15);
  animation: ${fadeIn} 0.6s ease-out;

  h2 {
    color: ${colors.dark};
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
  }

  p {
    color: ${colors.gray};
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }
`;
const ProductoDetalle = () => {
    const { ruta } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await fetch(`http://localhost:5000/listar_productos.php?ruta=${encodeURIComponent(ruta)}`);
                const result = await response.json();
                
                if (result.success && result.productos.length > 0) {
                    setProducto(result.productos[0]);
                } else {
                    setError('Producto no encontrado');
                }
            } catch (err) {
                setError('Error de conexión con el servidor');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducto();
    }, [ruta]);

    const base64ToImageUrl = (base64String) => {
        if (!base64String) return null;
        return `data:image/jpeg;base64,${base64String}`;
    };

    if (loading) return (
        <LoadingContainer>
            <LoadingSpinner />
            <LoadingText>Cargando información del producto...</LoadingText>
        </LoadingContainer>
    );

    if (error) return (
        <ErrorContainer>
            <h2>¡Error!</h2>
            <p>{error}</p>
            <BackButton to="/productos">
                <FaArrowLeft /> Volver al listado
            </BackButton>
        </ErrorContainer>
    );

    if (!producto) return (
        <ErrorContainer>
            <h2>Producto no disponible</h2>
            <p>El producto solicitado no se encuentra en nuestro catálogo</p>
            <BackButton to="/productos">
                <FaArrowLeft /> Volver al listado
            </BackButton>
        </ErrorContainer>
    );

    return (
        <ProductDetailContainer>
        <Navbar hclass={'header-section-2 style-two'} />

            <ProductLayout>
                <ImageSection>
                    <MainImageContainer>
                        {producto.imagenPrincipal ? (
                            <img 
                                src={base64ToImageUrl(producto.imagenPrincipal)}
                                alt={producto.titulo}
                                onError={(e) => {
                                    e.target.onerror = null; 
                                    e.target.src = '';
                                    e.target.parentNode.style.display = 'none';
                                }}
                            />
                        ) : (
                            <div style={{ textAlign: 'center', padding: '2rem' }}>
                                <p>Imagen no disponible</p>
                            </div>
                        )}
                    </MainImageContainer>

                    {producto.imagenes && producto.imagenes.length > 0 ? (
                        <GalleryContainer>
                            {producto.imagenes.map((img, index) => (
                                <Thumbnail key={index}>
                                    {img ? (
                                        <img 
                                            src={base64ToImageUrl(img)}
                                            alt={`Vista ${index + 1} de ${producto.titulo}`}
                                            onError={(e) => {
                                                e.target.onerror = null; 
                                                e.target.src = '';
                                                e.target.parentNode.style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <div style={{ textAlign: 'center' }}>
                                            <p>Miniatura no disponible</p>
                                        </div>
                                    )}
                                </Thumbnail>
                            ))}
                        </GalleryContainer>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '1rem' }}>
                            <p>No hay imágenes adicionales disponibles</p>
                        </div>
                    )}
                </ImageSection>

                <InfoSection>
                    <ProductHeader>
                        <ProductTitle>{producto.titulo}</ProductTitle>
                        <BadgeContainer>
                            <Badge primary>
                                <FaTags /> {producto.clasificacion}
                            </Badge>
                            <Badge accent>
                                <FaInfoCircle /> {producto.tipo}
                            </Badge>
                          <Badge style={{ background: producto.activo ? colors.orange : '#e74c3c' }}>
  {producto.activo ? 'Disponible' : 'No disponible'}
</Badge>
                        </BadgeContainer>
                        <p>{producto.descripcion}</p>
                    </ProductHeader>

                    <ContentGrid>
                        {/* Especificaciones Técnicas */}
                        <ContentCard>
                            <CardHeader>
                                <FaRuler />
                                <h3>Especificaciones</h3>
                            </CardHeader>
                            <FeatureList>
                                <FeatureItem>
                                    <FaCheck />
                                    <div>
                                        <strong>Unidad de medida:</strong> {producto.unidadMedida}
                                    </div>
                                </FeatureItem>
                                <FeatureItem>
                                    <FaCalendarAlt />
                                    <div>
                                        <strong>Fecha de creación:</strong> {new Date(producto.fechaCreacion).toLocaleDateString()}
                                    </div>
                                </FeatureItem>
                            </FeatureList>
                        </ContentCard>

                        {/* Beneficios */}
                        <ContentCard>
                            <CardHeader>
                                <FaAward />
                                <h3>Beneficios</h3>
                            </CardHeader>
                            <FeatureList>
                                {producto.ventajas && producto.ventajas.split('\n').map((beneficio, index) => (
                                    <FeatureItem key={index}>
                                        <FaLeaf />
                                        <div>{beneficio}</div>
                                    </FeatureItem>
                                ))}
                            </FeatureList>
                        </ContentCard>

                        {/* Documentación */}
                        {producto.fichaTecnica && (
                            <ContentCard>
                                <CardHeader>
                                    <FaFileDownload />
                                    <h3>Documentación</h3>
                                </CardHeader>
                                <DownloadButton 
                                    href={`data:application/pdf;base64,${producto.fichaTecnica}`}
                                    download={`Ficha_Técnica_${producto.titulo.replace(/\s+/g, '_')}.pdf`}
                                >
                                    <FaFilePdf /> Descargar Ficha Técnica
                                </DownloadButton>
                            </ContentCard>
                        )}
                    </ContentGrid>

                    {/* Certificaciones */}
                    {producto.sellos && producto.sellos.length > 0 && (
                        <div style={{ marginTop: '2rem' }}>
                            <CardHeader>
                                <FaCertificate />
                                <h3>Certificaciones</h3>
                            </CardHeader>
                            <CertificationsGrid>
                                {producto.sellos.map((sello, index) => (
                                    <CertificationItem key={index}>
                                        {sello ? (
                                            <img 
                                                src={base64ToImageUrl(sello)}
                                                alt={`Certificación ${index + 1}`}
                                                onError={(e) => {
                                                    e.target.onerror = null; 
                                                    e.target.src = '';
                                                    e.target.parentNode.style.display = 'none';
                                                }}
                                            />
                                        ) : (
                                            <span>Certificación no disponible</span>
                                        )}
                                    </CertificationItem>
                                ))}
                            </CertificationsGrid>
                        </div>
                    )}

                    <BackButton to="/productos">
                        <FaArrowLeft /> Volver al listado
                    </BackButton>
                </InfoSection>
            </ProductLayout>
        </ProductDetailContainer>
    );
};

export default ProductoDetalle;