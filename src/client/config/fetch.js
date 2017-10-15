import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 5000    // 响应时间
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'  // 配置请求头
// axios.defaults.baseURL = '你的接口地址' // 配置接口地址

// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  // 在请求发送之前做一些事
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, function (error) {
  // 当出现请求错误是做一些事
  return Promise.reject(error)
})

// 添加一个返回拦截器
axios.interceptors.response.use(function (response) {
  // 对返回的数据进行一些处理
  return response
}, function (error) {
  // 对返回的错误进行一些处理
  return Promise.reject(error)
})

// 返回在vue模板中的调用接口
export default function (method, url, params) {
  return new Promise((resolve, reject) => {
    if (method === 'GET' || method === 'DELETE') {
      params = qs.stringify(params)
    }
    axios({
      method: method,
      url: url,
      data: method === 'POST' || method === 'PUT' ? params : null,
      params: method === 'GET' || method === 'DELETE' ? params : null,
      // baseURL: root,
      withCredentials: false
    })
    .then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
    .catch((error) => {
      reject(error)
    })
  })
}