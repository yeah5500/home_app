getApp(), require("../../../utils/util");

var t = require("../../../utils/requestUtil"), a = require("../../../utils/underscore"), e = require("../../../utils/data");

Page({
    data: {
        isEmpty: !1,
        hasMore: !0,
        page: 1,
        data: [],
        lat: 0,
        lng: 0,
        tsmsg: "您的附近暂无评价~~",
        full: 5,
        ttt: 4
    },
    onLoad: function() {
        var t = this;
        wx.getLocation({
            type: "wgs84",
            success: function(a) {
                t.setData({
                    lat: a.latitude,
                    lng: a.longitude
                }), t.getEvaluate();
            },
            fail: function() {
                t.showMsg("位置信息获取失败!"), t.setData({
                    tsmsg: "位置信息获取失败!",
                    isEmpty: !0
                });
            }
        });
    },
    showMsg: function(t) {
        wx.showModal({
            content: t,
            showCancel: !1
        });
    },
    getEvaluate: function() {
        var a = this;
        t.get(e.hk_request_url + "getDiscoverComment.html", {
            lat: this.data.lat,
            lng: this.data.lng,
            _p: a.data.page
        }, function(t) {
            t.length <= 0 ? (a.setData({
                hasMore: !1
            }), 1 == a.data.page && a.setData({
                isEmpty: !0
            })) : (a.onDataHandler(t), a.setData({
                data: a.data.data.concat(t),
                page: a.data.page + 1
            }));
        }, this);
    },
    onDataHandler: function(t) {
        a(t).map(function(t) {
            return t.companytitle = t.companytitle.length > 8 ? t.companytitle.substr(0, 8) + "..." : t.companytitle, 
            t.star = parseInt(t.star), t.distance = (t.distance / 1e3).toFixed(1), t.image = t.image != [] && "http" == t.image[0].substr(0, 4) ? t.image : [], 
            t;
        });
    },
    onPullDownRefresh: function() {
        var a = this;
        t.get(e.hk_request_url + "getDiscoverComment.html", {
            lat: this.data.lat,
            lng: this.data.lng
        }, function(t) {
            if (console.log(t), 1 == t.comment.type) {
                var e = t.comment;
                e.imgs = t.comment.image.split("##"), e.star = parseInt(e.star), a.setData({
                    comment: t.comment
                });
            }
            a.onDataHandler(t), a.setData({
                detail: t,
                showLoading: 0
            });
        }, this);
    },
    onReachBottom: function() {
        this.data.hasMore && this.getEvaluate();
    },
    onNavigateTap: function(t) {
        var a = t.currentTarget.dataset.url;
        wx.navigateTo({
            url: a
        });
    },
    onPriviewImg: function(t) {
        var a = t.currentTarget.dataset.comindex, e = t.currentTarget.dataset.imgindex, n = this.data.data[a].image;
        wx.previewImage({
            current: n[e],
            urls: n
        });
    }
});