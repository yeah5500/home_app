var t = require("../../../utils/data.js"), e = require("../../../utils/requestUtil.js"), a = require("../../../utils/underscore.js");

getApp();

Page({
    bid: 0,
    page: 1,
    commentType: 0,
    isLoad: !1,
    data: {
        isshare: 1,
        isShowLoading: !0,
        hasMore: !0,
        comment: [],
        nums: 0,
        nav: [ {
            title: "评价",
            active: "active",
            sub: !0,
            tips: 1
        }, {
            title: "商家",
            active: "",
            sub: !1,
            tips: 2
        } ],
        tips: [ {
            title: "全部",
            type: 0,
            count: 0,
            active: "active"
        }, {
            title: "有图",
            type: 1,
            count: 0,
            active: ""
        }, {
            title: "好评",
            type: 2,
            count: 0,
            active: ""
        }, {
            title: "一般",
            type: 3,
            count: 0,
            active: ""
        }, {
            title: "差评",
            type: 4,
            count: 0,
            active: ""
        } ]
    },
    onLoad: function(t) {
        this.bid = t.bid, void 0 !== t.isshare && 0 == t.isshare && this.setData({
            isshare: 0,
            nav: [ {
                title: "服务",
                active: "active",
                sub: !1,
                tips: 0
            }, {
                title: "评价",
                active: "",
                sub: !0,
                tips: 1
            }, {
                title: "商家",
                active: "",
                sub: !1,
                tips: 2
            } ]
        }), wx.setStorageSync("active", t.active), this.onPullDownRefresh(t.bid);
    },
    onNavigateTap: function(t) {
        wx.navigateTo({
            url: t.currentTarget.dataset.url
        });
    },
    onSwitchTab: function(t) {
        wx.switchTab({
            url: t.currentTarget.dataset.url
        });
    },
    showCon: function(t) {
        for (var e = t.currentTarget.dataset.index, a = this.data.nav, i = 0; i < a.length; i++) a[i].tips == e ? a[i].active = "active" : a[i].active = "";
        this.setData({
            nav: a
        });
    },
    onCatchTip: function(t) {
        for (var e = t.currentTarget.dataset.index, a = this.data.tips, i = 0; i < a.length; i++) a[i].active = i == e ? "active" : "";
        this.commentType = a[e].type, this.setData({
            tips: a,
            hasMore: !0,
            comment: []
        }), this.page = 1, this.getCompany(this.bid, this.page);
    },
    onPullDownRefresh: function(t) {
        this.getCompany(t, 1);
    },
    onReachBottom: function() {
        var t = this.data.nav;
        if ((2 == t.length && "active" == t[0].active || 3 == t.length && "active" == t[1].active) && this.data.hasMore) {
            var e = this.bid;
            this.page += 1, this.getCompany(e, this.page);
        }
    },
    onShareAppMessage: function() {
        return wx.hideShareMenu(), {
            title: this.data.data.companytitle,
            path: "/pages/reservation/business/business?bid=" + this.bid + "&isshare=0"
        };
    },
    getCompany: function(i, s) {
        var n = this;
        1 != this.isLoad && (this.isLoad = !0, e.get(t.hk_request_url + "getCompany.html", {
            bid: i,
            page: s,
            type: this.commentType,
            needDoc: this.data.isshare
        }, function(t) {
            n.isLoad = !1, 1 == n.data.isshare && 1 == t.arbitrarily_uesr_can && n.setData({
                isshare: 0,
                nav: [ {
                    title: "服务",
                    active: "active",
                    sub: !1,
                    tips: 0
                }, {
                    title: "评价",
                    active: "",
                    sub: !0,
                    tips: 1
                }, {
                    title: "商家",
                    active: "",
                    sub: !1,
                    tips: 2
                } ]
            }), 0 == t.businessServer.length && n.setData({
                nav: [ {
                    title: "评价",
                    active: "active",
                    sub: !0,
                    tips: 1
                }, {
                    title: "商家",
                    active: "",
                    sub: !1,
                    tips: 2
                } ]
            });
            var e = t.comment.length > 0, i = [].concat(t.comment);
            a.each(i, function(t) {
                t.image = t.image.split("##"), t.star = parseInt(t.star);
            });
            var r = n.data.comment;
            if (r = r.concat(i), 1 != s || 0 != n.commentType) n.setData({
                isShowLoading: !1,
                hasMore: e,
                comment: r
            }); else {
                var c = n.data.tips;
                c[0].count = t.commentCount.all_count, c[1].count = t.commentCount.img_count, c[2].count = t.commentCount.h_count, 
                c[3].count = t.commentCount.yb_count, c[4].count = t.commentCount.c_count, n.setData({
                    isShowLoading: !1,
                    hasMore: e,
                    data: t,
                    comment: r,
                    nums: t.count,
                    tips: c
                });
            }
        }, this));
    },
    onPriviewImg: function(t) {
        var e = t.currentTarget.dataset.comindex, a = t.currentTarget.dataset.imgindex, i = this.data.comment[e].image;
        wx.previewImage({
            current: i[a],
            urls: i
        });
    },
    onPriviewPic: function(t) {
        t.currentTarget.dataset.comindex;
        var e = t.currentTarget.dataset.imgindex, a = this.data.data.businessImg;
        wx.previewImage({
            current: a[e],
            urls: a
        });
    },
    onPriviewTopPic: function(t) {
        var e = [ t.currentTarget.dataset.img ];
        wx.previewImage({
            current: e[0],
            urls: e
        });
    },
    onMakeStoreOrder: function(t) {
        var e = this, a = t.currentTarget.dataset.ids;
        0 == e.bid ? wx.showToast({
            title: "店铺信息获取失败!",
            icon: "none"
        }) : wx.navigateTo({
            url: "../reseve/reseve?storeid=" + e.bid + "&ids=" + a
        });
    }
});