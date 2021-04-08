export function compressImages(obj) {
  if(!(obj.file instanceof File)) throw 'file应该为File类型'
  return new Promise((resolve, reject) => {
    const reader = new FileReader()  // 对象允许Web应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容
    const img = new Image();
    if (obj.file.type.indexOf("image") == 0) {
      reader.readAsDataURL(obj.file); // 方法会读取指定的 Blob 或 File 对象
    }
    // 文件base64化，以便获知图片原始尺寸
    reader.onload = function (e) {
      img.src = e.target.result;
      obj.compressBeforeShiftBase64(e.target.result)
    };
    // 缩放图片需要的canvas
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    // base64地址图片加载完毕后
    img.onload = function () {
      // 图片原始尺寸
      var originWidth = this.width;
      var originHeight = this.height;
      // 最大尺寸限制
      var maxWidth = obj.maxWidth || 400, maxHeight = obj.maxHeight ||400;
      // 目标尺寸
      var targetWidth = originWidth, targetHeight = originHeight;
      // 图片尺寸超过400x400的限制
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
          // 更宽，按照宽度限定尺寸
          targetWidth = maxWidth;
          targetHeight = Math.round(maxWidth * (originHeight / originWidth)); // 返回四舍五入后的整数。
        } else {
          targetHeight = maxHeight;
          targetWidth = Math.round(maxHeight * (originWidth / originHeight)); // 返回四舍五入后的整数。
        }
      }
      // canvas对图片进行缩放
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      // 清除画布
      context.clearRect(0, 0, targetWidth, targetHeight);
      // 图片压缩
      context.drawImage(img, 0, 0, targetWidth, targetHeight);
      obj.compressAfterShiftBase64 && obj.compressAfterShiftBase64(canvas.toDataURL(obj.base64MimeType || file.type || 'image/png', obj.base64QualityArgument|| 0.92))
      // canvas转为blob并上传
      // 将当前画布转为Blob文件（二进制）文件后产生回调
      canvas.toBlob(function (blob) {
        obj.compressAfterShiftBolb() // 转为canvas
        resolve(blob)
      }, obj.bolbMimeType || file.type || 'image/png', obj.bolbQualityArgument|| 0.92);
    };
  })
}
