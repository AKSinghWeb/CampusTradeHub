import { Button } from '../ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import ProfileButton from '../ui/ProfileButton'
import Container from '../ui/Container'
import { Link } from 'react-router-dom'
import ThemeToggler from '../Home/ThemeToggle'
import { useEffect, useState } from 'react'
import logo from '../../assets/logo.svg'
import { SearchBtnPopUp } from '../Home/SearchButtonPopUp'
import { LoginDialog } from '../ui/LoginDialog'
import { useAuth } from '@/context/UserAuthContext'

const Header = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const { state } = useAuth()

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

  const routes = [
    {
      href: '/product',
      label: 'Products',
    },
    {
      href: '/category',
      label: 'Categories',
    },
    {
      href: '/admin',
      label: 'Admin',
    },
  ]

  return (
    <Container>
      <header
        className={`fixed top-0 z-50 w-full bg-opacity-90 backdrop-filter backdrop-blur-md py-3 px-4 lg:px-12 border-b transition-all duration-300 ease-in-out ${
          visible ? '' : 'opacity-0 transform translate-y-[-100%]'
        }`}
      >
        <div className="relative pr-2 sm:px- lg:px-8 flex h-16 items-center justify-between w-full">
          <div className="flex justify items-center">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 md:hidden w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {routes.map((route, i) => (
                    <Link
                      to={route.href}
                      key={i}
                      className="block px-2 py-1 text-lg"
                    >
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <div>
              <img
                className="w-12 h-12 lg:w-14 lg:h-14 ml-1 mr-2 mb-2"
                src={logo}
                alt="logo"
              />
            </div>
            <h1 className="text-xl hidden lg:block font-bold">
              <Link to={'/'} className="ml-4 lg:ml-0">
                CampusTradeHub
              </Link>
            </h1>
          </div>
          <nav className="mx-6  items-center space-x-4 lg:space-x-6 hidden md:block">
            {routes.map((route, i) => (
              <Button
                asChild
                variant="ghost"
                className="hover:bg-secondary"
                key={i}
              >
                <Link
                  to={route.href}
                  className="text-sm font-medium transition-colors"
                >
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="flex items-center">
            <SearchBtnPopUp />
            <ThemeToggler />
            {state.isLoggedIn ? <ProfileButton /> : <LoginDialog />}
          </div>
        </div>
      </header>
    </Container>
  )
}

export default Header
