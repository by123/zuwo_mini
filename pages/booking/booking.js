// pages/order/order.js
var app = getApp();
Page({
    data: {
        id: 0,
        qq: "",
        wxNumber: "",
        uid: 0,
        token: ''
    },
    onLoad: function (options) {
        var that = this;
        const id = options.id;
        app.getGlobalData(function (globalData) {
            const uid = globalData.accountInfo.id;
            const token = globalData.accountInfo.token;
            const qq = globalData.accountInfo.qq;
            const wxNumber = globalData.accountInfo.wxNumber;
            that.setData({
                id: id,
                uid: uid,
                token: token,
                qq: qq,
                wxNumber: wxNumber
            });
            console.log(that.data);
        });
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
    bindWechatNumberKeyInput: function (e) {
        this.setData({
            wxNumber: e.detail.value
        })
    },
    bindQQKeyInput: function (e) {
        this.setData({
            qq: e.detail.value
        })
    },
    bindConfirm: function (e) {
        console.log(this.data);
        const id = this.data.id;
        const qq = this.data.qq;
        const wxNumber = this.data.wxNumber;
        app.getGlobalData(function (globalData) {
            console.log(globalData);
            const uid = globalData.accountInfo.id;
            const token = globalData.accountInfo.token;
            const url = `https://scrat.bshapp.cn/zuwo/api/users/booking/${uid}`;
            wx.request({
                url: url,
                data: {
                    target_uid: id,
                    qq: qq,
                    wx_number: wxNumber
                },
                header: {
                    "Content-Type": "application/json",
                    "token": token
                },
                method: 'POST',
                success: function (res) {
                    console.log(res.data);
                    wx.navigateTo({
                        url: '../booking_success/booking_success'
                    });
                }
            });
        });
    }

});