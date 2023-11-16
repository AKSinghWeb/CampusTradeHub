// component to scroll to top of page

import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  const [prevPath, setPrevPath] = useState(null)

  useEffect(() => {
    if (pathname !== prevPath) {
      window.scrollTo(0, 0)
      setPrevPath(pathname)
    }
  }, [pathname, prevPath])

  return null
}

export default ScrollToTop
