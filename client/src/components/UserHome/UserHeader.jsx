// import { Button } from '../ui/button'
import {
  Sheet,
  SheetClose,
  // SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ChevronDown, Menu } from 'lucide-react'
import ProfileButton from '../ui/ProfileButton'
import Container from '../ui/Container'
import { Link } from 'react-router-dom'
import ThemeToggler from '../ThemeToggle'
import { useEffect, useRef, useState } from 'react'
import logo from '../../assets/logo.svg'
import { SearchBtnPopUp } from './SearchButtonPopUp'
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

  const [isDropdownOpen, setDropdownOpen] = useState(false)

  const handleMouseEnter = () => {
    setDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    setDropdownOpen(false)
  }

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen)
  }

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
                      to={'/products/all'}
                      className="block px-2 py-1 font-semibold text-lg"
                    >
                      <SheetClose>Products</SheetClose>
                    </Link>
                  </div>
                  <div>
                    <div
                      onClick={toggleDropdown}
                      className="relative inline-block text-left"
                    >
                      <div
                        id="dropdownHoverButton"
                        className="flex items-center px-2 py-1 font-semibold text-lg"
                      >
                        <span className="font-semibold text-lg">
                          Categories
                        </span>
                        <ChevronDown
                          size={20}
                          className={`ml-2 transition-transform duration-300 ease-in-out ${
                            isDropdownOpen ? 'rotate-[-180deg]' : 'rotate-0'
                          }`}
                        />
                      </div>

                      {/* Dropdown menu */}
                      {isDropdownOpen && (
                        <div
                          id="dropdownHover"
                          className="z-10 absolute top-full left-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                        >
                          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                              <Link
                                to="/products/books"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                <SheetClose>Books</SheetClose>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/products/electronics"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                <SheetClose>Electronics</SheetClose>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/products/appliances"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                <SheetClose>Appliances</SheetClose>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/products/clothing"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                <SheetClose>Clothing</SheetClose>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/products/sports"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                <SheetClose>Sports and fitness</SheetClose>
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/products/free"
                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                <SheetClose>Free Items</SheetClose>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <Link
                      to={'/new-product'}
                      className="block px-2 py-1 font-semibold text-lg"
                    >
                      <SheetClose>Sell Your Product</SheetClose>
                    </Link>
                  </div>
                  {state.isLoggedIn && (
                    <div>
                      <Link
                        to={'/sales-inbox'}
                        className="block px-2 py-1 font-semibold text-lg"
                      >
                        <SheetClose>Sales Inbox</SheetClose>
                      </Link>
                    </div>
                  )}
                  {!state.isLoggedIn && (
                    <div>
                      <Link
                        to={'/about'}
                        className="block px-2 py-1 font-semibold text-lg"
                      >
                        <SheetClose>About Us</SheetClose>
                      </Link>
                    </div>
                  )}
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
                    to={'/products/all'}
                    className="text-sm font-medium transition-colors "
                  >
                    Products
                  </Link>
                </Button>
              </div>
              <div>
                <div
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="relative inline-block text-left"
                >
                  <Button
                    variant="ghost"
                    id="dropdownHoverButton"
                    className="text-md  hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <span className="text-sm font-medium  ">Categories</span>
                    <ChevronDown
                      size={20}
                      className={`ml-2 transition-transform duration-300 ease-in-out ${
                        isDropdownOpen ? 'rotate-[-180deg]' : 'rotate-0'
                      }`}
                    />
                  </Button>

                  {/* Dropdown menu */}
                  {isDropdownOpen && (
                    <div
                      id="dropdownHover"
                      className="z-10 absolute top-full left-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                    >
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                          <Link
                            to="/products/books"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Books
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/products/electronics"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Electronics
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/products/appliances"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Appliances
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/products/clothing"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Clothing
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/products/sports"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Sports and fitness
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/products/donations"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Free Items
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Button
                  asChild
                  variant="ghost"
                  className="text-md  hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Link
                    to={'/new-product'}
                    className="text-sm font-medium transition-colors "
                  >
                    Sell Your Product
                  </Link>
                </Button>
              </div>
              {state.isLoggedIn && (
                <div>
                  <Button
                    asChild
                    variant="ghost"
                    className="text-md  hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Link
                      to={'/sales-inbox'}
                      className="text-sm font-medium transition-colors "
                    >
                      Sales Inbox
                    </Link>
                  </Button>
                </div>
              )}
              {!state.isLoggedIn && (
                <div>
                  <Button
                    asChild
                    variant="ghost"
                    className="text-md  hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Link
                      to={'/about'}
                      className="text-sm font-medium transition-colors "
                    >
                      About Us
                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
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
