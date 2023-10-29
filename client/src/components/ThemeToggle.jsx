import { Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { Button } from './ui/button'
import useCustomToasts from '@/hooks/useCustomToasts'

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme()
  const { showInfoToast } = useCustomToasts()

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle Theme"
      className="mx-3"
      onClick={() => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
        showInfoToast(
          `Theme has been set to ${theme === 'dark' ? 'light' : 'dark'} mode`
        )
      }}
    >
      <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  )
}

export default ThemeToggler
