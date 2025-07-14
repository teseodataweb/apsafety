import React, { Fragment } from 'react';
import NavbarAdmin from '../../components/NavbarAdmin/NavbarAdmin'
import Admin from '../../components/Admin/Admin'
import FooterS3 from '../../components/footerS3/FooterS3';
import CursorMaus from '../../components/CursorMaus/CursorMaus';
import { connect } from "react-redux";
import { addToCart } from "../../store/actions/action";
const AdminPage = ({ addToCart }) => {
    return (
        <Fragment>
            <NavbarAdmin hclass={'header-section'} />
            <Admin hclass={'service-section bg-cover section-padding'} />
            <FooterS3 />
            <CursorMaus />
        </Fragment>
    )};
export default connect(null, { addToCart })(AdminPage);