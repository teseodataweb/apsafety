import React, { useEffect, useState } from 'react';

const Alltab = () => {
  const [activeTab, setActiveTab] = useState('Tab2');
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    setActiveTab('Tab2');
  }, []);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  const fichaStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    marginBottom: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  };

  const btnVerStyle = {
    backgroundColor: '#000',
    color: '#fff',
    padding: '6px 14px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 600,
  };

  const sectionTitleStyle = {
    margin: '1rem 0',
    fontWeight: 700,
    fontSize: '1.2rem',
  };

const categorias = [
  {
    nombre: 'Respiradores Desechables',
    fichas: [
      { nombre: 'AP Z3B', link: 'https://drive.google.com/file/d/1ZH-Fhk07FkOtGyyOmPFsGZt1KdyntIjD/view' },
      { nombre: 'AP Z/ZV', link: 'https://drive.google.com/file/d/1RpjS8fGqyBMBfy6SwN2fHFVGLg4Phs-A/view' },
      { nombre: 'AP 8GN95', link: 'https://drive.google.com/file/d/14cy_lW02cL-GTQIY7iPaM-PHpIYTxgjH/view' },
      { nombre: 'AP 8GN95CA', link: 'https://drive.google.com/file/d/1zHeLHt74A0u5cDxuLGhdpCdAz3U_CaE0/view' },
      { nombre: 'AP M10/M10V', link: 'https://drive.google.com/file/d/1xaxcGC7MG2Yqjd_6DL6p2MBdkB0KdmnP/view' },
      { nombre: 'AP M10 Mini', link: 'https://drive.google.com/file/d/1E2wYSuf78kgc8OZf17HBt_rlpguLli1x/view' },
      { nombre: 'AP M11/M11V', link: 'https://drive.google.com/file/d/1JLdNaUJBWow6Rsqtw_nwHkS-0EiH6nVS/view' },
      { nombre: 'AP M14/M14V', link: 'https://drive.google.com/file/d/1IGU5nDyBCQ6CMUdyrA9IP3ZUcD1Rc_P1/view' },
      { nombre: 'AP M15/M15V', link: 'https://drive.google.com/file/d/1Y2jGJHsjrTnUR_ViuFvUH_RCRVG1eLd0/view' },
      { nombre: 'Pato Plegable 9030 / 9030V', link: 'https://drive.google.com/file/d/1-JSl1W2VOidZ0AgqowJeFDR0nOBYEor0/view' },
    ],
  },
  {
    nombre: 'Mascarillas Reutilizables',
    fichas: [
      { nombre: 'Media cara DP-01 / DP-02', link: 'https://drive.google.com/file/d/13B5BdQCfAH9jdf8H18CcLOpZ1tBOFDCi/view' },
      { nombre: 'Media cara DP-500 / DP-600', link: '' },
      { nombre: 'Cara completa 1601 y 1602', link: 'https://drive.google.com/file/d/12Y-UUyLRpYh7JNeLMoiXkKeJK6VlJH8r/view' },
    ],
  },
  {
    nombre: 'Cartuchos y Filtros',
    fichas: [
      { nombre: 'AP D100 a D109', link: 'https://drive.google.com/file/d/1MljxuKSVjL3zvZ-8uPdL5oSaLmFV8CxX/view' },
      { nombre: 'Develop DUAL P100', link: 'https://drive.google.com/file/d/1xRqUzXKnNyE6U4liZwHjhNHFj7i65-0_/view' },
      { nombre: 'Filtro Plano HEPA', link: 'https://drive.google.com/file/d/1wF4nbAsBRJ3MB7yc_ldc60AP6PiuOdht/view' },
      { nombre: 'Prefiltro y Retenedor', link: 'https://drive.google.com/file/d/1_ADQ6ELDKn_zonCZtFWsKJ8ZSyyEBmn2/view' },
      { nombre: 'Panel filtrado', link: 'https://drive.google.com/file/d/1Mp96NVv-t37imTnu5B_lyjQc_w3l3OnG/view' },
      { nombre: 'Línea de Aire', link: 'https://drive.google.com/file/d/1q0lTakeT-cb4QqrV8iMOq9EM3sMUb2N0/view' },
    ],
  },
  {
    nombre: 'Equipos Especiales',
    fichas: [
      { nombre: 'Detector multigás 4X', link: '' },
      { nombre: 'SCBA industrial y contra incendios', link: '#' },
      { nombre: 'Compresor Iron Guy', link: 'https://drive.google.com/file/d/103NEs3cLsg02mbtEr8RKDnFSmZ_UVkWF/view' },
    ],
  },
  {
    nombre: 'Protección Adicional',
    fichas: [
      { nombre: 'Casco de protección', link: 'https://drive.google.com/file/d/16_zmJvdguv_52Z5O4t7BtyMAC56nZ1oM/view' },
      { nombre: 'Guantes de carnaza', link: 'https://drive.google.com/file/d/1Ek7c-NFZzRcHOZELOT2A8Ped8cxyBtp3/view' },
    ],
  },
];

