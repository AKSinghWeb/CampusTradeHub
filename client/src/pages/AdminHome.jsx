// import Sidebar from '@/components/Layout/AdminSidebar'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { adminApiService } from '@/services/apiService'
import { Flag, PackageCheck, ShieldCheck, UserCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AdminHome = () => {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminApiService.getStats()
        const data = response.data
        setStats(data)

        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    stats && (
      <div className="flex flex-col justify-center md:flex-row px-16 lg:px-64 py-32 min-h-screen ">
        <div className="grid gap-8 mx-auto md:grid-cols-1 lg:grid-cols-2 w-full">
          <Card className="flex flex-col justify-center max-w-md lg:h-4/5">
            <Link to={'/admin/approval'}>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="text-lg font-medium">
                    Pending Requests
                  </CardTitle>
                  <ShieldCheck size={24} className="text-[#3b82f6]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-6xl text-center mb-8 text-primary font-bold">
                  {stats.pendingProducts}
                </div>
              </CardContent>
            </Link>
          </Card>{' '}
          <Card className="flex flex-col justify-center max-w-md lg:h-4/5">
            <Link to={'/admin/products'}>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="text-lg font-medium">
                    Total Products Posted
                  </CardTitle>
                  <PackageCheck size={24} className="text-[#3b82f6]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-6xl text-center mb-8 text-primary font-bold">
                  {stats.totalProducts}
                </div>
              </CardContent>
            </Link>
          </Card>{' '}
          <Card className="flex flex-col justify-center max-w-md lg:h-4/5">
            <Link to={'/admin/users'}>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="text-lg font-medium">
                    Total Users
                  </CardTitle>
                  <UserCheck size={24} className="text-[#3b82f6]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-6xl text-center mb-8 text-primary font-bold">
                  {stats.users}
                </div>
              </CardContent>
            </Link>
          </Card>{' '}
          <Card className="flex flex-col justify-center max-w-md lg:h-4/5">
            <Link to={'/admin/reports'}>
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="text-lg font-medium">
                    Total Reports
                  </CardTitle>
                  <Flag size={24} className="text-[#3b82f6]" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-6xl text-center mb-8 text-primary font-bold">
                  {stats.reports}
                </div>
              </CardContent>
            </Link>
          </Card>{' '}
        </div>
      </div>
    )
  )
}

export default AdminHome
