import React from 'react';
import Login from '../login/login';
const Loginpage = () => {
 return (
        <div>
            <section className="contact-section section-padding">
                <div className="container">
                    <div className="contact-area">
                        <div className="row justify-content-center">
                        <br/>
                            <div className="col-xl-5 col-lg-5 mt-5 mt-lg-0">
                                    <div className="contact-title">
                        <br/> 
                                    </div>
                                    <Login/>
                        <br/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )}
export default Loginpage;
