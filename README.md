# photoCompression
配置需要压缩的图片  
1. 可以支持Promise，当压缩完成转为blob（二进制后）触发resolve
2. 可以通过配置参数中的钩子函数来执行压缩完成后回调
## 参数

1. obj: <Object>
    - file: ' ',  读取指定的Blob 或 File对象
    - maxWidth: 400, 需要压缩到的宽度，默认值为400px
    - maxHeight: 400,  需要压缩到的高度，默认值为400px
    - base64MimeType: 'image/png', 指定图片转为base64时候的格式默认为image/png
    - base64QualityArgument: 0.92,  指定图片转为base64时候的图片质量，默认为0.92
    - bolbMimeType: 'image/png', 指定图片转为bolb时候的格式默认为image/png
    - bolbQualityArgument: 0.92,  指定图片转为bolb时候的图片质量0.92
    - compressBeforeShiftBase64: ()=>{},  压缩前原图转为baes64后触发
    - compressAfterShiftBase64: ()=>{},  当压缩完成转为base64后触发事件
    - compressAfterShiftBolb: ()=>{},  压缩完成转为blob（二进制后）触发