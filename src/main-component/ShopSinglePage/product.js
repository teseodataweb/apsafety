import React from 'react';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { Link } from 'react-router-dom';

const Product = ({ item, addToCart }) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  }

  return (
    <div className="row g-5">
      <div className="col-lg-6">
        <div className="product-image-items">
          <div className="tab-content">
              <div className="product-image">
                <Zoom>
                  <img src={item.proImg ? item.proImg : ''} alt="products" />
                </Zoom>
              </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="product-details-content">
          
          <h3 className="pb-12 split-text right">{item.title}</h3>
          <p className="mb-4">
            Consulta y descarga fichas técnicas, certificados, normativas y manuales para usar y validar 
            nuestros equipos de protección personal (EPP). Toda la información está organizada para facilitar 
            la toma de decisiones técnicas y cumplir con regulaciones nacionales e internacionales.
          </p>
 
        </div>
      </div>
    </div>
  );
};

export default Product;









