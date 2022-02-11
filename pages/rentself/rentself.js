var util = require('../../utils/util.js');
var app = getApp();
const qiniuUploader = require("../../utils/qiniuUploader");
var ranges = [
            {value: '桌游'},
            {value: '聊天'},
            {value: '打麻将'},
            {value: '约饭'},
            {value: '逛街'},
            {value: '看电影'},
            {value: '导游'},
            {value: '模特约拍'},
            {value: 'K歌'},
            {value: '道早安晚安'},
            {value: '跑步'},
            {value: '运动'},
            {value: '旅游'},
            {value: '羽毛球'},
            {value: '台球'}
        ]
var jobs = ['学生', '模特', '白领', '教师', '空姐', '律师', '护士', '公务员', '健身教练', '银行职员', '私营商户', '家庭辣妈', '自由职业']

var ages = []


Page({
    data: {
        imagesrc: "",
        hasphoto: true,
        ageIndex: 0,
        jobIndex: 0,
        accountInfo: {}
    },
    onLoad: function (options) {
        var temps = [];
        for(let i = 16; i < 60 ;i ++){
           temps.push(i);
        }
        this.setData({
            ages : temps
        });
        var that = this;
        app.getGlobalData(function (globalData) {
            let jobIndex = 0;
            if (that.jobs && job.jobs != '') {
                let i = 0;
                for (let job of that.jobs) {
                    if (job == globalData.job) {
                        jobIndex = i;
                        break;
                    }
                    i++;
                }
            }

            let salesRanges = that.data.ranges;
            if (globalData.salesRange && globalData.salesRange != '') {
                for (let salesRange of salesRanges) {
                    salesRange.checked = false;
                    for (let dbSalesRange of globalData.salesRange) {
                        if (dbSalesRange == salesRange.value) {
                            salesRange.checked = true;
                            break;
                        }
                    }
                }
            }

            that.setData({
                accountInfo: globalData.accountInfo,
                jobIndex: jobIndex,
                ranges: salesRanges
            });
        })
    },

    bindSelectPhoto: function (e) {
        var that = this;
        wx.chooseImage({
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                that.imagesrc = res.tempFilePaths;
                that.setData({
                    imagesrc: that.imagesrc,
                    hasphoto: false
                });

                const filePath = res.tempFilePaths[0];
                qiniuUploader.upload(filePath, (res) => {
                    // todo show image
                    console.log(res.imageURL);
                    const accountInfo = that.data.accountInfo;
                    accountInfo.avatar = res.imageURL;
                    that.setData({
                        accountInfo: accountInfo
                    });
                }, (error) => {
                    // todo upload fail
                    console.log('error: ' + error);
                }, {
                    uploadURL: 'https://up.qbox.me',
                    domain: '7u2m9w.com1.z0.glb.clouddn.com',
                    uptokenURL: 'https://scrat.bshapp.cn/zuwo/api/img/upload/apply'
                });
            }
        })
    },
    bindReleaseButton: function (e) {
        var that = this;
        const accountInfo = that.data.accountInfo;
        console.log(accountInfo);
        app.getGlobalData(function (globalData) {
            const uid = globalData.accountInfo.id;
            const token = globalData.accountInfo.token;
            const url = `https://scrat.bshapp.cn/zuwo/api/users/${uid}`;
            util.getLocation(function (address) {
                let province = '';
                let city = '';
                if (address) {
                    province = address.province;
                    city = address.city;
                }
                console.log(province);
                console.log(city);
                wx.request({
                    url: url,
                    data: {
                        avatar: accountInfo.avatar,
                        age: accountInfo.age,
                        qq: accountInfo.qq,
                        wx_number: accountInfo.wxNumber,
                        sales_range: accountInfo.salesRange,
                        job: accountInfo.job,
                        rent: accountInfo.rent,
                        description: accountInfo.description,
                        city: city,
                        province: province,
                        state: 'sales'
                    },
                    header: {
                        "Content-Type": "application/json",
                        "token": token
                    },
                    method: 'POST',
                    success: function (res) {
                        console.log(res.data);
                        if (res.data.code == 200) {
                            accountInfo.state = 'sales';
                            that.setData({
                                accountInfo: accountInfo
                            });
                            wx.navigateTo({
                                url: '../booking_success/booking_success'
                            });
                        } else {
                            console.log('fail');
                        }
                    }
                });
            });
        });
    },
    bindCancelReleaseButton: function (e) {
        var that = this;
        const accountInfo = that.data.accountInfo;
        console.log(accountInfo);
        app.getGlobalData(function (globalData) {
            const uid = globalData.accountInfo.id;
            const token = globalData.accountInfo.token;
            wx.request({
                url: `https://scrat.bshapp.cn/zuwo/api/users/${uid}`,
                data: {
                    state: 'idle'
                },
                header: {
                    "Content-Type": "application/json",
                    "token": token
                },
                method: 'POST',
                success: function (res) {
                    console.log(res.data);
                    if (res.data.code == 200) {
                        accountInfo.state = 'idle';
                        that.setData({
                            accountInfo: accountInfo
                        });
                        wx.navigateTo({
                            url: '../booking_success/booking_success'
                        });
                    } else {
                        console.log('fail');
                    }
                }
            });
        });
    },
    bindAgeChange: function (e) {
        const accountInfo = this.data.accountInfo;
        accountInfo.age = e.detail.value;
        this.setData({
            accountInfo: accountInfo
        })
    },
    bindJobChange: function (e) {
        const accountInfo = this.data.accountInfo;
        let i = 0;
        for (let job of this.data.jobs) {
            if (i == e.detail.value) {
                accountInfo.job = job;
            }
            i++;
        }
        this.setData({
            accountInfo: accountInfo
        });
        this.setData({
            jobIndex: e.detail.value
        });
    },
    bindNicknameKeyInput: function (e) {
        const accountInfo = this.data.accountInfo;
        accountInfo.nickname = e.detail.value;
        this.setData({
            accountInfo: accountInfo
        });
    },
    bindDescriptionKeyInput: function (e) {
        const accountInfo = this.data.accountInfo;
        accountInfo.description = e.detail.value;
        this.setData({
            accountInfo: accountInfo
        });
    },
    bindQQKeyInput: function (e) {
        const accountInfo = this.data.accountInfo;
        accountInfo.qq = e.detail.value;
        this.setData({
            accountInfo: accountInfo
        });
    },
    bindWechatNumberKeyInput: function (e) {
        const accountInfo = this.data.accountInfo;
        accountInfo.wxNumber = e.detail.value;
        this.setData({
            accountInfo: accountInfo
        });
    },
    bindRentKeyInput: function (e) {
        const accountInfo = this.data.accountInfo;
        accountInfo.rent = e.detail.value;
        this.setData({
            accountInfo: accountInfo
        });
    },
    bindRangesChange: function (e) {
        const accountInfo = this.data.accountInfo;
        accountInfo.salesRange = e.detail.value;

        const salesRanges = this.data.ranges;
        for (let salesRange of salesRanges) {
            salesRange.checked = false;
            for (let value of e.detail.value) {
                if (value == salesRange.value) {
                    salesRange.checked = true;
                    break;
                }
            }
        }

        this.setData({
            accountInfo: accountInfo,
            ranges: salesRanges
        });
    }
});

function checkInfo(that) {
    var imagesrc = that.imagesrc;
    if (util.isStringNil(imagesrc)) {
        console.log("照片地址:" + imagesrc)
    }
    else {
        util.showFailToast("请上传一张本人照片");
    }
}