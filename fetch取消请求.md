# 用fetch请求接口是如何取消上一次的请求

使用fetch请求接口，取消上一次的请求可以通过AbortController实现。

AbortController是浏览器原生的一个API，用于取消fetch请求，可以在请求之前创建AbortController对象，然后使用其signal属性作为fetch方法的第二个参数。当我们需要取消请求时，调用AbortController对象的abort方法，fetch请求会被中止。

下面是一个简单的示例代码：

```javascript
const controller = new AbortController(); // 创建 AbortController 对象
const signal = controller.signal; // 获取 AbortController 的 signal 属性

fetch(url, { signal }) // 将 signal 作为 fetch 方法的第二个参数
  .then(response => {
    // 处理响应结果
  })
  .catch(error => {
    // 处理错误
  });

// 当需要取消请求时，调用 controller.abort()
controller.abort();

```

需要注意的是，如果服务器已经接收到并处理了请求，fetch方法的Promise仍然会resolve，只是在then回调中返回的response.status会变成499（Chrome的错误码），我们需要在then回调中手动处理这种情况。另外，fetch请求还需要使用try...catch语句来处理网络错误等异常情况。

综上，可以将取消请求的操作封装成一个函数，方便在需要的时候调用。以下是一个简单的封装示例：

```javascript
function fetchWithCancel(url, options) {
  const controller = new AbortController();
  const signal = controller.signal;
  const requestOptions = { ...options, signal };

  const fetchPromise = fetch(url, requestOptions)
    .then(response => {
      if (response.status === 499) {
        throw new Error('请求被取消');
      }
      // 处理响应结果
      return response.json();
    });

  const cancel = () => {
    controller.abort();
  };

  return { fetchPromise, cancel };
}

```

在这个示例中，fetchWithCancel函数返回一个包含fetch方法的Promise对象和取消请求的函数cancel。使用时只需要调用fetchWithCancel方法获取Promise对象，需要取消请求时调用cancel函数即可。
