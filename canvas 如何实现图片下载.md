
# Canvas

在 Canvas 中实现图片下载，可以使用 HTMLCanvasElement.toDataURL() 方法将 Canvas 上的图像导出为 base64 格式的图片数据，然后将这些数据转换为 Blob 对象，最后通过创建一个下载链接实现图片下载。

以下是一个示例代码：

```javascript
const canvas = document.querySelector("#myCanvas");
const downloadLink = document.querySelector("#downloadLink");
const context = canvas.getContext("2d");

// 绘制图像到 Canvas 上
const img = new Image();
img.onload = function() {
  context.drawImage(img, 0, 0);
};

// 设置图像源并加载
img.src = "example.png";

// 点击下载按钮时触发
downloadLink.addEventListener("click", function() {
  const imageData = canvas.toDataURL("image/png");
  const blob = dataURLtoBlob(imageData);
  const url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = "example.png";
});

// 将 base64 格式的数据转换为 Blob 对象
function dataURLtoBlob(dataURL) {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

```

在上面的代码中，我们首先获取到 Canvas 元素和下载按钮元素，并获取 Canvas 的 2D 上下文。然后，我们将图像绘制到 Canvas 上，并在下载按钮上添加一个点击事件，用于触发下载操作。在点击事件处理函数中，我们将 Canvas 数据转换为 Blob 对象，并将其创建为一个下载链接，然后将下载链接的 href 和 download 属性设置为要下载的图片的 URL 和文件名。最后，用户点击下载链接时，浏览器会将图片下载到本地。

注意，这种方法在下载大型图片时可能会出现性能问题，因为需要将整个图像数据编码为 base64 格式，然后再转换为 Blob 对象。如果需要下载大型图片，建议使用其他方式，如在服务器端生成临时下载链接等。
