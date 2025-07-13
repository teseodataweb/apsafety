import React, { useState, useEffect, useRef, useCallback } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const AggProducto = ({ productToEdit, isEditing: propIsEditing }) => {
  // Constantes
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
  const MAX_PDF_SIZE = 10 * 1024 * 1024; // 10 MB
  const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
  const VALID_PDF_TYPE = 'application/pdf';

  // Estados
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

  const [previews, setPreviews] = useState({
    imagenPrincipal: null,
    sellos: [],
    imagenes: []
  });

  const [fileNames, setFileNames] = useState({
    fichaTecnica: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationKey, setValidationKey] = useState(0);
  const [placeholders, setPlaceholders] = useState({
    ventajas: 'Ventajas (ligero, alta resistencia, etc)',
    aplicaciones: 'Aplicaciones (cara, interiores, etc)'
  });

  // Refs y hooks
  const validator = useRef(new SimpleReactValidator({
    autoForceUpdate: { forceUpdate: () => setValidationKey(prev => prev + 1) }
  })).current;

  const intervalRefs = useRef({
    ventajas: null,
    aplicaciones: null
  }).current;

  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = propIsEditing || location.state?.isEditing || false;
  const editingProduct = productToEdit || location.state?.producto || null;

  // Efectos
  useEffect(() => {
    if (isEditing && editingProduct) {
      loadProductData(editingProduct);
    }

    // Animación placeholders
    intervalRefs.ventajas = setInterval(() => {
      setPlaceholders(prev => ({
        ...prev,
        ventajas: prev.ventajas === 'Ventajas (ligero, alta resistencia, etc)' 
          ? 'Texto separado por comas' 
          : 'Ventajas (ligero, alta resistencia, etc)'
      }));
    }, 5000);

    intervalRefs.aplicaciones = setInterval(() => {
      setPlaceholders(prev => ({
        ...prev,
        aplicaciones: prev.aplicaciones === 'Aplicaciones (cara, interiores, etc)' 
          ? 'Texto separado por comas' 
          : 'Aplicaciones (cara, interiores, etc)'
      }));
    }, 5000);

    return () => {
      clearInterval(intervalRefs.ventajas);
      clearInterval(intervalRefs.aplicaciones);
      // Limpiar URLs de objetos
      Object.values(previews).flat().forEach(preview => {
        if (preview?.startsWith('blob:')) URL.revokeObjectURL(preview);
      });
    };
  }, [isEditing, editingProduct]);

  // Cargar datos del producto a editar
  const loadProductData = useCallback((producto) => {
    const newPreviews = {
      imagenPrincipal: producto.imagenPrincipal 
        ? `data:image/jpeg;base64,${producto.imagenPrincipal}` 
        : null,
      sellos: producto.sellos?.map(sello => `data:image/jpeg;base64,${sello}`) || [],
      imagenes: producto.imagenes?.map(img => `data:image/jpeg;base64,${img}`) || []
    };

    setPreviews(newPreviews);
    setFileNames({
      fichaTecnica: producto.fichaTecnica ? 'Ficha técnica actual' : ''
    });

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
  }, []);

  // Manejadores de eventos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'fechaCreacion' ? new Date(value) : value
    }));
    validator.showMessageFor(name);
  };

  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Validaciones
    if (field === 'fichaTecnica') {
      if (files[0].size > MAX_PDF_SIZE) {
        alert('El tamaño máximo para la ficha técnica es de 10 MB');
        return;
      }
      if (files[0].type !== VALID_PDF_TYPE) {
        alert('Solo se permiten archivos PDF para la ficha técnica');
        return;
      }
      setFileNames(prev => ({ ...prev, fichaTecnica: files[0].name }));
      setFormData(prev => ({ ...prev, [field]: files[0] }));
    } 
    else {
      const isImageField = ['imagenPrincipal', 'sellos', 'imagenes'].includes(field);
      const maxSize = isImageField ? MAX_IMAGE_SIZE : MAX_PDF_SIZE;
      
      const invalidFiles = files.filter(file => 
        file.size > maxSize || 
        (isImageField && !VALID_IMAGE_TYPES.includes(file.type))
      );

      if (invalidFiles.length > 0) {
        alert(`Algunos archivos no cumplen con los requisitos:
          - Tamaño máximo: ${maxSize / (1024 * 1024)}MB
          - Formatos permitidos: ${isImageField ? 'JPEG, PNG, GIF' : 'PDF'}`);
        return;
      }

      if (field === 'imagenPrincipal') {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviews(prev => ({ ...prev, imagenPrincipal: reader.result }));
        };
        reader.readAsDataURL(files[0]);
        setFormData(prev => ({ ...prev, [field]: files[0] }));
      } 
      else {
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(prev => ({
          ...prev,
          [field]: [...prev[field], ...newPreviews]
        }));
        setFormData(prev => ({
          ...prev,
          [field]: [...prev[field], ...files]
        }));
      }
    }
  };

  const removeFile = (index, field) => {
    // Liberar URL de objeto si existe
    if (previews[field]?.[index]?.startsWith('blob:')) {
      URL.revokeObjectURL(previews[field][index]);
    }

    setPreviews(prev => {
      const newPreviews = [...prev[field]];
      newPreviews.splice(index, 1);
      return { ...prev, [field]: newPreviews };
    });

    setFormData(prev => {
      const newFiles = [...prev[field]];
      newFiles.splice(index, 1);
      return { ...prev, [field]: newFiles };
    });

    if (field === 'fichaTecnica') {
      setFileNames(prev => ({ ...prev, fichaTecnica: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validator.allValid() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      
      // Campos básicos
      Object.entries(formData).forEach(([key, value]) => {
        if (['sellos', 'imagenes', 'fichaTecnica', 'imagenPrincipal'].includes(key)) return;
        
        formDataToSend.append(
          key, 
          value instanceof Date ? value.toISOString() : value
        );
      });

      // Manejo de archivos
      if (isEditing) {
        formDataToSend.append('isEditing', 'true');
        formDataToSend.append('originalRuta', formData.ruta);
        
        // Procesar archivos para edición
        ['fichaTecnica', 'imagenPrincipal'].forEach(field => {
          if (formData[field] === 'to_delete') {
            formDataToSend.append(`delete_${field}`, 'true');
          } else if (formData[field] && formData[field] !== 'existing') {
            formDataToSend.append(field, formData[field]);
          } else if (formData[field] === 'existing') {
            formDataToSend.append(`keep_${field}`, 'true');
          }
        });

        ['sellos', 'imagenes'].forEach(field => {
          formData[field].forEach((file, index) => {
            if (file === 'to_delete') {
              formDataToSend.append(`delete_${field}[]`, index);
            } else if (file !== 'existing') {
              formDataToSend.append(`${field}[]`, file);
            }
          });
        });
      } else {
        // Procesar archivos para nuevo producto
        ['fichaTecnica', 'imagenPrincipal', 'sellos', 'imagenes'].forEach(field => {
          if (formData[field]) {
            Array.isArray(formData[field])
              ? formData[field].forEach(file => formDataToSend.append(`${field}[]`, file))
              : formDataToSend.append(field, formData[field]);
          }
        });
      }

      const response = await fetch('https://apsafety.onrender.com/saveProductToGitHub.php', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Error al guardar el producto');
      }

      alert(isEditing ? '¡Producto actualizado exitosamente!' : '¡Producto guardado exitosamente!');
      resetForm();
      navigate('/productos');
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message || 'Ocurrió un error al procesar la solicitud'}`);
    } finally {
      setIsSubmitting(false);
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
    setPreviews({
      imagenPrincipal: null,
      sellos: [],
      imagenes: []
    });
    setFileNames({
      fichaTecnica: ''
    });
  };

  const handleCancel = () => {
    if (window.confirm('¿Estás seguro de que deseas cancelar? Los cambios no guardados se perderán.')) {
      navigate('/productos');
    }
  };

  // Renderizado
  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="row g-4">
        {/* Campos de texto */}
        <TextInput 
          label="Nombre Producto"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          placeholder="Nombre del producto"
          validator={validator}
          required
        />

        <TextAreaInput
          label="Descripción"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          placeholder="Descripción detallada del producto"
          validator={validator}
          required
        />

        {/* Selectores */}
        <SelectInput
          label="Unidad de medida"
          name="unidadMedida"
          value={formData.unidadMedida}
          onChange={handleChange}
          options={[
            { value: '', label: 'Selecciona una unidad' },
            { value: 'Metro', label: 'Metro' },
            { value: 'Metro cuadrado', label: 'Metro cuadrado' },
            { value: 'Metro cúbico', label: 'Metro cúbico' },
            { value: 'Kilogramo', label: 'Kilogramo' },
            { value: 'Litro', label: 'Litro' },
            { value: 'Segundo', label: 'Segundo' },
            { value: 'Grado', label: 'Grado' }
          ]}
          validator={validator}
          required
        />

        <SelectInput
          label="Clasificación"
          name="clasificacion"
          value={formData.clasificacion}
          onChange={handleChange}
          options={[
            { value: '', label: 'Selecciona clasificación' },
            { value: 'Productos', label: 'Productos' },
            { value: 'Protección respiratoria', label: 'Protección respiratoria' },
            { value: 'Protección personal', label: 'Protección personal' },
            { value: 'Detección de gas', label: 'Detección de gas' },
            { value: 'Productos retail', label: 'Productos retail' },
            { value: 'Productos POP', label: 'Productos POP' }
          ]}
          validator={validator}
          required
        />

        {/* Campos de texto con placeholders animados */}
        <TextInput
          label="Ventajas"
          name="ventajas"
          value={formData.ventajas}
          onChange={handleChange}
          placeholder={placeholders.ventajas}
          validator={validator}
          required
        />

        <TextInput
          label="Aplicaciones"
          name="aplicaciones"
          value={formData.aplicaciones}
          onChange={handleChange}
          placeholder={placeholders.aplicaciones}
          validator={validator}
          required
        />

        <SelectInput
          label="Tipo o subcategoría"
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          options={[
            { value: '', label: 'Selecciona un tipo' },
            { value: 'Tipo1', label: 'Tipo1' },
            { value: 'Tipo2', label: 'Tipo2' },
            { value: 'Tipo3', label: 'Tipo3' },
            { value: 'Tipo4', label: 'Tipo4' }
          ]}
          validator={validator}
          required
        />

        {/* Campos de archivos */}
        <FileInput
          label="Ficha Técnica (PDF - Máx. 10 MB)"
          name="fichaTecnica"
          accept="application/pdf"
          onChange={(e) => handleFileChange(e, 'fichaTecnica')}
          fileName={fileNames.fichaTecnica}
          validator={validator}
          required={!isEditing}
          onRemove={() => removeFile(0, 'fichaTecnica')}
          showRemove={isEditing && formData.fichaTecnica === 'existing'}
        />

        <ImageUploader
          label="Imagen Principal (Máx. 5 MB)"
          name="imagenPrincipal"
          preview={previews.imagenPrincipal}
          onChange={(e) => handleFileChange(e, 'imagenPrincipal')}
          validator={validator}
          required={!isEditing}
          onRemove={() => {
            if (previews.imagenPrincipal?.startsWith('blob:')) {
              URL.revokeObjectURL(previews.imagenPrincipal);
            }
            setPreviews(prev => ({ ...prev, imagenPrincipal: null }));
            setFormData(prev => ({
              ...prev,
              imagenPrincipal: isEditing ? 'to_delete' : null
            }));
          }}
          showRemove={previews.imagenPrincipal}
        />

        <MultiImageUploader
          label="Sellos (Múltiples - Máx. 5 MB c/u)"
          name="sellos"
          previews={previews.sellos}
          onChange={(e) => handleFileChange(e, 'sellos')}
          validator={validator}
          required={!isEditing}
          onRemove={(index) => removeFile(index, 'sellos')}
        />

        <MultiImageUploader
          label="Imágenes (Múltiples - Máx. 5 MB c/u)"
          name="imagenes"
          previews={previews.imagenes}
          onChange={(e) => handleFileChange(e, 'imagenes')}
          validator={validator}
          required={!isEditing}
          onRemove={(index) => removeFile(index, 'imagenes')}
        />

        {/* Fecha y estado */}
        <DateTimeInput
          label="Fecha de Creación"
          name="fechaCreacion"
          value={formData.fechaCreacion?.toISOString().slice(0, 16) || ''}
          onChange={handleChange}
          disabled={!isEditing}
          validator={validator}
          required
        />

        <SelectInput
          label="Estado"
          name="activo"
          value={formData.activo}
          onChange={handleChange}
          options={[
            { value: true, label: 'Activo' },
            { value: false, label: 'No Activo' }
          ]}
          validator={validator}
          required
        />

        {/* Botones */}
        <div className="col-lg-12">
          <div className="d-flex justify-content-between">
            <button
              type="submit"
              className="theme-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Procesando...
                </>
              ) : isEditing ? 'Actualizar Producto' : 'Agregar Producto'}
            </button>
            <button 
              type="button" 
              className="theme-btn btn-secondary"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

// Componentes auxiliares (deberías moverlos a archivos separados)
const TextInput = ({ label, name, value, onChange, placeholder, validator, required }) => (
  <div className="col-lg-6">
    <p>{label}:</p>
    <div className="form-clt">
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {validator.message(name, value, required ? 'required' : '')}
    </div>
  </div>
);

const TextAreaInput = ({ label, name, value, onChange, placeholder, validator, required }) => (
  <div className="col-lg-6">
    <p>{label}:</p>
    <div className="form-clt">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows="3"
      />
      {validator.message(name, value, required ? 'required' : '')}
    </div>
  </div>
);

const SelectInput = ({ label, name, value, onChange, options, validator, required, disabled }) => (
  <div className="col-lg-6">
    <p>{label}:</p>
    <div className="form-clt">
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {validator.message(name, value, required ? 'required' : '')}
    </div>
  </div>
);

const FileInput = ({ label, name, accept, onChange, fileName, validator, required, onRemove, showRemove }) => (
  <div className="col-lg-6">
    <p>{label}:</p>
    <div className="form-clt">
      <input
        type="file"
        accept={accept}
        onChange={onChange}
      />
      {fileName && <p className="small text-muted mt-1">{fileName}</p>}
      {validator.message(name, fileName || '', required ? 'required' : '')}
      {showRemove && (
        <button 
          type="button" 
          className="btn btn-sm btn-outline-danger mt-1"
          onClick={onRemove}
        >
          Eliminar archivo actual
        </button>
      )}
    </div>
  </div>
);

const ImageUploader = ({ label, name, preview, onChange, validator, required, onRemove, showRemove }) => (
  <div className="col-lg-6">
    <p>{label}:</p>
    <div className="form-clt">
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
      />
      {preview && (
        <div className="mt-2">
          <img 
            src={preview} 
            alt="Previsualización" 
            style={{ maxWidth: '100px', maxHeight: '100px' }} 
          />
          <button
            type="button"
            className="btn btn-sm btn-outline-danger d-block mt-1"
            onClick={onRemove}
          >
            Eliminar imagen
          </button>
        </div>
      )}
      {validator.message(name, preview || '', required ? 'required' : '')}
    </div>
  </div>
);

const MultiImageUploader = ({ label, name, previews, onChange, validator, required, onRemove }) => (
  <div className="col-lg-6">
    <p>{label}:</p>
    <div className="form-clt">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={onChange}
      />
      <div className="d-flex flex-wrap mt-2">
        {previews.map((preview, index) => (
          <div key={index} className="position-relative me-2 mb-2">
            <img 
              src={preview} 
              alt={`Previsualización ${index}`} 
              style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
            />
            <button
              type="button"
              className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 p-0"
              style={{ width: '20px', height: '20px', fontSize: '10px' }}
              onClick={() => onRemove(index)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      {validator.message(name, previews.length > 0 ? previews : '', required ? 'required' : '')}
    </div>
  </div>
);

const DateTimeInput = ({ label, name, value, onChange, validator, required, disabled }) => (
  <div className="col-lg-6">
    <p>{label}:</p>
    <div className="form-clt">
      <input
        type="datetime-local"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {validator.message(name, value, required ? 'required' : '')}
    </div>
  </div>
);

// PropTypes
AggProducto.propTypes = {
  productToEdit: PropTypes.object,
  isEditing: PropTypes.bool
};

export default AggProducto;