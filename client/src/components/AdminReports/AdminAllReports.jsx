// Component to show all reports in the admin panel

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { adminApiService } from '@/services/apiService'
import { Link } from 'react-router-dom'
import { Badge } from '../ui/badge'

const AllReports = () => {
  const [reports, setReports] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminApiService.getAllReports()
        const data = response.data
        setReports(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        // setLoading(false)
      }
    }

    fetchData()
  }, [])

  //   const handleDelete = (reportId) => {
  //     try {
  //       const updatedreports = reports.filter((report) => report.id !== reportId)
  //       setReports(updatedreports)
  //     } catch (error) {
  //       console.error('Error approving product:', error)
  //     }
  //   }

  return (
    <div className=" flex items-center justify-center mx-4 lg:mx-32  shadow-md">
      <Table className="rounded-md dark:bg-slate-950 border divide-y divide-gray-200">
        <TableHeader>
          <tr>
            <TableHead className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Sl No.
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Date
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Reported By
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Report Type
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Reported User/Product
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Reason
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Descrtiption
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Status
            </TableHead>
            <TableHead className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
              Actions
            </TableHead>
          </tr>
        </TableHeader>
        <TableBody>
          {reports.map((report, index) => (
            <TableRow key={report.id}>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {index + 1}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {new Date(report.timestamp).toLocaleDateString()}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {report.reporter.username}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {report.reportType}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {report.reportType === 'user' ? (
                  <Link to={`/profile/${report.reportedUser.id}`}>
                    {report.reportedUser.username}
                  </Link>
                ) : (
                  <Link to={`/product/${report.reportedProduct.id}`}>
                    {report.reportedProduct.title}
                  </Link>
                )}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {report.reason}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {report.description}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {report.status === 'pending' ? (
                  <Badge className="bg-yellow-200 text-yellow-800">
                    Pending
                  </Badge>
                ) : (
                  <Badge className="bg-green-200 text-green-800">
                    Resolved
                  </Badge>
                )}
              </TableCell>
              <TableCell className="px-6 py-4 flex items-center justify-center whitespace-nowrap">
                <div className="flex  items-center space-x-2">
                  <Button className="w-24">
                    <span className="">Resolve</span>
                  </Button>
                  <Button className="w-24">
                    <span className="">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AllReports
