import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../store/actions/action';
import api from '../../api';

import Navbar from '../../components/Navbar/Navbar';
import Hero2 from '../../components/hero2/Hero2';
import About2 from '../../components/about2/about2';
import ProductSectionS3 from '../../components/ProductSectionS3/ProductSectionS3';
import ServiceSectionS2 from '../../components/ServiceSectionS2/ServiceSectionS2';
import ProjectSectionS2 from '../../components/ProjectSectionS2/ProjectSectionS2';
import MarqueeSectionS4 from '../../components/MarqueeSectionS4/MarqueeSectionS4';
import Footer from '../../components/footer/Footer';
import CursorMaus from '../../components/CursorMaus/CursorMaus';

const HomePage2 = ({ addToCart }) => {
  const products = api();

  return (
    <Fragment>
      <Navbar hclass="header-section-2 style-two" />
      <Hero2 />
      <About2 hclass="about-section section-padding pt-0" />
      <ProductSectionS3 products={products} />
      <ServiceSectionS2 />
      <ProjectSectionS2 hclass="project-section s2 fix section-padding pt-0" />
      <MarqueeSectionS4 />
       <Footer />
      <CursorMaus />
    </Fragment>
  );
};

export default connect(null, { addToCart })(HomePage2);
