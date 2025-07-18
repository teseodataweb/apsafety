import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar/Navbar'
import PageTitle from "../../components/pagetitle/PageTitle";
import CheckoutSection from '../../components/CheckoutSection'
import {connect} from "react-redux";

import Footer from '../../components/footer/Footer';
import CursorMaus from '../../components/CursorMaus/CursorMaus';

const CheckoutPage =({cartList}) => {
    return(
        <Fragment>
            <Navbar hclass={'header-section'} />
            <PageTitle pageTitle={'Digital printing Service'} pagesub={'Videos Técnicos y Educativos AP SAFETY'}/> 
            <CheckoutSection cartList={cartList}/>

            <Footer />
            <CursorMaus />
        </Fragment>
    )
};
const mapStateToProps = state => {
    return {
        cartList: state.cartList.cart,
        symbol: state.data.symbol
    }
};

export default connect(mapStateToProps)(CheckoutPage);
