// ServicesSection.js
import { CheckCircle, BadgeIndianRupee, Gift } from 'lucide-react'

const ServicesSection = () => {
  return (
    <div className="my-32">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl mb-16 font-black tracking-wide  text-center">
          CampusTradeHub Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1: User Friendliness */}
          <div className="flex flex-col items-center">
            <CheckCircle size={48} className="text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">User Friendliness</h3>
            <p className="text-gray-700 dark:text-lime-50">
              Our platform is built with simplicity in mind. From creating
              listings to connecting with buyers or sellers, our design ensures
              a seamless experience for everyone.
            </p>
          </div>

          {/* Service 2: Privacy */}
          <div className="flex flex-col items-center">
            <BadgeIndianRupee size={48} className="text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Earning Opportunity</h3>
            <p className="text-gray-700 dark:text-lime-50">
              Unlock earning opportunities by selling your used items on
              CampusTradeHub. CampusTradeHub provides a hassle-free way to
              showcase your items and connect with potential buyers.
            </p>
          </div>

          {/* Service 3: Donation */}
          <div className="flex flex-col items-center">
            <Gift size={48} className="text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Donation</h3>
            <p className="text-gray-700 dark:text-lime-50">
              Make a positive impact on the campus community with our donation
              feature. Easily contribute to charitable causes or support fellow
              students by donating items you no longer need.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesSection
