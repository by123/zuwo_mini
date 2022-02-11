var app = getApp();
var util = require('../../utils/util.js');
var Api = require('../../utils/api.js');

Page({
    data: {
        types: [],
        accountInfo: {},
        days: 0
    },
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: 'https://scrat.bshapp.cn/zuwo/api/vip/type',
            method: 'GET',
            success: function (res) {
                console.log(res.data);
                const types = res.data;
                if (types.length > 0) {
                    types[0].checked = true;
                }
                that.setData({
                    types: types
                });

            }
        });
        app.getGlobalData(function (globalData) {
            const accountInfo = globalData.accountInfo;
            let expiredTs = 0;
            if (accountInfo.member) {
                expiredTs = accountInfo.member.expiredTs;
            }
            let days = 0;
            const now = new Date().getTime();
            if (expiredTs > now) {
                console.log(expiredTs);
                console.log(now);
                days = parseInt((expiredTs - now) / (1000*60*60*24) + 1);
            }
            that.setData({
                accountInfo: accountInfo,
                days: days
            })
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
    bindTypeChange: function (e) {
        const id = e.detail.value;
        const types = this.data.types;
        for (let type of types) {
            type.checked = type.id == id;
        }
        this.setData({
            types: types
        })
    },
    bindToBeVip: function (e) {
        // startPayMsg(e.detail.formId);
        const types = this.data.types;
        let id = 0;
        for (let type of types) {
            if (type.checked) {
                id = type.id;
                break;
            }
        }
        var cb = function (account) {

            app.getGlobalData(function (globalData) {
                console.log(globalData);
                const uid = globalData.accountInfo.id;
                Api.pay(uid, id, function (orderInfo) {
                    console.log(orderInfo);
                    wx.requestPayment({
                        'timeStamp': orderInfo.timeStamp,
                        'nonceStr': orderInfo.nonceStr,
                        'package': orderInfo.package,
                        'signType': orderInfo.signType,
                        'paySign': orderInfo.paySign,
                        'success': function (res) {
                            console.log(res);
                            // todo 完成支付跳转
                        },
                        'fail': function (res) {
                        }
                    });
                })
            });
        };

        let account = wx.getStorageSync('account');
        if (account) {
            cb(account);
        } else {
            Api.login(cb);
        }

    }

});

function startPayMsg(formId) {
    wx.request({
        url: 'https://api.weixin.qq.com/cgi-bin/token',
        data: {
            grant_type: 'client_credential',
            appid: 'wxc3a3170f1302dc9b',
            secret: 'e2d41fc51c15ccc0d2aed29814de76b5'
        },
        method: 'GET',
        success: function (res) {
            var access_token = res.data.access_token;
            console.log("access_token->" + access_token);
            pay();
        },
    })
}

function pay() {
    //之前获取package
    wx.requestPayment({
        'timeStamp': util.formatTime(new Date()),
        'nonceStr': 'adjksfhsajkhf123',
        'package': '',
        'signType': 'MD5',
        'paySign': '',
        'success': function (res) {
        },
        'fail': function (res) {
        }
    });
}

function sendPayMsg(access_token, formId) {
    app.getGlobalData(function (globalData) {
        const openid = globalData.accountInfo.wxId;
        var url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + access_token;

        wx.request({
            url: url,
            header: {
                "Content-Type": "application/json",
            },
            data: {
                touser: openid,
                template_id: 'lq9H3OGcsm6sEwXp7QzXJ5FO_V5ha_TRO4Zhyu7V2ME',
                page: "pages/home/home",
                form_id: formId,
                data: {
                    "keyword1": {
                        "value": "年费会员购买",
                    },
                    "keyword2": {
                        "value": util.formatTime(new Date()),
                    },
                    "keyword3": {
                        "value": "299元",
                    },
                    "keyword4": {
                        "value": "约吗",
                    }
                },
            },

            method: 'POST',
            success: function (res) {
                console.log("result->" + res.data.errcode + "msg->" + res.data.errmsg);
            }
        })
    });


}