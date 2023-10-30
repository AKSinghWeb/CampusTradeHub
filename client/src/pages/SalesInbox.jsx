// Import necessary dependencies
import { SentRequestsCard } from '@/components/Offer/SentRequestsCard'
import { OffersRequestsCard } from '@/components/SalesInbox/OffersRequestCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { offersApiService } from '@/services/apiService'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

// SalesInbox component
const SalesInbox = () => {
  const [offers, setOffers] = useState([])
  const [myOffers, setMyOffers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await offersApiService.getOffers()
        const data = response.data
        setOffers(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleTabListClick = (value) => {
    if (value === 'salesRequest') {
      const fetchData = async () => {
        try {
          const response = await offersApiService.getOffers()
          const data = response.data
          setOffers(data)
        } catch (error) {
          console.error('Error fetching data:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchData()
    } else if (value === 'myRequest') {
      const fetchData = async () => {
        try {
          const response = await offersApiService.getSentOffers()
          const data = response.data
          setMyOffers(data)
        } catch (error) {
          console.error('Error fetching data:', error)
        } finally {
          setLoading(false)
        }
      }

      fetchData()
    }
  }

  return (
    <Tabs
      onValueChange={handleTabListClick}
      defaultValue="salesRequest"
      orientation="vertical"
    >
      <div className="flex flex-col lg:flex-row min-h-screen ">
        {/* Left side with tabs */}
        <div className="lg:w-1/6 lg:border flex max-md:justify-center">
          <TabsList className="h-fit max-md:gap-3 mx-4 bg-transparent lg:w-full flex justify-stretch lg:flex-col mt-8 max-md:my-6">
            <TabsTrigger
              value="salesRequest"
              className="px-4 my-1 py-2 cursor-pointer w-full hover:bg-gray-100 data-[state=active]:border whitespace-nowrap data-[state=active]:bg-gray-50 dark:data-[state=active]:bg-gray-800 dark:hover:bg-gray-800 data-[state=active]:text-foreground data-[state=active]:shadow "
            >
              Sales Requests
            </TabsTrigger>
            <TabsTrigger
              value="myRequest"
              className="px-4 my-1 py-2 cursor-pointer w-full hover:bg-gray-100 data-[state=active]:border whitespace-nowrap data-[state=active]:bg-gray-50 dark:data-[state=active]:bg-gray-800 dark:hover:bg-gray-800 data-[state=active]:text-foreground data-[state=active]:shadow "
            >
              Sent Requests
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Right side with content */}
        <div className="flex-grow lg:p-4">
          <TabsContent
            className="flex flex-wrap justify-center"
            value="salesRequest"
            key={1}
          >
            {loading ? (
              <div className="flex flex-col mt-64 items-center justify-center h-full">
                <Loader2 className="animate-spin h-24 w-24 text-blue-500" />
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                  Loading Offers
                </p>
              </div>
            ) : (
              // Show message when no products are available
              offers.map((offer) => (
                <OffersRequestsCard key={offer.id} offer={offer} />
              ))
            )}
          </TabsContent>
          <TabsContent
            className="flex flex-wrap justify-center"
            value="myRequest"
            key={2}
          >
            {loading ? (
              <div className="flex flex-col mt-64 items-center justify-center h-full">
                <Loader2 className="animate-spin h-24 w-24 text-blue-500" />
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                  Loading Offers
                </p>
              </div>
            ) : (
              // Show message when no products are available
              myOffers.map((offer) => (
                <SentRequestsCard key={offer.id} offer={offer} />
              ))
            )}
          </TabsContent>
        </div>
      </div>
    </Tabs>
  )
}

export default SalesInbox
