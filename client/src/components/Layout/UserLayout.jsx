// make an admin layout

import UserHeader from '../Layout/UserHeader'
import { Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home'
import Footer from '../Layout/Footer'
import ProductPage from '../../pages/ProductPage'
import AdminPage from '../../pages/AdminHome'

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/product"
          element={<ProductPage product={DummyProduct} />}
        />
        <Route
          path="/profile"
          element={<ProductPage product={DummyProduct} />}
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default UserLayout
