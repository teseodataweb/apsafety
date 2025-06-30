import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import AggProducto from './AggProducto';
import NavbarS2 from '../../components/NavbarS2/NavbarS2';
import Footer from '../footer/Footer';
const FormProducto = (props) => {
    return (
<Fragment>
        <NavbarS2 hclass={'header-section-2 style-two'} />
            <div className="container">
                <div className="news-details-wrapper">
                    <div className="row g-5">
                        <div className="col-12 col-lg-8">
                            <div className="single-news-post">
                                <div className="details-content">
                                    <div className="row g-4 mt-2 justify-content-between align-items-center">
                                    </div>   
                                </div>
                            </div>
                            <div className="row tag-share-wrap mt-4 mb-5">
                                <div className="col-lg-4 col-12 mt-3 mt-lg-0 text-lg-end">   
                                </div>
                            </div>
                            <div className="comments-area">  
                            </div>
                            <div className="comment-form-wrap pt-5">
                                <h3>Agregar Producto</h3>
                                <AggProducto />
                            </div>
                        </div>      
                    </div>
                </div>
            </div>
    <Footer />
</Fragment>  
)}
export default FormProducto;
