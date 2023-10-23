// ProductCard.js
import { Book, Monitor, Coffee, ShoppingCart } from 'lucide-react'
import { Button } from './ui/button'

const getCategoryIcon = (category) => {
  switch (category.toLowerCase()) {
    case 'electronics':
      return <Monitor size={24} />
    case 'books':
      return <Book size={24} />
    case 'furniture':
      return <Coffee size={24} />
    case 'clothing':
      return <ShoppingCart size={24} />
    default:
      return null
  }
}

const ProductCard = ({ product }) => {
  return (
    <div className="border border-gray-300 rounded overflow-hidden shadow-md transition-transform duration-400 ease-in-out hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 object-cover"
      />
      <div className="p-4 flex flex-col h-40 justify-between">
        <div>
          <div className="flex items-center mb-3">
            {getCategoryIcon(product.category)}
            <h3 className="text-lg font-semibold ml-2">{product.name}</h3>
          </div>
          <p className="text-sm text-gray-700 dark:text-lime-50 mb-2">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-lg font-bold">&#x20B9; {product.price}</p>
          </div>
          <Button className=" font-bold ">Contact Seller</Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
