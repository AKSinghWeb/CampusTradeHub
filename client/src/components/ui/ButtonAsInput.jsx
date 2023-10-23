import * as React from 'react'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'

const ButtonAsInput = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div>
      <div
        className={cn(
          'flex cursor-pointer items-center justify-center h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="mr-2 hidden md:block">Search for products...</span>
        <span className="mr-2 md:hidden">Search...</span>
        <Search className="h-5 w-5" />
      </div>
    </div>
  )
})

ButtonAsInput.displayName = 'ButtonAsInput'

export { ButtonAsInput }
