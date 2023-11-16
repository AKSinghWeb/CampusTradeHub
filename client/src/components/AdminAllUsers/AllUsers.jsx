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
import { AdminUserDelete } from '../Alerts/AdminUserDelete'

const AllUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminApiService.getAllUsers()
        const data = response.data
        setUsers(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        // setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDelete = (userId) => {
    try {
      const updatedUsers = users.filter((user) => user.id !== userId)
      setUsers(updatedUsers)
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
              Username
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Name
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              email
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Contact Number
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Ratings
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Products
            </TableHead>
            <TableHead className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">
              Actions
            </TableHead>
          </tr>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {index + 1}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {user.username}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {user.name}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {user.email}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {user.contactNumber ? user.contactNumber : 'N/A'}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {user.averageRating}
              </TableCell>
              <TableCell className="px-6 py-4 whitespace-nowrap">
                {user.products.length}
              </TableCell>
              <TableCell className="px-6 py-4 flex items-center justify-center whitespace-nowrap">
                <div className="flex  items-center space-x-2">
                  <Link to={`/user-profile/${user.id}`}>
                    <Button className="w-24">
                      <span className="">View</span>
                    </Button>
                  </Link>
                  <AdminUserDelete
                    userId={user.id}
                    handleDelete={handleDelete}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AllUsers
