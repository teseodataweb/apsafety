import React, {Fragment} from 'react';
import Navbar from '../../components/Navbar/Navbar'
import PageTitle from "../../components/pagetitle/PageTitle";
import CheckoutSection from '../../components/CheckoutSection'
import {connect} from "react-redux";

import FooterS3 from '../../components/footerS3/FooterS3';
import CursorMaus from '../../components/CursorMaus/CursorMaus';

const CheckoutPage =({cartList}) => {
    return(
        <Fragment>
            <Navbar hclass={'header-section'} />
            <PageTitle pageTitle={'Digital printing Service'} pagesub={'Videos Técnicos y Educativos AP SAFETY'}/> 
            <CheckoutSection cartList={cartList}/>

            <FooterS3 />
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
