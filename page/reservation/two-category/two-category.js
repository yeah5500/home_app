getApp();

var t = require("../../../utils/util"), a = require("../../../utils/requestUtil"), e = require("../../../utils/underscore"), i = require("../../../utils/data");

Page({
    pid: 0,
    data: {
        isEmpty: !1,
        hasMore: !0,
        page: 1,
        data: [],
        cids: "",
        total: 0,
        earnest_total: 0,
        checkvalue: "",
        nums: "",
        tipDisplay: !0
    },
    onLoad: function(t) {
        this.pid = t.cid, this.onPullDownRefresh(1);
    },
    onShow: function() {
        var t = this;
        setTimeout(function() {
            t.setData({
                tipDisplay: !1
            });
        }, 3e3);
    },
    onPullDownRefresh: function(t) {
        var e = this;
        t = t || !1, a.get(i.hk_request_url + "categorys.html", {
            pid: this.pid
        }, function(t) {
            e.onDataHandler(t), e.onSetData(t, 1);
        }, this, {
            completeAfter: wx.stopPullDownRefresh,
            isShowLoading: t
        });
    },
    onReachBottom: function() {
        var t = this;
        this.data.hasMore ? a.get(i.hk_request_url + "categorys.html", {
            _p: this.data.page + 1,
            pid: this.pid
        }, function(a) {
            t.onDataHandler(a), t.onSetData(a, t.data.page + 1);
        }, this, {
            completeAfter: wx.stopPullDownRefresh,
            isShowLoading: !1
        }) : wx.stopPullDownRefresh();
    },
    onDataHandler: function(a) {
        e(a).map(function(a) {
            return a.create_time = t.format(1e3 * a.create_time, "yyyy-MM-dd hh:mm"), a.num = 1, 
            a.isshow = !1, a;
        });
    },
    onSetData: function(t, a) {
        t = t || [], this.setData({
            page: void 0 !== a ? a : this.data.page,
            data: 1 === a || void 0 === a ? t : this.data.data.concat(t),
            hasMore: void 0 !== a && 20 === t.length,
            isEmpty: (1 === a || void 0 === a) && 0 === t.length
        });
    },
    onNavigateTap: function(t) {
        wx.navigateTo({
            url: t.currentTarget.dataset.url
        });
    },
    onChanged: function(t) {
        var a = this, i = t.detail.value;
        this.setData({
            checkvalue: i
        });
        var s = 0, o = 0, n = [], r = e.find(a.data.data, {
            id: i
        });
        r.isshow = !0, r.price = parseFloat(r.price), r.earnest_price = parseFloat(r.earnest_price);
        var u = parseFloat(r.num * r.price).toFixed(2), d = parseFloat(r.num * r.earnest_price).toFixed(2);
        s += parseFloat(u), o += parseFloat(d), n.push(r.num), this.setData({
            cids: i,
            total: s.toFixed(2),
            earnest_total: o.toFixed(2),
            data: this.data.data,
            nums: n.join(",")
        });
    },
    onTipDisplay: function() {
        var t = this.data.tipDisplay;
        this.setData({
            tipDisplay: !t
        });
    },
    onPushSubmit: function(t) {
        a.pushFormId(t.detail.formId);
        var e = "../reseve/reseve?ids=" + this.data.cids;
        wx.navigateTo({
            url: e
        });
    }
});