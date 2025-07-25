import React, {Fragment} from 'react';
import PageTitle from '../../components/pagetitle/PageTitle'
import BlogList from '../../components/BlogList/BlogList'
import Navbar from '../../components/Navbar/Navbar'
import CtaSectionS2 from '../../components/CtaSectionS2/CtaSectionS2';
import Footer from '../../components/footer/Footer';
import CursorMaus from '../../components/CursorMaus/CursorMaus';
const BlogPage =() => {
    return(
        <Fragment>
            <Navbar hclass={'header-section'} />
            <PageTitle pageTitle={'Digital printing Service'} pagesub={'Blog Page'}/> 
            <BlogList/>
            <CtaSectionS2 />
            <Footer />
            <CursorMaus />
        </Fragment>
    )
};
export default BlogPage;

