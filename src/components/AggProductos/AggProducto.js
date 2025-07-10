import React, { useState, useEffect, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useNavigate, useLocation } from 'react-router-dom';

const AggProducto = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    unidadMedida: '',
    clasificacion: '',
    ventajas: '',
    aplicaciones: '',
    tipo: '',
    sellos: [],
    fichaTecnica: null,
    imagenPrincipal: null,
    imagenes: [],
    activo: true,
    fechaCreacion: new Date(),
    ruta: ''
  });

  // Estados para previsualización
  const [imagenPrincipalPreview, setImagenPrincipalPreview] = useState(null);
  const [sellosPreviews, setSellosPreviews] = useState([]);
  const [imagenesPreviews, setImagenesPreviews] = useState([]);
  const [fichaTecnicaNombre, setFichaTecnicaNombre] = useState('');

  const [validator] = useState(new SimpleReactValidator());
  const [, forceUpdate] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = location.state?.isEditing || false;
  const [ventajasPlaceholder, setVentajasPlaceholder] = useState('Ventajas (ligero, alta resistencia, etc)');
  const [aplicacionesPlaceholder, setAplicacionesPlaceholder] = useState('Aplicaciones (cara, interiores, etc)');
  const ventajasIntervalRef = useRef(null);
  const aplicacionesIntervalRef = useRef(null);

  useEffect(() => {
    if (isEditing && location.state?.producto) {
      const producto = location.state.producto;
      
      // Previsualización de imagen principal
      if (producto.imagenPrincipal) {
        setImagenPrincipalPreview(`data:image/jpeg;base64,${producto.imagenPrincipal}`);
      }
      
      // Previsualización de sellos
      if (producto.sellos && producto.sellos.length > 0) {
        const sellosPreviews = producto.sellos.map(sello => `data:image/jpeg;base64,${sello}`);
        setSellosPreviews(sellosPreviews);
      }
      
      // Previsualización de imágenes adicionales
      if (producto.imagenes && producto.imagenes.length > 0) {
        const imagenesPreviews = producto.imagenes.map(imagen => `data:image/jpeg;base64,${imagen}`);
        setImagenesPreviews(imagenesPreviews);
      }
      
      // Nombre de la ficha técnica
      if (producto.fichaTecnica) {
        setFichaTecnicaNombre('Ficha técnica actual');
      }
      
      setFormData({ 
        titulo: producto.titulo,
        descripcion: producto.descripcion,
        unidadMedida: producto.unidadMedida,
        clasificacion: producto.clasificacion,
        ventajas: producto.ventajas,
        aplicaciones: producto.aplicaciones,
        tipo: producto.tipo,
        activo: producto.activo,
        fechaCreacion: new Date(producto.fechaCreacion),
        ruta: producto.ruta || '',
        // Mantenemos los base64 en el estado para enviarlos si no se reemplazan
        sellos: producto.sellos || [],
        fichaTecnica: producto.fichaTecnica || null,
        imagenPrincipal: producto.imagenPrincipal || null,
        imagenes: producto.imagenes || [],
      });
      validator.hideMessages();
      forceUpdate(1);
    }
  }, [location.state, isEditing, validator]);

  useEffect(() => {
    ventajasIntervalRef.current = setInterval(() => {
      setVentajasPlaceholder(prev => 
        prev === 'Ventajas (ligero, alta resistencia, etc)' 
          ? 'Texto separado por comas' 
          : 'Ventajas (ligero, alta resistencia, etc)'
      );
    }, 5000);
    
    aplicacionesIntervalRef.current = setInterval(() => {
      setAplicacionesPlaceholder(prev => 
        prev === 'Aplicaciones (cara, interiores, etc)' 
          ? 'Texto separado por comas' 
          : 'Aplicaciones (cara, interiores, etc)'
      );
    }, 5000);
    
    return () => {
      clearInterval(ventajasIntervalRef.current);
      clearInterval(aplicacionesIntervalRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'fechaCreacion') {
      setFormData({
        ...formData,
        [name]: new Date(value),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    validator.showMessageFor(name);
    forceUpdate(1);
  };

  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files);
    
    if (field === 'fichaTecnica') {
      if (files.length > 0) {
        setFormData({ ...formData, [field]: files[0] });
        setFichaTecnicaNombre(files[0].name);
      }
    } else if (field === 'imagenPrincipal') {
      if (files.length > 0) {
        setFormData({ ...formData, [field]: files[0] });
        // Crear una URL de objeto para previsualización
        const reader = new FileReader();
        reader.onload = () => {
          setImagenPrincipalPreview(reader.result);
        };
        reader.readAsDataURL(files[0]);
      }
    } else if (field === 'sellos') {
      // Evitar duplicados al agregar nuevos sellos
      const newSellos = Array.from(e.target.files);
      const existingSellos = formData.sellos.map(sello => sello.name);
      const filteredSellos = newSellos.filter(sello => !existingSellos.includes(sello.name));
      setFormData({ ...formData, [field]: [...formData.sellos, ...filteredSellos] });
      // Previsualización de sellos
      const previews = filteredSellos.map(file => URL.createObjectURL(file));
      setSellosPreviews(prev => [...prev, ...previews]);
    } else if (field === 'imagenes') {
      // Evitar duplicados al agregar nuevas imágenes
      const newImages = Array.from(e.target.files);
      const existingImages = formData.imagenes.map(imagen => imagen.name);
      const filteredImages = newImages.filter(imagen => !existingImages.includes(imagen.name));
      setFormData({ ...formData, [field]: [...formData.imagenes, ...filteredImages] });
      // Previsualización de imágenes
      const previews = filteredImages.map(file => URL.createObjectURL(file));
      setImagenesPreviews(prev => [...prev, ...previews]);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validator.allValid()) {
      validator.showMessages();
      forceUpdate(1);
      return;
    }
    
    const formDataToSend = new FormData();
    formDataToSend.append('titulo', formData.titulo);
    formDataToSend.append('descripcion', formData.descripcion);
    formDataToSend.append('unidadMedida', formData.unidadMedida);
    formDataToSend.append('clasificacion', formData.clasificacion);
    formDataToSend.append('ventajas', formData.ventajas);
    formDataToSend.append('aplicaciones', formData.aplicaciones);
    formDataToSend.append('tipo', formData.tipo);
    formDataToSend.append('activo', formData.activo ? 'true' : 'false');
    formDataToSend.append('fechaCreacion', formData.fechaCreacion.toISOString());
    
    // Enviamos el modo de edición y la ruta original
    if (isEditing) {
      formDataToSend.append('isEditing', 'true');
      formDataToSend.append('originalRuta', formData.ruta);
    }
    
    if (formData.fichaTecnica) {
      formDataToSend.append('fichaTecnica', formData.fichaTecnica);
    }
    
    if (formData.imagenPrincipal) {
      formDataToSend.append('imagenPrincipal', formData.imagenPrincipal);
    }
    
    // Procesar sellos
    formData.sellos.forEach((sello) => {
      formDataToSend.append('sellos[]', sello);
    });
    
    // Procesar imágenes
    formData.imagenes.forEach((imagen) => {
      formDataToSend.append('imagenes[]', imagen);
    });

    try {
      const response = await fetch('https://apsafety.onrender.com/saveProduct.php', {
        method: 'POST',
        body: formDataToSend
      });
      
      const result = await response.json();
      if (result.success) {
        alert(isEditing ? '¡Producto actualizado exitosamente!' : '¡Producto guardado exitosamente!');
        setFormData({
          titulo: '',
          descripcion: '',
          unidadMedida: '',
          clasificacion: '',
          ventajas: '',
          aplicaciones: '',
          tipo: '',
          sellos: [],
          fichaTecnica: null,
          imagenPrincipal: null,
          imagenes: [],
          activo: true,
          fechaCreacion: new Date(),
          ruta: ''
        });
        // Limpiar previsualizaciones
        setImagenPrincipalPreview(null);
        setSellosPreviews([]);
        setImagenesPreviews([]);
        setFichaTecnicaNombre('');
        navigate('/productos');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      alert('Error al conectar con el servidor PHP');
    }
  };

  const handleCancel = () => {
    navigate('/productos');
  };

  return (
    <form id="contact-form" onSubmit={handleSubmit}>
      <div className="row g-4">
        <div className="col-lg-6">
          <p>Nombre Producto:</p>
          <div className="form-clt">
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Nombre del producto"
            />
            {validator.message('titulo', formData.titulo, 'required')}
          </div>
        </div>

        <div className="col-lg-6">
          <p>Descripción:</p>
          <div className="form-clt">
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción del producto"
            />
            {validator.message('descripcion', formData.descripcion, 'required')}
          </div>
        </div>

        <div className="col-lg-6">
          <p>Unidad de medida:</p>
          <div className="form-clt">
            <select
              name="unidadMedida"
              value={formData.unidadMedida}
              onChange={handleChange}
            >
              <option value="">Selecciona una unidad</option>
              <option value="Metro">Metro</option>
              <option value="Metro cuadrado">Metro cuadrado</option>
              <option value="Metro cúbico">Metro cúbico</option>
              <option value="Kilogramo">Kilogramo</option>
              <option value="Litro">Litro</option>
              <option value="Segundo">Segundo</option>
              <option value="Grado">Grado</option>
            </select>
            {validator.message('unidadMedida', formData.unidadMedida, 'required')}
          </div>
        </div>

        <div className="col-lg-6">
          <p>Clasificación:</p>
          <div className="form-clt">
            <select
              name="clasificacion"
              value={formData.clasificacion}
              onChange={handleChange}
            >
              <option value="">Selecciona clasificación</option>
              <option value="Productos">Productos</option>
              <option value="Protección respiratoria">Protección respiratoria</option>
              <option value="Protección personal">Protección personal</option>
              <option value="Detección de gas">Detección de gas</option>
              <option value="Productos retail">Productos retail</option>
              <option value="Productos POP">Productos POP</option>
            </select>
            {validator.message('clasificacion', formData.clasificacion, 'required')}
          </div>
        </div>

        <div className="col-lg-6">
          <p>Ventajas:</p>
          <div className="form-clt">
            <input
              type="text"
              name="ventajas"
              value={formData.ventajas}
              onChange={handleChange}
              placeholder={ventajasPlaceholder}
              onFocus={() => clearInterval(ventajasIntervalRef.current)}
            />
            {validator.message('ventajas', formData.ventajas, 'required')}
          </div>
        </div>

        <div className="col-lg-6">
          <p>Aplicaciones:</p>
          <div className="form-clt">
            <input
              type="text"
              name="aplicaciones"
              value={formData.aplicaciones}
              onChange={handleChange}
              placeholder={aplicacionesPlaceholder}
              onFocus={() => clearInterval(aplicacionesIntervalRef.current)}
            />
            {validator.message('aplicaciones', formData.aplicaciones, 'required')}
          </div>
        </div>

        <div className="col-lg-6">
          <p>Tipo o subcategoría:</p>
          <div className="form-clt">
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
            >
              <option value="">Selecciona un tipo</option>
              <option value="Tipo1">Tipo1</option>
              <option value="Tipo2">Tipo2</option>
              <option value="Tipo3">Tipo3</option>
              <option value="Tipo4">Tipo4</option>
            </select>
            {validator.message('tipo', formData.tipo, 'required')}
          </div>
        </div>

        <div className="col-lg-6">
          <p>Ficha Técnica (PDF):</p>
          <div className="form-clt">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileChange(e, 'fichaTecnica')}
            />
            {fichaTecnicaNombre && <p className="small text-muted mt-1">{fichaTecnicaNombre}</p>}
            {validator.message('fichaTecnica', formData.fichaTecnica, isEditing ? '' : 'required')}
            {isEditing && <p className="small text-muted mt-1">Seleccione un archivo solo si desea reemplazar la ficha técnica existente.</p>}
          </div>
        </div>

        <div className="col-lg-6">
          <p>Imagen Principal:</p>
          <div className="form-clt">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'imagenPrincipal')}
            />
            {imagenPrincipalPreview && (
              <div className="mt-2">
                <img 
                  src={imagenPrincipalPreview} 
                  alt="Previsualización de imagen principal" 
                  style={{ maxWidth: '100px', maxHeight: '100px' }} 
                />
              </div>
            )}
            {validator.message('imagenPrincipal', formData.imagenPrincipal, isEditing ? '' : 'required')}
            {isEditing && <p className="small text-muted mt-1">Seleccione una imagen solo si desea reemplazar la imagen principal existente.</p>}
          </div>
        </div>

        <div className="col-lg-6">
          <p>Sellos (múltiples):</p>
          <div className="form-clt">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'sellos')}
            />
            <div className="d-flex flex-wrap mt-2">
              {sellosPreviews.map((preview, index) => (
                <img 
                  key={index}
                  src={preview} 
                  alt={`Previsualización de sello ${index}`} 
                  style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '5px', marginBottom: '5px' }} 
                />
              ))}
            </div>
            {validator.message('sellos', formData.sellos, isEditing ? '' : 'required')}
            {isEditing && <p className="small text-muted mt-1">Seleccionar sellos adicionales. Los sellos existentes se mantendrán.</p>}
          </div>
        </div>

        <div className="col-lg-6">
          <p>Imágenes (múltiples):</p>
          <div className="form-clt">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'imagenes')}
            />
            <div className="d-flex flex-wrap mt-2">
              {imagenesPreviews.map((preview, index) => (
                <img 
                  key={index}
                  src={preview} 
                  alt={`Previsualización de imagen ${index}`} 
                  style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '5px', marginBottom: '5px' }} 
                />
              ))}
            </div>
            {validator.message('imagenes', formData.imagenes, isEditing ? '' : 'required')}
            {isEditing && <p className="small text-muted mt-1">Seleccionar imágenes adicionales. Las imágenes existentes se mantendrán.</p>}
          </div>
        </div>

        <div className="col-lg-6">
          <p>Fecha de Creación:</p>
          <div className="form-clt">
            <input
              type="datetime-local"
              name="fechaCreacion"
              value={formData.fechaCreacion ? formData.fechaCreacion.toISOString().slice(0, 16) : ''}
              onChange={handleChange}
            />
            {validator.message('fechaCreacion', formData.fechaCreacion, 'required')}
          </div>
        </div>

        < div className="col-lg-6">
          <p>Estado:</p>
          <div className="form-clt">
            <select
              name="activo"
              value={formData.activo}
              onChange={handleChange}
              className="form-control"
            >
              <option value={true}>Activo</option>
              <option value={false}>No Activo</option>
            </select>
            {validator.message('activo', formData.activo, 'required')}
          </div>
        </div>

        <div className="col-lg-12">
          <div className="d-flex justify-content-between">
            <button
              type="submit"
              className="theme-btn"
            >
              {isEditing ? 'Actualizar Producto' : 'Agregar Producto'}
            </button>
            <button type="button" className="theme-btn" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AggProducto;

