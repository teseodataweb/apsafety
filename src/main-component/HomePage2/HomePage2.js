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
import QualityPrintingSection from '../../components/QualityPrintingSection/QualityPrintingSection';
import BrandSection from '../../components/BrandSection/BrandSection';
import TestimonialSectionS2 from '../../components/TestimonialSectionS2/TestimonialSectionS2';
import FaqSection from '../../components/FaqSection/FaqSection';
import MarqueeSectionS3 from '../../components/MarqueeSectionS3/MarqueeSectionS3';
import BlogSection from '../../components/BlogSection/BlogSection';
import FooterS3 from '../../components/footerS3/FooterS3';

import Footer from '../../components/footer/Footer';
import CursorMaus from '../../components/CursorMaus/CursorMaus';

const HomePage2 = ({ addToCart }) => {
  const products = api();


    const addToCartProduct = (product, qty = 1) => {
        addToCart(product, qty);
    };

    const products = productsArray

    return (
        <Fragment>
            <Navbar hclass={'header-section-2 style-two'}/>
            <Hero2 />
            <IconboxSection />
            <ShopbannerSection />
            <About2 hclass={'about-section section-padding pt-0'}/>
            <MarqueeSectionS2 />
            <ProductSectionS3 products={products} />
            <ServiceSectionS2 />
            <ProjectSectionS2 hclass={'project-section s2 fix section-padding pt-0'} />
            <ProductSectionS2
                addToCartProduct={addToCartProduct}
                products={products}
            />
            <MarqueeSectionS4 />
            <QualityPrintingSection />
            <BrandSection />
            <TestimonialSectionS2 />
            <FaqSection />
            <MarqueeSectionS3 />
            <BlogSection hclass="blog-section-2 section-padding bg-cover" SubClass="blog-wrapper mb-0" blogAllbtn={false} />
            <FooterS3 />
            <CursorMaus />
        </Fragment>
    )

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
