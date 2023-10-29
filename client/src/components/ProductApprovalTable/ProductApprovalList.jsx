// ProductApprovalList.js

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { adminApiService } from '@/services/apiService'
import { Link } from 'react-router-dom'
import { Badge } from '../ui/badge'
// import { Check, X } from 'lucide-react'

const ProductApprovalList = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminApiService.getPendingProducts()
        const data = response.data
        setProducts(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        // setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleApprove = async (productId) => {
    try {
      // Call your API service to approve the product
      await adminApiService.approveProduct(productId)
      // Update the local state or refetch data
      const updatedProducts = products.map((product) =>
        product.id === productId ? { ...product, status: 'approved' } : product
      )
      setProducts(updatedProducts)
    } catch (error) {
      console.error('Error approving product:', error)
    }
  }

  const handleReject = async (productId) => {
    try {
      // Call your API service to reject the product
      await adminApiService.rejectProduct(productId)
      // Update the local state or refetch data
      const updatedProducts = products.map((product) =>
        product.id === productId ? { ...product, status: 'rejected' } : product
      )
      setProducts(updatedProducts)
    } catch (error) {
      console.error('Error rejecting product:', error)
    }
  }

  return (
    <div className=" flex items-center justify-center mx-4 lg:mx-32  shadow-md">
      <Table className="rounded-md dark:bg-slate-950 border divide-y divide-gray-200">
        <TableHeader>
          <TableHead className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
            Sl No.
          </TableHead>{' '}
          <TableHead className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
            Title
          </TableHead>
          <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
            Category
          </TableHead>
          <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
            Price
          </TableHead>
          <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
            User
          </TableHead>
          <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
            Date Posted
          </TableHead>
          <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
            Status
          </TableHead>
          <TableHead className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
            Actions
          </TableHead>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {index + 1}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {product.title}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {product.category}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {product.price}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {product.user.name}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {new Date(product.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {product.status === 'pending' && (
                  <Badge className="bg-yellow-600">Pending</Badge>
                )}
                {/* {product.status === 'approved' && (
                <Badge className="text-green-600">
                  Approved Icon
                </Badge>
              )}
              {product.status === 'rejected' && (
                <Badge className="text-red-600">
                  Rejected Icon
                </Badge>
              )}
              {product.status === 'Sold' && (
                <Badge className="text-blue-600">
                  Sold Icon
                </Badge>
              )} */}
              </TableCell>
              <TableCell className="px-6 py-4 flex items-center justify-center whitespace-nowrap">
                <div className="flex  items-center space-x-2">
                  <Link to={`/products/${product.id}`}>
                    <Button className="w-24">
                      <span className="">View</span>
                    </Button>
                  </Link>
                  {product.status === 'pending' && (
                    <>
                      <Button
                        onClick={() => handleApprove(product.id)}
                        className="bg-green-500 hover:bg-green-600 text-center text-white w-24 px-4 py-2 transition-all duration-300  "
                      >
                        <span className="">Approve</span>
                      </Button>
                      <Button
                        onClick={() => handleReject(product.id)}
                        className="bg-red-500 hover:bg-red-600 text-center text-white w-24 px-4 py-2 transition-all duration-300 "
                      >
                        <span className="">Reject</span>
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ProductApprovalList
