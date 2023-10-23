// make an admin layout

import { Routes, Route } from 'react-router-dom'
// import Home from '../../pages/Home'
import Footer from '../Layout/Footer'
import ProductPage from '../../pages/ProductPage'
import AdminHome from '../../pages/AdminHome'
import AdminHeader from './AdminHeader'
import { Button } from '../ui/button'
import { useAuth } from '@/context/UserAuthContext'

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
  const { dispatch } = useAuth()
  return (
    <div>
      <AdminHeader />
      <Routes>
        <Route path="/" element={<AdminHome />} />
        <Route
          path="/product"
          element={<ProductPage product={DummyProduct} />}
        />
        <Route
          path="/profile"
          element={<ProductPage product={DummyProduct} />}
        />
      </Routes>

      <Button
        onClick={() => {
          dispatch({ type: 'LOGOUT' })
        }}
      >
        Log out
      </Button>
      <Footer />
    </div>
  )
}

export default AdminLayout
