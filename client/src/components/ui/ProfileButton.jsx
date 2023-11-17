import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserCircle } from 'lucide-react'
import { useAuth } from '@/context/UserAuthContext'
import { logout } from '@/utils/authFunctions'
import { Link, useNavigate } from 'react-router-dom'
import useCustomToasts from '@/hooks/useCustomToasts'
import { Button } from './button'

const ProfileButton = () => {
  const { state, dispatch } = useAuth()
  const navigate = useNavigate()
  const { showSuccessToast } = useCustomToasts()

  const handleLogout = () => {
    logout(dispatch)
    showSuccessToast('Logout successful', 'You have been logged out')
    navigate('/')
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex">
            <Avatar>
              <AvatarImage src={state.user.profilePicture} />
              <AvatarFallback>
                <UserCircle />
              </AvatarFallback>
            </Avatar>
            <div className="max-md:hidden flex flex-col w-full items-start justify-center ml-2">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {state.user.name}
              </span>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                @{state.user.username}
              </span>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to="/user/profile">
            <DropdownMenuItem className="cursor-pointer">
              My Profile
            </DropdownMenuItem>
          </Link>
          {state.user && state.user.role === 'user' ? (
            <div>
              <Link to="/user/my-postings">
                <DropdownMenuItem className="cursor-pointer">
                  My Postings
                </DropdownMenuItem>
              </Link>
              <Link to="/user/reviewsAndRatings">
                <DropdownMenuItem className="cursor-pointer">
                  Reviews & Ratings
                </DropdownMenuItem>
              </Link>{' '}
            </div>
          ) : null}
          <Link to="/user/settings">
            <DropdownMenuItem className="cursor-pointer">
              Settings
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-1">
            <Button className="h-7 w-full text-xs" onClick={handleLogout}>
              Log Out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ProfileButton
