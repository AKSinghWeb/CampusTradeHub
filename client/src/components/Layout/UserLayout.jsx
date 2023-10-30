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
import SalesInbox from '@/pages/SalesInbox'
import { useState } from 'react'

const UserLayout = () => {
  const [headerHeight, setHeaderHeight] = useState(0)

  const handleHeightCalculated = (height) => {
    setHeaderHeight(height)
  }
  console.log(headerHeight)
  return (
    <div>
      <UserHeader onHeightCalculated={handleHeightCalculated} />
      <ScrollToTop />
      <div className={`pt-[88px] w-full`}>
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
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/new-product" element={<ProductForm />} />
          <Route path="/new-product-success" element={<UploadSuccess />} />
          <Route path="/sales-inbox" element={<SalesInbox />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default UserLayout
