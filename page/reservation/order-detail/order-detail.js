var e = require("../../../utils/data"), t = require("../../../utils/requestUtil"), a = require("../../../utils/util"), r = require("../../../utils/underscore");

Page({
    data: {
        id: "",
        detail: "",
        showLoading: 1
    },
    onLoad: function(e) {
        this.setData({
            id: e.id
        }), wx.setStorageSync("active", e.active), this.onPullDownRefresh();
    },
    onDataHandler: function(e) {
        return e.create_time = a.format(1e3 * e.create_time, "yyyy-MM-dd hh:mm"), e.reseve_time = a.format(1e3 * e.reseve_time, "yyyy-MM-dd hh:mm"), 
        e;
    },
    onMakePayTap: function(a) {
        var n = this;
        if (!t.isLoading(this.makePayRQId)) {
            var i = a.currentTarget.dataset.tradeNo;
            a.currentTarget.dataset.status;
            t.get(e.hk_request_url + "makeResevePay.html", {
                trade_no: i,
                ver: "2.0.1"
            }, function(e) {
                wx.requestPayment(r.extend(e, {
                    success: function(e) {
                        n.onPullDownRefresh();
                    },
                    fail: function(e) {}
                }));
            });
        }
    },
    onConfirmTap: function(a) {
        var r = this;
        if (!t.isLoading(this.updateStatusRQId)) {
            var n = a.currentTarget.dataset.tradeNo;
            t.get(e.hk_request_url + "reseveConfirm.html", {
                trade_no: n
            }, function(e) {
                r.onPullDownRefresh();
            }, this);
        }
    },
    onNavigateTap: function(e) {
        var t = e.currentTarget.dataset.url;
        wx.navigateTo({
            url: t
        });
    },
    onPullDownRefresh: function() {
        var a = this, r = {
            id: this.data.id
        };
        t.get(e.hk_request_url + "reseveDetail.html", r, function(e) {
            if (1 == e.comment.type) {
                var t = e.comment;
                t.imgs = e.comment.image.split("##"), t.star = parseInt(t.star), a.setData({
                    comment: e.comment
                });
            }
            a.onDataHandler(e), console.log(e), a.setData({
                detail: e,
                showLoading: 0
            });
        }, this);
    },
    onCallPhone: function(e) {
        var t = e.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    onPriviewImg: function(e) {
        var t = e.currentTarget.dataset.index, a = this.data.detail.comment.imgs;
        wx.previewImage({
            current: a[t],
            urls: a
        });
    }
});