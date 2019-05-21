function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var a = t(require("../../../../utils/requestUtil")), e = t(require("../../../../utils/underscore")), o = t(require("../../../../utils/util")), n = require("../../../../utils/data");

Page({
    data: {
        isEmpty: !1,
        hasMore: !0,
        isLoading: !0,
        page: 1
    },
    onLoad: function(t) {
        this.onPullDownRefresh();
    },
    onPullDownRefresh: function() {
        var t = this, e = n.duoguan_host_api_url + "/index.php/addon/MarketingLuckDraw/Api/getLuckDrawLog";
        a.default.get(e, {
            type: 1
        }, function(a) {
            t.onDataHandler(a), t.onSetData(a, 1);
        }, this, {
            completeAfter: wx.stopPullDownRefresh
        });
    },
    onReachBottom: function() {
        var t = this;
        if (!this.data.hasMore) return console.log("没有更多了..."), void wx.stopPullDownRefresh();
        this.setData({
            isLoading: !0
        });
        var e = n.duoguan_host_api_url + "/index.php/addon/MarketingLuckDraw/Api/getLuckDrawLog";
        a.default.get(e, {
            type: 1,
            _p: this.data.page + 1
        }, function(a) {
            t.onDataHandler(a), t.onSetData(a, t.data.page + 1);
        }, this, {
            completeAfter: wx.stopPullDownRefresh,
            isShowLoading: !1
        });
    },
    onDataHandler: function(t) {
        (0, e.default)(t).map(function(t) {
            return t.add_time = o.default.format(1e3 * t.add_time, "yyyy-MM-dd hh:mm"), t;
        });
    },
    onSetData: function(t, a) {
        t = t || [], this.setData({
            page: void 0 !== a ? a : this.data.page,
            data: 1 === a || void 0 === a ? t : this.data.data.concat(t),
            hasMore: void 0 !== a && t.length >= 20,
            isEmpty: (1 === a || void 0 === a) && 0 === t.length,
            isLoading: !1
        });
    },
    onCopyTap: function(t) {
        var a = t.currentTarget.dataset.data;
        wx.setClipboardData({
            data: a,
            success: function(t) {
                wx.showToast({
                    title: "已复制兑换码"
                });
            }
        });
    }
});