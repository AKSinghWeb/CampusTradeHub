import './App.css'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import axios from 'axios'

function App() {
  const getUsers = async () => {
    const token = localStorage.getItem('jwtToken')
    const response = await axios.get('http://localhost:3000/api/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log(response.data)
  }

  return (
    <>
      <LoginForm />
      <RegistrationForm />
      <button
        className="w-300 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        onClick={getUsers}
      >
        Get Users
      </button>
    </>
  )
}

export default App
