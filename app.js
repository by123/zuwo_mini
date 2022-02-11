//app.js
App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs)
    },

    getGlobalData: function (cb) {
        if (this.globalData.accountInfo) {
            return cb(this.globalData);
        }

        var that = this;
        if (this.globalData.accountInfo && that.globalData.userInfo) {
            return typeof cb == "function" && cb(this.globalData)
        }
        
        //调用登录接口
        wx.login({
            success: function (login_res) {
                const code = login_res.code;
                wx.getUserInfo({
                    success: function (res) {
                        console.log(res);
                        const encryptedData = res.encryptedData;
                        const iv = res.iv;
                        const userInfo = res.userInfo;
                        wx.request({
                            method: 'POST',
                            url: 'https://scrat.bshapp.cn/zuwo/api/login',
                            data: {
                                iv: iv,
                                code: code,
                                encryptedData: encryptedData,
                                userInfo: userInfo
                            },
                            success: function (res) {
                                console.log(res.data.wxId);
                                that.globalData.accountInfo = res.data;
                                console.log("登录成功");
                                that.globalData.userInfo = userInfo;
                                typeof cb == "function" && cb(that.globalData);
                            }
                        });
                    }
                });
            }
        });
    },
    globalData: {
        userInfo: null,
        accountInfo: null
    }
});