// import { Button } from '../ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import ProfileButton from '../ui/ProfileButton'
import Container from '../ui/Container'
import { Link } from 'react-router-dom'
import ThemeToggler from '../ThemeToggle'
import { useEffect, useRef, useState } from 'react'
import logo from '../../assets/logo.svg'
import { useAuth } from '@/context/UserAuthContext'
import { LoginDialog } from '../LoginSignup/LoginDialog'
import { Button } from '../ui/button'

const Header = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const { state } = useAuth()
  const headerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
      setPrevScrollPos(currentScrollPos)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [prevScrollPos])

  return (
    <Container>
      <header
        ref={headerRef}
        className={`fixed top-0 z-50 w-full dark:bg-slate-900 bg-opacity-90 shadow-lg backdrop-filter backdrop-blur-md py-3 px-4 lg:px-8 border-b transition-all duration-300 ease-in-out ${
          visible ? '' : 'opacity-0 transform translate-y-[-100%]'
        }`}
      >
        <div className="relative pr-2 sm:px- lg:px-8 flex h-16 items-center justify-between w-full">
          <div className="flex justify items-center">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 mx-2 md:hidden w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex py-6 flex-col gap-4">
                  <div>
                    <Link
                      to={'/admin/approval'}
                      className="block px-2 py-1 font-semibold text-lg"
                    >
                      <SheetClose>Pending Requests</SheetClose>
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={'/admin/products'}
                      className="block px-2 py-1 font-semibold text-lg"
                    >
                      <SheetClose>All Products</SheetClose>
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={'/admin/users'}
                      className="block px-2 py-1 font-semibold text-lg"
                    >
                      <SheetClose>All Users</SheetClose>
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={'/admin/reports'}
                      className="block px-2 py-1 font-semibold text-lg"
                    >
                      <SheetClose>Reports</SheetClose>
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={'/admin/feedbacks'}
                      className="block px-2 py-1 font-semibold text-lg"
                    >
                      <SheetClose>User Feedbacks</SheetClose>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            <div>
              <Link to={'/'}>
                <img
                  className="w-12 h-12 lg:w-14 lg:h-14 ml-1 mr-4 mb-2"
                  src={logo}
                  alt="logo"
                />
              </Link>
            </div>
            <h1 className="text-xl hidden lg:block font-bold">
              <Link to={'/'} className="ml-4 lg:ml-0">
                CampusTradeHub
              </Link>
            </h1>
            <nav className="mx-6 items-center space-x-4 lg:space-x-6 hidden md:flex">
              <div>
                <Button
                  asChild
                  variant="ghost"
                  className="text-md  hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Link
                    to={'/admin/approval'}
                    className="text-sm font-medium transition-colors "
                  >
                    Pending Requests
                  </Link>
                </Button>
              </div>
              <div>
                <Button
                  asChild
                  variant="ghost"
                  className="text-md  hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Link
                    to={'/admin/products'}
                    className="text-sm font-medium transition-colors "
                  >
                    All Products
                  </Link>
                </Button>
              </div>
              <div>
                <Button
                  asChild
                  variant="ghost"
                  className="text-md  hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Link
                    to={'/admin/users'}
                    className="text-sm font-medium transition-colors "
                  >
                    All Users
                  </Link>
                </Button>
              </div>
              <div>
                <Button
                  asChild
                  variant="ghost"
                  className="text-md  hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Link
                    to={'/admin/reports'}
                    className="text-sm font-medium transition-colors "
                  >
                    Reports
                  </Link>
                </Button>
              </div>
              <div>
                <Button
                  asChild
                  variant="ghost"
                  className="text-md  hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Link
                    to={'/admin/feedbacks'}
                    className="text-sm font-medium transition-colors "
                  >
                    User Feedbacks
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
          <div className="flex items-center">
            <ThemeToggler />
            {state.isLoggedIn ? <ProfileButton /> : <LoginDialog />}
          </div>
        </div>
      </header>
    </Container>
  )
}

export default Header
