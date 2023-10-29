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
import { useNavigate } from 'react-router-dom'
import useCustomToasts from '@/hooks/useCustomToasts'

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
          <Avatar>
            <AvatarImage src={state.user.profilePicture} />
            <AvatarFallback>
              <UserCircle />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            My Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <span onClick={handleLogout}>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ProfileButton
