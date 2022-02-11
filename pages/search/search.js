var genderType = "button_type";
var genderHoverType = "button_type_hover";
var selectGender = "all";
var app = getApp();

Page({
    data: {
        buttonAllType: genderHoverType,
        buttonMaleType: genderType,
        buttonFemaleType: genderType,
        sex: "all",
        selectGender: 0,
        ages: ["不限", "18-22岁", "23-26岁", "27-35岁", "35岁以上"],
        age: 0,
        ageStart: 0,
        ageEnd: 0,
        heights: ["不限", "149cm以下", "150-159cm", "160-169cm", "170-179cm", "180cm以上"],
        height: 0,
        heightStart: 0,
        heightEnd: 0,
        prices: ["不限", "倒贴", "0-9元", "10-49元", "50-99元", "100-199元", "200-299元", "300-499元", "500元以上"],
        price: 0,
        rentStart: undefined,
        rentEnd: undefined,
        professions: ["不限", "学生", "模特", "白领", "空姐", "护士", "公务员", "教师", "家庭辣妈", "银行职员", "自由职业", "律师", "健身教练", "私营商户"],
        profession: 0

    },
    onLoad: function (options) {
        var that = this;
        wx.getStorage({
            key: 'search',
            success: function (res) {
                var data = res.data;
                that.setData({
                    sex: data.sex,
                    age: data.age,
                    ageStart: data.ageStart,
                    ageEnd: data.ageEnd,
                    height: data.height,
                    heightStart: data.heightStart,
                    heightEnd: data.heightEnd,
                    price: data.price,
                    rentStart: data.rentStart,
                    rentEnd: data.rentEnd
                });
                if (data.sex == "man") {
                    setManChecked(that);
                } else if (data.sex == "woman") {
                    setWomanChecked(that);
                }
            }
            
        });
    },

    bindGenderAll: function (e) {
        selectGender = "all";
        this.setData({
            buttonAllType: genderHoverType,
            buttonMaleType: genderType,
            buttonFemaleType: genderType,
            sex: "all"
        })
    },

    bindGenderMale: function (e) {
        setManChecked(this);
    },

    bindGenderFemale: function (e) {
        setWomanChecked(this);
    },

    bindAgeChange: function (e) {
        let ageStart = 0;
        let ageEnd = 0;
        const index = e.detail.value;
        if (index == 0) {
            ageStart = 0;
            ageEnd = 0;
        } else if (index == 1) {
            ageStart = 18;
            ageEnd = 22;
        } else if (index == 2) {
            ageStart = 23;
            ageEnd = 26;
        } else if (index == 3) {
            ageStart = 27;
            ageEnd = 35;
        } else if (index == 4) {
            ageStart = 35;
            ageEnd = 0;
        }

        this.setData({
            age: e.detail.value,
            ageStart: ageStart,
            ageEnd: ageEnd
        })
    },

    bindHeightChange: function (e) {
        let heightStart = 0;
        let heightEnd = 0;
        const index = e.detail.value;
        if (index == 0) {
            heightStart = 0;
            heightEnd = 0;
        } else if (index == 1) {
            heightStart = 0;
            heightEnd = 149;
        } else if (index == 2) {
            heightStart = 150;
            heightEnd = 159;
        } else if (index == 3) {
            heightStart = 160;
            heightEnd = 169;
        } else if (index == 4) {
            heightStart = 170;
            heightEnd = 179;
        } else if (index == 5) {
            heightStart = 180;
            heightEnd = 0;
        }
        this.setData({
            height: e.detail.value,
            heightStart: heightStart,
            heightEnd: heightEnd
        });
    },

    bindPriceChange: function (e) {
        let rentStart = 0;
        let rentEnd = 0;
        let index = e.detail.value;
        if (index == 0) {
            rentStart = undefined;
            rentEnd = undefined;
        } else if (index == 1) {
            rentStart = 0;
            rentEnd = -1;
        } else if (index == 2) {
            rentStart = 0;
            rentEnd = 9;
        } else if (index == 3) {
            rentStart = 10;
            rentEnd = 49;
        } else if (index == 4) {
            rentStart = 50;
            rentEnd = 99;
        } else if (index == 5) {
            rentStart = 100;
            rentEnd = 199;
        } else if (index == 6) {
            rentStart = 200;
            rentEnd = 299;
        } else if (index == 7) {
            rentStart = 300;
            rentEnd = 499;
        } else if (index == 8) {
            rentStart = 500;
            rentEnd = 0;
        }
        this.setData({
            price: e.detail.value,
            rentStart: rentStart,
            rentEnd: rentEnd
        })
    },
    bindProfessionChange: function (e) {
        this.setData({
            profession: e.detail.value
        })
    },

    bindConfirmButton: function (e) {
        var that = this;
        console.log(that.data.heightStart);
        wx.setStorage({
            key: 'search',
            data: {
                sex: that.data.sex,
                age: that.data.age,
                ageStart: that.data.ageStart,
                ageEnd: that.data.ageEnd,
                height: that.data.height,
                heightStart: that.data.heightStart,
                heightEnd: that.data.heightEnd,
                price: that.data.price,
                rentStart: that.data.rentStart,
                rentEnd: that.data.rentEnd
            },
            success: function (res) {
                wx.navigateBack();
            }
        });

    }
});

function setManChecked(that) {
    selectGender = "man";
    that.setData({
        buttonAllType: genderType,
        buttonMaleType: genderHoverType,
        buttonFemaleType: genderType,
        sex: "man"
    })
}

function setWomanChecked(that) {
    selectGender = "woman";
    that.setData({
        buttonAllType: genderType,
        buttonMaleType: genderType,
        buttonFemaleType: genderHoverType,
        sex: "woman"
    })
}
