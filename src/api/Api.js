import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const useApi = () => {
  const navigate = useNavigate()

  const Api = axios.create({
    baseURL: 'http://localhost:9000',
  })

  // Thêm interceptor để kiểm tra và cập nhật token
  Api.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem('accessToken')
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  const handleTokenRefreshError = (error) => {
    console.error('Error refreshing token:', error)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    navigate('/login')
  }

  // Thêm interceptor để xử lý lỗi token hết hạn và cập nhật token
  Api.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const originalRequest = error.config
      if (
        error &&
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          const data = {
            accessToken: localStorage.getItem('accessToken'),
            refreshToken: refreshToken,
          }
          const config = {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods':
                'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
          }
          try {
            const response = await axios.post(
              'http://localhost:9000/api/v1/auth/refresh-access-token',
              data,
              config
            )
            if (response.data.statusCode === 200) {
              localStorage.setItem(
                'accessToken',
                response.data.result.accessToken
              )
              return Api(originalRequest)
            } else {
              handleTokenRefreshError(response)
            }
          } catch (error) {
            console.error('Error refreshing token:', error)
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            navigate('/login')
          }
        } else {
          handleTokenRefreshError()
        }
      }
      return Promise.reject(error)
    }
  )

  return Api
}

export default useApi
