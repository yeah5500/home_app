function t(t) {
    return t.replace(/\-/g, "/");
}

var i = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../utils/plugUtil")), e = (getApp(), require("../../../../utils/util")), n = require("../../../../utils/requestUtil"), a = require("../../../../utils/underscore"), o = require("../../../../utils/data"), l = require("../../../../wxParse/wxParse.js");

Page({
    data: {
        like: null,
        rule: !0,
        isin: !1,
        inlike: !1,
        mylike: null,
        likeid: null,
        listinfo: null,
        headlist: null,
        cutdown: "00 天 00 时 00 分 00 秒",
        getshow: !0,
        getit: !1
    },
    title: "",
    setintvalid: null,
    onLoad: function(t) {
        var i = this;
        wx.hideShareMenu(), i.setData({
            options: t
        }, function() {
            e.trySyncUserInfo(), wx.setNavigationBarColor({
                frontColor: "#ffffff",
                backgroundColor: "#ed4649"
            }), i.mylikeinit(t), wx.stopPullDownRefresh();
        });
    },
    mylikeinit: function(t) {
        var e = this;
        n.post(o.duoguan_host_api_url + "/index.php?s=/addon/MarketingLike/IndexApi/index.html", t, function(t) {
            e.title = t.share_title, e.setData({
                like: t,
                mylike: t.myinfo,
                inlike: t.mylike,
                likeid: t.id
            }, function() {
                var t = "pages/plug-in/supportCompetition/help/help?userid=" + wx.getStorageSync("user_info").uid + "&likeid=" + e.data.likeid;
                i.default.setShare(e, e.data.options.module, t);
                var n = {};
                n.likeid = e.data.likeid, e.mylikelist(n), e.mylikeheadimg(n), e.data.like.ljstart && e.mylikelj(e.data.like.ljstart_true_time), 
                e.data.like.start && e.mylikelj(e.data.like.start_time);
            }), l.wxParse("description", "html", t.like_content, e);
        });
    },
    mylikelj: function(i) {
        var e = new Date().getTime(), n = Date.parse(t(i)) - e, a = this;
        a.setintvalid = setInterval(function() {
            if ((n -= 1e3) <= 0) return clearInterval(a.setintvalid), void (n = 0);
            a.time_meter(n);
        }, 1e3);
    },
    time_meter: function(t) {
        var i = this, e = parseInt(t / 1e3 / 60 / 60 / 24, 10), n = parseInt(t / 1e3 / 60 / 60 % 24, 10), a = parseInt(t / 1e3 / 60 % 60, 10), o = parseInt(t / 1e3 % 60, 10), l = (e = i.checkTime(e)) + " 天 " + (n = i.checkTime(n)) + "时" + (a = i.checkTime(a)) + "分" + (o = i.checkTime(o)) + "秒";
        i.setData({
            cutdown: l
        });
    },
    checkTime: function(t) {
        return t < 10 && (t = "0" + t), t;
    },
    mylikeheadimg: function(t) {
        var i = this;
        n.post(o.duoguan_host_api_url + "/index.php?s=/addon/MarketingLike/Mylike/getmylikehead.html", t, function(t) {
            i.setData({
                headlist: t
            });
        });
    },
    mylikelist: function(t) {
        var i = this;
        n.post(o.duoguan_host_api_url + "/index.php?s=/addon/MarketingLike/Mylike/getlist.html", t, function(t) {
            i.setData({
                listinfo: t
            });
        });
    },
    rule_show: function() {
        this.setData({
            rule: !1
        });
    },
    rule_hide: function() {
        this.setData({
            rule: !0
        });
    },
    Instrant: function(t) {
        var i = this;
        i.setData({
            isin: !0
        }, function() {
            var e = t.detail.formId;
            n.pushFormId(e);
            var a = {};
            a.likeid = t.detail.value.likeid, n.post(o.duoguan_host_api_url + "/index.php?s=/addon/MarketingLike/Mylike/inlike.html", a, function(t) {
                i.setData({
                    inlike: t
                }, function() {
                    var t = i.data.options;
                    i.mylikeinit(t);
                });
            });
        });
    },
    lookrank: function() {
        var t = this;
        wx.navigateTo({
            url: "/pages/plug-in/supportCompetition/ranking/ranking?likeid=" + t.data.likeid
        });
    },
    getshow: function() {
        this.setData({
            getshow: !1
        });
    },
    gethide: function() {
        this.setData({
            getshow: !0
        });
    },
    getprize: function(t) {
        var i = t.detail.formId;
        n.pushFormId(i);
        var e = this;
        e.setData({
            getit: !0
        }, function() {
            var i = t.detail.value;
            a.isEmpty(i) || "" == i.realname || "" == i.mobile ? e.setData({
                getit: !1
            }, function() {
                wx.showModal({
                    content: "信息填写不完整"
                });
            }) : e.setData({
                getit: !1
            }, function() {
                i = a.extend({
                    likeid: e.data.likeid
                }, i), n.post(o.duoguan_host_api_url + "/index.php?s=/addon/MarketingLike/Mylike/getprize.html", i, function(t) {
                    e.setData({
                        getshow: t
                    }, function() {
                        e.mylikeinit(e.data.options);
                    });
                });
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this, i = t.data.options;
        e.trySyncUserInfo(), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#ed4649"
        }), t.mylikeinit(i), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function(t) {
        var i = this;
        if ("submit" == t.type) {
            var e = t.detail.formId;
            n.pushFormId(e);
        }
        var a = "pages/plug-in/supportCompetition/help/help?userid=" + wx.getStorageSync("user_info").uid + "&likeid=" + i.data.likeid;
        return {
            title: i.title ? i.title : i.data.like.like_title,
            path: a,
            success: function(t) {
                console.log(t);
            },
            fail: function(t) {
                console.log(t);
            }
        };
    }
});