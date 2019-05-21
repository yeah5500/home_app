function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

function t(e, t, a) {
    return t in e ? Object.defineProperty(e, t, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[t] = a, e;
}

var a = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
        var a = arguments[t];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
}, i = e(require("../../../utils/dg.js")), s = e(require("../../../utils/requestUtil.js")), r = require("../../../utils/data.js"), n = e(r), d = e(require("../../../utils/underscore.js")), o = e(require("../../../utils/listener.js")), l = e(require("../../../utils/util.js"));

Page({
    data: {
        baseUrl: r.duoguan_host_api_url + "/index.php/addon/DuoguanUser",
        isAli: i.default.os.isAlipay(),
        isCallback: !1,
        isUseLocation: !1,
        showPage: "list",
        listUrl: "/AddressApi/info",
        list: [],
        pageNumber: 1,
        pageSize: 20,
        hasMore: !0,
        isShowLoading: !1,
        buttonIsDisabled: !1,
        url: "/AddressApi/info",
        id: 0,
        label: 1,
        longitude: 0,
        latitude: 0,
        callbackAddress: {},
        address: "",
        pickerIndex: 1,
        pickerData: [ {
            country: "其它",
            phone_country_area_code: "0",
            placeholder: "国家区号+您的手机号码"
        }, {
            country: "中国",
            phone_country_area_code: "86",
            placeholder: "请输入您的手机号码"
        } ]
    },
    onLoad: function(e) {
        var t = this, a = void 0 !== e.isUseLocation && "true" == e.isUseLocation;
        this.setData({
            isCallback: void 0 !== e.isCallback,
            isUseLocation: a
        }), this.setPageTitle("list"), s.default.get(n.default.hk_request_url + "uidIsBind.html", {}, function(a) {
            1 == a.is_bind ? (t.setData({
                baseUrl: r.duoguan_host_api_url + "/index.php/addon/DuoguanHouseKeeping"
            }), t.initialize(e)) : t.initialize(e);
        }, this, {
            isShowLoading: !1
        });
    },
    onUnload: function() {
        if (this.data.isCallback) {
            var e = this.data.callbackAddress;
            o.default.fireEventListener("address.choose.confirm", [ e ]);
        }
    },
    onPullDownRefresh: function() {
        if ("form" == this.data.showPage) return i.default.stopPullDownRefresh(), !1;
        this.setData({
            list: [],
            pageNumber: 1
        });
        var e = {}, t = {};
        e = {
            pageNumber: 1,
            pageSize: this.data.pageSize,
            hasMore: !0,
            url: this.data.listUrl,
            search: t
        }, this.reachBottom(e);
    },
    onReachBottom: function() {
        var e = {}, t = {};
        e = {
            pageNumber: this.data.pageNumber,
            pageSize: this.data.pageSize,
            hasMore: this.data.hasMore,
            url: this.data.listUrl,
            search: t
        }, this.reachBottom(e);
    },
    initialize: function(e) {
        e = {
            pageNumber: 1,
            pageSize: this.data.pageSize,
            hasMore: !0,
            url: this.data.listUrl,
            search: []
        }, this.reachBottom(e);
    },
    reachBottom: function(e) {
        var t = this;
        if (!e.hasMore) return this.setData({
            isShowLoading: !1
        }), i.default.stopPullDownRefresh(), !1;
        var a = this.data.baseUrl + e.url, r = {
            _p: e.pageNumber,
            _r: e.pageSize,
            search: e.search
        };
        s.default.get(a, r, function(a) {
            var i = t.data.list;
            0 != (a = a || []).length && (0, d.default)(a).map(function(e) {
                return e;
            }), i = 1 == e.pageNumber ? a || [] : i.concat(a || []), i = (0, d.default)(i).sortBy(function(e) {
                return -e.is_default;
            }), t.setData({
                isShowLoading: !1,
                hasMore: !(a.length < t.data.pageSize),
                pageNumber: e.pageNumber + 1,
                list: i,
                nodata: 0 != i.length
            });
        }, this, {
            isShowLoading: !1,
            completeAfter: function(e) {
                i.default.stopPullDownRefresh();
            }
        });
    },
    refresh: function() {
        this.setData({
            list: [],
            pageNumber: 1
        });
        var e = {}, t = {};
        e = {
            pageNumber: 1,
            pageSize: this.data.pageSize,
            hasMore: !0,
            url: this.data.listUrl,
            search: t
        }, this.reachBottom(e);
    },
    radioChange: function(e) {
        var t = this, a = e.detail.value, r = this.data.list[a];
        if (!this.data.isCallback) {
            var n = r.id, d = this.data.baseUrl + "/AddressApi/setDefaultAddress", o = {
                id: n
            };
            return s.default.get(d, o, function(e) {
                t.refresh();
            }, this, {
                isShowLoading: !1
            }), !1;
        }
        if (this.setData({
            callbackAddress: r
        }), this.data.isUseLocation) {
            if (1 * r.longitude < .01) return i.default.alert("此地址无经纬度，编辑或重选", null, "温馨提示"), 
            !1;
            if ("invalid" == r.qqmap_address.data) return i.default.alert("此地址请先编辑或重选", null, "温馨提示"), 
            !1;
        }
        i.default.navigateBack();
    },
    add: function(e) {
        var a;
        this.setPageTitle("add"), this.setData((a = {
            showPage: "form",
            id: 0,
            name: "",
            gender: 1,
            mobile: "",
            address: "",
            detail_info: ""
        }, t(a, "address", ""), t(a, "label", 1), t(a, "postcode", ""), a));
    },
    edit: function(e) {
        var t = this;
        this.setPageTitle("edit");
        var i = e.currentTarget.dataset.id;
        this.setData({
            showPage: "form",
            id: i
        });
        var r = {
            id: i
        }, n = this.data.baseUrl + this.data.url, o = r;
        s.default.get(n, o, function(e) {
            e.province_list = [], e.city_list = [], e.area_list = [];
            (0, d.default)(t.data.pickerData).map(function(t, a) {
                if (t.phone_country_area_code == e.phone_country_area_code && 0 == e.phone_country_area_code) return e.pickerIndex = 0, 
                t;
            }), t.setData(a({}, e));
        }, this);
    },
    chooseAppAddress: function(e) {
        var t = this;
        wx.chooseAddress({
            success: function(e) {
                var a = {
                    name: e.userName,
                    mobile: e.telNumber,
                    postcode: e.postalCode,
                    address: e.provinceName + e.cityName + e.countyName,
                    all_address: e.provinceName + e.cityName + e.countyName + e.detailInfo,
                    detail_info: e.detailInfo,
                    wxAddress: e
                };
                t.data.isCallback && (t.setData({
                    callbackAddress: a
                }), i.default.navigateBack());
            },
            fail: function(e) {
                (-1 !== e.errMsg.indexOf("deny") || e.errMsg.indexOf("denied") > 0) && i.default.confirm("是否重新授权获取通讯地址？", function(e) {
                    e.confirm && wx.openSetting({});
                }, "授权失败");
            }
        });
    },
    cancel: function(e) {
        this.setPageTitle("list"), this.setData({
            showPage: "list",
            pickerIndex: 1,
            id: 0
        });
    },
    remove: function(e) {
        var t = this, a = e.currentTarget.dataset.id;
        i.default.confirm("确定要删除收货地址吗？", function(e) {
            e.confirm && t.deleting(a);
        }, "删除提示");
    },
    deleting: function(e) {
        var t = this, a = [];
        a.id = e, a.request_method = "DELETE", this.setData({
            buttonIsDisabled: !0
        });
        var r = this.data.baseUrl + this.data.url, n = a;
        s.default.get(r, n, function(e) {
            var a = a;
            "success" == a && i.default.showToast({
                title: "删除成功",
                icon: "success",
                duration: 2e3
            }), t.setData({
                showPage: "list",
                buttonIsDisabled: !1,
                id: 0,
                name: "",
                gender: 1,
                mobile: "",
                address: "",
                detail_info: "",
                label: 1,
                postcode: ""
            }), t.refresh();
        }, this, {
            isShowLoading: !1,
            completeAfter: function(e) {
                this.setData({
                    buttonIsDisabled: !1
                });
            }
        });
    },
    chooseGender: function(e) {
        var t = e.currentTarget.dataset.gender || 1;
        this.setData({
            gender: t
        });
    },
    chooseLabel: function(e) {
        var t = e.currentTarget.dataset.label || 1;
        this.setData({
            label: t
        });
    },
    setPageTitle: function(e) {
        var t = "";
        "add" == e ? t = "新增收货地址" : "edit" == e ? t = "编辑收货地址" : "list" == e && (t = this.data.isCallback ? "选择收货地址" : "我的地址"), 
        i.default.setNavigationBarTitle({
            title: t
        });
    },
    formSubmit: function(e) {
        var t = this, a = e.detail.value;
        if (a.gender = this.data.gender, a.label = this.data.label, a.longitude = 1 * this.data.longitude, 
        a.latitude = 1 * this.data.latitude, a.longitude < .01 || a.latitude < .01) return i.default.showToast({
            title: "经纬度未获取",
            icon: "none",
            duration: 2e3
        }), !1;
        a.is_use_location = 1, a.address = this.data.address, a.phone_country_area_code = this.data.pickerData[this.data.pickerIndex].phone_country_area_code, 
        0 == this.data.id ? a.request_method = "POST" : (a.request_method = "PUT", a.id = this.data.id), 
        this.setData({
            buttonIsDisabled: !0
        });
        var r = this.data.baseUrl + this.data.url, n = a;
        s.default.post(r, n, function(e) {
            if (0 == e.length) return t.setData({
                buttonIsDisabled: !1
            }), !1;
            i.default.showToast({
                title: "提交成功",
                icon: "success",
                duration: 2e3
            }), t.setData({
                showPage: "list",
                id: 0,
                pickerIndex: 1,
                buttonIsDisabled: !1
            }), t.refresh();
        }, this, {
            isShowLoading: !1,
            completeAfter: function(e) {
                this.setData({
                    buttonIsDisabled: !1
                });
            }
        });
    },
    location: function(e) {
        var t = this;
        i.default.chooseLocation({
            fail: function(e) {
                t.data.isAli || -1 != e.errMsg.indexOf("auth") && i.default.confirm("请授权用户地理位置", function(e) {
                    e.confirm && wx.openSetting({
                        success: function(e) {
                            if (e.authSetting) {
                                var t = "";
                                t = e.authSetting["scope.userLocation"] ? "请在地图上选点" : "授权失败", i.default.showToast({
                                    title: t,
                                    icon: "none"
                                });
                            }
                        }
                    });
                }, "温馨提示");
            },
            success: function(e) {
                var a = t.data.address;
                a = e.address || "";
                var s = t.data.detail_info;
                e.name && (s = e.name), t.setData({
                    longitude: e.longitude,
                    latitude: e.latitude,
                    address: a,
                    detail_info: s
                }), "" == a && i.default.alert("请在补充信息中填写完整的地址"), e.address != e.name || t.data.isAli || l.default.getMapSdk().reverseGeocoder({
                    location: {
                        latitude: e.latitude,
                        longitude: e.longitude
                    },
                    success: function(e) {
                        t.setData({
                            address: e.result.address
                        });
                    }
                });
            }
        });
    },
    pickerChange: function(e) {
        var t = e.detail.value;
        this.setData({
            pickerIndex: t
        });
    }
});