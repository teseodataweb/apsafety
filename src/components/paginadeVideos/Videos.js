import React, { Fragment } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/footer/Footer'; // Asegúrate de tener un Footer si lo usas

const BlogPage = () => {
  const videoLinks = [
    'https://www.youtube.com/embed/d89FvbG1bfU',
    'https://www.youtube.com/embed/MsEPAIP0m9I',
    'https://www.youtube.com/embed/-paqvItAnP8',
  ];

  return (
    <Fragment>
      <Navbar hclass={'header-section'} />

      <section style={{ padding: '4rem 2rem', backgroundColor: '#f9f9f9', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Videos Técnicos</h1>
        <p style={{ maxWidth: '800px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>
          Explora nuestros videos sobre pruebas, certificaciones y asesoría técnica en protección laboral.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
          {videoLinks.map((link, index) => (
            <div key={index} style={{ flex: '1 1 300px', maxWidth: '500px' }}>
              <iframe
                width="100%"
                height="280"
                src={link}
                title={`Video ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <p style={{ marginTop: '0.5rem' }}>Descripción breve del video {index + 1}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </Fragment>
  );
};

export default BlogPage;
