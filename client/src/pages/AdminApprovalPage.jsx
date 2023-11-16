// YourAdminPage.js

import ProductApprovalList from '@/components/ProductApprovalTable/ProductApprovalList'

// import ProductApprovalList from "@/components/ProductApprovalList";

const AdminApprovalPage = () => {
  // Sample product data

  return (
    <div className="min-h-screen">
      <h2 className="text-xl m-12 font-semibold mb-4">Product Approval List</h2>
      <ProductApprovalList />
    </div>
  )
}

export default AdminApprovalPage
