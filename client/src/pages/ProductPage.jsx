import {
  MapPinned,
  UserCircle,
  PackageCheck,
  PackageX,
  Loader2,
  AlertTriangle,
  Edit3,
  Star,
} from 'lucide-react' // Import Lucide React icons
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { Separator } from '../components/ui/separator'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { useAuth } from '@/context/UserAuthContext'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { adminApiService, productApiService } from '@/services/apiService'
import { OfferDialog } from '@/components/Offer/OfferDialog'
import Dropdown from '@/components/ProductPage/DropDown'
import { AlertDialogSold } from '@/components/Alerts/AlertDialogSold'
import { AlertDialogDelete } from '@/components/Alerts/AlertDialogDelete'
import { ReportProduct } from '@/components/ProductPage/ReportProduct'

const ProductPage = () => {
  const { state } = useAuth()
  const isAdmin = state.user && state.user.role === 'admin'
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState({})

  const { productId } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isAdmin) {
          const response = await productApiService.getProduct(productId)
          const data = response.data
          setProduct(data)
        } else {
          const response = await adminApiService.getProduct(productId)
          const data = response.data
          setProduct(data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData() // No dependencies here
  }, [isAdmin, productId])

  const handleApprove = async (productId) => {
    try {
      // Call your API service to approve the product
      await adminApiService.approveProduct(productId)
      // Update the local state or refetch data
      setProduct({ ...product, status: 'approved' })
    } catch (error) {
      console.error('Error approving product:', error)
    }
  }

  const handleReject = async (productId) => {
    try {
      // Call your API service to reject the product
      await adminApiService.rejectProduct(productId)
      // Update the local state or refetch data

      setProduct({ ...product, status: 'rejected' })
    } catch (error) {
      console.error('Error rejecting product:', error)
    }
  }

  const checkOwnProduct = () => {
    if (!product.user) return false

    if (state.user.id === product.user.id) {
      return true
    }
    return false
  }

  return (
    <section className="flex min-h-screen mt-8 items-center lg:pb-52 body-font overflow-hidden">
      <div className="container max-sm:px-4  mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="animate-spin h-24 w-24 text-blue-500" />
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Loading Products
            </p>
          </div>
        ) : !product ? (
          // Show message when no products are available
          <div className="text-center">
            <p className="text-xl mt-8 md:mt-12 lg:mt-16 font-semibold text-gray-800 dark:text-gray-200">
              Products Information not available.
            </p>
          </div>
        ) : (
          <div className="lg:w-4/5 mb-8  p-6 mx-auto border rounded-md dark:bg-slate-900 shadow-2xl ">
            <div className="flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:my-6 border  object-cover object-center rounded-md"
                src={product.images}
              />

              {/* Product Details */}
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-lg title-font text-gray-500 dark:text-lime-50 tracking-widest">
                  {product.category}
                </h2>
                <h1 className=" text-3xl title-font font-medium mb-1">
                  {product.title}
                </h1>

                {/* Rating Stars */}
                <div className="flex my-4 items-center">
                  {product.status === 'sold' ? (
                    <Badge className="mr-3 bg-red-600 hover:bg-red-600">
                      Sold
                    </Badge>
                  ) : product.status === 'approved' ? (
                    <Badge className="mr-3 bg-green-600 hover:bg-green-600">
                      Available
                    </Badge>
                  ) : product.status === 'pending' ? (
                    <Badge className="mr-3 bg-yellow-600 hover:bg-yellow-600">
                      Pending
                    </Badge>
                  ) : product.status === 'rejected' ? (
                    <Badge className="mr-3 bg-red-600 hover:bg-red-600">
                      Rejected
                    </Badge>
                  ) : (
                    <Badge className="mr-3 bg-green-600 hover:bg-green-600">
                      Approved
                    </Badge>
                  )}

                  <div className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2">
                    <MapPinned />
                    <span className="text-gray-600 dark:text-lime-50 ml-3">
                      {product.location}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="leading-relaxed mb-2">{product.description}</p>

                <div className="flex my-8">
                  <span className=" flex items-center title-font font-medium text-5xl text-[#3b82f6]">
                    {product.price === 0 ? (
                      <span>Free</span>
                    ) : (
                      <span>&#x20B9; {product.price}</span>
                    )}
                  </span>
                </div>
                <div className="flex mb-8">
                  {isAdmin && product.status == 'pending' && (
                    <>
                      <Button
                        onClick={() => handleApprove(product.id)}
                        className="flex mr-4 w-32 border-0 py-2 focus:outline-none rounded"
                      >
                        <PackageCheck size={20} className="mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleReject(product.id)}
                        className="flex py-2 w-32 bg-red-600 hover:bg-red-700 hover:text-white text-white rounded"
                      >
                        <PackageX size={20} className="mr-2" />
                        Reject
                      </Button>
                    </>
                  )}{' '}
                  {isAdmin && product.status !== 'pending' && (
                    <>
                      <AlertDialogDelete productId={productId} />
                    </>
                  )}
                  {!isAdmin && state.isLoggedIn && (
                    <>
                      {checkOwnProduct() ? (
                        <>
                          <div className="flex flex-wrap gap-4">
                            <Link to={`/edit-product/${productId}`}>
                              <Button className="flex  bg-blue-600 hover:bg-blue-700 border-0 py-2 focus:outline-none rounded">
                                <Edit3 size={20} className="mr-2" />
                                Edit
                              </Button>
                            </Link>
                            <AlertDialogSold productId={productId} />
                            <AlertDialogDelete productId={productId} />
                          </div>
                        </>
                      ) : (
                        <OfferDialog productId={productId} />
                      )}
                    </>
                  )}
                  {!isAdmin && !state.isLoggedIn && (
                    <p className=" flex items-center justify-center font-semibold text-muted-foreground">
                      <AlertTriangle size={20} className=" mr-2 text-red-600" />{' '}
                      Please Login/Signup to contact the Seller.
                    </p>
                  )}
                </div>
                <Separator />
                <div className="flex items-center py-2">
                  {product.user && (
                    <>
                      <Avatar>
                        <AvatarImage src={product.user.profilePicture} />
                        <AvatarFallback>
                          <UserCircle />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-row ml-3 items-center">
                        <span className="font-bold">{product.user.name}</span>
                        <div className="flex items-center">
                          <span className="">Seller</span>
                          <span className="ml-3">
                            {product.user.averageRating < 1 ? (
                              ''
                            ) : (
                              <div className="flex items-center">
                                {product.user.averageRating}
                                <Star
                                  color=""
                                  fill="rgb(250 204 21)"
                                  size={20}
                                  className="ml-1 mb-1 inline"
                                />
                              </div>
                            )}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                  {!isAdmin && state.isLoggedIn && (
                    <>
                      {checkOwnProduct() ? (
                        <></>
                      ) : (
                        <div className="ml-6">
                          <Dropdown product={product} />
                        </div>
                      )}
                    </>
                  )}
                </div>

                <Separator />
              </div>
            </div>
            <div className="flex max-lg:mt-4">
              <div>
                Posted on:{' '}
                <span className="font-semibold">
                  {new Date(product.createdAt).toLocaleDateString()}
                </span>
              </div>

              {!isAdmin && state.isLoggedIn && (
                <>
                  {checkOwnProduct() ? (
                    <></>
                  ) : (
                    <>
                      <Separator
                        orientation="vertical"
                        className="h-6 w-[1.5px] bg-gray-400 mx-2"
                      />
                      <ReportProduct productId={productId} />
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProductPage
