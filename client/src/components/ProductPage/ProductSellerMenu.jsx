import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical } from 'lucide-react'
// import { RateAndReview } from './RateAndReviewPop'
import { LoginDialog } from '../LoginSignup/LoginDialog'

export function ProductSellerMenu() {
  return (
    <DropdownMenu modal={true}>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <MoreVertical size={36} className="mr-1" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 pr-4">
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            View User Profile
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator /> */}
          {/* <DropdownMenuItem className="cursor-pointer">
            All Postings by User{' '}
          </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            {/* <RateAndReview /> */}
            <LoginDialog />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            Report User
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
