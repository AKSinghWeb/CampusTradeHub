// AuthFunctions.js

export const login = (dispatch, user, authToken) => {
  // Dispatch a 'LOGIN' action to update the authentication state
  dispatch({
    type: 'LOGIN',
    payload: {
      ...user,
    },
  })

  // Store the auth token in local storage
  storeAuthToken(authToken)
}

export const logout = (dispatch) => {
  // Dispatch a 'LOGOUT' action to update the authentication state
  dispatch({ type: 'LOGOUT' })

  // Remove the auth token from local storage
  removeAuthToken()
}

export const storeAuthToken = (authToken) => {
  // Store the auth token in local storage
  localStorage.setItem('authToken', authToken)
}

export const getAuthToken = () => {
  // Retrieve the auth token from local storage
  return localStorage.getItem('authToken')
}

export const removeAuthToken = () => {
  // Remove the auth token from local storage
  localStorage.removeItem('authToken')
}
