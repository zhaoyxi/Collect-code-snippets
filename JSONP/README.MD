# 使用 TypeScript 实现 JSONP 的示例代码

```javascript
type JsonpCallback = (data: any) => void;

function jsonp(url: string, callbackName: string, callback: JsonpCallback) {
  // 创建一个 script 元素
  const script = document.createElement("script");

  // 定义回调函数
  window[callbackName] = (data: any) => {
    // 调用回调函数，并传入响应数据
    callback(data);
    // 移除 script 元素
    script.parentNode?.removeChild(script);
    // 删除回调函数
    delete window[callbackName];
  };

  // 设置 script 元素的 src 属性
  script.src = `${url}&callback=${callbackName}`;

  // 将 script 元素添加到页面上
  document.body.appendChild(script);
}

// 使用示例
jsonp("http://example.com/api", "callback", (data: any) => {
  console.log(data);
});

```

```html
该函数接受三个参数：请求的 URL、回调函数名、回调函数。其中，回调函数将在 JSONP 请求成功后被调用，并传入响应数据作为参数。由于 JSONP 是通过动态添加 script 标签实现的，因此需要在回调函数中手动删除 script 元素和回调函数。
```
