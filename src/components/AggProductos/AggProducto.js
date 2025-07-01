//Formulario AggProducto
import React, { useState, useEffect, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../login/firebase';

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
    fichaTecnicaUrl: '',
    imagenPrincipalUrl: '',
    imagenesUrl: [],
    activo: true,
    fechaCreacion: new Date(),
  });
  
  const [validator] = useState(new SimpleReactValidator());
  const [, forceUpdate] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = !!location.state?.producto;
  
  // Estados para los placeholders animados
  const [ventajasPlaceholder, setVentajasPlaceholder] = useState('Ventajas (ligero, alta resistencia, etc)');
  const [aplicacionesPlaceholder, setAplicacionesPlaceholder] = useState('Aplicaciones (cara, interiores, etc)');
  const ventajasIntervalRef = useRef(null);
  const aplicacionesIntervalRef = useRef(null);
  
  useEffect(() => {
    if (isEditing) {
      const { titulo, descripcion, unidadMedida, clasificacion, ventajas, aplicaciones, tipo, sellos, fichaTecnicaUrl, imagenPrincipalUrl, imagenesUrl, activo, fechaCreacion } = location.state.producto;
      setFormData({ titulo, descripcion, unidadMedida, clasificacion, ventajas, aplicaciones, tipo, sellos, fichaTecnicaUrl, imagenPrincipalUrl, imagenesUrl, activo, fechaCreacion: new Date(fechaCreacion) });
      validator.hideMessages();
      forceUpdate(1);
    }
  }, [location.state, isEditing, validator]);

  // Efecto para animar los placeholders
  useEffect(() => {
    // Animación para ventajas
    ventajasIntervalRef.current = setInterval(() => {
      setVentajasPlaceholder(prev => 
        prev === 'Ventajas (ligero, alta resistencia, etc)' 
          ? 'Texto separado por comas' 
          : 'Ventajas (ligero, alta resistencia, etc)'
      );
    }, 5000);

    // Animación para aplicaciones
    aplicacionesIntervalRef.current = setInterval(() => {
      setAplicacionesPlaceholder(prev => 
        prev === 'Aplicaciones (cara, interiores, etc)' 
          ? 'Texto separado por comas' 
          : 'Aplicaciones (cara, interiores, etc)'
      );
    }, 5000);

    // Limpiar intervalos al desmontar
    return () => {
      clearInterval(ventajasIntervalRef.current);
      clearInterval(aplicacionesIntervalRef.current);
    };
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validator.showMessageFor(name);
    forceUpdate(1);
  };

  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files);
    
    // Para PDF solo tomamos el primer archivo
    if (field === 'fichaTecnicaUrl') {
      if (files.length > 0 && files[0].type === 'application/pdf') {
        setFormData({ ...formData, [field]: files[0] });
      }
      return;
    }
    
    // Para imagen principal solo tomamos el primer archivo
    if (field === 'imagenPrincipalUrl') {
      if (files.length > 0 && files[0].type.startsWith('image/')) {
        setFormData({ ...formData, [field]: files[0] });
      }
      return;
    }
    
    // Para otros campos (sellos e imagenesUrl) tomamos múltiples
    setFormData({ ...formData, [field]: files });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validator.allValid()) {
      validator.showMessages();
      forceUpdate(1);
      return;
    }
    
    try {
      // Preparar datos para Firestore
      const productData = {
        ...formData,
        fechaCreacion: new Date(),
      };
      
      // Convertir archivos a URLs si son objetos File (solo para visualización, en producción deberías subirlos a Storage)
      if (formData.fichaTecnicaUrl instanceof File) {
        productData.fichaTecnicaUrl = URL.createObjectURL(formData.fichaTecnicaUrl);
      }
      
      if (formData.imagenPrincipalUrl instanceof File) {
        productData.imagenPrincipalUrl = URL.createObjectURL(formData.imagenPrincipalUrl);
      }
      
      if (Array.isArray(formData.sellos)) {
        productData.sellos = formData.sellos.map(file => 
          file instanceof File ? URL.createObjectURL(file) : file
        );
      }
      
      if (Array.isArray(formData.imagenesUrl)) {
        productData.imagenesUrl = formData.imagenesUrl.map(file => 
          file instanceof File ? URL.createObjectURL(file) : file
        );
      }

      const productDocRef = doc(db, "productos", formData.titulo);
      await setDoc(productDocRef, productData);

      // Resetear formulario
      setFormData({
        titulo: '',
        descripcion: '',
        unidadMedida: '',
        clasificacion: '',
        ventajas: '',
        aplicaciones: '',
        tipo: '',
        sellos: [],
        fichaTecnicaUrl: '',
        imagenPrincipalUrl: '',
        imagenesUrl: [],
        activo: true,
        fechaCreacion: new Date(),
      });
      validator.hideMessages();
      forceUpdate(1);
      navigate('/productos');
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  const handleCancel = () => {
    navigate('/productos');
  };

  return (
    <form id="contact-form" onSubmit={handleSubmit}>
      <div className="row g-4">
        <div className="col-lg-6">
          <p>Nombre Producto (etiqueta p):</p>
          <div className="form-clt">
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Nombre del producto"/>
            {validator.message('titulo', formData.titulo, 'required|alpha_space')}
          </div>
        </div>
        <div className="col-lg-6">
          <p>Descripción:</p>
          <div className="form-clt">
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Descripción"/>
            {validator.message('descripcion', formData.descripcion, 'required')}
          </div>
        </div>
        <div className="col-lg-6">
          <p>Unidad de medida:</p>
          <div className="form-clt">
            <select
              name="unidadMedida"
              value={formData.unidadMedida}
              onChange={handleChange}>
              <option value="">Selecciona una unidad de medida</option>
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
              onChange={handleChange}>
              <option value="">Selecciona una clasificación</option>
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
              onFocus={() => clearInterval(ventajasIntervalRef.current)}/>
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
              onFocus={() => clearInterval(aplicacionesIntervalRef.current)}/>
            {validator.message('aplicaciones', formData.aplicaciones, 'required')}
          </div>
        </div>
        <div className="col-lg-6">
          <p>Tipo o subcategoría:</p>
          <div className="form-clt">
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}>
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
          <p>Ficha Técnica (solo PDF):</p>
          <div className="form-clt">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileChange(e, 'fichaTecnicaUrl')}/>
            {validator.message('fichaTecnicaUrl', formData.fichaTecnicaUrl, 'required')}
          </div>
        </div>
        <div className="col-lg-6">
          <p>Imagen Principal (solo imagen):</p>
          <div className="form-clt">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'imagenPrincipalUrl')}/>
            {validator.message('imagenPrincipalUrl', formData.imagenPrincipalUrl, 'required')}
          </div>
        </div>
        <div className="col-lg-6">
          <p>Sellos:</p>
          <div className="form-clt">
            <input
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, 'sellos')}/>
            {validator.message('sellos', formData.sellos, 'required')}
          </div>
        </div>
        <div className="col-lg-6">
          <p>Imágenes:</p>
          <div className="form-clt">
            <input
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, 'imagenesUrl')}/>
            {validator.message('imagenesUrl', formData.imagenesUrl, 'required')}
          </div>
        </div>
        <div className="col-lg-6">
          <p>Fecha de Creación:</p>
          <div className="form-clt">
            <input
              type="datetime-local"
              name="fechaCreacion"
              value={formData.fechaCreacion.toISOString().slice(0, 16)}
              onChange={handleChange}/>
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
              className="form-control">
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
              className="theme-btn">
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