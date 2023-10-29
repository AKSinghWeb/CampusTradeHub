// import { useEffect } from 'react'
import { useEffect, useState } from 'react'
import ProductCard from '../ProductCard'
import { Link } from 'react-router-dom'
import { productApiService } from '@/services/apiService'

const ProductCardsContainer = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await productApiService.getProductslatest(12)
      const data = response.data
      setProducts(data)
    }

    fetchData()
  }, [])

  return (
    <div className=" bg-gray-100 dark:bg-gray-800 rounded-md py-12 mx-4 my-12">
      <div className="container mx-auto">
        <h2 className="text-4xl sm:text-5xl mb-8 font-black tracking-wide md:text-left text-center">
          Latest{' '}
          <span className="bg-primary text-gray-100 px-4 transform -skew-x-12 mt-3 inline-block">
            Postings
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
          {products.map((product) => (
            <div data-aos="fade-up" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link to="/products/all">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              View More Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCardsContainer
