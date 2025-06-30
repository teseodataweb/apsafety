import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom'
import blogs from '../../api/blogs'
import AggUssers from '../../components/AggUssers/AggUssers'
import NavbarS2 from '../../components/NavbarS2/NavbarS2';
import PageTitle from '../../components/pagetitle/PageTitle'
import CtaSectionS2 from '../../components/CtaSectionS2/CtaSectionS2';
import Footer from '../../components/footer/Footer';
import CursorMaus from '../../components/CursorMaus/CursorMaus';
const UssersPage = () => {
    const { slug } = useParams()
    const BlogDetails = blogs.find(item => item.slug === slug)
    return (
        <Fragment>
            <NavbarS2 hclass={'header-section-2 style-two'} />
            <PageTitle pageTitle={'Digital printing Service'} pagesub={BlogDetails.title} />
            <AggUssers />
            <CtaSectionS2 />
            <Footer />
            <CursorMaus />
        </Fragment>
    )
};
export default UssersPage;