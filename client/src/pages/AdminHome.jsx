// import Sidebar from '@/components/Layout/AdminSidebar'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Boxes, LucideFlag, PackageCheck, UserCheck } from 'lucide-react'

const AdminHome = () => {
  return (
    <div className="flex flex-col justify-center md:flex-row px-16 lg:px-64 py-32 min-h-screen ">
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 w-full">
        <Card className="flex flex-col lg:gap-8 max-w-md lg:h-4/5">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-lg font-medium">Total Users</CardTitle>
              <UserCheck size={24} className="text-[#3b82f6]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl text-primary font-bold">1000</div>
            <p className="text-md my-2 text-gray-500">+20.1% from last month</p>
          </CardContent>
        </Card>{' '}
        <Card className="flex flex-col lg:gap-8 max-w-md lg:h-4/5">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-lg font-medium">
                {' '}
                Total Postings
              </CardTitle>
              <Boxes size={24} className="text-[#3b82f6]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl text-primary font-bold">2145</div>
            <p className="text-md my-2 text-gray-500">+20.1% from last month</p>
          </CardContent>
        </Card>{' '}
        <Card className="flex flex-col lg:gap-8 max-w-md lg:h-4/5">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-lg font-medium">
                Total Postings Sold
              </CardTitle>
              <PackageCheck size={24} className="text-[#3b82f6]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl text-primary font-bold">5456</div>
            <p className="text-md my-2 text-gray-500">+20.1% from last month</p>
          </CardContent>
        </Card>{' '}
        <Card className="flex flex-col lg:gap-8 max-w-md lg:h-4/5">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle className="text-lg font-medium">
                Total Reported Content
              </CardTitle>
              <LucideFlag size={24} className="text-[#3b82f6]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl text-primary font-bold">8848</div>
            <p className="text-md my-2 text-gray-500">+20.1% from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminHome
