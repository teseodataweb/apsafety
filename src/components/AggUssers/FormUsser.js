import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import AggUssers from './AggUssers';
import NavbarAdmin from '../../components/NavbarAdmin/NavbarAdmin';
import Footer from '../../components/footer/Footer'
const FormUsser = (props) => {
    return (
<Fragment > 
        <NavbarAdmin hclass={'header-section-2 style-two'} />
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
                                <h3>Agregar Usuario</h3>
                                <AggUssers />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <Footer />
            </Fragment>   
            )}
export default FormUsser;
