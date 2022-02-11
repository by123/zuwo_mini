import util from 'util.js';
/**
 * 获取用户列表
 */
function getUserListData(page,size,success,fail)
{
 wx.request({
  url: 'https://scrat.bshapp.cn/zuwo/api/users',
  data: {
      "page":"0",
      "size":"10"
  },
  method: 'GET',
  success: function(res){
    success(res)
  },
  fail: function(res) {
    fail(res)

  }
})
}
