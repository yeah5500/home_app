var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../../../utils/plugUtil")), e = (getApp(), require("../../../../utils/util")), o = require("../../../../utils/requestUtil"), i = require("../../../../utils/underscore"), n = require("../../../../utils/data"), r = require("../../../../wxParse/wxParse.js");

Page({
    data: {
        rule_hide: !0,
        wordcon: null,
        word_hide: !0,
        lotter_rec: null,
        lot_more: !1,
        get_word: !1,
        lot: !0,
        ass: !1,
        win: !1,
        ass_rec: null,
        win_rec: null,
        lotpage: 1,
        is_help: !1,
        is_my: !0,
        userid: null,
        helpword: null,
        canget: !1,
        help_hide: !0,
        redstatus: 1,
        redcode: null,
        options: null
    },
    title: "",
    onLoad: function(t) {
        var o = this;
        e.trySyncUserInfo(), o.setData({
            options: t
        }, function() {
            wx.setNavigationBarColor({
                frontColor: "#ffffff",
                backgroundColor: "#feac1d"
            }), o.mywordinit(t);
        });
    },
    mywordinit: function(e) {
        var i = this;
        o.post(n.duoguan_host_api_url + "/index.php?s=/addon/MarketingWord/IndexApi/wordIndex.html", e, function(o) {
            i.setData({
                word_hide: !0,
                wordcon: o,
                wid: o.id,
                get_word: o.get_word,
                is_help: o.is_help,
                is_my: o.mine,
                userid: e.userid,
                helpword: o.helpword,
                redstatus: o.redstatus,
                redcode: o.redcode
            }, function() {
                i.title = i.data.wordcon.share_title;
                var e = "pages/plug-in/collectWord/index/index?userid=" + wx.getStorageSync("user_info").uid;
                t.default.setShare(i, i.data.options.module, e), i.lotter_rec();
            }), r.wxParse("description", "html", o.word_content, i);
        });
    },
    lotter_rec: function() {
        var t = this, e = {};
        e.wid = t.data.wid, o.post(n.duoguan_host_api_url + "/index.php?s=/addon/MarketingWord/IndexApi/lotter.html", e, function(e) {
            null != e && t.setData({
                lotter_rec: e,
                lot_more: !0
            });
        });
    },
    nohelp: function(t) {
        this.setData({
            is_help: !0
        });
    },
    onReady: function() {},
    onShow: function() {},
    getword: function(t) {
        var e = this;
        e.setData({
            canget: !0
        }, function() {
            var i = t.detail.formId;
            o.pushFormId(i);
            var r = {};
            r.wid = t.detail.value.wid, o.post(n.duoguan_host_api_url + "/index.php?s=/addon/MarketingWord/GetWordApi/getMyWord.html", r, function(t) {
                t.word && e.setData({
                    word_hide: !1,
                    myword: t.word,
                    canget: !1
                });
            });
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        e.trySyncUserInfo();
        var t = this, o = {};
        0 == i.isUndefined(t.data.userid) && (o.userid = t.data.userid), t.mywordinit(o), 
        wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onPageScroll: function(t) {
        t.scrollTop >= 235 ? wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#f82612",
            animation: {
                duration: 300,
                timingFunc: "easeInOut"
            }
        }) : wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: "#feac1d",
            animation: {
                duration: 200,
                timingFunc: "easeInOut"
            }
        });
    },
    onShareAppMessage: function(t) {
        var e = this, i = wx.getStorageSync("user_info").uid;
        if ("submit" == t.type) {
            var n = t.detail.formId;
            o.pushFormId(n);
        }
        e.title = e.data.wordcon.share_title;
        var r = "/pages/plug-in/collectWord/index/index?userid=" + i;
        return {
            title: e.title,
            path: r,
            success: function(t) {},
            fail: function(t) {}
        };
    },
    showrule: function(t) {
        var e = t.detail.formId;
        o.pushFormId(e), this.setData({
            rule_hide: !1
        });
    },
    hiderule: function(t) {
        this.setData({
            rule_hide: !0
        });
    },
    onlot: function() {
        this.setData({
            lot: !0,
            ass: !1,
            win: !1
        });
    },
    onass: function() {
        var t = this;
        t.setData({
            lot: !1,
            ass: !0,
            win: !1
        }, function() {
            var e = {};
            e.wid = t.data.wid, o.post(n.duoguan_host_api_url + "/index.php?s=/addon/MarketingWord/GetWordApi/onass.html", e, function(e) {
                t.setData({
                    ass_rec: e
                });
            });
        });
    },
    onwin: function() {
        var t = this;
        t.setData({
            lot: !1,
            ass: !1,
            win: !0
        }, function() {
            var e = {};
            e.wid = t.data.wid, o.post(n.duoguan_host_api_url + "/index.php?s=/addon/MarketingWord/GetWordApi/onwin.html", e, function(e) {
                t.setData({
                    win_rec: e
                });
            });
        });
    },
    mygetword: function(t) {
        wx.reLaunch({
            url: "/pages/plug-in/collectWord/index/index",
            fail: function(t) {
                console.log(t);
            }
        });
    },
    helpuser: function() {
        var t = this, e = {};
        e.wid = t.data.wid, e.userid = t.data.userid, o.post(n.duoguan_host_api_url + "/index.php?s=/addon/MarketingWord/GetWordApi/helpuser.html", e, function(o) {
            t.setData({
                is_help: !0,
                help_hide: !1,
                helpword: o.word,
                userid: e.userid
            });
        });
    },
    helpinit: function() {
        var t = this, e = {};
        e.userid = t.data.userid, o.post(n.duoguan_host_api_url + "/index.php?s=/addon/MarketingWord/IndexApi/wordIndex.html", e, function(o) {
            t.setData({
                word_hide: !0,
                wordcon: o,
                wid: o.id,
                get_word: o.get_word,
                is_help: o.is_help,
                help_hide: o.is_help,
                is_my: o.mine,
                userid: e.userid,
                helpword: o.helpword
            }, function() {
                t.lotter_rec();
            }), r.wxParse("description", "html", o.word_content, t);
        });
    },
    redeem: function(t) {
        var e = this, i = t.detail.formId;
        o.pushFormId(i);
        var r = {};
        r.wid = e.data.wid, o.post(n.duoguan_host_api_url + "/index.php?s=/addon/MarketingWord/IndexApi/redeem.html", r, function(t) {
            e.setData({
                redstatus: 3,
                redcode: t
            });
        });
    }
});