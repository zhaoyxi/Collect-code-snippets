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
