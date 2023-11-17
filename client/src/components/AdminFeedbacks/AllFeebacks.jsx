import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { adminApiService } from '@/services/apiService'
import { AdminUserDelete } from '../Alerts/AdminUserDelete'

const AllFeebacks = () => {
  const [feedbacks, setFeedbacks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminApiService.getAllFeedbacks()
        const data = response.data
        setFeedbacks(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        // setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDelete = (id) => {
    try {
      const updatedUsers = feedbacks.filter((user) => user.id !== id)
      setFeedbacks(updatedUsers)
    } catch (error) {
      console.error('Error approving product:', error)
    }
  }

  return (
    <div className=" flex items-center justify-center mx-4 lg:mx-32  shadow-md">
      <Table className="rounded-md dark:bg-slate-950 border divide-y divide-gray-200">
        <TableHeader>
          <tr>
            <TableHead className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Sl No.
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
              Name
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Email
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Message
            </TableHead>
            <TableHead className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
              Action
            </TableHead>
          </tr>
        </TableHeader>
        <TableBody>
          {feedbacks.map((feedback, index) => (
            <TableRow key={feedback.id}>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {index + 1}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {feedback.name}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {feedback.email}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {feedback.message}
              </TableCell>

              <TableCell className="px-6 py-4 flex items-center justify-center whitespace-nowrap">
                <AdminUserDelete
                  userId={feedback._id}
                  handleDelete={handleDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AllFeebacks
