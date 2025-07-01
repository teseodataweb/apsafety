import React, { useState, useEffect } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
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
  useEffect(() => {
    if (isEditing) {
      const { titulo, descripcion, unidadMedida, clasificacion, ventajas, aplicaciones, tipo, sellos, fichaTecnicaUrl, imagenPrincipalUrl, imagenesUrl, activo, fechaCreacion } = location.state.producto;
      setFormData({ titulo, descripcion, unidadMedida, clasificacion, ventajas, aplicaciones, tipo, sellos, fichaTecnicaUrl, imagenPrincipalUrl, imagenesUrl, activo, fechaCreacion: new Date(fechaCreacion) });
      validator.hideMessages();
      forceUpdate(1);
    }}, [location.state, isEditing, validator]);
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validator.showMessageFor(name);
    forceUpdate(1);};
  const handleFileChange = (e, field) => {
    const files = Array.from(e.target.files).map(file => URL.createObjectURL(file));
    setFormData({ ...formData, [field]: files });};
  const handleSubmit = async e => {
    e.preventDefault();
    if (!validator.allValid()) {
      validator.showMessages();
      forceUpdate(1);
      return; }
    try {
      const productDocRef = doc(db, "productos", formData.titulo);
      await setDoc(productDocRef, {
        ...formData,
        fechaCreacion: new Date(),
      });
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
    }};
  const handleCancel = () => {
    navigate('/productos');};
  return (
    <form id="contact-form" onSubmit={handleSubmit}>
      <div className="row g-4">
        <div className="col-lg-6">
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
  <div className="form-clt">
    <select
      name="unidadMedida"
      value={formData.unidadMedida}
      onChange={handleChange}
      placeholder="Unidad de medida"
    >
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
  <div className="form-clt">
    <select
      name="clasificacion"
      value={formData.clasificacion}
      onChange={handleChange}
      placeholder="Clasificación"
    >
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
          <div className="form-clt">
            <input
              type="text"
              name="ventajas"
              value={formData.ventajas}
              onChange={handleChange}
              placeholder="Ventajas (ligero, alta resistencia, etc)"/>
            {validator.message('ventajas', formData.ventajas, 'required')}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-clt">
            <input
              type="text"
              name="aplicaciones"
              value={formData.aplicaciones}
              onChange={handleChange}
              placeholder="Aplicaciones"
            />
            {validator.message('aplicaciones', formData.aplicaciones, 'required')}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-clt">
            <input
              type="text"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              placeholder="Tipo o subcategoría"/>
            {validator.message('tipo', formData.tipo, 'required')}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-clt">
            <input
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, 'sellos')}
              placeholder="Sellos"/>
            {validator.message('sellos', formData.sellos, 'required')}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-clt">
            <input
              type="url"
              name="fichaTecnicaUrl"
              value={formData.fichaTecnicaUrl}
              onChange={handleChange}
              placeholder="Ficha técnica"
            />
            {validator.message('fichaTecnicaUrl', formData.fichaTecnicaUrl, 'required|url')}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-clt">
            <input
              type="url"
              name="imagenPrincipalUrl"
              value={formData.imagenPrincipalUrl}
              onChange={handleChange}
              placeholder="Imagen principal"/>
            {validator.message('imagenPrincipalUrl', formData.imagenPrincipalUrl, 'required|url')}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-clt">
            <input
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, 'imagenesUrl')}
              placeholder="Imágenes"
            />
            {validator.message('imagenesUrl', formData.imagenesUrl, 'required')}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-clt">
            <input
              type="datetime-local"
              name="fechaCreacion"
              value={formData.fechaCreacion.toISOString().slice(0, 16)}
              onChange={handleChange}
            />
            {validator.message('fechaCreacion', formData.fechaCreacion, 'required')}
          </div>
        </div>
        <div className="col-lg-6">
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
    );};
export default AggProducto;