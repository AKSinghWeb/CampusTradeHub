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
import { AdminProductDelete } from '../Alerts/AdminProductDelete'

const AllProducts = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminApiService.getAllProducts()
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

  const handleDelete = (productId) => {
    try {
      const updatedProducts = products.filter(
        (product) => product.id !== productId
      )
      setProducts(updatedProducts)
    } catch (error) {
      console.error('Error approving product:', error)
    }
  }

  return (
    <div className=" flex items-center justify-center mx-4 lg:mx-32  shadow-md">
      <Table className="rounded-md dark:bg-slate-950 border divide-y divide-gray-200">
        <TableHeader>
          <tr>
            <TableHead className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Sl No.
            </TableHead>
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
          </tr>
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
                {product.user ? product.user.username : 'Anonymous'}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {new Date(product.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {product.status === 'approved' ? (
                  <Badge className="bg-green-600 text-white">
                    {' '}
                    {product.status}
                  </Badge>
                ) : product.status === 'pending' ? (
                  <Badge className="bg-yellow-600 text-white">
                    {' '}
                    {product.status}
                  </Badge>
                ) : product.status === 'sold' ? (
                  <Badge className="bg-blue-600 text-white">
                    {' '}
                    {product.status}
                  </Badge>
                ) : (
                  <Badge className="bg-red-600 text-white">
                    {' '}
                    {product.status}
                  </Badge>
                )}
              </TableCell>
              <TableCell className="px-6 py-4 flex items-center justify-center whitespace-nowrap">
                <div className="flex  items-center space-x-2">
                  <Link to={`/products/${product.id}`}>
                    <Button className="w-24">
                      <span className="">View</span>
                    </Button>
                  </Link>
                  <AdminProductDelete
                    handleDelete={handleDelete}
                    productId={product.id}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AllProducts
