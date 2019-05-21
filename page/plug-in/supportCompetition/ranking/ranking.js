getApp();

var a = require("../../../../utils/util"), n = require("../../../../utils/requestUtil"), t = require("../../../../utils/underscore"), e = require("../../../../utils/data");

require("../../../../wxParse/wxParse.js");

Page({
    data: {
        myrank: null,
        ranklist: null,
        page: 1,
        ismore: !0
    },
    onLoad: function(n) {
        var e = this;
        e.setData({
            options: n
        }, function() {
            a.trySyncUserInfo(), wx.setNavigationBarColor({
                frontColor: "#ffffff",
                backgroundColor: "#ed4649"
            }), e.myrank(n), n = t.extend({
                page: e.data.page
            }, n), e.ranklist(n), wx.hideShareMenu();
        });
    },
    onReady: function() {},
    myrank: function(a) {
        var t = this;
        n.post(e.duoguan_host_api_url + "/index.php?s=/addon/MarketingLike/Mylike/getmyrank.html", a, function(n) {
            t.setData({
                likeid: a.likeid,
                myrank: n
            });
        });
    },
    ranklist: function(a) {
        var t = this;
        n.post(e.duoguan_host_api_url + "/index.php?s=/addon/MarketingLike/Mylike/ranklist.html", a, function(n) {
            0 == n.rankhead ? t.setData({
                ismore: !1
            }) : t.setData({
                ranklist: n.ranklist,
                rankhead: n.rankhead,
                page: a.page
            });
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var n = this;
        a.trySyncUserInfo(), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#ed4649"
        });
        var e = n.data.options;
        n.myrank(e), e = t.extend({
            page: 1
        }, e), n.ranklist(e), wx.hideShareMenu(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        var a = this, n = a.data.options, e = a.data.page;
        n = t.extend({
            page: ++e
        }, n), a.data.ismore && a.ranklist(n);
    },
    onShareAppMessage: function() {}
});