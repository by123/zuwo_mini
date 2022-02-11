//detail.js

Page({
    data: {
        id: 0
    },
    onLoad: function (options) {
        this.setData({
            id: options.id
        });
        const accountInfo = wx.getStorageSync('account').accountInfo;
        var that = this;
        wx.request({
            url: `https://scrat.bshapp.cn/zuwo/api/users/${options.id}`,
            data: {},
            header: {
                "uid": accountInfo.id,
                "token": accountInfo.token
            },
            method: 'GET',
            success: function (res) {
                console.log(res.data);
                const data = res.data;
                if (data.qq === undefined) {
                    data.qq = '*****(高级会员可见)';
                }
                if (data.wxNumber === undefined) {
                    data.wxNumber = "*****(高级会员可见)";
                }
                that.setData({
                    data: data
                })
            },
            fail: function (res) {
                // fail
            },
            complete: function (res) {
                // complete
            }
        })
    },

    bindBooking: function (e) {
        const id = e.target.dataset.id;
        wx.navigateTo({
            url: '../booking/booking?id=' + id
        });
    },
    bindCheckboxChange: function (e) {
        console.log(userdata);

    }

});