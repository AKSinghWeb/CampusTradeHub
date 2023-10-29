// ProductCard.js
// import { Book, Monitor, Coffee, ShoppingCart } from 'lucide-react'
import { Button } from './ui/button'

import {
  Monitor,
  ShoppingCart,
  Dumbbell,
  Gift,
  Box,
  BookMarked,
  Armchair,
  Microwave,
} from 'lucide-react'

const getCategoryIcon = (category) => {
  const lowerCaseCategory = category.toLowerCase()

  switch (lowerCaseCategory) {
    case 'electronics':
      return <Monitor className="mr-2" />
    case 'books':
      return <BookMarked className="mr-2" />
    case 'furniture':
      return <Armchair className="mr-2" />
    case 'clothing':
      return <ShoppingCart className="mr-2" />
    case 'appliances':
      return <Microwave className="mr-2" />
    case 'sports and fitness':
      return <Dumbbell className="mr-2" />
    case 'donations':
      return <Gift className="mr-2" />
    default:
      // Use the Box icon as the default
      return <Box className="mr-2" />
  }
}

const ProductCard = ({ product }) => {
  return (
    <div className="border border-gray-300 rounded overflow-hidden shadow-md transition-transform duration-400 ease-in-out hover:scale-105">
      <img
        src={product.images}
        alt={product.name}
        className="w-full h-60 object-cover"
      />
      <div className="p-4 flex flex-col h-56 justify-between">
        <div>
          <div className="flex items-center mb-3">
            {getCategoryIcon(product.category)}
            {product.category}
          </div>
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <p className="text-sm overflow-hidden line-clamp-3 text-gray-700 dark:text-lime-50 mb-2">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-2xl text-blue-500 font-bold">
              &#x20B9; {product.price}
            </p>
          </div>
          <Button className=" font-bold ">Contact Seller</Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
