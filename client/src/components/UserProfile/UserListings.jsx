import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import Pagination from '@/components/Pagination'
import ProductCard from '@/components/ProductCard'
import { productApiService } from '@/services/apiService'

const UserListings = ({ type }) => {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [productsPerPage] = useState(6)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productApiService.getUserProducts()
        const data = response.data
        setProducts(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [type])

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 rounded-md p-8 md:p-12 lg:p-16">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-8">
        My Listings
      </h1>

      {loading ? (
        <div className="flex flex-col mt-64 items-center justify-center h-full">
          <Loader2 className="animate-spin h-24 w-24 text-blue-500" />
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Loading Products
          </p>
        </div>
      ) : products.length === 0 ? (
        // Show message when no products are available
        <div className="text-center">
          <p className="text-xl mt-8 md:mt-12 lg:mt-16 font-semibold text-gray-800 dark:text-gray-200">
            No products available.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {currentProducts.map((product) => (
              <div data-aos="fade-up" key={product.id}>
                {product.status === 'approved' ? (
                  <Link to={`/product/${product.id}`}>
                    <ProductCard product={product} user={true} />
                  </Link>
                ) : (
                  <ProductCard product={product} user={true} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 md:mt-12 lg:mt-16">
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={products.length}
              currentPage={currentPage}
              paginate={paginate}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default UserListings
