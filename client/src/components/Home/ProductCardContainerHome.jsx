// import { useEffect } from 'react'
import ProductCard from '../ProductCard'
const products = [
  {
    id: 1,
    name: 'Laptop',
    category: 'Electronics',
    price: 800,
    image: 'https://placekitten.com/800/400',
    description: 'Powerful laptop for all your computing needs.',
  },
  {
    id: 2,
    name: 'Fiction Book Set',
    category: 'Books',
    price: 30,
    image: 'https://placekitten.com/800/401',
    description: 'A collection of engaging fiction books.',
  },
  {
    id: 3,
    name: 'Vintage Armchair',
    category: 'Furniture',
    price: 120,
    image: 'https://placekitten.com/800/402',
    description: 'Classic armchair for a touch of elegance.',
  },
  {
    id: 4,
    name: 'Graphic Design T-Shirt',
    category: 'Clothing',
    price: 25,
    image: 'https://placekitten.com/800/403',
    description: 'Stylish t-shirt with a unique graphic design.',
  },
  {
    id: 5,
    name: 'Smartphone',
    category: 'Electronics',
    price: 600,
    image: 'https://placekitten.com/800/404',
  },
  {
    id: 6,
    name: 'Classic Novel Set',
    category: 'Books',
    price: 35,
    image: 'https://placekitten.com/800/405',
  },
  {
    id: 7,
    name: 'Modern Coffee Table',
    category: 'Furniture',
    price: 150,
    image: 'https://placekitten.com/800/406',
  },
  {
    id: 8,
    name: 'Casual Hoodie',
    category: 'Clothing',
    price: 30,
    image: 'https://placekitten.com/800/407',
  },
  {
    id: 9,
    name: 'Tablet',
    category: 'Electronics',
    price: 400,
    image: 'https://placekitten.com/800/408',
  },
  {
    id: 10,
    name: 'Mystery Novel',
    category: 'Books',
    price: 20,
    image: 'https://placekitten.com/800/409',
  },
  {
    id: 11,
    name: 'Comfortable Sofa',
    category: 'Furniture',
    price: 250,
    image: 'https://placekitten.com/800/410',
  },
  {
    id: 12,
    name: 'Sporty Sneakers',
    category: 'Clothing',
    price: 40,
    image: 'https://placekitten.com/800/411',
  },
]

const ProductCardsContainer = () => {
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
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            View More Products
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCardsContainer
