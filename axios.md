# axios

以下是一个完整功能的 Axios 拦截器示例，包括请求拦截、响应拦截和错误处理

在这个示例中，我们在创建 axios 实例时添加了请求拦截器和响应拦截器。在请求拦截器中，我们设置了请求头信息，可以在拦截器中进行一些请求的统一处理。

在响应拦截器中，我们对响应进行了统一处理，判断了响应的状态码，并根据不同的状态码显示提示信息。如果响应的状态码为 0，表示请求成功，则返回响应的数据；否则，将会抛出一个错误。

在错误处理中，我们判断了请求是否被取消，如果被取消，则不进行任何操作；否则，显示一个提示信息。最后，使用 Promise.reject 将错误继续抛出，以便在发起请求时进行处理。

```javascript
import axios from 'axios'
import { message } from 'ant-design-vue'

// 创建 axios 实例
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 设置请求头信息
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const { code, message } = response.data
    if (code !== 0) {
      message.error(message)
      return Promise.reject(response.data)
    }
    return response.data
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log('请求已被取消')
    } else {
      message.error('网络错误，请稍后重试')
    }
    return Promise.reject(error)
  }
)

export default instance


```

## 下面是一个具备拦截器和取消请求功能的完整封装示例

这个示例中，我们首先创建了一个 axios 实例，并添加了请求和响应拦截器。然后，我们封装了一个带取消功能的请求方法，使用了 axios.CancelToken 和 source.cancel() 方法实现了取消请求的功能。这个方法使用起来和普通的 axios 方法类似，只不过返回的是一个带有取消方法的 Promise 对象，可以在需要时调用 cancel() 方法来取消请求。

```javascript
import axios from 'axios';

// 创建一个 axios 实例
const instance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在请求发送之前做一些处理，比如加上 token
    config.headers.Authorization = `Bearer ${localStorage.getItem('token') || ''}`;
    return config;
  },
  (error) => {
    // 请求错误时做些事
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做些事
    return response;
  },
  (error) => {
    // 对响应错误做些事
    return Promise.reject(error);
  }
);

// 封装一个带取消功能的请求
function request(config) {
  // 创建一个 CancelToken
  const source = axios.CancelToken.source();

  // 将 CancelToken 放入请求参数中
  config.cancelToken = source.token;

  // 发送请求
  const promise = instance(config);

  // 添加取消方法到 promise 上
  promise.cancel = () => {
    source.cancel('Request canceled by user.');
  };

  return promise;
}

export default request;

```
