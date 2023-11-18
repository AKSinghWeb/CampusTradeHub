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
import { CheckCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { offersApiService } from '@/services/apiService'
import useApiCall from '@/hooks/useApiCall'
import { Link, useNavigate } from 'react-router-dom'

export function OfferAcceptDialog({ offerId }) {
  const [formData, setFormData] = useState({
    mobile: '',
    alternateMobile: '',
    email: '',
  })
  const [errors, setErrors] = useState({})

  const [createAcceptOfferApiCall, loading] = useApiCall(
    offersApiService.acceptOffer
  )
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((formData) => ({ ...formData, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    let errors = {}
    let isValid = true

    if (!formData.mobile) {
      errors.mobile = 'Mobile number is required'
      isValid = false
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      errors.mobile = 'Mobile number should be 10 digits'
      isValid = false
    }
    if (
      formData.alternateMobile &&
      !/^[0-9]{10}$/.test(formData.alternateMobile)
    ) {
      errors.alternateMobile = 'Mobile number should be 10 digits'
      isValid = false
    }

    setErrors(errors)
    return isValid
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (validateForm()) {
      try {
        const response = await createAcceptOfferApiCall(
          'Offer sent Successfully',
          offerId,
          {
            response: 'accepted',
            contactInformation: {
              mobileNumber: formData.mobile,
              alternateMobileNumber: formData.alternateMobile,
              email: formData.email,
            },
          }
        )
        if (response.success) {
          setSuccess(true)
          console.log('success', success)
          navigate('/sales-inbox')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-green-600 hover:bg-green-800">
          <CheckCircle2 size={18} className="inline-block mr-2" />
          Accept
        </Button>
      </DialogTrigger>
      <DialogContent className=" max-md:top-[38%] max-w-[450px]">
        {loading ? (
          <>
            {' '}
            <Loader2 className="animate-spin mr-2" /> <span>Please wait</span>
          </>
        ) : success ? (
          <>
            <CheckCircle size={64} className="text-green-500 mx-auto" />
            <h2 className="text-2xl font-semibold  text-center mt-4 mb-6">
              Your have accepted the buyers request!
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              Now you can view the buyers contact information.
            </p>
            <Link className="flex justify-center" to="/">
              <Button>Go to Home Page</Button>
            </Link>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>
                <div className="flex justify-center items-center">
                  <span className="text-xl">
                    Accept and share Contact Info.
                  </span>
                </div>
              </DialogTitle>
            </DialogHeader>
            <Card className="">
              <form onSubmit={handleSubmit}>
                <CardContent>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col mt-6 space-y-1.5">
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
                  <Button type="submit">Accept</Button>
                </CardFooter>
              </form>
            </Card>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
