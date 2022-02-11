

//获取屏幕宽高 
function getSystemInfo() { 
 var screenSize = {}; 
 wx.getSystemInfo({ 
  success: function (res) { 
  return res; 
}})} 


//上传图片
function uploadImg(filePath)
{
   wx.uploadFile({
     url: 'https://',
     filePath:filePath,
     name:Date.now(),
     // header: {}, // 设置请求的 header
     // formData: {}, // HTTP 请求中其他额外的 form data
     success: function(res){

     },
     fail: function(res) {

     },
     complete: function(res) {

     }
   })
}

module.exports = {
    getSystemInfo: getSystemInfo,
    uploadImg : uploadImg,
}

