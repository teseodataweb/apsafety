import React, { useState } from "react";

const categorias = [
  {
    nombre: " Tutoriales de Uso y Mantenimiento",
    descripcion:
      "Videos orientados a capacitar a usuarios finales en el uso correcto del EPP.",
    videos: [
      {
        titulo: "Uso de media máscara y cara completa / Develop Plus 100",
        url: "https://youtu.be/G8qk2szyItU",
        keywords: ["mascarillas", "respiradores", "media máscara", "develop plus"],
      },
      {
        titulo: "DEVELOP PLUS 100: mascarilla media cara, cara completa, cartuchos y filtros",
        url: "https://youtu.be/x4f0ojPvQCA",
        keywords: ["mascarillas", "develop plus", "cartuchos", "filtros"],
      },
      {
        titulo: "Desarme, mantenimiento y armado de mascarilla AP DP-1601 y DP-1602",
        url: "https://youtu.be/0F-Nw6AXf1o",
        keywords: ["mascarillas", "mantenimiento", "desarme", "AP DP-1601", "DP-1602"],
      },
      {
        titulo: "Desarme, mantenimiento y armado de mascarillas DP01 y DP02 media cara",
        url: "https://youtu.be/6t5ObK_81Hs",
        keywords: ["mascarillas", "mantenimiento", "desarme", "DP01", "DP02"],
      },
      {
        titulo: "Mantenimiento de equipos Develop Plus 200 Media Cara AP 680 y AP S600",
        url: "https://youtu.be/qucQnYKMTzM",
        keywords: ["mantenimiento", "develop plus", "media cara", "AP 680", "AP S600"],
      },
      {
        titulo: "MANTENIMIENTO CARA COMPLETA / PARTE 1",
        url: "https://youtu.be/nZP2B8EcDPo",
        keywords: ["mantenimiento", "cara completa"],
      },
      {
        titulo: "Te presentamos nuestros respiradores desechables y sus usos",
        url: "https://youtu.be/I79FhebhHzM",
        keywords: ["respiradores", "desechables", "usos"],
      },
      {
        titulo: "Mascarillas desechables contra partículas no tóxicas (AP Z5, Z3 y Mini)",
        url: "https://youtu.be/8jujTS9M9vE",
        keywords: ["mascarillas", "desechables", "partículas no tóxicas", "AP Z5", "Z3", "Mini"],
      },
      {
        titulo: "Mascarillas desechables serie Z y serie M",
        url: "https://youtu.be/87dmz9Szzpg",
        keywords: ["mascarillas", "desechables", "serie Z", "serie M"],
      },
    ],
  },
  {
    nombre: " Laboratorio y Pruebas de Validación",
    descripcion:
      "Evidencia técnica y procedimientos internos realizados en nuestro laboratorio acreditado.",
    videos: [
      {
        titulo: "TEASER AP TESTING LAB",
        url: "https://youtu.be/d89FvbG1bfU",
        keywords: ["laboratorio", "pruebas", "testing"],
      },
      {
        titulo: "Cámara de preacondicionamiento",
        url: "https://youtu.be/-paqvItAnP8",
        keywords: ["laboratorio", "preacondicionamiento", "cámara"],
      },
      {
        titulo: "Mesa vibratoria para pruebas técnicas",
        url: "https://youtu.be/AhskAfFNtUw",
        keywords: ["laboratorio", "mesa vibratoria", "pruebas técnicas"],
      },
      {
        titulo: "Pruebas de laboratorio para respiradores desechables",
        url: "https://youtu.be/2XTs6uNpFTc",
        keywords: ["laboratorio", "pruebas", "respiradores", "desechables"],
      },
      {
        titulo: "LA ÚNICA PRUEBA REAL A MASCARILLAS N95",
        url: "https://youtu.be/MsEPAIP0m9I",
        keywords: ["prueba", "mascarillas", "N95"],
      },
      {
        titulo: "⚠️ COMPROBADO ⚠️ Cubrebocas chinos KN-95 no protegen",
        url: "https://youtu.be/7A8IOhcVbUo",
        keywords: ["cubrebocas", "KN-95", "protección", "comprobado"],
      },
      {
        titulo: "AP TESTING LAB (Resumen)",
        url: "https://youtu.be/fTE-7K2k83o",
        keywords: ["laboratorio", "testing", "resumen"],
      },
    ],
  },
  {
    nombre: " Equipos de Protección Individual (EPP)",
    descripcion: "Presentaciones de nuestras soluciones en respiración, visual y auditiva.",
    videos: [
      {
        titulo: "Lentes protectores, ¡lo mejor en el mercado!",
        url: "https://youtu.be/2KVx_Ze7DVc",
        keywords: ["lentes", "protección visual", "EPP"],
      },
      {
        titulo: "Equipo de protección de material particulado",
        url: "https://youtu.be/zk_TmqrTgaY",
        keywords: ["protección", "material particulado", "EPP"],
      },
      {
        titulo: "Equipo de resistencia a la inhalación y exhalación / Mascarillas EPP",
        url: "https://youtu.be/ArclIBlPh1k",
        keywords: ["mascarillas", "resistencia", "inhalación", "exhalación", "EPP"],
      },
      {
        titulo: "Conoce nuestras mascarillas de protección respiratoria",
        url: "https://youtu.be/EF-iWs7xDUU",
        keywords: ["mascarillas", "protección respiratoria", ],
      },
      {
        titulo: "PRODUCTOS 100% MEXICANOS",
        url: "",
        keywords: ["productos", "mexicanos"],
      },
      {
        titulo: "Les presentamos nuestra línea de mascarillas Develop Plus 200",
        url: "https://youtu.be/vvWaFEK3BiY",
        keywords: ["mascarillas", "develop plus", "línea"],
      },
      {
        titulo: "Mascarillas desechables",
        url: "https://youtu.be/8wh2_TLv2pg",
        keywords: ["mascarillas", "desechables"],
      },
      {
        titulo: "Bienvenidos – Nuestras 6 líneas de producto",
        url: "https://youtu.be/Wz4Yc96pR4o",
        keywords: ["productos", "líneas"],
      },
    ],
  },
  {
    nombre: " Línea Contra Incendios – Ironguy",
    descripcion:
      "Demostraciones y pruebas reales del equipo Ironguy para brigadas, bomberos y entornos extremos.",
    videos: [
      {
        titulo: "Equipo de Respiración Autónoma Ironguy (uso industrial y contra incendios)",
        url: "https://youtu.be/xge2qTBJ6iA",
        keywords: ["ironguy", "respiración autónoma", "incendios", "brigadas"],
      },
      {
        titulo: "Equipo de Respiración de Circuito Cerrado Ironguy",
        url: "https://youtu.be/6PsL35HdXPg",
        keywords: ["ironguy", "circuito cerrado", "respiración"],
      },
      {
        titulo: "TRAJE DE BOMBERO PROFESIONAL",
        url: "https://youtu.be/qYiQohC6M98",
        keywords: ["traje", "bombero", "profesional"],
      },
      {
        titulo: "TRAJE DE BOMBERO PARA BRIGADA",
        url: "https://youtu.be/mTP7NG5zPc4",
        keywords: ["traje", "bombero", "brigada"],
      },
      {
        titulo: "TRAJE ENCAPSULADO 1C / TRAJE TIPO QUÍMICA",
        url: "https://youtu.be/-GVRfzXB8Ks",
        keywords: ["traje", "encapsulado", "química"],
      },
      {
        titulo: "SALVA VIDAS / Instrucciones de uso SCBA Ironguy",
        url: "https://youtu.be/CfDtv-UoYy8",
        keywords: ["salva vidas", "SCBA", "instrucciones", "ironguy"],
      },
      {
        titulo: "ERA contra incendios Ironguy",
        url: "https://youtu.be/xwo230zeBkI",
        keywords: ["era", "incendios", "ironguy"],
      },
      {
        titulo: "Comp 1 convertido – Equipo de respiración autónoma ERA",
        url: "https://youtu.be/poTlnkzwuXA",
        keywords: ["respiración autónoma", "era", "comp 1"],
      },
      {
        titulo: "Uso de SCBA o ERA Firefighting #Ironguy",
        url: "https://youtu.be/vtSbz2emCEY",
        keywords: ["SCBA", "era", "firefighting", "ironguy"],
      },
      {
        titulo: "Detector multigas Ironguy 4",
        url: "https://youtu.be/wYcy4oOLAe4",
        keywords: ["detector", "multigas", "ironguy"],
      },
      {
        titulo: "DETECTOR DE GASES IRON GUY",
        url: "https://youtu.be/d0HXGGTpZ0E",
        keywords: ["detector", "gases", "ironguy"],
      },
    ],
  },
  {
    nombre: " Testimonios y Comunidad",
    descripcion: "Historias reales de confianza, experiencia y protección efectiva.",
    videos: [
      {
        titulo: "Testimonio mascarilla Z6 N95",
        url: "https://youtu.be/LqP6L73PN48",
        keywords: ["testimonio", "mascarilla", "Z6", "N95"],
      },
      {
        titulo: "Testimonio Martina",
        url: "https://youtu.be/qTFptWUM_yc",
        keywords: ["testimonio", "martina"],
      },
      {
        titulo: "TESTIMONIO MAGDALENA RENDÓN",
        url: "https://youtu.be/XC6GBhxhd7E",
        keywords: ["testimonio", "magdalena", "rendón"],
      },
      {
        titulo: "Atención especializada en tiempos de COVID-19",
        url: "https://youtu.be/ObASukW26eQ",
        keywords: ["atención", "covid-19"],
      },
      {
        titulo: "¡Te esperamos! AP MASCARILLAS al cuidado de tu protección respiratoria",
        url: "https://youtu.be/SKBdonGQlIw",
        keywords: ["AP mascarillas", "protección", "respiratoria"],
      },
      {
        titulo: "AP MASCARILLAS Y EL CORONAVIRUS",
        url: "https://youtu.be/MFE5iLefmrk",
        keywords: ["AP mascarillas", "coronavirus"],
      },
    ],
  },
  {
    nombre: "Institucional y Celebraciones",
    descripcion: "Conoce más sobre nuestra historia, valores y visión a futuro.",
    videos: [
      {
        titulo: "VIDEO CORPORATIVO AP MASCARILLAS (Buscamos Distribuidores)",
        url: "https://youtu.be/qqGjQ1rnUuI",
        keywords: ["corporativo", "distribuidores"],
      },
      {
        titulo: "GRACIAS POR ESTOS 30 AÑOS DE AP MASCARILLAS",
        url: "https://youtu.be/GvmI-hrHpxs",
        keywords: ["30 años", "agradecimiento"],
      },
      {
        titulo: "SOMOS AP MASCARILLAS #30AÑOS",
        url: "https://youtu.be/f2rJXhhIYKE",
        keywords: ["30 años", "AP mascarillas"],
      },
      {
        titulo: "#30AÑOS – Llegando a muchos rincones de toda la República Mexicana",
        url: "https://youtu.be/vbEtf9fgSR8",
        keywords: ["30 años", "república mexicana"],
      },
    ],
  },
];

