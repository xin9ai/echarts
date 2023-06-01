import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.bookbook.cc/api/data-view',
  timeout: 5000
})
// 请求拦截
instance.interceptors.request.use(
  (config) => {
    // config.headers.token = localStorage.getItem('token')
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截
instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default instance
