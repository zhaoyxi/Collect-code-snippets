# fetch

```javascript
class Fetch {
  constructor() {
    this.interceptors = {
      request: [],
      response: []
    }
  }

  request(url, options) {
    const { method = 'get', data, headers, timeout } = options

    return new Promise((resolve, reject) => {
      const controller = new AbortController()
      const signal = controller.signal
      const requestOptions = {
        method,
        headers: {
          ...headers
        },
        signal
      }

      if (data) {
        requestOptions.body = JSON.stringify(data)
      }

      // 添加请求拦截器
      this.interceptors.request.forEach((handler) => {
        requestOptions.headers = { ...requestOptions.headers, ...handler(requestOptions.headers) }
      })

      fetch(url, requestOptions)
        .then((response) => {
          // 添加响应拦截器
          this.interceptors.response.forEach((handler) => {
            response = handler(response)
          })

          resolve(response.json())
        })
        .catch((error) => {
          if (error.name === 'AbortError') {
            // 取消请求
            reject(new Error('Request canceled'))
          } else {
            reject(error)
          }
        })

      if (timeout) {
        setTimeout(() => {
          // 请求超时，取消请求
          controller.abort()
        }, timeout)
      }
    })
  }

  get(url, options = {}) {
    return this.request(url, { ...options, method: 'get' })
  }

  post(url, options = {}) {
    return this.request(url, { ...options, method: 'post' })
  }

  // 添加请求拦截器
  useRequestInterceptor(handler) {
    this.interceptors.request.push(handler)
  }

  // 添加响应拦截器
  useResponseInterceptor(handler) {
    this.interceptors.response.push(handler)
  }
}
```
