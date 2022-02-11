function pay(uid, mid, cb) {
    wx.request({
        url: 'https://scrat.bshapp.cn/zuwo/api/pay',
        data: {uid: uid, mid: mid},
        method: 'POST',
        success: function (res) {
            console.log(res.data);
            cb(res.data);
        },
        fail: function (res) {
            // fail
        },
        complete: function (res) {
            // complete
        }
    })
}

function login(cb) {
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
                            const account = {
                                accountInfo: res.data,
                                userInfo: res.userInfo
                            };
                            wx.setStorageSync('account', account);
                            cb(account);
                        }
                    });
                }
            });
        }
    });
}

module.exports = {
    pay: pay,
    login: login
};
