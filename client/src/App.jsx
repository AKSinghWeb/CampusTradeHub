import './App.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useAuth } from './context/UserAuthContext'
import AdminLayout from './components/Layout/AdminLayout'
import UserLayout from './components/Layout/UserLayout'
import { Toaster } from './components/ui/toaster'

AOS.init()


function App() {
  const { state } = useAuth()
  return (
    <div>
      {state.user && state.user.role === 'admin' ? (
        <AdminLayout />
      ) : (
        <UserLayout />
      )}
      <Toaster />
    </div>
  )
}

export default App
