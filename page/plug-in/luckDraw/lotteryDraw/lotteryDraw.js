function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../../../utils/requestUtil.js")), i = t(require("../../../../utils/util.js")), e = (t(require("../../../../utils/underscore")), 
require("../../../../utils/data"));

Page({
    data: {
        this_id: 0,
        this_market_data: null,
        this_jiangpin_data: null,
        nam: 1800,
        animationData: {
            duration: 3e3,
            timingFunction: "linear",
            rotate: 0
        }
    },
    onLoad: function(t) {
        wx.hideShareMenu();
        var a = t.id || 0;
        this.setData({
            this_id: a
        }), this.onPullDownRefresh();
    },
    onPullDownRefresh: function() {
        var t = this;
        a.default.get(e.duoguan_host_api_url + "/index.php/addon/MarketingLuckDraw/Api/getMarketInfo", {
            id: this.data.this_id
        }, function(a) {
            console.log(a), t.setData({
                this_market_data: a,
                this_jiangpin_data: a.jiangpin_data
            }), wx.setNavigationBarTitle({
                title: a.title
            }), wx.showShareMenu();
        }, this, {
            error: function(t, a) {
                if (404 == t) return wx.showModal({
                    title: "温馨提示",
                    content: a,
                    showCancel: !1,
                    success: function(t) {
                        wx.navigateBack();
                    }
                }), !1;
            },
            isShowLoading: !0,
            completeAfter: wx.stopPullDownRefresh
        });
        var i = e.duoguan_host_api_url + "/index.php/addon/MarketingLuckDraw/Api/getLuckDrawLog";
        a.default.get(i, {
            id: this.data.this_id,
            _r: 10
        }, function(a) {
            t.setData({
                luck_user_log: a
            });
        });
    },
    onNavigateTap: function(t) {
        var i = t.detail.target ? t.detail.target.dataset : t.currentTarget.dataset, e = i.url, n = i.type, r = {
            url: e
        };
        i.invalid || (t.detail.formId && a.default.pushFormId(t.detail.formId), "switch" == n ? (r.fail = function() {
            wx.navigateTo({
                url: e
            });
        }, wx.switchTab(r)) : wx.navigateTo(r));
    },
    onStartTap: function() {
        i.default.trySyncUserInfo(), this.onStartRequest();
    },
    onStartRequest: function() {
        var t = this;
        if (!a.default.isLoading(this.startRQID)) {
            0 != this.data.animationData.rotate && this.setData({
                animationData: {
                    duration: 0,
                    timingFunction: "linear",
                    rotate: 0
                }
            });
            var i = 0, n = !1, r = 1080, s = "", u = "", o = !0, d = !0, l = "";
            (function t() {
                var a = this;
                i += r, n ? (this.setData({
                    animationData: {
                        duration: d ? 0 : 2e3,
                        timingFunction: d ? "linear" : "ease-out",
                        rotate: d ? 0 : i
                    }
                }), d ? this.setData({
                    isRequestFail: !0,
                    failMsg: l
                }) : setTimeout(function() {
                    a.setData({
                        isRequestFail: !!d || !!o,
                        is_kongjiang: o,
                        failMsg: l,
                        prize: s,
                        prizeImg: u,
                        this_market_data: a.data.this_market_data
                    });
                }, 2500)) : (this.setData({
                    animationData: {
                        duration: 2e3,
                        timingFunction: "linear",
                        rotate: i
                    }
                }), setTimeout(t.bind(this), 2e3));
            }).bind(this).call();
            var h = e.duoguan_host_api_url + "/index.php/addon/MarketingLuckDraw/Api/makeLottery";
            this.startRQID = a.default.get(h, {
                id: this.data.this_id
            }, function(a, i, e) {
                e.delay = 5500, d = !1, o = 1 == a.is_kongjiang, l = o ? a.prize : "", t.data.this_market_data.user_data.user_jiang_num = a.user_jiang_num, 
                t.data.this_market_data.user_data.user_jiner_num = a.user_jiner_num, o || (s = a.prize, 
                u = a.l_jp_pic), setTimeout(function() {
                    n = !0, r = 60 * a.id + 360;
                }, 500);
            }, this, {
                error: function(t, a) {
                    return l = a, !1;
                },
                completeAfter: function() {
                    n = !0;
                },
                isShowLoading: !1,
                delay: 3e3
            });
        }
    },
    onSetValueTap: function(t) {
        var a = t.currentTarget.dataset;
        if (a.isMulti || !1) {
            var i = JSON.parse(a.value);
            for (var e in i) i[e] = Object.assign(this.data[e] || {}, i[e]);
            this.setData(i);
        } else {
            var n = a.name, r = a.value, s = {};
            s[n] = r, this.setData(s);
        }
    },
    onShareAppMessage: function() {
        var t = this;
        return {
            title: this.data.this_market_data.title,
            path: getCurrentPages()[0].__route__,
            success: function() {
                var i = e.duoguan_host_api_url + "/index.php/addon/MarketingLuckDraw/ApiShare/shareSetData";
                a.default.get(i, {
                    id: t.data.this_id
                }, function() {
                    t.onPullDownRefresh();
                });
            }
        };
    }
});