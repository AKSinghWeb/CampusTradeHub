/* eslint-disable no-unused-vars */
// ProductForm.js
import { ImageUpload } from '@/components/ProductImageUpload'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import useApiCall from '@/hooks/useApiCall'
import useAuthorization from '@/hooks/useAuthorization'
import { productApiService } from '@/services/apiService'
import { getAuthToken } from '@/utils/authFunctions'


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import {
  PackagePlus,
  X,
  List,
  Package,
  FileText,
  IndianRupee,
  Loader2,
  Upload,
  Map,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditProductForm = () => {
  useAuthorization()
  const navigate = useNavigate()
  const productId = useParams().productId
  const [productLoading, setProductLoading] = useState(true)
  const [image, setImage] = useState(null)
  const [originalFilename, setOriginalFilename] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productApiService.getProduct(productId)
        const data = response.data
        setProduct({ ...data, category: '' })
        setImage(data.images)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setProductLoading(false)
      }
    }

    fetchData() // No dependencies here
  }, [productId])

  const [updateProductApiCall, loading] = useApiCall(
    productApiService.updateProduct
  )

  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    otherCategory: '',
    location: '',
  })
  const [productErrors, setFormErrors] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    otherCategory: '',
    location: '',
  })

  const suggestions = [
    'Books',
    'Electronics',
    'Appliances',
    'Clothing',
    'Sports',
    'Donations',
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }))
    setFormErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleCategoryChange = (e) => {
    const value = e
    setProduct((prevProduct) => ({ ...prevProduct, category: value }))
    setFormErrors((prev) => ({ ...prev, category: '' }))
  }

  const validateForm = () => {
    let errors = {}
    if (!product.title) {
      errors.title = 'Title is required'
    }
    if (!product.description) {
      errors.description = 'Description is required'
    } else if (product.description.length > 250) {
      errors.description = 'Description must be less than 250 characters long'
    }
    if (!product.price) {
      errors.price = 'Price is required'
    } else if (product.price < 0 || isNaN(product.price)) {
      errors.price = 'Price must be a positive number'
    }
    if (!product.category) {
      errors.category = 'Category is required'
    } else if (product.category.length < 3) {
      errors.category = 'Category must be at least 3 characters long'
    }

    if (product.category === 'Other' && !product.otherCategory) {
      errors.otherCategory = 'Other Category is required'
    } else if (
      product.category === 'Other' &&
      product.otherCategory.length < 3
    ) {
      errors.otherCategory = 'Other Category must be at least 3 characters long'
    }

    if (!product.location) {
      errors.location = 'Location is required'
    } else if (product.location.length < 3) {
      errors.location = 'Location must be at least 3 characters long'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const postData = new FormData()
    postData.append('title', product.title)
    postData.append('description', product.description)
    postData.append('price', product.price)
    postData.append(
      'category',
      product.category === 'Other' ? product.otherCategory : product.category
    )
    postData.append('location', product.location)
    {
      image instanceof Blob
        ? postData.append('productImage', image, originalFilename)
        : null
    }

    try {
      const response = await updateProductApiCall(
        'Product updated successfully!',
        productId,
        postData
      )
      console.log(response)
      navigate('/edit-product-success')
    } catch (error) {
      console.error('Product add failed', error)
    }
  }

  return (
    <div className="min-h-screen pt-12  flex px-4 lg:px-12 lg:pb-40 items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full xl:w-2/3 max-md:p-4 p-8 dark:bg-slate-900 flex flex-col gap-4 border rounded-md shadow-md "
      >
        <h1 className="flex items-center justify-center text-center font-bold text-3xl">
          {' '}
          <PackagePlus size={30} className="text-[#A97835] mr-2" /> Edit Your
          Product
        </h1>
        <div className="flex flex-col-reverse max-md:p-4 p-8 gap-8 lg:flex-row dark:bg-slate-900 border rounded-md ">
          {/* Image Upload Section */}
          <div className="flex flex-col  flex-1">
            <h2 className="text-2xl text-gray-500 max-md:text-center font-bold mb-6">
              Product Image
            </h2>
            <ImageUpload
              prevImage={productLoading ? null : product.productImage}
              image={image}
              setImage={setImage}
              setOriginalFilename={setOriginalFilename}
            />
          </div>

          {/* Product Fields Section */}

          <div className="flex-1 flex flex-col gap-4">
            <h2 className="text-2xl max-md:text-center font-bold mb-2 text-gray-500">
              Product Details
            </h2>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="title">Product Title</Label>
                <div className="relative flex items-center">
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    value={product.title}
                    onChange={handleInputChange}
                    placeholder="Enter the product title"
                    className="p-2 pr-6"
                  />
                  <span className="absolute right-1">
                    <Package size={18} className="text-gray-400" />
                  </span>
                </div>
                {productErrors.title && (
                  <p className="text-red-500 ml-2 font-semibold text-sm">
                    {productErrors.title}
                  </p>
                )}
              </div>
            </div>
            <div className="">
              <Label htmlFor="description">Description</Label>
              <div className="relative flex items-center">
                <Textarea
                  id="description"
                  name="description"
                  value={product.description}
                  onChange={handleInputChange}
                  placeholder="Enter the product description"
                  rows="3"
                  className="p-2 pr-6"
                />
                <span className="absolute right-1 top-2">
                  <FileText size={18} className="text-gray-400" />
                </span>
              </div>
              {productErrors.description && (
                <p className="text-red-500 ml-2 font-semibold text-sm">
                  {productErrors.description}
                </p>
              )}
            </div>
            <div className="">
              <Label htmlFor="category">Category</Label>
              <div className="relative flex items-center">
                <Select
                  id="category"
                  name="category"
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger id="category" className="">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>
                      {suggestions.map((fruit, index) => (
                        <SelectItem key={index} value={fruit}>
                          {fruit}
                        </SelectItem>
                      ))}
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {productErrors.category && (
                <p className="text-red-500 ml-2 font-semibold text-sm">
                  {productErrors.category}
                </p>
              )}
            </div>
            {product.category === 'Other' && (
              <div className="flex-1">
                <div className="relative flex items-center">
                  <Input
                    type="text"
                    id="otherCategory"
                    name="otherCategory"
                    value={product.otherCategory}
                    onChange={handleInputChange}
                    placeholder="Enter the product category"
                    className="p-2 pr-6 "
                  />
                </div>
                {productErrors.otherCategory && (
                  <p className="text-red-500 ml-2 font-semibold text-sm">
                    {productErrors.otherCategory}
                  </p>
                )}
              </div>
            )}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="price">Price (₹)</Label>
                <div className="relative flex items-center">
                  <Input
                    type="number"
                    id="price"
                    name="price"
                    disabled={product.category === 'Donations'}
                    value={product.category === 'Donations' ? 0 : product.price}
                    onChange={handleInputChange}
                    placeholder="Enter the product price"
                    className="p-2 pr-6"
                  />
                  <span className="absolute right-1">
                    <IndianRupee size={18} className="text-gray-400" />
                  </span>
                </div>
                {productErrors.price && (
                  <p className="text-red-500 ml-2 font-semibold text-sm">
                    {productErrors.price}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <Label htmlFor="location">Location</Label>
                <div className="relative flex items-center">
                  <Input
                    type="text"
                    id="location"
                    name="location"
                    value={product.location}
                    onChange={handleInputChange}
                    placeholder="Enter the product location"
                    className="p-2"
                  />
                  <span className="absolute right-2">
                    <Map size={18} className="text-gray-400" />
                  </span>
                </div>
                {productErrors.location && (
                  <p className="text-red-500 ml-2 font-semibold text-sm">
                    {productErrors.location}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-8 lg:w-2/4 lg:mx-auto">
          <Button
            variant="outline"
            className="flex flex-1 py-2 bg-red-600 hover:bg-red-700 hover:text-white text-white rounded"
            onClick={() => navigate('/')}
          >
            <X size={20} className="mr-2" />
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="flex py-2 flex-1">
            {loading ? (
              <>
                {' '}
                <Loader2 className="animate-spin mr-2" />{' '}
                <span>Please wait</span>
              </>
            ) : (
              <div className="flex">
                <Upload size={20} className="mr-2" />
                Update Product
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditProductForm
