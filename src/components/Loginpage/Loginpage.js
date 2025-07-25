import React from 'react';
import Login from '../login/login';
import Navbar  from '../Navbar/Navbar';
import Footer from '../../components/footer/Footer';

const Loginpage = () => {
 return (
        <div>
    <Navbar />

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
                <Footer />
        </div>
    )}
export default Loginpage;
