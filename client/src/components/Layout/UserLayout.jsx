// make an admin layout

import UserHeader from '../UserHome/UserHeader'
import { Routes, Route } from 'react-router-dom'
import Home from '../../pages/Home'
import Footer from '../Layout/Footer'
import ProductPage from '../../pages/ProductPage'
import AdminPage from '../../pages/AdminHome'
import ProductForm from '@/pages/NewProduct'
import ProductList from '@/pages/ProductList'
import NotFound from './NotFound'
import UploadSuccess from '../UploadSuccess'
import ScrollToTop from '../ScrollToTop'
import SalesInbox from '@/pages/SalesInbox'
import EditProductForm from '@/pages/EditProduct'
import UserProfile from '@/pages/UserProfile'
import MyUserProfile from '../../pages/MyUserProfile'
import UpdateSuccess from '../updateSuccess'

const UserLayout = () => {
  return (
    <div>
      <UserHeader />
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
          <Route path="/user/:tab" element={<MyUserProfile />} />
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/new-product" element={<ProductForm />} />
          <Route
            path="/edit-product/:productId"
            element={<EditProductForm />}
          />
          <Route path="/new-product-success" element={<UploadSuccess />} />
          <Route path="/edit-product-success" element={<UpdateSuccess />} />

          <Route path="/sales-inbox" element={<SalesInbox />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default UserLayout
