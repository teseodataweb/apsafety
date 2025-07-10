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

  const [imagenPrincipalPreview, setImagenPrincipalPreview] = useState(null);
  const [sellosPreviews, setSellosPreviews] = useState([]);
  const [imagenesPreviews, setImagenesPreviews] = useState([]);
  const [fichaTecnicaNombre, setFichaTecnicaNombre] = useState('');
  
  const [validator] = useState(new SimpleReactValidator({
    autoForceUpdate: this,
    validators: {
      requiredFile: {
        message: 'El archivo es requerido.',
        rule: (val, params, validator) => {
          return val !== null && val !== undefined;
        }
      }
    }
  }));
  
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = location.state?.isEditing || false;
  const productToEdit = location.state?.producto || null;
  const fileInputRefs = useRef({
    fichaTecnica: null,
    imagenPrincipal: null,
    sellos: null,
    imagenes: null
  });

  useEffect(() => {
    if (isEditing && productToEdit) {
      loadProductData(productToEdit);
    }
    
    return () => {
      // Limpiar URLs de objetos para evitar fugas de memoria
      if (imagenPrincipalPreview && imagenPrincipalPreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagenPrincipalPreview);
      }
      sellosPreviews.forEach(preview => {
        if (preview.startsWith('blob:')) URL.revokeObjectURL(preview);
      });
      imagenesPreviews.forEach(preview => {
        if (preview.startsWith('blob:')) URL.revokeObjectURL(preview);
      });
    };
  }, []);

  const loadProductData = (producto) => {
    if (producto.imagenPrincipal) {
      setImagenPrincipalPreview(`data:image/jpeg;base64,${producto.imagenPrincipal}`);
    }
    
    if (producto.sellos && producto.sellos.length > 0) {
      setSellosPreviews(producto.sellos.map(sello => `data:image/jpeg;base64,${sello}`));
    }
    
    if (producto.imagenes && producto.imagenes.length > 0) {
      setImagenesPreviews(producto.imagenes.map(imagen => `data:image/jpeg;base64,${imagen}`));
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
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    validator.showMessageFor(name);
  };

  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (field === 'fichaTecnica') {
      setFormData(prev => ({ ...prev, [field]: files[0] }));
      setFichaTecnicaNombre(files[0].name);
    } 
    else if (field === 'imagenPrincipal') {
      const reader = new FileReader();
      reader.onload = () => {
        if (imagenPrincipalPreview && imagenPrincipalPreview.startsWith('blob:')) {
          URL.revokeObjectURL(imagenPrincipalPreview);
        }
        setImagenPrincipalPreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
      setFormData(prev => ({ ...prev, [field]: files[0] }));
    } 
    else if (field === 'sellos' || field === 'imagenes') {
      const newPreviews = files.map(file => URL.createObjectURL(file));
      const updatedPreviews = [...(field === 'sellos' ? sellosPreviews : imagenesPreviews), ...newPreviews];
      
      if (field === 'sellos') {
        setSellosPreviews(updatedPreviews);
      } else {
        setImagenesPreviews(updatedPreviews);
      }
      
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], ...files]
      }));
    }
  };

  const removeFile = (index, field, previewField, setPreviewField) => {
    const updatedFiles = [...formData[field]];
    const updatedPreviews = [...previewField];
    
    if (isEditing && updatedFiles[index] === 'existing') {
      updatedFiles[index] = 'to_delete';
    } else {
      if (updatedPreviews[index] && updatedPreviews[index].startsWith('blob:')) {
        URL.revokeObjectURL(updatedPreviews[index]);
      }
      updatedFiles.splice(index, 1);
    }
    
    updatedPreviews.splice(index, 1);
    
    setFormData(prev => ({ ...prev, [field]: updatedFiles }));
    setPreviewField(updatedPreviews);
    
    if (updatedFiles.length === 0 && fileInputRefs.current[field]) {
      fileInputRefs.current[field].value = '';
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (!validator.allValid()) {
      validator.showMessages();
      return;
    }
    
    const formDataToSend = new FormData();
    
    // Campos básicos
    Object.keys(formData).forEach(key => {
      if (!['sellos', 'imagenes', 'fichaTecnica', 'imagenPrincipal'].includes(key)) {
        const value = formData[key];
        formDataToSend.append(key, value instanceof Date ? value.toISOString() : value);
      }
    });
    
    // Manejo especial para edición
    if (isEditing) {
      formDataToSend.append('isEditing', 'true');
      formDataToSend.append('rutaOriginal', formData.ruta);
      
      // Manejar archivos existentes
      if (formData.fichaTecnica === 'to_delete') {
        formDataToSend.append('delete_fichaTecnica', 'true');
      } else if (formData.fichaTecnica !== 'existing' && formData.fichaTecnica !== null) {
        formDataToSend.append('fichaTecnica', formData.fichaTecnica);
      }
      
      if (formData.imagenPrincipal === 'to_delete') {
        formDataToSend.append('delete_imagenPrincipal', 'true');
      } else if (formData.imagenPrincipal !== 'existing' && formData.imagenPrincipal !== null) {
        formDataToSend.append('imagenPrincipal', formData.imagenPrincipal);
      }
      
      // Procesar sellos e imágenes
      ['sellos', 'imagenes'].forEach(field => {
        formData[field].forEach((file, index) => {
          if (file === 'to_delete') {
            formDataToSend.append(`delete_${field}[]`, index.toString());
          } else if (file !== 'existing') {
            formDataToSend.append(`${field}[]`, file);
          }
        });
      });
    } else {
      // Lógica para nuevo producto
      if (formData.fichaTecnica) formDataToSend.append('fichaTecnica', formData.fichaTecnica);
      if (formData.imagenPrincipal) formDataToSend.append('imagenPrincipal', formData.imagenPrincipal);
      
      formData.sellos.forEach(sello => formDataToSend.append('sellos[]', sello));
      formData.imagenes.forEach(imagen => formDataToSend.append('imagenes[]', imagen));
    }

    try {
      const response = await fetch('https://apsafety.onrender.com/saveProduct.php', {
        method: 'POST',
        body: formDataToSend
      });
      
      const result = await response.json();
      if (result.success) {
        alert(isEditing ? '¡Producto actualizado exitosamente!' : '¡Producto creado exitosamente!');
        navigate('/productos');
      } else {
        throw new Error(result.message || 'Error al guardar el producto');
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      alert(error.message || 'Error al conectar con el servidor');
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
              placeholder="Ventajas del producto"
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
              placeholder="Aplicaciones del producto"
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
              ref={el => fileInputRefs.current.fichaTecnica = el}
            />
            {fichaTecnicaNombre && <p className="small text-muted mt-1">{fichaTecnicaNombre}</p>}
            {validator.message('fichaTecnica', formData.fichaTecnica, isEditing ? '' : 'requiredFile')}
            {isEditing && formData.fichaTecnica === 'existing' && (
              <button 
                type="button" 
                className="btn btn-sm btn-outline-danger mt-1"
                onClick={() => {
                  setFichaTecnicaNombre('');
                  setFormData(prev => ({ ...prev, fichaTecnica: 'to_delete' }));
                  if (fileInputRefs.current.fichaTecnica) {
                    fileInputRefs.current.fichaTecnica.value = '';
                  }
                }}
              >
                Eliminar ficha técnica actual
              </button>
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <p>Imagen Principal:</p>
          <div className="form-clt">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'imagenPrincipal')}
              ref={el => fileInputRefs.current.imagenPrincipal = el}
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
                    if (fileInputRefs.current.imagenPrincipal) {
                      fileInputRefs.current.imagenPrincipal.value = '';
                    }
                  }}
                >
                  Eliminar imagen
                </button>
              </div>
            )}
            {validator.message('imagenPrincipal', formData.imagenPrincipal, isEditing ? '' : 'requiredFile')}
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
              ref={el => fileInputRefs.current.sellos = el}
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
            {validator.message('sellos', formData.sellos, isEditing ? '' : 'requiredFile')}
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
              ref={el => fileInputRefs.current.imagenes = el}
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
            {validator.message('imagenes', formData.imagenes, isEditing ? '' : 'requiredFile')}
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