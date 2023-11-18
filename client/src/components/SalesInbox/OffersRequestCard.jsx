import { CheckCircle2, Loader2, XCircle } from 'lucide-react'
import { Button } from '../ui/button'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { OfferAcceptDialog } from '../Offer/OfferAcceptDialog'
import { ViewContactPopover } from '../Offer/ViewContactPopover'
import { offersApiService } from '@/services/apiService'
import useApiCall from '@/hooks/useApiCall'

export function OffersRequestsCard({ offer }) {
  const [createAcceptOfferApiCall, loading] = useApiCall(
    offersApiService.acceptOffer
  )

  const handleReject = async () => {
    try {
      const response = await createAcceptOfferApiCall(
        'Offer Rejected',
        offer._id,
        {
          response: 'rejected',
          contactInformation: {
            mobileNumber: '',
            alternateMobileNumber: '',
            email: '',
          },
        }
      )
      if (response.success) {
        window.location.reload()
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <Card className="bg-gray-100 lg:w-[40%] w-[90%] min-h-[250px] my-4 lg:m-[1%] dark:bg-slate-800 flex flex-col justify-between">
      <CardHeader className="px-8 text-left">
        <CardTitle className="text-xl">
          {offer.buyer.name} want&apos;s to buy your product
        </CardTitle>
        <CardDescription>
          Accept the offer to get their contact information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="px-8 w-full gap-8">
            <div className="flex gap-5">
              <div className="">
                <img
                  src={`${offer.product.images}`} // Replace with actual image source
                  alt="Product Image"
                  className="w-full h-32 object-cover mb-4 rounded-md"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <h3 className="text-xl font-semibold mb-2">
                  {offer.product.title}
                </h3>
                <p className=" mb-2">Offered Price: ₹{offer.offerPrice}</p>
              </div>
            </div>
            <div>
              <p className="">
                <span className="font-semibold">Description: </span>
                {offer.description}
              </p>
            </div>
          </div>
          <div className="flex gap-5 mt-5 mx-8">
            {offer.status === 'accepted' ? (
              <>
                <Button
                  disabled={true}
                  className="w-full bg-green-600 hover:bg-green-800"
                >
                  <CheckCircle2 size={18} className="inline-block mr-2" />
                  Accepted
                </Button>
                <ViewContactPopover
                  name={offer.buyer.name}
                  mobileNumber={offer.mobileNumber}
                  alternateMobileNumber={offer.alternateMobileNumber}
                  email={offer.email}
                />
              </>
            ) : offer.status === 'rejected' ? (
              <Button
                disabled={true}
                className="w-full bg-red-600 hover:bg-red-800"
              >
                <XCircle size={18} className="inline-block mr-2" />
                Rejected
              </Button>
            ) : (
              <>
                <OfferAcceptDialog offerId={offer._id} />
                <Button
                  variant="destructive"
                  className="w-full dark:bg-red-600 hover:bg-red-800 dark:hover:bg-red-800"
                  onClick={handleReject}
                >
                  {loading ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : (
                    <XCircle size={18} className="inline-block mr-2" />
                  )}
                  Reject
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
