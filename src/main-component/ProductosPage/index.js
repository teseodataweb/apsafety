import React, { Fragment } from 'react';
import { connect } from "react-redux";
import PageTitle from '../../components/pagetitle/PageTitle'
import { addToCart } from "../../store/actions/action";
import Productos from '../../components/Productos/index';
import api from "../../api";
import NavbarS2 from '../../components/NavbarS2/NavbarS2';
import FooterS3 from '../../components/footer/Footer';
const ProductosPage = ({ addToCart }) => {
    const productsArray = api();
    const addToCartProduct = (product, qty = 1) => {
        addToCart(product, qty);};
    const products = productsArray
    return (
        <Fragment>
            <NavbarS2 hclass={'header-section-2 style-two'} />
            <PageTitle pagesub={'Productos'} />
            <Productos
                addToCartProduct={addToCartProduct}
                products={products} />
           
            <FooterS3 />
        </Fragment>
        )};
export default connect(null, { addToCart })(ProductosPage);