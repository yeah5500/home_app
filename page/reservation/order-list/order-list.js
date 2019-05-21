getApp();

var e = require("../../../utils/util"), t = require("../../../utils/requestUtil"), a = require("../../../utils/underscore"), n = require("../../../utils/data"), r = n.housekeeping_update_version;

Page({
    data: {
        page: 2,
        hasMore: !0,
        isHidden: !0,
        active: 1,
        data:true
    },
    onLoad: function(e) {
    
    },
    onShow: function() {
        var e = wx.getStorageSync("active");
        wx.removeStorageSync("active"), e = "" === e ? 1 : e, this.setData({
            active: e
        }), this.onPullDownRefresh(this.data.active);
    },
    onPullDownRefresh: function(e) {
    
        var a = this;
        if (!t.isLoading(this.requestListID)) {
            var e = e || this.data.active;
            this.requestListID = t.get(n.hk_request_url + "reseves.html", {
                ver: r,
                active: e
            }, function(e) {
                
                a.onDataHandler(e), a.onSetData(e, 1);
            }, this, {
                completeAfter: wx.stopPullDownRefresh,
                isShowLoading: !0
            });
        }
    },
    onReachBottom: function() {
        var e = this;
        this.data.hasMore ? t.get(n.hk_request_url + "reseves.html", {
            _p: this.data.page + 1,
            ver: r,
            active: this.data.active
        }, function(t) {
            e.onDataHandler(t), e.onSetData(t, e.data.page + 1);
        }, this, {
            completeAfter: wx.stopPullDownRefresh,
            isShowLoading: !1
        }) : wx.stopPullDownRefresh();
    },
    onDataHandler: function(t) {
   
        a(t).map(function(t) {
            return t.create_time = e.format(1e3 * t.create_time, "yyyy-MM-dd hh:mm"), t.reseve_time = e.format(1e3 * t.reseve_time, "yyyy-MM-dd hh:mm"), 
            t;
        });
    },
    onSetData: function(e, t) {
        e = e || [], this.setData({
            page: void 0 !== t ? t : this.data.page,
            data: 1 === t || void 0 === t ? e : this.data.data.concat(e),
            hasMore: void 0 !== t && 20 === e.length,
            isEmpty: (1 === t || void 0 === t) && 0 === e.length
        });
    },
    onNavigateTap: function(e) {
        e.currentTarget.dataset.active;
        var t = e.currentTarget.dataset.url;
        wx.navigateTo({
            url: t
        });
    },
    onMakePayTap: function(e) {
        var i = this;
        if (!t.isLoading(this.makePayRQId)) {
            var o = e.currentTarget.dataset.tradeNo;
            e.currentTarget.dataset.status;
            t.get(n.hk_request_url + "makeResevePay.html", {
                trade_no: o,
                ver: r
            }, function(e) {
                wx.requestPayment(a.extend(e, {
                    success: function(e) {
                        i.onPullDownRefresh();
                    }
                }));
            });
        }
    },
    onConfirmTap: function(e) {
        var a = this;
        if (!t.isLoading(this.updateStatusRQId)) {
            var r = e.currentTarget.dataset.tradeno;
            this.updateStatusRQId = t.get(n.hk_request_url + "reseveConfirm.html", {
                trade_no: r
            }, function(e) {
                a.onPullDownRefresh();
            });
        }
    },
    onDeleteTap: function(e) {
        var a = this;
        if (!t.isLoading(this.deleteRQId)) {
            var r = e.currentTarget.dataset.tradeNo;
            wx.showModal({
                content: "删除数据后将不能恢复,你确定要要删除这条预约吗？",
                success: function(e) {
                    e.confirm && (a.deleteRQId = t.get(n.hk_request_url + "reseveDel.html", {
                        trade_no: r
                    }, function(e) {
                        a.onPullDownRefresh();
                    }));
                }
            });
        }
    },
    orderDetail: function(e) {
        var t = e.currentTarget.dataset.id, a = e.currentTarget.dataset.active;
        wx.navigateTo({
            url: "/pages/reservation/order-detail/order-detail?id=" + t + "&active=" + a
        });
    },
    onCallPhone: function(e) {
        var t = e.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: t
        });
    },
    changeMenu: function(e) {
        var t = e.target.id;
        this.setData({
            active: t
        }), this.onPullDownRefresh(t);
    },
    onShareAppMessage: function() {
        return this.shareInfo = this.shareInfo || {}, {
            title: this.shareInfo.title || "附近家政",
            desc: this.shareInfo.desc || "",
            path: "/pages/reservation/index/index"
        };
    }
});