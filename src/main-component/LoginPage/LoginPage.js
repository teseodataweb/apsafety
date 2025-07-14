import React, { Fragment } from 'react';
import Loginpage from '../../components/Loginpage/Loginpage'
import FooterS3 from '../../components/footerS3/FooterS3';
import CursorMaus from '../../components/CursorMaus/CursorMaus';
const LoginPage = () => {    return (
        <Fragment>
            <Loginpage />
            <FooterS3 />
            <CursorMaus />
        </Fragment>
    )
};
export default LoginPage;