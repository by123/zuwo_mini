function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


function showSuccessToast(content) {
    if (!content) {
        return;
    }
    wx.showToast({
        title: content,
        icon: "success",
        duration: 2000
    })
}

function showFailToast(content) {
    if (!content) {
        return;
    }
    wx.showToast({
        title: content,
        icon: "warn",
        duration: 2000
    })
}

function isStringNil(str)
{
   if(typeof(str)!="undefined")
   {
        return false;
   }
   return true;
}

function getLocation(cb) {
    wx.getLocation({
        type: 'wgs84',
        success: function (wxRes) {
            const latitude = wxRes.latitude;
            const longitude = wxRes.longitude;
            // var speed = res.speed;
            // var accuracy = res.accuracy;
            wx.request({
                url: 'https://scrat.bshapp.cn/zuwo/api/address',
                data: {
                    "location": latitude + "," + longitude
                },
                method: 'GET',
                success: function (res) {
                    // address.province;
                    // address.city;
                    // address.district;
                    cb(res.data.result.addressComponent);
                },
                fail: function (res) {
                    cb(null);
                },
                complete: function (res) {
                    // complete
                }
            })
        }
    });
}



module.exports = {
    formatTime: formatTime,
    showSuccessToast: showSuccessToast,
    showFailToast: showFailToast,
    isStringNil: isStringNil,
    getLocation: getLocation
};


