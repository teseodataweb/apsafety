import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from '../HomePage/HomePage';
import HomePage2 from '../HomePage2/HomePage2';
import HomePage3 from '../HomePage3/HomePage3';
import AboutPage from '../AboutPage/AboutPage';
import LoginPage from '../LoginPage/LoginPage';
import ServicePage from '../ServicePage/ServicePage';
import ServiceSinglePage from '../ServiceSinglePage/ServiceSinglePage';
import ProjectPage from '../ProjectPage/ProjectPage';
import ProjectSinglePage from '../ProjectSinglePage/ProjectSinglePage';
import ShopPage from '../ShopPage';
import ProductosPage from '../ProductosPage';
import ShopSinglePage from '../ShopSinglePage';
import CartPage from '../CartPage';
import CheckoutPage from '../CheckoutPage';
import OrderRecived from '../OrderRecived';
import BlogPage from '../BlogPage/BlogPage';
import BlogDetails from '../BlogDetails/BlogDetails';
import ContactPage from '../ContactPage/ContactPage';
import ErrorPage from '../ErrorPage/ErrorPage';
import AsesoriaTecnica from '../../components/AtencionCliente/AsesoriaTecnica';
import AdminPage from '../Admin/AdminPage';
import FormUsser from '../../components/AggUssers/FormUsser';
import FormProducto from '../../components/AggProductos/FormProducto';
import ProtectedRoute from '../../components/ProtectedRoute'; 



const AllRoute = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="home" element={<Homepage />} />
          <Route path="home-2" element={<HomePage2 />} />
          <Route path="home-3" element={<HomePage3 />} />
          <Route path="about" element={<AboutPage />} />
          <Route path='login' element={<LoginPage />} />
          
          {/* Rutas protegidas */}
          <Route 
            path='admin' 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='formUsser' 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <FormUsser />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='formProducto' 
            element={
              <ProtectedRoute allowedRoles={['admin', 'secundario']}>
                <FormProducto />
              </ProtectedRoute>
            } 
          />
          

          <Route path="productos" element={ <ProtectedRoute allowedRoles={['admin', 'secundario']}>  <ProductosPage /> </ProtectedRoute>}  />


          <Route path="service" element={<ServicePage />} />
          <Route path="service-details/:slug" element={<ServiceSinglePage />} />
          <Route path="project" element={<ProjectPage />} />
          <Route path="project-details/:slug" element={<ProjectSinglePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path='shop-details/:slug' element={<ShopSinglePage />} />
          <Route path='shop-cart' element={<CartPage />} />
          <Route path='checkout' element={<CheckoutPage />} />
          <Route path='order_received' element={<OrderRecived />} />
          <Route path='news' element={<BlogPage />} />
          <Route path='blog-single/:slug' element={<BlogDetails />} />
          <Route path='contact' element={<ContactPage />} />
          <Route path='404' element={<ErrorPage />} />
          <Route path="/asesoria-tecnica" element={<AsesoriaTecnica />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AllRoute;