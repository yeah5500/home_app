function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../utils/util")), s = e(require("../../../utils/requestUtil")), a = e(require("../../../utils/underscore")), i = e(require("../../../utils/data"));

e(require("../../../utils/form")), getApp();

Page({
    docId: 0,
    nums: null,
    form: null,
    data: {
        storeid: 0,
        submit: !0,
        disabled: !1,
        mobile: "",
        docInfo: [],
        config: {},
        reserveDate: [],
        time: [],
        nowTime: "",
        addressId: 0,
        businessNum: 0
    },
    onLoad: function(e) {
        var t = this;
        this.docId = e.ids, this.setData({
            storeid: void 0 === e.storeid ? 0 : e.storeid
        }), s.default.get(i.default.hk_request_url + "config.html", {
            ver: "2.0.0"
        }, function(e) {
            var s = e.time, i = new Array(), d = new Array(), r = new Array();
            a.default.each(s, function(e) {
                d.push(e.date + " (" + e.week + ") ");
                var t = [], s = e.time;
                for (var a in s) t.push(s[a]);
                r.push(t);
            }), i[0] = d, i[1] = r[0], t.setData({
                config: e,
                reserveDate: i,
                time: r,
                nowTime: d[0] + r[0][0]
            });
        }), s.default.get(i.default.hk_request_url + "documentInfo.html", {
            cid: e.ids
        }, function(e) {
            t.setData({
                docInfo: e
            });
        }), this.getAddress();
    },
    onNavigationTo: function(e) {
        var t = e.currentTarget.dataset.url;
        wx.navigateTo({
            url: t
        });
    },
    onChooseAddrTap: function() {
        var e = this;
        t.default.chooseAddress(function(t) {
            e.setData({
                true_name: t.name || "",
                mobile: t.mobile || "",
                address: t.all_address || "",
                latitude: t.latitude || "",
                longitude: t.longitude || "",
                addressId: t.id || 0
            }), e.getAroundBusinessNum();
        });
    },
    getGps: function(e) {
        var a = this;
        a.data.submit = !1, t.default.getMapSdk().geocoder({
            address: e.address,
            success: function(t) {
                s.default.isLoading(this.requestRQId) || (e.latitude = t.result.location.lat, e.longitude = t.result.location.lng, 
                this.requestRQId = s.default.post(i.default.hk_request_url + "reseve.html", e, function(e) {
                    var t = e.number, s = e.status;
                    0 == s ? a.onMakePayTap(t, s) : wx.switchTab({
                        url: "/pages/reservation/order-list/order-list"
                    });
                }));
            },
            fail: function(e) {
                wx.showModal({
                    title: "温馨提示",
                    content: "地址填写不正确",
                    showCancel: !1
                });
            }
        }), a.pushRQId = 1;
    },
    onMakePayTap: function(e, t) {
        if (!s.default.isLoading(this.makePayRQId)) {
            this.setData({
                disabled: !0
            });
            var d = e;
            this.makePayRQId = s.default.post(i.default.hk_request_url + "makeResevePay.html", {
                trade_no: d,
                ver: "2.0.0"
            }, function(e) {
                e ? wx.requestPayment(a.default.extend(e, {
                    success: function(e) {
                        wx.switchTab({
                            url: "/pages/reservation/order-list/order-list"
                        });
                    },
                    fail: function(e) {
                        wx.switchTab({
                            url: "/pages/reservation/order-list/order-list"
                        });
                    },
                    complete: function(e) {
                        wx.switchTab({
                            url: "/pages/reservation/order-list/order-list"
                        });
                    }
                })) : wx.switchTab({
                    url: "/pages/reservation/order-list/order-list"
                });
            });
        }
    },
    getAddress: function() {
        var e = this, s = this;
        t.default.getDefaultAddress(function(a) {
            a && void 0 !== a.address ? s.setData({
                true_name: a.name,
                mobile: a.mobile,
                address: a.address + a.detail_info,
                latitude: a.latitude,
                longitude: a.longitude,
                addressId: a.id
            }) : wx.getLocation({
                success: function(e) {
                    t.default.getMapSdk().reverseGeocoder({
                        location: {
                            latitude: e.latitude,
                            longitude: e.longitude
                        },
                        success: function(e) {
                            e = e.result, s.setData({
                                address: e.address,
                                latitude: e.location.lat,
                                longitude: e.location.lng
                            });
                        }
                    });
                }
            }), e.getAroundBusinessNum();
        });
    },
    onPushSubmit: function(e) {
        if (s.default.pushFormId(e.detail.formId), !s.default.isLoading(this.pushRQId)) {
            var t = new Date(), i = a.default.extend({
                doc_id: this.docId,
                nums: 1,
                form_id: e.detail.formId,
                ver: "2.0.0",
                isNewForm: !0,
                latitude: this.data.latitude,
                longitude: this.data.longitude,
                business: 0 == this.data.storeid ? 0 : this.data.storeid,
                reseve_time: t.getFullYear() + "年" + this.data.nowTime
            }, e.detail.value);
            this.getGps(i);
        }
    },
    changeTimeColumnPicker: function(e) {
        var t = e.detail.column, s = e.detail.value, a = this.data.reserveDate, i = this.data.time;
        0 === t && (a[1] = i[s], this.setData({
            reserveDate: a
        }));
    },
    changeTimePicker: function(e) {
        var t = e.detail.value, s = t[0], a = t[1], i = this.data.reserveDate[0], d = this.data.time;
        d = 0 === t[0] ? d[0] : d[1], this.setData({
            nowTime: i[s] + d[a]
        });
    },
    getAroundBusinessNum: function() {
        var e = this;
        if (0 == this.data.addressId) return !0;
        if (0 != this.data.storeid) return !0;
        var t = {
            doc_id: this.docId,
            addressId: this.data.addressId
        };
        s.default.post(i.default.hk_request_url + "getAroundBusinessNum.html", t, function(t) {
            e.setData({
                businessNum: t.count,
                disabled: !1
            }), 0 == t.count && (e.setData({
                disabled: !0
            }), wx.showToast({
                title: "附近暂无商家",
                image: "/images/close.png",
                duration: 3e3,
                mask: !0
            }));
        }, this, {
            isShowLoading: !1
        });
    }
});