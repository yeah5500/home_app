getApp();

var e = require("../../../../utils/util"), n = require("../../../../utils/requestUtil"), i = (require("../../../../utils/underscore"), 
require("../../../../utils/data"));

require("../../../../wxParse/wxParse.js");

Page({
    data: {
        helplike: null,
        like: null,
        helphead: null,
        ishelp: !1,
        disable: !1,
        options: {},
        helpuser: !1
    },
    onLoad: function(n) {
        wx.getStorageSync("user_info").uid == n.userid && wx.reLaunch({
            url: "/pages/plug-in/supportCompetition/index/index"
        });
        var i = this;
        i.setData({
            options: n
        }, function() {
            e.trySyncUserInfo(), wx.setNavigationBarColor({
                frontColor: "#ffffff",
                backgroundColor: "#ed4649"
            }), i.helpuserinfo(n), wx.hideShareMenu();
        });
    },
    helpuserinfo: function(e) {
        var o = this;
        n.post(i.duoguan_host_api_url + "/index.php?s=/addon/MarketingLike/IndexApi/index.html", e, function(n) {
            0 == n.mylike ? wx.reLaunch({
                url: "/pages/plug-in/supportCompetition/index/index"
            }) : o.setData({
                like: n,
                helplike: n.myinfo,
                likeid: n.id,
                ishelp: n.myhelp
            }, function() {
                o.helpheadlist(e);
            });
        });
    },
    helpheadlist: function(e) {
        var o = this;
        n.post(i.duoguan_host_api_url + "/index.php?s=/addon/MarketingLike/Mylike/gethelolikehead.html", e, function(e) {
            o.setData({
                helphead: e
            });
        });
    },
    toindex: function() {
        wx.reLaunch({
            url: "/pages/plug-in/supportCompetition/index/index"
        });
    },
    help: function() {
        var e = this;
        e.setData({
            disable: !0
        }, function() {
            var o = e.data.options;
            n.post(i.duoguan_host_api_url + "/index.php?s=/addon/MarketingLike/Mylike/helplike.html", o, function(n) {
                e.setData({
                    helpuser: n
                });
            });
        });
    },
    hidehelp: function() {
        var e = this;
        e.setData({
            helpuser: !1
        }, function() {
            var n = e.data.options;
            e.helpuserinfo(n);
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var n = this;
        e.trySyncUserInfo(), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#ed4649"
        });
        var i = n.data.options;
        n.helpuserinfo(i), wx.hideShareMenu(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});