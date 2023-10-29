// apiService.js
import { getAuthToken } from '@/utils/authFunctions'
import axios from 'axios'

// const apiUrl = 'http://192.168.245.230:3000'
const apiUrl = 'http://172.17.22.212:3000'

export const userApiService = {
  getMyProfile: async (token) => {
    try {
      const response = await axios.get(`${apiUrl}/api/users/my-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      handleApiError(error)
    }
  },
}

export const productApiService = {
  createProduct: async (token, data) => {
    try {
      const response = await axios.post(`${apiUrl}/api/products`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    } catch (error) {
      handleApiError(error)
    }
  },
  getProducts: (category) => {
    if (category === 'all') {
      return axios.get(`${apiUrl}/api/products`)
    }
    return axios.get(`${apiUrl}/api/products/category/${category}`)
  },
  getProductslatest: (count) => {
    return axios.get(`${apiUrl}/api/products/count/${count}`)
  },
  getProduct: (id) => {
    return axios.get(`${apiUrl}/api/products/${id}`)
  },
  searchProducts: (search) => {
    return axios.get(`${apiUrl}/api/products/search?q=${search}`)
  },
}

export const authApiService = {
  login: async (username, password) => {
    try {
      const response = await axios.post(`${apiUrl}/api/login`, {
        username,
        password,
      })

      return response.data
    } catch (error) {
      handleApiError(error)
    }
  },

  signup: async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/api/users`, {
        ...data,
      })

      return response.data
    } catch (error) {
      handleApiError(error)
    }
  },
}

export const adminApiService = {
  getPendingProducts: async () => {
    try {
      return axios.get(`${apiUrl}/api/admin/products`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })
    } catch (error) {
      handleApiError(error)
    }
  },
  getProduct: async (id) => {
    try {
      return axios.get(`${apiUrl}/api/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      })
    } catch (error) {
      handleApiError(error)
    }
  },
  approveProduct: async (id) => {
    try {
      return axios.put(
        `${apiUrl}/api/admin/products/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      )
    } catch (error) {
      handleApiError(error)
    }
  },
  rejectProduct: async (id) => {
    try {
      return axios.put(
        `${apiUrl}/api/admin/products/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      )
    } catch (error) {
      handleApiError(error)
    }
  },
}

const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('API Error Response:', error.response)
    console.error('Status Code:', error.response.status)

    if (error.response.status === 400) {
      // Handle specific status code, e.g., Bad Request
      throw new Error('Bad Request: The server did not understand the request.')
    } else if (error.response.status === 401) {
      // Handle Unauthorized status code
      throw new Error(error.response.data.error)
    } else {
      // Handle other status codes as needed
      throw new Error(
        `Unexpected Error: Server responded with status ${error.response.status}`
      )
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.error('API No Response:', error.request)
    throw new Error('No response received from the server.')
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('API Error:', error.message)
    throw new Error('Unable to connect to the server')
  }
}
