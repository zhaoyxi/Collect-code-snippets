# EventBus

```javascript
class EventBus {
  constructor() {
    this.listeners = {};
  }

  /**
   * Add an event listener for the specified event type.
   *
   * @param {string} eventType - The event type to listen for.
   * @param {function} listener - The callback function to invoke when the event occurs.
   */
  addListener(eventType, listener) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(listener);
  }

  /**
   * Remove an event listener for the specified event type.
   *
   * @param {string} eventType - The event type to remove the listener from.
   * @param {function} listener - The listener function to remove.
   */
  removeListener(eventType, listener) {
    if (!this.listeners[eventType]) {
      return;
    }
    const index = this.listeners[eventType].indexOf(listener);
    if (index !== -1) {
      this.listeners[eventType].splice(index, 1);
    }
  }

  /**
   * Emit an event of the specified type, with optional data.
   *
   * @param {string} eventType - The type of event to emit.
   * @param {any} [data] - Optional data to pass to the event listeners.
   */
  emit(eventType, data) {
    if (!this.listeners[eventType]) {
      return;
    }
    this.listeners[eventType].forEach((listener) => {
      listener(data);
    });
  }
}

上述代码创建了一个名为EventBus的类，它包含三个方法：

addListener(eventType, listener) - 添加事件监听器，以便在事件发生时调用回调函数。
removeListener(eventType, listener) - 从事件类型中删除事件监听器。
emit(eventType, data) - 发出指定类型的事件，可选地传递数据给事件监听器。
使用此实现，您可以创建一个新的事件总线实例，并向其添加和删除监听器，例如：


```javascript

// 创建一个新的事件总线实例
const eventBus = new EventBus();

// 添加一个名为“message”的事件监听器
eventBus.addListener("message", (data) => {
  console.log("Received message:", data);
});

// 触发名为“message”的事件，并传递一些数据
eventBus.emit("message", "Hello, world!");

// 删除名为“message”的事件监听器
eventBus.removeListener("message", callback);

```

在上述示例中，我们创建了一个名为eventBus的事件总线实例，并将一个名为message的事件监听器添加到该实例中。然后，我们触发了message事件，并将字符串"Hello, world!"作为数据传递给监听器。最后，我们从事件总线实例中删除了message事件监听器。
