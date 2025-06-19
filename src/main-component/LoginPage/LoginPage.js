import React, { Fragment } from 'react';
// import NavbarS2 from '../../components/NavbarS2/NavbarS2';
// import PageTitle from '../../components/pagetitle/PageTitle'
import Loginpage from '../../components/Loginpage/Loginpage'
// import CtaSectionS2 from '../../components/CtaSectionS2/CtaSectionS2';
import FooterS3 from '../../components/footerS3/FooterS3';
import CursorMaus from '../../components/CursorMaus/CursorMaus';

const LoginPage = () => {
    return (
        <Fragment>
            {/* <NavbarS2 hclass={'header-section-2 style-two'} />
         */}
    {/* <PageTitle pageTitle={'Contact Us'} pagesub={'Contact'} /> */}

            <Loginpage />
            {/* <CtaSectionS2 /> */}
            <FooterS3 />
            <CursorMaus />
        </Fragment>
    )
};
export default LoginPage;

