import React from 'react';
import { Link } from 'react-router-dom'

import AggUssers from './AggUssers';
import Navbar from '../../components/Navbar/Navbar';


const FormUsser = (props) => {
    return (
        <section className="news-section-3 section-padding section-bg-2">
                                          <Navbar hclass={'header-section-2 style-two'} />
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

        </section>
        
    )

}
export default FormUsser;
