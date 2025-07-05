import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/footer/Footer';
import HeroImg from '../../img/descarga (1).png';
import BannerBajoHero from '../../img/descarga (13).png'; 
import MisionImg from '../../img/descarga (9).png';
import VisionImg from '../../img/descarga (10).png';
import ValoresImg from '../../img/descarga (7).png';
import historiaImg from '../../img/descarga (12).png';

const NosotrosPage = () => {
  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", color: '#000' }}>
      <Navbar />


      <section
        style={{
          backgroundImage: `url(${HeroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '100px 20px',
          color: '#fff',
          textAlign: 'center',
          fontWeight: '500',
          fontSize: '3rem',
          userSelect: 'none',
        }}
      >
        <h1 style={{ margin: 0 }}>Nosotros</h1>
      </section>

      <section
        style={{
          backgroundColor: '#fafafa',
          padding: '3rem 1.5rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            alignItems: 'stretch',
          }}
        >
          <div
            style={{
              flex: '0 0 400px',
              maxWidth: '100%',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              overflow: 'hidden',
            }}
          >
            <img
              src={BannerBajoHero}
              alt="Equipo AP Safety"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          <div
            style={{
              flex: '1 1 0',
              fontSize: '1.125rem',
              lineHeight: '1.6',
              textAlign: 'justify',
              letterSpacing: '0.02em',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              paddingRight: '0.5rem',
              minWidth: 0,
            }}
          >
            <p style={{ margin: 0 }}>
                AP MASCARILLAS comenzó sus actividades en el año 1990, como una alternativa para el consumidor mexicano 
                en lo referente a equipo de protección respiratoria para la industria. Al pasar de los años nuestra 
                empresa ha evolucionado conforme a las exigencias del mercado, siempre ofreciéndoles a todos la atención
                que se merecen, ya que por nuestros clientes y consumidores existimos y seguimos adelante cumpliendo
                nuestros objetivos. La exigencia de la Industria Mexicana al necesitar unificación de proveedores
                nos obliga a expandirnos y abarcar otro tipo de protección Industrial para comercializar. Es en el 
                año 2000 cuando entramos de lleno a comercializar todo lo referente a equipo de protección industrial. 
                Todo lo logrado ha sido posible gracias a los esfuerzos hechos por el señor Arq. Eduardo G. Soto 
                Barranco a quien le debemos reconocimiento y conocimiento de nuestra organización en el ámbito.
                AP MASCARILLAS antepone la calidad en todos sus productos y la atención al cliente como su eje 
                fundamental. Nuestros productos son soluciones para su empresa o negocio y contamos con el equipo 
                de trabajo calificado y dedicado a atenderlo de la mejor manera.
            </p>
          </div>
        </div>
      </section>


      <section 
        style={{ 
          padding: '60px 20px', 
          backgroundColor: '#fff', 
          display: 'flex', 
          justifyContent: 'center' 
        }}
      >
        <div style={{ maxWidth: '1200px', width: '100%', display: 'grid', gap: '4rem' }}>

          <div 
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '2rem', 
              alignItems: 'stretch' 
            }}
          >
            <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
              <img
                src={MisionImg}
                alt="Misión"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
              />
            </div>
            <div 
              style={{
                flex: '2 1 400px',
                backgroundColor: '#eaeaea',
                padding: '2rem',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minWidth: 0,
                color: '#000',
              }}
            >
              <h2 
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#000',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  userSelect: 'none',
                }}
              >
                Misión y Visión
              </h2>
              <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '1rem 0' }} />
              <p style={{ lineHeight: '1.6', color: '#000' }}>
                <strong>MISIÓN:</strong><br />
                Cuidar la salud y seguridad de la población fabricando equipos de protección personal y equipos de seguridad industrial.<br /><br />
                <strong>VISIÓN:</strong><br />
                Ser una marca referente a nivel internacional en equipos de protección personal y equipos de seguridad industrial.
              </p>
            </div>
          </div>

          <div 
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '2rem', 
              alignItems: 'stretch', 
              flexDirection: 'row-reverse' 
            }}
          >
            <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
              <img
                src={VisionImg}
                alt="Política"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
              />
            </div>
            <div 
              style={{
                flex: '2 1 400px',
                backgroundColor: '#eaeaea',
                padding: '2rem',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minWidth: 0,
                color: '#000',
              }}
            >
              <h2 
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#000',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  userSelect: 'none',
                }}
              >
                Política y Objetivos de Calidad
              </h2>
              <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '1rem 0' }} />
              <p style={{ fontSize: '1rem', color: '#000', lineHeight: '1.6', marginBottom: '1rem' }}>
                AP Mascarillas S.A de C.V. nos dedicamos a la fabricación de equipos de protección respiratoria y comercialización 
                de equipo de protección personal, con el desarrollo de nuevos proyectos gracias a nuestras competencias, orientados
                a la mejora continua para mantener la satisfacción de nuestros clientes, cumpliendo con los requisitos legales aplicables.
              </p>
              <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Nuestros 5 objetivos de calidad:</p>
              <ol style={{ paddingLeft: '1.5rem', color: '#000', lineHeight: '1.8' }}>
                <li>Garantizar la calidad y suficiencia de materiales a los clientes.</li>
                <li>Garantizar los niveles en stock de materia prima y producto terminado.</li>
                <li>Mantener Talento Humano.</li>
                <li>Mejoras del SGC.</li>
                <li>Mantener el ingreso en ventas mensuales.</li>
              </ol>
            </div>
          </div>

          {/* Valores */}
          <div 
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '2rem', 
              alignItems: 'stretch' 
            }}
          >
            <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
              <img
                src={ValoresImg}
                alt="Valores"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
              />
            </div>
            <div 
              style={{
                flex: '2 1 400px',
                backgroundColor: '#eaeaea',
                padding: '2rem',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minWidth: 0,
                color: '#000',
              }}
            >
              <h2 
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#000',
                  marginBottom: '1rem',
                  textTransform: 'uppercase',
                  userSelect: 'none',
                }}
              >
                Valores
              </h2>
              <hr style={{ border: 'none', borderTop: '1px solid #ccc', margin: '1rem 0' }} />
              <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.8', fontSize: '1rem', color: '#000' }}>
                <li>✔ Innovación</li>
                <li>✔ Integridad</li>
                <li>✔ Adaptabilidad</li>
                <li>✔ Trabajo en equipo</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      <section
        style={{
          backgroundColor: '#f1f1f1',
          padding: '60px 20px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '300px', margin: '0 auto' }}>
          <a 
            href="https://drive.google.com/file/d/1wa8vCbADtDX_1QTV4CGDYam73scUGrQI/view"  
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'inline-block', textDecoration: 'none' }}
          >
            <img 
              src={historiaImg} 
              alt="Nuestra Historia" 
              style={{ 
                maxWidth: '100%', 
                height: 'auto', 
                cursor: 'pointer',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(9, 9, 9, 0.1)'
              }} 
            />
          </a>
          <p style={{ marginTop: '1rem', fontSize: '1.1rem', color: '#000' }}>
            Descarga nuestro AVISO DE PRIVACIDAD
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NosotrosPage;
