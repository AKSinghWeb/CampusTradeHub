// make an admin layout

import { Routes, Route } from 'react-router-dom'
import Footer from '../Layout/Footer'
import ProductPage from '../../pages/ProductPage'
import AdminHome from '../../pages/AdminHome'
import AdminHeader from '../AdminHome/AdminHeader'
import NotFound from './NotFound'
import ScrollToTop from '../ScrollToTop'
import AdminApprovalPage from '@/pages/AdminApprovalPage'
import AllProductsPage from '@/pages/AdminAllProducts'
import AllUsersPage from '@/pages/AdminAllUsers'
import UserProfile from '@/pages/UserProfile'
import AllReportsPage from '@/pages/AdminAllReports'
import AllFeedbacksPage from '@/pages/AdminFeedbacks'

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <ScrollToTop />
      <div className={`pt-[88px] w-full`}>
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/admin/approval" element={<AdminApprovalPage />} />
          <Route path="/admin/products" element={<AllProductsPage />} />
          <Route path="/admin/users" element={<AllUsersPage />} />
          <Route path="/admin/reports" element={<AllReportsPage />} />
          <Route path="/admin/feedbacks" element={<AllFeedbacksPage />} />
          <Route path="/user-profile/:userId" element={<UserProfile />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default AdminLayout
