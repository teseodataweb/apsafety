import React, { Fragment } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/hero/hero';
import FeatureSection from '../../components/FeatureSection/FeatureSection';
import MarqueeSection from '../../components/MarqueeSection/MarqueeSection';
import ServiceSection from '../../components/ServiceSection/ServiceSection';
import CertificationsSection from '../../components/CertificationsSection/CertificationsSection';
import TestimonialsSection from '../../components/TestimonialsSection/TestimonialsSection';
import PortfolioSection from '../../components/PortfolioSection/PortfolioSection';
import FunFact from '../../components/FunFact/FunFact';


import Footer from '../../components/footer/Footer';
import CursorMaus from '../../components/CursorMaus/CursorMaus';
import ServiceBg from '../../img/service/service-bg.jpg'
import { connect } from "react-redux";
import { addToCart } from "../../store/actions/action";


const HomePage = ({ addToCart }) => {

    



    return (
        <Fragment>
            <Navbar hclass={'header-section'} />
            <Hero />
            <ServiceSection hclass={'service-section bg-cover section-padding'} Bg={ServiceBg} />
            <CertificationsSection />
            <TestimonialsSection />
            <PortfolioSection />
            <MarqueeSection hclass={'marquee-section margin-top-8 mb-80'} />
            <FunFact hclass={'counter-section fix section-padding pt-0'} />
            <Footer />
            <CursorMaus />
        </Fragment>
    )
};
export default connect(null, { addToCart })(HomePage);