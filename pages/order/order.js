// pages/order/order.js
var app = getApp();
var sliderWidth = 96;
var leftPage = 0;
var rightPage = 0;
const size = 30;
Page({
    data: {
        tabs: ["我预约的人", "预约我的人"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,
        leftList: [],
        rightList: [],
        leftHidden : false,
        rightHidden : true
    },
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });
        loadOrderList(that, 'me', leftPage);
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id,
            leftHidden : false,
            rightHidden : true
        });
        const id = e.currentTarget.id;
        console.log("id->"+id);
        let type = 'me';
        let page = leftPage;
        if (id == 1) {
            type = 'other';
            page = rightPage;
            this.setData({
                leftHidden : true,
                rightHidden : false
            });
        }
        loadOrderList(this, type, page);
    },
    bindItemClick : function(e){
       const id = e.currentTarget.dataset.id;
       wx.navigateTo({
            url: '../detail/detail?id=' + id
        });
   }
});


function loadOrderList(that, type, page) {
    app.getGlobalData(function (globalData) {
        const uid = globalData.accountInfo.id;
        const token = globalData.accountInfo.token;
        const url = `https://scrat.bshapp.cn/zuwo/api/booking/${uid}/${type}`;
        wx.request({
            url: url,
            data: {
                page: page,
                size: size
            },
            header: {
                "token": token
            },
            method: 'GET',
            success: function (res) {
                console.log(res.data);
                if (type == 'me') {
                    const leftList = that.data.leftList;
                    console.log(res.data.data);
                    for (let item of res.data.data) {
                        leftList.push(item);
                    }
                    that.setData({
                        leftList: leftList
                    });
                    leftPage = leftPage + 1;
                } else {
                    const rightList = that.data.rightList;
                    for (let item of res.data.data) {
                        rightList.push(item);
                    }
                    that.setData({
                        rightList: rightList
                    });
                    rightPage = rightPage + 1;
                }
            }
        });
    });
}