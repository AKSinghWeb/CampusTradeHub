// Dropdown.js
import { MoreVertical, User } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { RateAndReview } from './RateAndReviewPop'
import { Separator } from '../ui/separator'
import { ReportUser } from './ReportUser'
import { Link } from 'react-router-dom'

const Dropdown = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', closeDropdown)

    return () => {
      document.removeEventListener('click', closeDropdown)
    }
  }, [])

  const handlePopupItemClick = (event) => {
    if (!event.target.classList.contains('close-review-popup')) {
      event.stopPropagation()
    }
  }

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div onClick={toggleDropdown} className="cursor-pointer">
        <MoreVertical size={36} className="mr-1" />
      </div>

      {isOpen && (
        <div
          className="top-[-5px] left-9 absolute mt-2 w-36 bg-white dark:bg-slate-950 rounded-sm shadow-md transition-transform scale-100 ring-[0.3px] ring-gray-300 dark:ring-lime-50 transform origin-top"
          onClick={handlePopupItemClick}
        >
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div
              className="block mx-1  px-2 py-1 text-sm rounded-sm hover:bg-gray-200 dark:hover:bg-slate-800"
              role="menuitem"
            >
              <Link to={`/user-profile/${product.user.id}`}>
                <div className="cursor-pointer flex items-center">
                  {' '}
                  <User size={16} className="mr-2" /> View Profile
                </div>
              </Link>
            </div>
            <Separator className="w-[95%] mx-auto my-1" />
            <div
              className="block mx-1 px-2 py-1 text-sm rounded-sm hover:bg-gray-200 dark:hover:bg-slate-800 menu-item"
              role="menuitem"
            >
              {console.log('product.user.id', product.user.id)}
              <RateAndReview userId={product.user.id} />
            </div>
            <Separator className="w-[95%] mx-auto my-1" />

            <div
              className="block mx-1  px-2 py-1 text-sm rounded-sm hover:bg-gray-200 dark:hover:bg-slate-800"
              role="menuitem"
            >
              <ReportUser userId={product.user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dropdown
