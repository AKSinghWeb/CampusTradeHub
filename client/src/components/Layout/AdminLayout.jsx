// make an admin layout

import { Routes, Route } from 'react-router-dom'
// import Home from '../../pages/Home'
import Footer from '../Layout/Footer'
import ProductPage from '../../pages/ProductPage'
import AdminHome from '../../pages/AdminHome'
import AdminHeader from '../AdminHome/AdminHeader'
import AdminProductsPage from '@/pages/AdminProductsPage'
import NotFound from './NotFound'

const DummyProduct = {
  title: 'Adorable Cat Plushie',
  description: 'A fluffy and cute cat plushie that brings joy to your life.',
  price: 15.99,
  category: 'Toys',
  location: 'Campus A, Building 2',
  image: 'https://placekitten.com/800/600',
  seller: {
    name: 'CampusTradeHub',
    avatar: 'https://placekitten.com/100/100',
  },
}

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/products" element={<AdminProductsPage />} />
        <Route
          path="/users"
          element={<ProductPage product={DummyProduct} action="approve" />}
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default AdminLayout
