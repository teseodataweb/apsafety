import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { FaArrowLeft, FaFilePdf, FaTags, FaInfoCircle, FaCheck, FaCertificate, FaFileDownload, FaRuler, FaCalendarAlt, FaDownload, FaAward, FaLeaf, FaShieldAlt } from 'react-icons/fa';

const colors = {
  primary: '#04871c',
  primaryLight: '#04871c',
  primaryDark: '#145c24',
  secondary: '#3498db',
  accent: '#9b59b6',
  dark: '#2c3e50',
  light: '#f5f7fa',
  gray: '#95a5a6',
  white: '#ffffff'
};

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

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ProductDetailContainer = styled.div`
  max-width: 1600px;
  margin: 6rem auto 3rem;
  padding: 0 2rem;
  flex: 1;
  animation: ${fadeIn} 0.8s ease-out;

  @media (max-width: 1600px) {
    max-width: 1400px;
  }

  @media (max-width: 1200px) {
    max-width: 1100px;
    padding: 0 1.5rem;
  }

  @media (max-width: 992px) {
    margin-top: 5rem;
    padding: 0 1rem;
  }

  @media (max-width: 768px) {
    margin-top: 4rem;
    padding: 0 0.75rem;
  }

  @media (max-width: 576px) {
    margin-top: 3.5rem;
    padding: 0 0.5rem;
  }
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 1200px) {
    grid-template-columns: 1.2fr 1fr;
    gap: 3rem;
  }

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    gap: 2rem;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    gap: 1.75rem;
  }
`;

const ImageSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (min-width: 1600px) {
    gap: 3.5rem;
  }

  @media (min-width: 1200px) {
    gap: 3rem;
  }

  @media (min-width: 992px) {
    gap: 2.5rem;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    gap: 2.25rem;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    gap: 2rem;
  }