const VideoCategorias = () => {
  const [busqueda, setBusqueda] = useState("");

  const filtrarVideos = (videos) => {
    if (!busqueda.trim()) return videos;
    const busquedaLower = busqueda.toLowerCase();
    return videos.filter((video) => {
      const enTitulo = video.titulo.toLowerCase().includes(busquedaLower);
      const enKeywords = video.keywords?.some((kw) =>
        kw.toLowerCase().includes(busquedaLower)
      );
      return enTitulo || enKeywords;
    });
  };

  return (
    <section style={{ backgroundColor: "#f5f7fb", padding: "3rem 1rem" }}>
      <div className="container">
        <div className="text-center mb-5">
          <p className="lead mx-auto" style={{ maxWidth: "700px" }}>
            Explora nuestros videos organizados por categoría para conocer el uso,
            mantenimiento y pruebas reales de nuestros productos de protección industrial.
          </p>
          <div className="alert alert-info mt-3" role="alert">
            <strong>¿Eres distribuidor?</strong> Mira cómo funciona cada producto antes de venderlo.
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-6 mx-auto">
            <input
              type="text"
              placeholder="Buscar por palabra clave o título..."
              className="form-control"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>

        {categorias.map((cat, index) => {
          const videosFiltrados = filtrarVideos(cat.videos);
          if (videosFiltrados.length === 0) return null;

          return (
            <div
              key={index}
              className="py-5"
              style={{ borderTop: "1px solid #dee2e6", marginTop: "3rem" }}
            >
              <h2
                className="text-center fw-bold mb-3"
                style={{ fontSize: "2rem", paddingTop: "1rem" }}
              >
                {cat.nombre}
              </h2>
              <p
                className="text-center text-muted mb-5"
                style={{ maxWidth: "700px", margin: "0 auto" }}
              >
                {cat.descripcion}
              </p>

              <div className="row g-4">
                {videosFiltrados.map((video, i) => (
                  <div className="col-12 col-md-6" key={i}>
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="ratio ratio-16x9">
                        <iframe
                          src={video.url.replace("youtu.be", "www.youtube.com/embed")}
                          title={video.titulo}
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                      <div className="card-body">
                        <h6 className="card-title">{video.titulo}</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default VideoCategorias;
