import React, { useState, useEffect, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  input[type="checkbox"] {
    margin-right: 10px;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  
  label {
    cursor: pointer;
    user-select: none;
  }
  
  a {
    color: #0066cc;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { 
    transform: translateY(-50px) scale(1.5);
    opacity: 0; 
  }
  to { 
    transform: translateY(0) scale(1);
    opacity: 1; 
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  backdrop-filter: blur(2px);
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 100px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  animation: ${slideIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  transform-origin: center;
`;

const ModalHeader = styled.div`
  padding: 22px;
  background: linear-gradient(9deg, #ff4d4d, #d93636);
  color: white;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SuccessModalHeader = styled(ModalHeader)`
  background: linear-gradient(9deg, #28a745, #218838);
`;

const ModalBody = styled.div`
  padding: 30px;
  text-align: center;
`;

const ModalFooter = styled.div`
  padding: 20px 25px;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  background: #f8f9fa;
  border-top: 1px solid #eee;
`;

const DangerButton = styled.button`
  background: linear-gradient(135deg, #ff4d4d, #d93636);
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, #ff3333, #cc2a2a);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled.button`
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 25px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: #02871c;
    transform: translateY(-2px);
    color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const SuccessButton = styled.button`
  background: linear-gradient(135deg, #28a745, #218838);
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: linear-gradient(135deg, #218838, #1e7e34);
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const WarningIcon = styled.div`
  font-size: 2rem;
  margin-left: 28px;
  color: #fff;
  animation: ${pulse} 1.5s infinite;
`;

const SuccessIcon = styled.div`
  font-size: 2rem;
  margin-left: 28px;
  color: #fff;
`;

const AggProducto = () => {
  const getMexicoDateTime = () => {
    const now = new Date();
    const mexicoNow = new Date(
      now.toLocaleString('en-US', { timeZone: 'America/Mexico_City' })
    );
    const pad = (n) => n.toString().padStart(2, '0');
    const yyyy = mexicoNow.getFullYear();
    const mm = pad(mexicoNow.getMonth() + 1);
    const dd = pad(mexicoNow.getDate());
    const hh = pad(mexicoNow.getHours());
    const min = pad(mexicoNow.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  };

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
  const MAX_PDF_SIZE = 10 * 1024 * 1024;

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
    fechaCreacion: getMexicoDateTime(),
    ruta: '',
  });

  const [imagenPrincipalPreview, setImagenPrincipalPreview] = useState(null);
  const [sellosPreviews, setSellosPreviews] = useState([]);
  const [imagenesPreviews, setImagenesPreviews] = useState([]);
  const [fichaTecnicaNombre, setFichaTecnicaNombre] = useState('');
  const [existingFiles, setExistingFiles] = useState({
    fichaTecnica: null,
    imagenPrincipal: null,
    sellos: [],
    imagenes: [],
  });

  const [ventajasPlaceholder, setVentajasPlaceholder] = useState(
    'Ventajas (ligero, alta resistencia, etc)'
  );
  const [aplicacionesPlaceholder, setAplicacionesPlaceholder] = useState(
    'Aplicaciones (cara, interiores, etc)'
  );
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState('');

  const [validator] = useState(new SimpleReactValidator({
    autoForceUpdate: this,
    messages: {
      required: 'Este campo es obligatorio',
    }
  }));
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
      setFormData(prev => ({
        ...prev,
        fechaCreacion: getMexicoDateTime()
      }));
    }

    ventajasIntervalRef.current = setInterval(() => {
      setVentajasPlaceholder((prev) =>
        prev === 'Ventajas (ligero, alta resistencia, etc)'
          ? 'Texto separado por comas'
          : 'Ventajas (ligero, alta resistencia, etc)'
      );
    }, 5000);
    aplicacionesIntervalRef.current = setInterval(() => {
      setAplicacionesPlaceholder((prev) =>
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
      imagenes: producto.imagenes || [],
    });

    if (producto.imagenPrincipal) {
      setImagenPrincipalPreview(
        `data:image/jpeg;base64,${producto.imagenPrincipal}`
      );
    }
    if (producto.sellos?.length) {
      setSellosPreviews(
        producto.sellos.map((s) => `data:image/jpeg;base64,${s}`)
      );
    }
    if (producto.imagenes?.length) {
      setImagenesPreviews(
        producto.imagenes.map((i) => `data:image/jpeg;base64,${i}`)
      );
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
      fechaCreacion: getMexicoDateTime(),
      ruta: producto.ruta || '',
      sellos: producto.sellos
        ? Array(producto.sellos.length).fill('existing')
        : [],
      fichaTecnica: producto.fichaTecnica ? 'existing' : null,
      imagenPrincipal: producto.imagenPrincipal ? 'existing' : null,
      imagenes: producto.imagenes
        ? Array(producto.imagenes.length).fill('existing')
        : [],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
    if (showValidationErrors) {
      validator.showMessageFor(name);
      forceUpdate(1);
    }
  };

  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (field === 'fichaTecnica') {
      if (files[0].size > MAX_PDF_SIZE) {
        setErrorMessage('El tamaño máximo para la ficha técnica es de 10 MB');
        setShowErrorModal(true);
        return;
      }
      setFormData((f) => ({ ...f, fichaTecnica: files[0] }));
      setFichaTecnicaNombre(files[0].name);
    } else if (field === 'imagenPrincipal') {
      if (files[0].size > MAX_IMAGE_SIZE) {
        setErrorMessage('El tamaño máximo para la imagen principal es de 5 MB');
        setShowErrorModal(true);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => setImagenPrincipalPreview(reader.result);
      reader.readAsDataURL(files[0]);
      setFormData((f) => ({ ...f, imagenPrincipal: files[0] }));
    } else if (field === 'sellos' || field === 'imagenes') {
      const oversized = files.some((f) => f.size > MAX_IMAGE_SIZE);
      if (oversized) {
        setErrorMessage('El tamaño máximo para cada imagen es de 5 MB');
        setShowErrorModal(true);
        return;
      }
      const previews = files.map((f) => URL.createObjectURL(f));
      if (field === 'sellos') {
        setSellosPreviews((p) => [...p, ...previews]);
      } else {
        setImagenesPreviews((p) => [...p, ...previews]);
      }
      setFormData((f) => ({
        ...f,
        [field]: [...f[field], ...files],
      }));
    }
  };

  const removeFile = (index, field, previewArr, setPreviewArr) => {
    const fdata = [...formData[field]];
    if (isEditing && fdata[index] === 'existing') {
      setConfirmMessage(`¿Estás seguro de eliminar este ${field === 'sellos' ? 'sello' : 'imagen'}?`);
      setConfirmAction(() => () => {
        fdata[index] = 'to_delete';
        setFormData((f) => ({ ...f, [field]: fdata }));
        const previews = [...previewArr];
        previews.splice(index, 1);
        setPreviewArr(previews);
      });
      setShowConfirmModal(true);
    } else {
      fdata.splice(index, 1);
      if (previewArr[index]?.startsWith('blob:')) {
        URL.revokeObjectURL(previewArr[index]);
      }
      setFormData((f) => ({ ...f, [field]: fdata }));
      const previews = [...previewArr];
      previews.splice(index, 1);
      setPreviewArr(previews);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowValidationErrors(true);
    
    if (!termsAccepted) {
      setErrorMessage('Debes aceptar los términos y políticas de privacidad');
      setShowErrorModal(true);
      return;
    }

    if (!validator.allValid()) {
      setErrorMessage('Por favor complete todos los campos');
      setShowErrorModal(true);
      validator.showMessages();
      forceUpdate(1);
      return;
    }

    const enviar = new FormData();
    Object.entries(formData).forEach(([k, v]) => {
      if (!['sellos', 'imagenes', 'fichaTecnica', 'imagenPrincipal'].includes(k)) {
        enviar.append(k, k === 'fechaCreacion' ? new Date(v).toISOString() : v);
      }
    });

    if (formData.fichaTecnica === 'to_delete') {
      enviar.append('delete_fichaTecnica', 'true');
    }
    if (formData.imagenPrincipal === 'to_delete') {
      enviar.append('delete_imagenPrincipal', 'true');
    }

    if (formData.fichaTecnica && formData.fichaTecnica !== 'existing' && formData.fichaTecnica !== 'to_delete') {
      enviar.append('fichaTecnica', formData.fichaTecnica);
    }
    if (formData.imagenPrincipal && formData.imagenPrincipal !== 'existing' && formData.imagenPrincipal !== 'to_delete') {
      enviar.append('imagenPrincipal', formData.imagenPrincipal);
    }
    
    formData.sellos.forEach((s) => {
      if (s === 'to_delete') {
        enviar.append('delete_sellos[]', 'true');
      } else if (s !== 'existing') {
        enviar.append('sellos[]', s);
      }
    });
    
    formData.imagenes.forEach((i) => {
      if (i === 'to_delete') {
        enviar.append('delete_imagenes[]', 'true');
      } else if (i !== 'existing') {
        enviar.append('imagenes[]', i);
      }
    });

    if (isEditing) {
      enviar.append('isEditing', 'true');
      enviar.append('originalRuta', productToEdit.ruta);
    }

    try {
      const resp = await fetch(
        'http://localhost:5000/saveProduct.php',
        { method: 'POST', body: enviar }
      );
      const json = await resp.json();
      if (json.success) {
        setSuccessMessage(isEditing ? '¡Producto actualizado!' : '¡Producto guardado!');
        setShowSuccessModal(true);
      } else {
        setErrorMessage(`Error: ${json.message}`);
        setShowErrorModal(true);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Error de conexión con el servidor');
      setShowErrorModal(true);
    }
  };

  const handleCancel = () => {
    navigate('/productos');
  };

  const executeConfirmAction = () => {
    if (confirmAction) {
      confirmAction();
    }
    setShowConfirmModal(false);
  };

  return (
    <>
      <form id="contact-form" onSubmit={handleSubmit}>
        <div className="row g-4">
          {/* Nombre Producto */}
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
              {showValidationErrors && validator.message('titulo', formData.titulo, 'required')}
            </div>
          </div>
          {/* Descripción */}
          <div className="col-lg-6">
            <p>Descripción:</p>
            <div className="form-clt">
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Descripción del producto"
              />
              {showValidationErrors && validator.message('descripcion', formData.descripcion, 'required')}
            </div>
          </div>
          {/* Unidad de medida */}
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
              {showValidationErrors && validator.message('unidadMedida', formData.unidadMedida, 'required')}
            </div>
          </div>
          {/* Clasificación */}
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
              {showValidationErrors && validator.message('clasificacion', formData.clasificacion, 'required')}
            </div>
          </div>
          {/* Ventajas */}
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
              {showValidationErrors && validator.message('ventajas', formData.ventajas, 'required')}
            </div>
          </div>
          {/* Aplicaciones */}
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
              {showValidationErrors && validator.message('aplicaciones', formData.aplicaciones, 'required')}
            </div>
          </div>
          {/* Tipo o subcategoría */}
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
              {showValidationErrors && validator.message('tipo', formData.tipo, 'required')}
            </div>
          </div>
          {/* Ficha Técnica */}
          <div className="col-lg-6">
            <p>Ficha Técnica (PDF - Máx. 10 MB):</p>
            <div className="form-clt">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => handleFileChange(e, 'fichaTecnica')}
              />
              {fichaTecnicaNombre && (
                <p className="small text-muted mt-1">{fichaTecnicaNombre}</p>
              )}
              {showValidationErrors && validator.message('fichaTecnica', formData.fichaTecnica, isEditing ? '' : 'required')}
              {isEditing && formData.fichaTecnica === 'existing' && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger mt-1"
                  onClick={() => {
                    setConfirmMessage('¿Estás seguro de eliminar la ficha técnica actual?');
                    setConfirmAction(() => () => {
                      setFormData((f) => ({ ...f, fichaTecnica: 'to_delete' }));
                      setFichaTecnicaNombre('');
                    });
                    setShowConfirmModal(true);
                  }}
                >
                  Eliminar ficha técnica actual
                </button>
              )}
            </div>
          </div>
          {/* Imagen Principal */}
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
                      setConfirmMessage('¿Estás seguro de eliminar la imagen principal?');
                      setConfirmAction(() => () => {
                        if (imagenPrincipalPreview.startsWith('blob:')) {
                          URL.revokeObjectURL(imagenPrincipalPreview);
                        }
                        setImagenPrincipalPreview(null);
                        setFormData((f) => ({
                          ...f,
                          imagenPrincipal:
                            isEditing && f.imagenPrincipal === 'existing'
                              ? 'to_delete'
                              : null,
                        }));
                      });
                      setShowConfirmModal(true);
                    }}
                  >
                    Eliminar imagen
                  </button>
                </div>
              )}
              {showValidationErrors && validator.message('imagenPrincipal', formData.imagenPrincipal, isEditing ? '' : 'required')}
            </div>
          </div>
          {/* Sellos */}
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
                {sellosPreviews.map((preview, idx) => (
                  <div key={idx} className="position-relative me-2 mb-2">
                    <img
                      src={preview}
                      alt={`Previsualización de sello ${idx}`}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 p-0"
                      style={{ width: '20px', height: '20px', fontSize: '10px' }}
                      onClick={() => removeFile(idx, 'sellos', sellosPreviews, setSellosPreviews)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              {showValidationErrors && validator.message('sellos', formData.sellos, isEditing ? '' : 'required')}
            </div>
          </div>
          {/* Imágenes */}
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
                {imagenesPreviews.map((preview, idx) => (
                  <div key={idx} className="position-relative me-2 mb-2">
                    <img
                      src={preview}
                      alt={`Previsualización de imagen ${idx}`}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger position-absolute top-0 end-0 p-0"
                      style={{ width: '20px', height: '20px', fontSize: '10px' }}
                      onClick={() => removeFile(idx, 'imagenes', imagenesPreviews, setImagenesPreviews)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              {showValidationErrors && validator.message('imagenes', formData.imagenes, isEditing ? '' : 'required')}
            </div>
          </div>
          {/* Fecha de Creación */}
          <div className="col-lg-6">
            <p>Fecha de Creación:</p>
            <div className="form-clt">
              <input
                type="datetime-local"
                name="fechaCreacion"
                value={formData.fechaCreacion}
                onChange={handleChange}
              />
              {showValidationErrors && validator.message('fechaCreacion', formData.fechaCreacion, 'required')}
            </div>
          </div>
          {/* Estado */}
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
              {showValidationErrors && validator.message('activo', formData.activo, 'required')}
            </div>
          </div>
          
          <div className="col-lg-12">
            <CheckboxContainer>
              <input 
                type="checkbox" 
                id="termsCheckbox" 
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                required
              />
              <label htmlFor="termsCheckbox">
                Acepto términos y <a href="https://drive.google.com/file/d/1wa8vCbADtDX_1QTV4CGDYam73scUGrQI/view"> políticas de privacidad</a>
              </label>
            </CheckboxContainer>
            {showValidationErrors && !termsAccepted && (
              <div className="text-danger small mb-3">Este campo es obligatorio</div>
            )}
          </div>
          
          <div className="col-lg-12">
            <div className="d-flex justify-content-between">
              <button type="submit" className="theme-btn">
                {isEditing ? 'Actualizar Producto' : 'Agregar Producto'}
              </button>
              <button type="button" className="theme-btn" onClick={handleCancel}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </form>
      {showErrorModal && (
        <ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <WarningIcon>
                <FaExclamationTriangle />
              </WarningIcon>
              <h3 style={{ letterSpacing: '0.6px', color: 'white', margin: 2 }}>Error</h3>
            </ModalHeader>
            <ModalBody>
              <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                {errorMessage}
              </p>
            </ModalBody>
            <ModalFooter>
              <SecondaryButton onClick={() => setShowErrorModal(false)}>
                Aceptar
              </SecondaryButton>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      )}
      {showConfirmModal && (
        <ModalOverlay>
          <ModalContainer>
            <ModalHeader>
              <WarningIcon>
                <FaExclamationTriangle />
              </WarningIcon>
              <h3 style={{ letterSpacing: '0.6px', color: 'white', margin: 2 }}>Confirmar</h3>
            </ModalHeader>
            <ModalBody>
              <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                {confirmMessage}
              </p>
            </ModalBody>
            <ModalFooter>
              <SecondaryButton onClick={() => setShowConfirmModal(false)}>
                Cancelar
              </SecondaryButton>
              <DangerButton onClick={executeConfirmAction}>
                Confirmar
              </DangerButton>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      )}
      {showSuccessModal && (
        <ModalOverlay>
          <ModalContainer>
            <SuccessModalHeader>
              <SuccessIcon>
                <FaCheckCircle />
              </SuccessIcon>
              <h3 style={{ letterSpacing: '0.6px', color: 'white', margin: 2 }}>Éxito</h3>
            </SuccessModalHeader>
            <ModalBody>
              <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>
                {successMessage}
              </p>
            </ModalBody>
            <ModalFooter>
              <SuccessButton onClick={() => {
                setShowSuccessModal(false);
                navigate('/productos');
              }}>
                Aceptar
              </SuccessButton>
            </ModalFooter>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  );
};

export default AggProducto;