const normativas = [
  {
    nombre: 'NOM-017-STPS-2001',
    descripcion: 'Uso de Equipos de Protección Personal en los centros de trabajo.',
    link: 'https://drive.google.com/file/d/1BrMlxCGIw8N1UPhAt641MY4UYDAAMI2u/view',
  },
  {
    nombre: 'NOM-010-STPS-1999',
    descripcion: 'Contaminantes en el ambiente laboral.',
    link: 'https://drive.google.com/file/d/1BGXnx5gpX5TnC1He9mNjJfsV2VneUTkY/view',
  },
  {
    nombre: 'NOM-116-STPS-2009',
    descripcion: 'Condiciones térmicas elevadas o extremas.',
    link: 'https://drive.google.com/file/d/1xQGRR-uUk-mSJekYrKEHH-n4C870f6Sn/view',
  },
  {
    nombre: 'NMX-S-002-SCFI-2004',
    descripcion: 'Norma mexicana de seguridad para respiradores.',
    link: 'https://drive.google.com/file/d/1UHPogVraTTvsJ8e0ZKpm0xGmATWChxBu/view',
  },
  {
    nombre: 'NMX-S-054-SCFI-2002',
    descripcion: 'Norma mexicana para filtros de partículas.',
    link: 'https://drive.google.com/file/d/1U_tJMiD2JyZVhZ-s8_IIqKAK17DZHPhE/view',
  },
  {
    nombre: 'NRF-123-PEMEX-2007F',
    descripcion: 'Especificación de seguridad industrial para PEMEX.',
    link: 'https://drive.google.com/file/d/1JpD_QlHqqMwdDZdx6hoMijHYNUTjj6HA/view',
  },
];

const certificaciones = [
  {
    nombre: 'ISO 9001:2015',
    vigencia: 'Vigente',
    link: 'https://drive.google.com/file/d/1eZ8wds8LkmeWaSxwy8hT_-z5i64f0SfV/view',
  },
  {
    nombre: 'NOM-STPS-NYCE',
    vigencia: 'Vigente',
    link: 'https://drive.google.com/file/d/1D7yHqYnsKrckNkq648S6cOg0oQbHf4ZR/view',
  },
  {
    nombre: 'ER-0380-2019 (ES/EN)',
    vigencia: 'Vigente',
    link: 'https://drive.google.com/file/d/1qphRvAsMKoV7NNzIEhUcc40Qf-9WILHH/view',
  },
  {
    nombre: 'IQNet ES-0380-2019',
    vigencia: 'Vigente',
    link: 'https://drive.google.com/file/d/12D7LHoAZKh46UkETOliXBTyC4t2EErYD/view',
  },
  {
    nombre: 'Bicert',
    vigencia: 'Hasta 2026',
    link: 'https://drive.google.com/file/d/1qjJElZCYEqnj2G8la9Ymc7YFZNlGbgyx/view',
  },
];

