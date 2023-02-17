# 图片转换

通过请求图片并将其转换为 webp 格式的 Blob 对象，然后再将其作为 URL.createObjectURL 的参数，生成一个对应的 URL 地址，最后在页面上显示。

```javascript
// 将图片转换为 webp 格式的 Blob 对象
async function convertToWebp(url) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const blob = new Blob([buffer], { type: "image/jpeg" });
  const webpBlob = await createWebpBlob(blob);
  return webpBlob;
}

// 将 Blob 对象转换为 webp 格式的 Blob 对象
async function createWebpBlob(blob) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (webpBlob) => {
          resolve(webpBlob);
        },
        "image/webp",
        0.8
      );
    };

    img.onerror = function () {
      reject(new Error("Failed to load image"));
    };

    img.src = URL.createObjectURL(blob);
  });
}

// 在页面上显示转换后的图片
async function showImage(url) {
  const webpBlob = await convertToWebp(url);
  const webpUrl = URL.createObjectURL(webpBlob);

  const img = document.createElement("img");
  img.src = webpUrl;
  document.body.appendChild(img);
}

showImage("https://example.com/image.jpg");

```