`;

const MainImageContainer = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  max-height: 600px;
  width: 100%;
  aspect-ratio: 1/1;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  animation: ${slideUp} 0.8s ease-out;
  border: 2px solid rgba(39, 174, 96, 0.15);
  background: #f8f9fa;

  @media (min-width: 1600px) {
    height: 600px;
  }

  @media (min-width: 1200px) {
    height: 550px;
  }

  @media (min-width: 992px) {
    height: 500px;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    height: 450px;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    height: 400px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 1.5rem;
  }
`;

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  animation: ${fadeIn} 0.8s ease-out 0.2s both;

  @media (min-width: 1600px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.8rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.2rem;
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const Thumbnail = styled.div`
  border-radius: 10px;
  overflow: hidden;
  height: 140px;
  background: linear-gradient(145deg, #f0f3f5, #e1e7ec);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(39, 174, 96, 0.1);
  box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  aspect-ratio: 1/1;

  @media (min-width: 1600px) {
    height: 160px;
  }

  @media (min-width: 1200px) {
    height: 150px;
  }

  @media (min-width: 992px) {
    height: 140px;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    height: 130px;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    height: 120px;
  }

  @media (max-width: 576px) {
    height: 100px;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    border-color: ${colors.primaryLight};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 0.75rem;
  }
`;

const InfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 1600px) {
    gap: 3rem;
  }

  @media (min-width: 1200px) {
    gap: 2.5rem;
  }

  @media (min-width: 992px) {
    gap: 2rem;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    gap: 1.75rem;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const ProductHeader = styled.div`
  padding: 2rem;
  background: ${colors.white};
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  animation: ${fadeIn} 0.6s ease-out;

  @media (min-width: 1600px) {
    padding: 3rem;
    border-radius: 16px;
  }

  @media (min-width: 1200px) {
    padding: 2.5rem;
  }

  @media (max-width: 992px) {
    padding: 1.75rem;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ProductTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.dark};
  margin-bottom: 1.5rem;
  line-height: 1.3;

  @media (min-width: 1600px) {
    font-size: 2.5rem;
  }

  @media (min-width: 1200px) {
    font-size: 2.2rem;
  }

  @media (min-width: 992px) {
    font-size: 2rem;
  }

  @media (max-width: 992px) {
    font-size: 1.8rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 768px) {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1.5rem;

  @media (min-width: 1600px) {
    gap: 1rem;
    margin-bottom: 2rem;
  }

  @media (min-width: 1200px) {
    gap: 0.9rem;
  }

  @media (max-width: 992px) {
    gap: 0.7rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 768px) {
    gap: 0.6rem;
  }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.7rem 1.3rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  background: ${props => props.primary ? colors.primary : props.secondary ? colors.secondary : props.accent ? colors.accent : colors.gray};
  color: ${colors.white};
  box-shadow: 0 5px 12px rgba(0,0,0,0.12);

  @media (min-width: 1600px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }

  @media (min-width: 1200px) {
    padding: 0.75rem 1.4rem;
  }

  @media (max-width: 992px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }

  svg {
    margin-right: 0.7rem;
    font-size: 1rem;
    
    @media (min-width: 1600px) {
      margin-right: 0.8rem;
      font-size: 1.1rem;
    }

    @media (max-width: 992px) {
      margin-right: 0.6rem;
      font-size: 0.9rem;
    }
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
  }

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.75rem;
  }

  @media (max-width: 768px) {
    gap: 1.5rem;
  }

  @media (max-width: 576px) {
    gap: 1.25rem;
  }
`;

const ContentCard = styled.div`
  background: ${colors.white};
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  animation: ${fadeIn} 0.8s ease-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  @media (min-width: 1600px) {
    padding: 2.5rem;
    border-radius: 12px;
  }

  @media (min-width: 1200px) {
    padding: 2rem;
  }

  @media (max-width: 992px) {
    padding: 1.75rem;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.12);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  color: ${colors.primary};

  @media (min-width: 1600px) {
    margin-bottom: 2rem;
  }

  @media (max-width: 992px) {
    margin-bottom: 1.25rem;
  }

  svg {
    font-size: 1.8rem;
    margin-right: 1rem;

    @media (min-width: 1600px) {
      font-size: 2rem;
      margin-right: 1.2rem;
    }

    @media (max-width: 992px) {
      font-size: 1.6rem;
      margin-right: 0.9rem;
    }

    @media (max-width: 768px) {
      font-size: 1.4rem;
      margin-right: 0.8rem;
    }
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    margin: 0;

    @media (min-width: 1600px) {
      font-size: 1.6rem;
    }

    @media (max-width: 992px) {
      font-size: 1.3rem;
    }

    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
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

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  padding: 1.25rem;
  background: rgba(39, 174, 96, 0.05);
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;

  @media (min-width: 1600px) {
    padding: 1.5rem;
    font-size: 1.1rem;
  }

  @media (max-width: 992px) {
    padding: 1rem;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    padding: 0.9rem;
    font-size: 0.9rem;
  }

  &:hover {
    background: rgba(39, 174, 96, 0.08);
    transform: translateY(-3px);
  }

  svg {
    color: ${colors.primary};
    margin-right: 1rem;
    flex-shrink: 0;
    font-size: 1.1rem;

    @media (min-width: 1600px) {
      font-size: 1.3rem;
      margin-right: 1.2rem;
    }

    @media (max-width: 992px) {
      font-size: 1rem;
      margin-right: 0.8rem;
    }
  }

  div {
    strong {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 1.05rem;

      @media (min-width: 1600px) {
        font-size: 1.15rem;
      }

      @media (max-width: 992px) {
        font-size: 1rem;
      }
    }
  }
`;

const CertificationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (min-width: 1600px) {
    gap: 2rem;
    margin-top: 2rem;
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CertificationItem = styled.div`
  background: ${colors.white};
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 15px rgba(0,0,0,0.08);
  animation: ${fadeIn} 0.6s ease-out;
  border: 1px solid rgba(0,0,0,0.05);
  transition: all 0.3s ease;

  @media (min-width: 1600px) {
    padding: 2rem;
    border-radius: 12px;
  }

  @media (max-width: 992px) {
    padding: 1.25rem;
    border-radius: 8px;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.12);
  }

  img {
    max-width: 100%;
    max-height: 80px;
    object-fit: contain;
    margin-bottom: 1rem;

    @media (min-width: 1600px) {
      max-height: 100px;
      margin-bottom: 1.5rem;
    }

    @media (max-width: 992px) {
      max-height: 70px;
      margin-bottom: 0.8rem;
    }
  }

  span {
    font-size: 0.9rem;
    color: ${colors.dark};
    text-align: center;
    font-weight: 500;

    @media (min-width: 1600px) {
      font-size: 1rem;
    }

    @media (max-width: 992px) {
      font-size: 0.85rem;
    }
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
  box-shadow: 0 8px 20px rgba(39, 174, 96, 0.3);
  margin-top: 1.5rem;
  width: 100%;
  font-size: 1rem;

  @media (min-width: 1600px) {
    padding: 1.2rem 2.5rem;
    font-size: 1.1rem;
    border-radius: 12px;
  }

  @media (max-width: 992px) {
    padding: 0.9rem 1.75rem;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }

  &:hover {
    background: linear-gradient(135deg, ${colors.primaryLight}, ${colors.primary});
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(39, 174, 96, 0.4);
    color: ${colors.white};
  }

  svg {
    margin-right: 0.8rem;
    font-size: 1.2rem;

    @media (min-width: 1600px) {
      margin-right: 1rem;
      font-size: 1.3rem;
    }

    @media (max-width: 992px) {
      margin-right: 0.7rem;
      font-size: 1.1rem;
    }
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
  box-shadow: 0 8px 15px rgba(0,0,0,0.1);
  font-size: 1rem;
  align-self: flex-start;

  @media (min-width: 1600px) {
    padding: 1.2rem 2.5rem;
    font-size: 1.1rem;
    border-radius: 12px;
    margin-top: 4rem;
  }

  @media (max-width: 992px) {
    padding: 0.9rem 1.75rem;
    font-size: 0.95rem;
    margin-top: 2.5rem;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
    margin-top: 2rem;
  }

  &:hover {
    background: #04871c;
    color: ${colors.white};
    transform: translateX(-8px);
    box-shadow: 0 12px 20px rgba(0,0,0,0.15);
  }

  svg {
    margin-right: 0.8rem;
    font-size: 1.2rem;

    @media (min-width: 1600px) {
      margin-right: 1rem;
      font-size: 1.3rem;
    }

    @media (max-width: 992px) {
      margin-right: 0.7rem;
      font-size: 1.1rem;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  flex-direction: column;
`;

const LoadingSpinner = styled.div`
  width: 4rem;
  height: 4rem;
  border: 5px solid rgba(39, 174, 96, 0.2);
  border-radius: 50%;
  border-top-color: ${colors.primary};
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    width: 3rem;
    height: 3rem;
    border-width: 4px;
  }
`;

const LoadingText = styled.p`
  margin-top: 1.5rem;
  color: ${colors.primary};
  font-size: 1.3rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-top: 1rem;
  }
`;

const ErrorContainer = styled.div`
  background: ${colors.white};
  border-radius: 12px;
  padding: 3rem;
  max-width: 800px;
  margin: 3rem auto;
  text-align: center;
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
  border: 2px solid rgba(39, 174, 96, 0.15);
  animation: ${fadeIn} 0.6s ease-out;

  @media (min-width: 1600px) {
    padding: 4rem;
    border-radius: 16px;
  }

  @media (max-width: 992px) {
    padding: 2.5rem;
    border-radius: 10px;
    margin: 2rem auto;
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }

  h2 {
    color: ${colors.dark};
    margin-bottom: 1.5rem;
    font-size: 1.8rem;

    @media (min-width: 1600px) {
      font-size: 2.2rem;
      margin-bottom: 2rem;
    }

    @media (max-width: 992px) {
      font-size: 1.6rem;
      margin-bottom: 1.25rem;
    }

    @media (max-width: 768px) {
      font-size: 1.4rem;
    }
  }

  p {
    color: ${colors.gray};
    margin-bottom: 2rem;
    font-size: 1.1rem;
    line-height: 1.6;

    @media (min-width: 1600px) {
      font-size: 1.3rem;
      margin-bottom: 2.5rem;
    }

    @media (max-width: 992px) {
      font-size: 1rem;
      margin-bottom: 1.5rem;
    }
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
        <PageWrapper>
            <Navbar hclass={'header-section-2 style-two'} />
            <LoadingContainer>
                <LoadingSpinner />
                <LoadingText>Cargando información del producto...</LoadingText>
            </LoadingContainer>
            <Footer />
        </PageWrapper>
    );

    if (error) return (
        <PageWrapper>
            <Navbar hclass={'header-section-2 style-two'} />
            <ErrorContainer>
                <h2>¡Error!</h2>
                <p>{error}</p>
                <BackButton to="/productos">
                    <FaArrowLeft /> Volver al listado
                </BackButton>
            </ErrorContainer>
            <Footer />
        </PageWrapper>
    );

    if (!producto) return (
        <PageWrapper>
            <Navbar hclass={'header-section-2 style-two'} />
            <ErrorContainer>
                <h2>Producto no disponible</h2>
                <p>El producto solicitado no se encuentra en nuestro catálogo</p>
                <BackButton to="/productos">
                    <FaArrowLeft /> Volver al listado
                </BackButton>
            </ErrorContainer>
            <Footer />
        </PageWrapper>
    );

    return (
        <PageWrapper>
            <Navbar hclass={'header-section-2 style-two'} />
            
            <ProductDetailContainer>
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
                                <Badge secondary>
                                    {producto.activo ? 'Disponible' : 'No disponible'}
                                </Badge>
                            </BadgeContainer>
                            <p>{producto.descripcion}</p>
                        </ProductHeader>

                        <ContentGrid>
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
            
            <Footer />
        </PageWrapper>
    );
};

export default ProductoDetalle;