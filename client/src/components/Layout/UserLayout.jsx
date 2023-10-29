// make an admin layout

import UserHeader from '../UserHome/UserHeader'
import { Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home'
import Footer from '../Layout/Footer'
import ProductPage from '../../pages/ProductPage'
import AdminPage from '../../pages/AdminHome'
import ProductForm from '@/pages/NewProduct'
import ProductList from '@/pages/ProductList'
// import UserProfileManagement from '@/components/UserProfileManagement'
import UserProfile from '@/components/UserProfile/UserProfile'
import NotFound from './NotFound'
import UploadSuccess from '../UploadSuccess'
import ScrollToTop from '../ScrollToTop'

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

const UserLayout = () => {
  return (
    <div>
      <UserHeader />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFound />} />

        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/products/:category"
          element={<ProductList type={'category'} />}
        />
        <Route
          path="/products/search/:search"
          element={<ProductList type={'search'} />}
        />
        <Route
          path="/product/:productId"
          element={<ProductPage product={DummyProduct} />}
        />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/new-product" element={<ProductForm />} />
        <Route path="/new-product-success" element={<UploadSuccess />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default UserLayout
