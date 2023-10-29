import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BadgeIndianRupee } from 'lucide-react'
import { Textarea } from '../ui/textarea'
import { useState } from 'react'

export function OfferDialog() {
  const [formData, setFormData] = useState({
    price: '',
    description: '',
    mobile: '',
    alternateMobile: '',
    email: '',
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((formData) => ({ ...formData, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    let errors = {}
    let isValid = true

    if (!formData.price) {
      errors.price = 'Price is required'
      isValid = false
    }

    if (!formData.mobile) {
      errors.mobile = 'Mobile number is required'
      isValid = false
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      errors.mobile = 'Mobile number should be 10 digits'
      isValid = false
    }
    if (!/^[0-9]{10}$/.test(formData.alternateMobile)) {
      errors.alternateMobile = 'Mobile number should be 10 digits'
      isValid = false
    }

    setErrors(errors)
    return isValid
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (validateForm()) {
      // Submit the form
      console.log('Form submitted', formData)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex mr-4 border-0 py-2 focus:outline-none rounded">
          <BadgeIndianRupee size={20} className="mr-2" />
          Make an offer
        </Button>
      </DialogTrigger>
      <DialogContent className=" max-md:top-[38%] max-w-[450px]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex justify-center items-center">
              <span className="text-2xl">Send Offer Request to Seller</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <Card className="">
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col mt-8 space-y-1.5">
                  <Label htmlFor="name">Offer Price</Label>
                  <Input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Price at which you would like to buy"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                  {errors.price && (
                    <span className=" text-sm font-semibold text-red-500">
                      {errors.price}
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    name="mobile"
                    placeholder="Enter your Mobile number "
                    value={formData.mobile}
                    onChange={handleInputChange}
                  />
                  {errors.mobile && (
                    <span className="  text-sm font-semibold text-red-500">
                      {errors.mobile}
                    </span>
                  )}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Any extra information"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></Textarea>
                </div>
                <div className="flex flex-col  space-y-1.5">
                  <Label htmlFor="alternateMobile">
                    Alternate Mobile Number
                  </Label>
                  <Input
                    id="alernateMobile"
                    name="alternateMobile"
                    placeholder="Aleternate Mobile Number if any"
                    value={formData.alternateMobile}
                    onChange={handleInputChange}
                  />
                  {errors.alternateMobile && (
                    <span className="  text-sm font-semibold text-red-500">
                      {errors.alternateMobile}
                    </span>
                  )}
                </div>
                <div className="flex flex-col  space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="Enter Email Information"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <DialogClose>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Deploy</Button>
            </CardFooter>
          </form>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
