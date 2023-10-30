import { CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '../ui/button'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ViewContactPopover } from '../Offer/ViewContactPopover'

export function SentRequestsCard({ offer }) {
  return (
    <Card className="bg-gray-100 lg:w-[40%] w-[90%] min-h-[250px] my-4 lg:m-[1%] dark:bg-slate-800 flex flex-col justify-between">
      <CardHeader className="px-12 text-left">
        <CardTitle className=" text-xl">
          {offer.status === 'accepted' ? (
            <>{offer.seller.name} accepted your offer</>
          ) : offer.status === 'rejected' ? (
            <>{offer.seller.name} rejected your offer</>
          ) : (
            <>{offer.seller.name} has not responded to your offer</>
          )}
        </CardTitle>
        <CardDescription>
          {offer.status === 'accepted' ? (
            <>You can now view the seller contact info</>
          ) : offer.status === 'rejected' ? (
            <>You can try sending another offer</>
          ) : (
            <>You can wait for the seller to respond</>
          )}
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
                {/* {console.log(offer)} */}
                <ViewContactPopover
                  name={offer.seller.name}
                  mobileNumber={offer.contactInformation.mobileNumber}
                  alternateMobileNumber={
                    offer.contactInformation.alternateMobileNumber
                  }
                  email={offer.contactInformation.email}
                />
              </>
            ) : offer.status === 'rejected' ? (
              <>
                <Button
                  variant="destructive"
                  disabled={true}
                  className="w-full dark:bg-red-800"
                >
                  <XCircle size={18} className="inline-block mr-2" />
                  Rejected
                </Button>
              </>
            ) : (
              <Button
                disabled={true}
                className="w-full bg-yellow-600 hover:bg-yellow-800"
              >
                <CheckCircle2 size={18} className="inline-block mr-2" />
                Pending
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
