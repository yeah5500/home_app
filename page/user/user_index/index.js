function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var t = e(require("../../../utils/underscore")), a = e(require("../../../utils/util")), n = (e(require("../../../utils/listener")), 
require("../../../utils/data")), s = e(require("../../../utils/requestUtil"));

getApp();

Page({
    data: {
        userInfo: {},
        bbs_show_status: !0,
        shop_show_status: !0,
        menu_list: "",
        is_loaded: !1,
        has_coupon: !0,
        is_open_card: !1,
        is_bind: 0
    },
    onLoad: function() {
        var e = this;
        // wx.getStorageSync("is_first_sync_user_info") || (this.onSyncWechatInfo(), wx.setStorageSync("is_first_sync_user_info", !0)), 
        // s.default.get(n.duoguan_host_api_url + "/index.php/addon/DuoguanUser/Api/getShareInfo.html", {
        //     mmodule: "duoguan_housekeeping"
        // }, function(t) {
        //     e.shareInfo = t;
        // });
    },
    onShow: function() {
        this.onPullDownRefresh(!1);
    },
    onPullDownRefresh: function(e) {
        var a = this, e = void 0 === e || e;
        s.default.get(n.duoguan_user_info_url, {}, function(e) {
            var n = t.default.extend(a.data.userInfo || {}, e);
            a.setData({
                userInfo: n
            });
        }, this, {
            isShowLoading: e
        }), s.default.get(n.duoguan_host_api_url + "/index.php/addon/DuoguanHouseKeeping/HouseKeepingApi/getCopyRight.html", {}, function(e) {
            if ((e = JSON.parse(e)).copyright) {
                var t = e.copyright.split(",");
                a.setData({
                    copyright: t
                });
            }
        }, this, {
            isShowLoading: e
        }), s.default.get(n.duoguan_host_api_url + "/index.php/addon/DuoguanHouseKeeping/HouseKeepingApi/getstatistics.html", {}, function(e) {
            a.setData({
                count: e,
                is_loaded: !0,
                is_bind: e.is_bind
            });
        }, this, {
            completeAfter: wx.stopPullDownRefresh(),
            isShowLoading: e
        });
    },
    onNavigateTap: function(e) {
        var t = e.currentTarget.dataset, a = t.url, n = t.name;
        if ("wechat_address" == n) wx.chooseAddress({}); else if ("wechat_setting" == n) wx.openSetting({}); else if ("wechat_clear" == n) wx.showToast({
            title: "正在清理中...",
            icon: "loading",
            duration: 10
        }), wx.clearStorageSync(), wx.showToast({
            title: "清理完成",
            icon: "success",
            duration: 1500
        }); else if ("wechat_info_sync" == n) this.onSyncWechatInfo(); else if ("order" == n) wx.setStorageSync("active", 0), 
        wx.switchTab({
            url: a
        }); else if ("categoryOrder" == n) {
            var s = e.currentTarget.id;
            wx.setStorageSync("active", s), wx.switchTab({
                url: "/pages/reservation/order-list/order-list"
            });
        } else wx.navigateTo({
            url: a
        });
    },
    onSyncWechatInfo: function() {
        var e = this;
        s.default.isLoading(this.syncWechatInfoId) || a.default.getUserInfo(function(a) {
            e.syncWechatInfoId = s.default.post(n.duoguan_user_info_post_url, {
                nickname: a.nickName,
                headimgurl: a.avatarUrl,
                sex: a.gender,
                city: a.city,
                province: a.province,
                country: a.country,
                language: a.language
            }, function(a) {
                wx.showToast({
                    title: "同步成功！",
                    icon: "success",
                    duration: 2e3
                });
                var n = t.default.extend(e.data.userInfo || {}, a);
                e.setData({
                    userInfo: n
                });
            });
        });
    },
    onGetPhoneNumber: function(e) {
        var t = this;
        if (console.log(e), e.detail.encryptedData) {
            wx.login({
                success: function(e) {
                    wx.showToast({
                        title: "加载中...",
                        icon: "loading"
                    }), setTimeout(function() {
                        a(e.code);
                    }, 1e3);
                }
            });
            var a = function(a) {
                var i = n.duoguan_host_api_url + "/index.php?s=/addon/DuoguanUser/CardApi/openCardByWechatPhone.html";
                s.default.post(i, {
                    encryptedData: e.detail.encryptedData,
                    iv: e.detail.iv,
                    code: a,
                    name: t.card_name || "",
                    ver: "0.0.1"
                }, function(e) {
                    t.session_key = e.session_key, wx.showToast({
                        title: "开卡成功！"
                    });
                    var a = t.data.card_info;
                    a.show = !1, a.status = 1, t.setData({
                        card_info: a
                    });
                });
            };
        }
    },
    onSetValueTap: function(e) {
        var t = e.currentTarget.dataset, a = t.name;
        if (t.isMulti || !1) {
            var n = JSON.parse(t.value);
            if (a) {
                var s = {};
                s[a] = Object.assign(this.data[a], n), this.setData(s);
            } else {
                for (var i in n) n[i] = Object.assign(this.data[i] || {}, n[i]);
                this.setData(n);
            }
        } else {
            var o = t.value, r = {};
            r[a] = o, this.setData(r);
        }
    },
    onInputValue: function(e) {
        var t = e.detail.value;
        this[e.currentTarget.dataset.name] = t;
    },
    onGetVerifyCodeTap: function(e) {
        var t = this, a = n.duoguan_host_api_url + "/index.php?s=/addon/DuoguanUser/CardApi/sendPhoneVerifyCode.html";
        s.default.post(a, {
            phone: this.phone
        }, function(e) {
            wx.showToast({
                title: "验证码发送成功，请注意查收！"
            });
            var a = 60;
            !function e() {
                a > 0 ? (t.setData({
                    reload_verify_time: a--
                }), setTimeout(e, 1e3)) : t.setData({
                    reload_verify_time: null
                });
            }();
        });
    },
    onShareAppMessage: function() {
        return this.shareInfo = this.shareInfo || {}, {
            title: this.shareInfo.title || "附近家政",
            desc: this.shareInfo.desc || "",
            path: "/pages/reservation/index/index"
        };
    }
});