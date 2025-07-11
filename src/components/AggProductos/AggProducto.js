import React, { useState, useEffect, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useNavigate, useLocation } from 'react-router-dom';

const AggProducto = () => {
  // Constantes para validación de tamaños de archivo
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB para imágenes
  const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10 MB para PDF

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

  const [imagenPrincipalPreview, setImagenPrincipalPreview] = useState(null);
  const [sellosPreviews, setSellosPreviews] = useState([]);
  const [imagenesPreviews, setImagenesPreviews] = useState([]);
  const [fichaTecnicaNombre, setFichaTecnicaNombre] = useState('');
  const [existingFiles, setExistingFiles] = useState({
    fichaTecnica: null,
    imagenPrincipal: null,
    sellos: [],
    imagenes: []
  });
  const [ventajasPlaceholder, setVentajasPlaceholder] = useState('Ventajas (ligero, alta resistencia, etc)');
  const [aplicacionesPlaceholder, setAplicacionesPlaceholder] = useState('Aplicaciones (cara, interiores, etc)');

  const [validator] = useState(new SimpleReactValidator());
  const [, forceUpdate] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = location.state?.isEditing || false;
  const productToEdit = location.state?.producto || null;
  const ventajasIntervalRef = useRef(null);
  const aplicacionesIntervalRef = useRef(null);

  useEffect(() => {
    if (isEditing && productToEdit) {
      loadProductData(productToEdit);
    } else {
      // Establecer fecha actual automáticamente solo para nuevos productos
      setFormData(prev => ({
        ...prev,
        fechaCreacion: new Date()
      }));
    }

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
  }, [isEditing, productToEdit]);

  const loadProductData = (producto) => {
    setExistingFiles({
      fichaTecnica: producto.fichaTecnica || null,
      imagenPrincipal: producto.imagenPrincipal || null,
      sellos: producto.sellos || [],
      imagenes: producto.imagenes || []
    });

    if (producto.imagenPrincipal) {
      setImagenPrincipalPreview(`data:image/jpeg;base64,${producto.imagenPrincipal}`);
    }
    
    if (producto.sellos && producto.sellos.length > 0) {
      const sellosPreviews = producto.sellos.map(sello => `data:image/jpeg;base64,${sello}`);
      setSellosPreviews(sellosPreviews);
    }
    
    if (producto.imagenes && producto.imagenes.length > 0) {
      const imagenesPreviews = producto.imagenes.map(imagen => `data:image/jpeg;base64,${imagen}`);
      setImagenesPreviews(imagenesPreviews);
    }
    
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
      sellos: producto.sellos ? Array(producto.sellos.length).fill('existing') : [],
      fichaTecnica: producto.fichaTecnica ? 'existing' : null,
      imagenPrincipal: producto.imagenPrincipal ? 'existing' : null,
      imagenes: producto.imagenes ? Array(producto.imagenes.length).fill('existing') : []
    });
  };

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
    if (files.length === 0) return;

    // Validación de tamaños de archivo
    if (field === 'fichaTecnica') {
      if (files[0].size > MAX_PDF_SIZE) {
        alert('El tamaño máximo para la ficha técnica es de 10 MB');
        return;
      }
      setFormData({ ...formData, [field]: files[0] });
      setFichaTecnicaNombre(files[0].name);
    } 
    else if (field === 'imagenPrincipal') {
      if (files[0].size > MAX_IMAGE_SIZE) {
        alert('El tamaño máximo para la imagen principal es de 5 MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImagenPrincipalPreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
      setFormData({ ...formData, [field]: files[0] });
    } 
    else if (field === 'sellos') {
      const oversized = files.some(file => file.size > MAX_IMAGE_SIZE);
      if (oversized) {
        alert('El tamaño máximo para los sellos es de 5 MB cada uno');
        return;
      }
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setSellosPreviews(prev => [...prev, ...newPreviews]);
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], ...files]
      }));
    } 
    else if (field === 'imagenes') {
      const oversized = files.some(file => file.size > MAX_IMAGE_SIZE);
      if (oversized) {
        alert('El tamaño máximo para las imágenes es de 5 MB cada una');
        return;
      }
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagenesPreviews(prev => [...prev, ...newPreviews]);
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], ...files]
      }));
    }
  };

  const removeFile = (index, field, previewField, setPreviewField) => {
    if (isEditing && formData[field][index] === 'existing') {
      const updatedFiles = [...formData[field]];
      updatedFiles[index] = 'to_delete';
      setFormData({ ...formData, [field]: updatedFiles });

      const updatedPreviews = [...previewField];
      updatedPreviews.splice(index, 1);
      setPreviewField(updatedPreviews);
    } else {
      const updatedFiles = [...formData[field]];
      updatedFiles.splice(index, 1);
      setFormData({ ...formData, [field]: updatedFiles });

      if (previewField[index] && previewField[index].startsWith('blob:')) {
        URL.revokeObjectURL(previewField[index]);
      }
      const updatedPreviews = [...previewField];
      updatedPreviews.splice(index, 1);
      setPreviewField(updatedPreviews);
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
    
    // Campos básicos
    Object.keys(formData).forEach(key => {
      if (!['sellos', 'imagenes', 'fichaTecnica', 'imagenPrincipal'].includes(key)) {
        formDataToSend.append(key, formData[key] instanceof Date ? 
          formData[key].toISOString() : 
          formData[key]);
      }
    });
    
    // Manejo especial para edición
    if (isEditing) {
      formDataToSend.append('isEditing', 'true');
      formDataToSend.append('originalRuta', formData.ruta);
      
      // Manejar archivos existentes
      if (formData.fichaTecnica === 'to_delete') {
        formDataToSend.append('delete_fichaTecnica', 'true');
      } else if (formData.fichaTecnica !== 'existing' && formData.fichaTecnica !== null) {
        formDataToSend.append('fichaTecnica', formData.fichaTecnica);
      } else if (formData.fichaTecnica === 'existing') {
        formDataToSend.append('keep_fichaTecnica', 'true');
      }
      
      if (formData.imagenPrincipal === 'to_delete') {
        formDataToSend.append('delete_imagenPrincipal', 'true');
      } else if (formData.imagenPrincipal !== 'existing' && formData.imagenPrincipal !== null) {
        formDataToSend.append('imagenPrincipal', formData.imagenPrincipal);
      } else if (formData.imagenPrincipal === 'existing') {
        formDataToSend.append('keep_imagenPrincipal', 'true');
      }
      
      // Procesar sellos
      formData.sellos.forEach((sello, index) => {
        if (sello === 'to_delete') {
          formDataToSend.append('delete_sellos[]', index.toString());
        } else if (sello !== 'existing') {
          formDataToSend.append('sellos[]', sello);
        }
      });
      
      // Procesar imágenes
      formData.imagenes.forEach((imagen, index) => {
        if (imagen === 'to_delete') {
          formDataToSend.append('delete_imagenes[]', index.toString());
        } else if (imagen !== 'existing') {
          formDataToSend.append('imagenes[]', imagen);
        }
      });
    } else {
      // Lógica para nuevo producto
      if (formData.fichaTecnica) {
        formDataToSend.append('fichaTecnica', formData.fichaTecnica);
      }
      
      if (formData.imagenPrincipal) {
        formDataToSend.append('imagenPrincipal', formData.imagenPrincipal);
      }
      
      formData.sellos.forEach(sello => {
        formDataToSend.append('sellos[]', sello);
      });
      
      formData.imagenes.forEach(imagen => {
        formDataToSend.append('imagenes[]', imagen);
      });
    }

    try {
      const response = await fetch('https://apsafety.onrender.com/saveProductToGitHub.php', {
        method: 'POST',
        body: formDataToSend
      });
      
      const result = await response.json();
      if (result.success) {
        alert(isEditing ? '¡Producto actualizado exitosamente!' : '¡Producto guardado exitosamente!');
        resetForm();
        navigate('/productos');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      alert('Error al conectar con el servidor');
    }
  };

  const resetForm = () => {
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
    setImagenPrincipalPreview(null);
    setSellosPreviews([]);
    setImagenesPreviews([]);
    setFichaTecnicaNombre('');
    setExistingFiles({
      fichaTecnica: null,
      imagenPrincipal: null,
      sellos: [],
      imagenes: []
    });
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
          <p>Ficha Técnica (PDF - Máx. 10 MB):</p>
          <div className="form-clt">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileChange(e, 'fichaTecnica')}
            />
            {fichaTecnicaNombre && <p className="small text-muted mt-1">{fichaTecnicaNombre}</p>}
            {validator.message('fichaTecnica', formData.fichaTecnica, isEditing ? '' : 'required')}
            {isEditing && formData.fichaTecnica === 'existing' && (
              <button 
                type="button" 
                className="btn btn-sm btn-outline-danger mt-1"
                onClick={() => removeFile(0, 'fichaTecnica', [fichaTecnicaNombre], setFichaTecnicaNombre)}
              >
                Eliminar ficha técnica actual
              </button>
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <p>Imagen Principal (Máx. 5 MB):</p>
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
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger d-block mt-1"
                  onClick={() => {
                    if (imagenPrincipalPreview.startsWith('blob:')) {
                      URL.revokeObjectURL(imagenPrincipalPreview);
                    }
                    setImagenPrincipalPreview(null);
                    setFormData(prev => ({
                      ...prev,
                      imagenPrincipal: isEditing && prev.imagenPrincipal === 'existing' ? 'to_delete' : null
                    }));
                  }}
                >
                  Eliminar imagen
                </button>
              </div>
            )}
            {validator.message('imagenPrincipal', formData.imagenPrincipal, isEditing ? '' : 'required')}
          </div>
        </div>

        <div className="col-lg-6">
          <p>Sellos (múltiples - Máx. 5 MB c/u):</p>
          <div className="form-clt">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'sellos')}
            />
            <div className="d-flex flex-wrap mt-2">
              {sellosPreviews.map((preview, index) => (
                <div key={index} className="position-relative me-2 mb-2">
                  <img 
                    src={preview} 
                    alt={`Previsualización de sello ${index}`} 
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 p-0"
                    style={{ width: '20px', height: '20px', fontSize: '10px' }}
                    onClick={() => removeFile(index, 'sellos', sellosPreviews, setSellosPreviews)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            {validator.message('sellos', formData.sellos, isEditing ? '' : 'required')}
          </div>
        </div>

        <div className="col-lg-6">
          <p>Imágenes (múltiples - Máx. 5 MB c/u):</p>
          <div className="form-clt">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'imagenes')}
            />
            <div className="d-flex flex-wrap mt-2">
              {imagenesPreviews.map((preview, index) => (
                <div key={index} className="position-relative me-2 mb-2">
                  <img 
                    src={preview} 
                    alt={`Previsualización de imagen ${index}`} 
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 p-0"
                    style={{ width: '20px', height: '20px', fontSize: '10px' }}
                    onClick={() => removeFile(index, 'imagenes', imagenesPreviews, setImagenesPreviews)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            {validator.message('imagenes', formData.imagenes, isEditing ? '' : 'required')}
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
              disabled={!isEditing} // Deshabilitar para nuevos productos (se establece automáticamente)
            />
            {validator.message('fechaCreacion', formData.fechaCreacion, 'required')}
          </div>
        </div>

        <div className="col-lg-6">
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