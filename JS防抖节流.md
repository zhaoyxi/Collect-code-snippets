# js防抖节流

防抖和节流都是解决高频触发事件导致性能问题的方法

防抖是指在事件触发后，等待一定时间再执行回调函数，如果在等待时间内又触发了事件，则重新等待一定时间。常见的应用场景是输入框输入后触发搜索。

以下是一个简单的防抖函数实现：

```javascript
function debounce(func, delay) {
  let timer = null;
  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
```

节流是指在一定时间内只执行一次回调函数。常见的应用场景是页面滚动时触发回调函数。

以下是一个简单的节流函数实现：

```javascript
function throttle(func, delay) {
  let timer = null;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}

```