const tablasComparativas = [
  {
    nombre: 'Tabla comparativa de cartuchos',
    link: 'https://drive.google.com/file/d/1XmdN3Y6f3AUjpp1eUqgCMUpX7eqjpavA/view',
  },
  {
    nombre: 'Tabla de contratipos Pato',
    link: 'https://drive.google.com/file/d/1kPrrPLVOZTZrZBNaHRU8hEFt4iux8eie/view',
  },
];

const manualesInstrucciones = [
  {
    nombre: 'Instrucciones de uso – Respiradores desechables',
    link: 'https://drive.google.com/file/d/1DIoEce21m4tUtXMWoo_Qti9gjB591wed/view',
  },
  {
    nombre: 'Instrucciones de uso – Línea de aire',
    link: 'https://drive.google.com/file/d/1q0lTakeT-cb4QqrV8iMOq9EM3sMUb2N0/view',
  },
  {
    nombre: 'Instrucciones de uso – Mascarillas reutilizables',
    link: '',
  },
  {
    nombre: 'Manual de compresor Iron Guy',
    link: 'https://drive.google.com/file/d/103NEs3cLsg02mbtEr8RKDnFSmZ_UVkWF/view',
  },
];


  return (
    <div className="single-tab" style={{ padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
        {[
          { label: 'Fichas Técnicas', id: 'Tab1' },
          { label: 'Normativas Oficiales Cumplidas', id: 'Tab2' },
          { label: 'Certificaciones de Calidad', id: 'Tab3' },
          { label: 'Tablas Comparativas', id: 'Tab4' },
          { label: 'Manuales e Instrucciones', id: 'Tab5' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              backgroundColor: activeTab === tab.id ? '#000' : '#f1f1f1',
              color: activeTab === tab.id ? '#fff' : '#333',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

<<<<<<< HEAD
    const [activeTab, setActiveTab] = useState('Tab2');
    const openTab = (TabName) => {
        setActiveTab(TabName);
    }
    useEffect(() => {
        openTab('Tab2');
    }, []);
    return (
        <div className="single-tab">
            <ul className="nav mb-4">
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'Tab1' ? 'active' : ''}`} onClick={() => openTab('Tab1')}>
                        Description
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'Tab2' ? 'active' : ''}`} onClick={() => openTab('Tab2')}>
                        Additional Information
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'Tab3' ? 'active' : ''}`} onClick={() => openTab('Tab3')}>
                        reviews (4)
                    </button>
                </li>
            </ul>
            <div className="tab-content">
                <div id="description"  style={{ display: activeTab === 'Tab1' ? 'block' : 'none' }}>
                    <div className="description-items">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="description-content">
                                    <h3 className="wow fadeInUp" data-wow-delay=".3s">Experience Is Over The World Visit</h3>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate vestibulum Phasellus rhoncus, dolor eget viverra pretium, dolor Numquam odit accusantium odit aut commodi et. Nostrum est atque ut dolorum. Et sequi aut atque doloribus qui. Iure amet in voluptate reiciendis. Perspiciatis consequatur aperiam repellendus velit quia est minima. tellus aliquet nunc vitae ultricies erat elit eu lacus. Vestibulum non justo consectetur, cursus ante, tincidunt sapien. Nulla quis diam sit amet turpis interdum accumsan quis necenim. Vivamus faucibus ex sed nibh egestas elementum. Mauris et bibendum dui. Aenean consequat pulvinar luctus
                                    </p>
                                    <h3 className="mb-0 mt-5 split-text right">More Details</h3>
                                    <div className="description-list-items d-flex">
                                        <ul className="description-list">
                                            <li>
                                                <i className="fal fa-check"></i>
                                                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry</span>
                                            </li>
                                            <li>
                                                <i className="fal fa-check"></i>
                                                <span>Lorem Ipsum has been the ‘s standard dummy text. Lorem Ipsumum is simply dummy text.</span>
                                            </li>
                                            <li>
                                                <i className="fal fa-check"></i>
                                                <span>type here your detail one by one li more add</span>
                                            </li>
                                            <li>
                                                <i className="fal fa-check"></i>
                                                <span>has been the industry’s standard dummy text ever since. Lorem Ips</span>
                                            </li>
                                        </ul>
                                        <ul className="description-list">
                                            <li>
                                                <i className="fal fa-check"></i>
                                                <span>Lorem Ipsum generators on the tend to repeat.</span>
                                            </li>
                                            <li>
                                                <i className="fal fa-check"></i>
                                                <span> If you are going to use a passage.</span>
                                            </li>
                                            <li>
                                                <i className="fal fa-check"></i>
                                                <span> Lorem Ipsum generators on the tend to repeat.</span>
                                            </li>
                                            <li>
                                                <i className="fal fa-check"></i>
                                                <span> Lorem Ipsum generators on the tend to repeat.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="additional" style={{ display: activeTab === 'Tab2' ? 'block' : 'none' }}>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <td>Weight</td>
                                    <td>240 Ton</td>
                                </tr>
                                <tr>
                                    <td>Dimensions</td>
                                    <td>20 × 30 × 40 cm</td>
                                </tr>
                                <tr>
                                    <td>Colors</td>
                                    <td>Black, Blue, Green</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="review" style={{ display: activeTab === 'Tab3' ? 'block' : 'none' }}>
                    <div className="review-items">
                        <div className="admin-items d-flex flex-wrap flex-md-nowrap align-items-center pb-4">
                            <div className="admin-img pb-4 pb-md-0 me-4">
                                <img src={Sb1} alt="image" />
                            </div>
                            <div className="content p-4">
                                <div className="head-content pb-1 d-flex flex-wrap justify-content-between">
                                    <h5>miklos salsa<span>27June 2024 at 5.44pm</span></h5>
                                    <div className="star">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Curabitur vulputate vestibulum Phasellus rhoncus dolor eget viverra pretium.Curabitur vulputate vestibulum Phasellus rhoncus dolor eget viverra pretium.
                                </p>
                            </div>
                        </div>
                        <div className="admin-items d-flex flex-wrap flex-md-nowrap align-items-center pb-4">
                            <div className="admin-img pb-4 pb-md-0 me-4">
                                <img src={Sb2} alt="image" />
                            </div>
                            <div className="content p-4">
                                <div className="head-content pb-1 d-flex flex-wrap justify-content-between">
                                    <h5>Ethan Turner <span>27June 2024 at 5.44pm</span></h5>
                                    <div className="star">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Curabitur vulputate vestibulum Phasellus rhoncus dolor eget viverra pretium.Curabitur vulputate vestibulum Phasellus rhoncus dolor eget viverra pretium.
                                </p>
                            </div>
                        </div>
                        <div className="admin-items d-flex flex-wrap flex-md-nowrap align-items-center pb-4">
                            <div className="admin-img pb-4 pb-md-0 me-4">
                                <img src={Sb3} alt="image" />
                            </div>
                            <div className="content p-4">
                                <div className="head-content pb-1 d-flex flex-wrap justify-content-between">
                                    <h5>miklos salsa<span>27June 2024 at 5.44pm</span></h5>
                                    <div className="star">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Curabitur vulputate vestibulum Phasellus rhoncus dolor eget viverra pretium.Curabitur vulputate vestibulum Phasellus rhoncus dolor eget viverra pretium.
                                </p>
                            </div>
                        </div>
                        <div className="admin-items d-flex flex-wrap flex-md-nowrap align-items-center pb-4">
                            <div className="admin-img pb-4 pb-md-0 me-4">
                                <img src={Sb2} alt="image" />
                            </div>
                            <div className="content p-4">
                                <div className="head-content pb-1 d-flex flex-wrap justify-content-between">
                                    <h5>Ethan Turner <span>27June 2024 at 5.44pm</span></h5>
                                    <div className="star">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                </div>
                                <p>
                                    Eyeyeyey ipsum dolor sit amet consectetur adipiscing elit. Curabitur vulputate vestibulum Phasellus rhoncus dolor eget viverra pretium.Curabitur vulputate vestibulum Phasellus rhoncus dolor eget viverra pretium.
                                </p>
                            </div>
                        </div>
                        <div className="review-title mt-5 py-15 mb-30">
                            <h4>add a review</h4>
                            <div className="rate-now d-flex align-items-center">
                                <p>Rate this product? *</p>
                                <div className="star">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <div className="review-form">
                          <ContactForm />
                        </div>
                    </div>
                </div>
=======
      {/* TAB 1 – Fichas Técnicas */}
      {activeTab === 'Tab1' && (
        <div>
          {categorias.map((cat, index) => (
            <div key={index} style={{ marginBottom: '2rem' }}>
              <h4 style={sectionTitleStyle}>{cat.nombre}</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                {cat.fichas.map((ficha, i) => (
                  <div key={i} style={fichaStyle}>
                    <span>📄 {ficha.nombre}</span>
                    <a href={ficha.link} target="_blank" rel="noopener noreferrer" style={btnVerStyle}>
                      Ver
                    </a>
                  </div>
                ))}
              </div>
>>>>>>> 9292257f0ad99ee72caafe8c459f3ee1697ada2b
            </div>
          ))}
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a href="/productos" style={btnVerStyle}>→ Explorar productos relacionados</a>
          </div>
        </div>
      )}

      {/* TAB 2 – Normativas */}
      {activeTab === 'Tab2' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {normativas.map((norma, index) => (
              <div key={index} style={{ ...fichaStyle, flexDirection: 'column', alignItems: 'flex-start' }}>
                <strong style={{ fontSize: '1rem' }}>{norma.nombre}</strong>
                <p style={{ margin: '8px 0' }}>{norma.descripcion}</p>
                <a href={norma.link} target="_blank" rel="noopener noreferrer" style={btnVerStyle}>Ver más</a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3 – Certificaciones */}
      {activeTab === 'Tab3' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {certificaciones.map((cert, index) => (
              <div key={index} style={{ ...fichaStyle, flexDirection: 'column', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem' }}>📄</div>
                <strong>{cert.nombre}</strong>
                <p style={{ marginBottom: '8px', fontSize: '0.9rem', color: '#555' }}>{cert.vigencia}</p>
                <a href={cert.link} target="_blank" rel="noopener noreferrer" style={btnVerStyle}>Descargar</a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4 – Tablas Comparativas */}
      {activeTab === 'Tab4' && (
        <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {tablasComparativas.map((tabla, index) => (
              <div key={index} style={fichaStyle}>
                <span>📊 {tabla.nombre}</span>
                <a href={tabla.link} target="_blank" rel="noopener noreferrer" style={btnVerStyle}>Descargar</a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5 – Manuales e Instrucciones */}
      {activeTab === 'Tab5' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {manualesInstrucciones.map((manual, index) => (
              <div key={index} style={fichaStyle}>
                <span>📘 {manual.nombre}</span>
                <a href={manual.link} target="_blank" rel="noopener noreferrer" style={btnVerStyle}>Descargar</a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BLOQUE FINAL DE CONTACTO TÉCNICO */}
      <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #ddd', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', fontWeight: '600' }}>
          ¿Tienes dudas sobre alguna ficha o normativa?
        </h3>
        <p style={{ marginBottom: '1.5rem', color: '#555' }}>
          Nuestro equipo técnico puede ayudarte.
        </p>
        <a href="/asesoria-tecnica" style={{ ...btnVerStyle, fontSize: '1rem' }}>
          → Solicita asesoría técnica
        </a>
      </div>
    </div>
  );
};
<<<<<<< HEAD
export default Alltab;
=======

export default Alltab;

/* 
🟦 SEO RECOMENDADO:
<title>Información Técnica de Equipos de Protección | AP SAFETY</title>
<meta name="description" content="Accede a fichas técnicas, normativas, certificados y manuales oficiales de nuestros productos de protección industrial. Todo validado por nuestro laboratorio acreditado.">
*/
>>>>>>> 9292257f0ad99ee72caafe8c459f3ee1697ada2b
