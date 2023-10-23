// AuthContext.js
import { createContext, useReducer, useContext } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const initialState = {
    isLoggedIn: false,
    user: {
      username: '',
      role: 'admin',
    },
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload,
        }
      case 'LOGOUT':
        return {
          ...state,
          isLoggedIn: false,
          user: {
            username: '',
            role: '',
          },
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
