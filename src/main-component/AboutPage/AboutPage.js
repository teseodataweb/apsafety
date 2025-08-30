import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import NavbarS2 from '../../components/Navbar/Navbar';
import PageTitle from '../../components/pagetitle/PageTitle'
import About2 from '../../components/about2/about2';
import DistribuidoresSection from '../../components/DistribuidoresSection/DistribuidoresSection';
import LaboratorioSection from '../../components/LaboratorioSection/LaboratorioSection';
import MarqueeSection from '../../components/MarqueeSection/MarqueeSection';
import FunFact from '../../components/FunFact/FunFact';
import TestimonialsSection from '../../components/TestimonialsSection/TestimonialsSection';
import FooterS3 from '../../components/footerS3/FooterS3';
import CursorMaus from '../../components/CursorMaus/CursorMaus';

const AboutPage = () => {
    return (
        <Fragment>
            <Helmet>
                <title>Nosotros - AP Safety | Historia, Misión y Valores de Nuestra Empresa EPP</title>
                <meta name="description" content="Conoce la historia de AP Safety, líder en fabricación y distribución de EPP en México. Nuestra misión es proteger trabajadores con equipos certificados de calidad." />
                <meta name="keywords" content="AP Safety historia, empresa EPP México, misión visión valores, fabricante EPP" />
                <link rel="canonical" href="https://apsafety.com/about" />
            </Helmet>
            
            <NavbarS2 hclass={'header-section-2 style-two'} />
            <PageTitle pageTitle={'Nosotros'} pagesub={'Conoce AP Safety'} />
            <About2 hclass={'about-section section-padding'} />
            <FunFact hclass={'counter-section fix section-padding'} />
            <DistribuidoresSection />
            <LaboratorioSection />
            <TestimonialsSection />
            <MarqueeSection hclass={'marquee-section'} />
            <FooterS3 />
            <CursorMaus />
        </Fragment>
    )
};
export default AboutPage;
