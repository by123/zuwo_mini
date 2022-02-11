//首页
var app = getApp();
var util = require('../../utils/util.js');
var Api = require('../../utils/api.js');

var currentPage = 0;
var size = 10;
var isRefesh = false;
var isLoadMore = false;

Page({
    data: {
        loadMoreTxt: "加载中...",
        refreshTxt: "刷新中...",
        list: [],
        position: "定位中",
        key: "",
        sex: "all",
        ageStart: 0,
        ageEnd: 0,
        heightStart: 0,
        heightEnd: 0,
        rentStart: undefined,
        rentEnd: undefined
    },

    bindBtnClicked: function (e) {
        const id = e.target.dataset.id;
        console.log("这是->" + id);
        wx.navigateTo({
            url: '../detail/detail?id=' + id
        });
    },

    bindConfirmInput: function (e) {
        this.key = e.detail.value;
        getUserListData(this, true);
    },

    bindOtherSelect: function (e) {
        wx.navigateTo({
            url: '../search/search'
        });
    },
    bindGetPosition: function (e) {
        var that = this;
        util.showSuccessToast("获取定位中...");
        getLocation(that);
    },

    onShow: function () {
        var that = this;
        wx.getStorage({
            key: 'search',
            success: function (res) {
                var data = res.data;
                that.setData({
                    sex: data.sex,
                    ageStart: data.ageStart,
                    ageEnd: data.ageEnd,
                    heightStart: data.heightStart,
                    heightEnd: data.heightEnd,
                    rentStart: data.rentStart,
                    rentEnd: data.rentEnd
                });
                console.log(data);
            },
            fail: function (res) {
            },
            complete: function (res) {
                getUserListData(that, true);
                getLocation(that);
            }
        });
    },

    onLoad: function (options) {
        Api.login(function (account) {

        })
    },

    pullDownRefresh: function (e) {
        console.log("下拉刷新....");
        getUserListData(this, true)
    },
    pullUpLoad: function (e) {
        console.log("上拉加载....");
        var page = currentPage++;
        this.setData({
            currentPage: page
        });
        getUserListData(this, false);
    },
    onShareAppMessage: function () {
        // 用户点击右上角分享
        return {
            title: '约吗', // 分享标题
            desc: '约约约', // 分享描述
            path: '../../home/home' // 分享路径
        }
    }
});


/**
 * 获取用户列表
 */
function getUserListData(that, isReload) {
    if (isReload) {
        currentPage = 0;
        that.setData({
            isRefesh: true,
            refreshTxt: "刷新中...",
        })
    } else {
        that.setData({
            isLoadMore: true,
            loadMoreTxt: "加载中..."
        })
    }

    const url = 'https://scrat.bshapp.cn/zuwo/api/users/search';
    util.showSuccessToast(that.key);
    console.log(url + "---" + that.key);

    const postData = {
        "page": currentPage,
        "size": size,
        "key": that.key || '',
        "province": "",
        "city": "",
        "sex": that.data.sex,
        "age_start": that.data.ageStart,
        "age_end": that.data.ageEnd,
        "height_start": that.data.heightStart,
        "height_end": that.data.heightEnd
        // "rent_start": that.data.rentStart,
        // 'rent_end': that.data.rentEnd
    };

    if (that.data.rentStart) {
        postData.rent_start = that.data.rentStart;
    }
    if (that.data.rentEnd) {
        postData.rent_end = that.data.rentEnd;
    }

    wx.request({
        url: url,
        data: postData,
        method: 'GET',
        success: function (res) {
            console.log("页数->", currentPage);
            console.log("数据长度->", res.data.length);
            let currList = that.data.list;
            if (isReload) {
                currList = [];
            }
            for (let data of res.data) {
                currList.push(data);
            }
            that.setData({
                list: currList,
                isRefesh: false
            });

        },
        fail: function (res) {

        }
    })
}


function getLocation(that) {
    wx.getLocation({
        type: 'wgs84',
        success: function (res) {
            var latitude = res.latitude;
            var longitude = res.longitude;
            var speed = res.speed;
            var accuracy = res.accuracy;
            getCity(latitude, longitude, that);
        }
    })
}


function getCity(latitude, longitude, that) {
    wx.request({
        url: 'https://scrat.bshapp.cn/zuwo/api/address',
        data: {
            "location": latitude + "," + longitude
        },
        method: 'GET',
        success: function (res) {
            var address = res.data.result.addressComponent;
            wx.setStorage({
                key: 'location',
                data: {
                    province: address.province,
                    city: address.city,
                    district: address.district
                },
                success: function (res) {

                }
            });
            that.setData({
                position: address.city
            })

        },
        fail: function (res) {
            that.setData({
                position: "定位失败"
            })

        },
        complete: function (res) {
            // complete
        }
    })
}
