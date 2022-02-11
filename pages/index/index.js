//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    // motto: 'Hello World',
    // userInfo: {},
    users: [
      {
        id: 1,
        avatar: 'http://www.neko-kurashi.com/img/kao01.jpg',
        name: '奕萱萱',
        sex: 'woman',
        job: 'IT',
        location: '深圳',
        price: 123,
        desc: '喵喵拳的奥秘'
      },
      {
        id: 1,
        avatar: 'http://www.neko-kurashi.com/img/kao01.jpg',
        name: '奕萱萱',
        sex: 'man',
        job: 'IT',
        location: '深圳',
        price: 123,
        desc: '喵喵拳的奥秘'
      }
    ],
    citys: [
      '深圳',
      '广州'
    ],
    city_index: 0
  },
  //事件处理函数
  // bindViewTap: function () {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function () {
    console.log('onLoad')
    // var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })
  },
  onCoverImgTab: function (event) {
    const id = event.target.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    });
  },
  onBuyBtnTab: function (event) {
    const id = event.target.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    });
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
        index: e.detail.value
    })
    
  }
})
