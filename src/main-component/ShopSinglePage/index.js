import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import Navbar from '../../components/Navbar/Navbar'
import PageTitle from '../../components/pagetitle/PageTitle';
import FooterS3 from '../../components/footerS3/FooterS3';
import CursorMaus from '../../components/CursorMaus/CursorMaus';
import { addToCart } from "../../store/actions/action";
import Product from './product';
import api from "../../api";
import ProductTabs from './alltab';
const ProductSinglePage = (props) => {
    const { slug } = useParams();
    const productsArray = api();
    const Allproduct = productsArray;
    const { addToCart } = props;
    const [product, setProduct] = useState({});
useEffect(() => {
  setProduct(Allproduct.filter(p => p.slug === String(slug)))
}, [Allproduct, slug]);
    const item = product[0];
    return (
        <Fragment>
            <Navbar hclass={'header-section-2 style-two'} />
            <PageTitle pagesub={'Información Técnica y Documentación Oficial'} /> 
            <section className="product-details-section section-padding section-bg-2">
                <div className="container">
                    <div className="product-details-wrapper">
                        {item ? (
                            <Product
                                item={item}
                                addToCart={addToCart}
                            />
                        ) : null}

                        <ProductTabs />
                    </div>
                </div>
            </section>
            <FooterS3 />
            <CursorMaus />
        </Fragment>
    );
};
const mapStateToProps = state => {
    return {
        products: state.data.products,
    };
};
export default connect(mapStateToProps, { addToCart })(ProductSinglePage);
