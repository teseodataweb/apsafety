//formulario 
import React, { useState, useEffect, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useNavigate, useLocation } from 'react-router-dom';

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
      // Para nuevo producto: fecha/hora actual
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
      // Al editar: usar fecha actual en lugar de la original
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
    validator.showMessageFor(name);
    forceUpdate(1);
  };

  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (field === 'fichaTecnica') {
      if (files[0].size > MAX_PDF_SIZE) {
        alert('El tamaño máximo para la ficha técnica es de 10 MB');
        return;
      }
      setFormData((f) => ({ ...f, fichaTecnica: files[0] }));
      setFichaTecnicaNombre(files[0].name);
    } else if (field === 'imagenPrincipal') {
      if (files[0].size > MAX_IMAGE_SIZE) {
        alert('El tamaño máximo para la imagen principal es de 5 MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => setImagenPrincipalPreview(reader.result);
      reader.readAsDataURL(files[0]);
      setFormData((f) => ({ ...f, imagenPrincipal: files[0] }));
    } else if (field === 'sellos' || field === 'imagenes') {
      const oversized = files.some((f) => f.size > MAX_IMAGE_SIZE);
      if (oversized) {
        alert('El tamaño máximo para cada imagen es de 5 MB');
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
      fdata[index] = 'to_delete';
    } else {
      fdata.splice(index, 1);
      if (previewArr[index]?.startsWith('blob:')) {
        URL.revokeObjectURL(previewArr[index]);
      }
    }
    setFormData((f) => ({ ...f, [field]: fdata }));
    const previews = [...previewArr];
    previews.splice(index, 1);
    setPreviewArr(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validator.allValid()) {
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

    // Añadir banderas de eliminación
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
        alert(isEditing ? '¡Producto actualizado!' : '¡Producto guardado!');
        navigate('/productos');
      } else {
        alert(`Error: ${json.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión');
    }
  };

  const handleCancel = () => navigate('/productos');

  return (
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
            {validator.message('titulo', formData.titulo, 'required')}
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
            {validator.message('descripcion', formData.descripcion, 'required')}
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
            {validator.message('unidadMedida', formData.unidadMedida, 'required')}
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
            {validator.message('clasificacion', formData.clasificacion, 'required')}
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
            {validator.message('ventajas', formData.ventajas, 'required')}
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
            {validator.message('aplicaciones', formData.aplicaciones, 'required')}
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
            {validator.message('tipo', formData.tipo, 'required')}
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
            {validator.message('fichaTecnica', formData.fichaTecnica, isEditing ? '' : 'required')}
            {isEditing && formData.fichaTecnica === 'existing' && (
              <button
                type="button"
                className="btn btn-sm btn-outline-danger mt-1"
                onClick={() => {
                  setFormData((f) => ({ ...f, fichaTecnica: 'to_delete' }));
                  setFichaTecnicaNombre('');
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
                  }}
                >
                  Eliminar imagen
                </button>
              </div>
            )}
            {validator.message('imagenPrincipal', formData.imagenPrincipal, isEditing ? '' : 'required')}
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
            {validator.message('sellos', formData.sellos, isEditing ? '' : 'required')}
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
            {validator.message('imagenes', formData.imagenes, isEditing ? '' : 'required')}
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
            {validator.message('fechaCreacion', formData.fechaCreacion, 'required')}
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
            {validator.message('activo', formData.activo, 'required')}
          </div>
        </div>
        {/* Botones */}
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
  );
};

export default AggProducto;