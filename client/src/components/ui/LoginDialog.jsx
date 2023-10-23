import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  //   DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { LoginSignup } from './LoginSignup'
import logo from '../../assets/logo.svg'

export function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="" variant="default">
          Login/Signup
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[450px]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex justify-center items-center">
              <img src={logo} alt="Logo" className="h-10 mb-1 w-10 mr-2" />
              <span className="text-2xl">CampusTradeHub</span>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center">
            Log In or Sign Up to buy and sell items
          </DialogDescription>
        </DialogHeader>
        <LoginSignup />
      </DialogContent>
    </Dialog>
  )
}
