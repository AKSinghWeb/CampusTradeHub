import {
  MessageSquare,
  MapPinned,
  UserCircle,
  BadgeIndianRupee,
} from 'lucide-react' // Import Lucide React icons
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Separator } from '../components/ui/separator'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { ProductSellerMenu } from '../components/ProductPage/ProductSellerMenu'

const ProductPage = ({ product }) => {
  return (
    <section className="flex min-h-screen items-center py-32 body-font overflow-hidden">
      <div className="container max-sm:px-4  mx-auto">
        <div className="lg:w-4/5 p-6 mx-auto rounded-md shadow-2xl dark:shadow-gray-600 dark:shadow-lg flex flex-wrap">
          {/* Product Image */}
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto object-cover object-center rounded"
            src={product.image}
          />

          {/* Product Details */}
          <div className="lg:w-1/2 w-full px-4 lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-lg title-font text-gray-500 dark:text-lime-50 tracking-widest">
              {product.category}
            </h2>
            <h1 className=" text-3xl title-font font-medium mb-1">
              {product.title}
            </h1>

            {/* Rating Stars */}
            <div className="flex my-4 items-center">
              <Badge className="mr-3 bg-green-600 hover:bg-green-600">
                Available
              </Badge>
              <Badge className="mr-3 bg-red-600 hover:bg-red-600">Sold</Badge>
              <div className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2">
                <MapPinned />
                <span className="text-gray-600 dark:text-lime-50 ml-3">
                  {product.location}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="leading-relaxed mb-2">{product.description}</p>

            {/* Seller Name */}

            {/* Price and Buttons */}
            <div className="flex my-8">
              <span className=" flex items-center title-font font-medium text-5xl text-[#3b82f6]">
                ₹{product.price}
              </span>
            </div>
            <div className="flex mb-8">
              <Button className="flex mr-4 border-0 py-2  focus:outline-none rounded">
                <BadgeIndianRupee size={20} className="mr-2" />
                Make an offer
              </Button>
              <Button
                variant="outline"
                className="flex py-2 bg-slate-300 text-black rounded"
              >
                <MessageSquare size={20} className="mr-2" />
                Contact Seller
              </Button>
            </div>
            <Separator />
            <div className="flex items-center py-2">
              <Avatar>
                <AvatarImage src={product.seller.avatar} />
                <AvatarFallback>
                  <UserCircle />
                </AvatarFallback>
              </Avatar>
              <div className="flex-row ml-3 items-center">
                <span className="font-bold">{product.seller.name}</span>
                <div>
                  <span className="">Seller</span>
                  <span className="ml-3">4.5</span>
                  <span className="ml-1">★</span>
                </div>
              </div>
              <div className="ml-6">
                <ProductSellerMenu />
              </div>
            </div>
            <Separator />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductPage
