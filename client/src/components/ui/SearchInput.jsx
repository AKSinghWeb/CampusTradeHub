import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from './button'
import { useNavigate } from 'react-router-dom'
import useCustomToasts from '@/hooks/useCustomToasts'

const SearchInput = React.forwardRef(({ className, type, ...props }, ref) => {
  const [searchValue, setSearchValue] = React.useState('')

  const navigate = useNavigate()
  const showWarningToast = useCustomToasts().showWarningToast

  const handleInputChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchValue === '') {
      showWarningToast('Warning', 'Please enter a search term')
      return
    }

    navigate(`/products/search/${searchValue}`)
    const escKeyEvent = new KeyboardEvent('keydown', {
      key: 'Escape',
      keyCode: 27,
    })
    document.dispatchEvent(escKeyEvent)
  }

  return (
    <div>
      <form className="relative flex gap-3" onSubmit={handleSubmit}>
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          placeholder="items, brands, categories..."
          ref={ref}
          value={searchValue}
          onChange={handleInputChange}
          {...props}
        />
        <div>
          <Button type="submit">search</Button>
        </div>
      </form>
    </div>
  )
})

SearchInput.displayName = 'SearchInput'

export { SearchInput }
