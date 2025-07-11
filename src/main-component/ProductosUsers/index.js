import React, { Fragment } from 'react';
import { connect } from "react-redux";
import PageTitle from '../../components/pagetitle/PageTitle'
import { addToCart } from "../../store/actions/action";
import ProductosUs from '../../components/ProductosUsers/index';
import api from "../../api";
import FooterS3 from '../../components/footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
const ProductosUsers = ({ addToCart }) => {
    const productsArray = api();
    const addToCartProduct = (product, qty = 1) => {
        addToCart(product, qty);};
    const products = productsArray
    return (
        <Fragment>
            <Navbar hclass={'header-section-2 style-two'} />
            <PageTitle pagesub={'Productos'} />
            <ProductosUs
                addToCartProduct={addToCartProduct}
                products={products} />
           
            <FooterS3 />
        </Fragment>
        )};
export default connect(null, { addToCart })(ProductosUsers);