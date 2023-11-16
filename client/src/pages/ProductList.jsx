import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import Pagination from '@/components/Pagination'
import ProductCard from '@/components/ProductCard'
import { productApiService } from '@/services/apiService'

const ProductList = ({ type }) => {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [productsPerPage] = useState(9)

  const { category, search } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === 'category') {
          const response = await productApiService.getProducts(category)
          const data = response.data
          setProducts(data)
        } else if (type === 'search') {
          const response = await productApiService.searchProducts(search)
          const data = response.data
          setProducts(data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [category, search, type])

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  )

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="min-h-screen mt-10 lg:mt-14 bg-gray-100 dark:bg-gray-900 rounded-md p-8 md:p-12 lg:p-16 mx-4 md:mx-8 lg:mx-16 my-8 md:my-16 lg:my-20">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-gray-200 mb-8">
        {type === 'category'
          ? `Explore Products: ${category} `
          : `Search Results: ${search}`}
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
                <Link to={`/product/${product.id}`}>
                  <ProductCard product={product} />
                </Link>
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

export default ProductList
