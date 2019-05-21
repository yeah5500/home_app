getApp(), require("../../../utils/util");

var t = require("../../../utils/requestUtil"), a = (require("../../../utils/underscore"), 
require("../../../utils/data")), e = require("../../../wxParse/wxParse.js");

Page({
    categoryId: 0,
    data: {
        num: 1
    },
    onLoad: function(e) {
        var s = this;
        this.categoryId = e.cid, this.setDataOld = this.setData, this.setData = function(t) {
            this.setDataOld(t);
            for (var a in t) if (a.startsWith("content_")) {
                var e = a.substring(a.indexOf("_") + 1, a.length);
                this.data.data[e].content = t[a], this.data.data[e].num = 1, this.setDataOld({
                    data: this.data.data
                });
            }
        }, t.get(a.duoguan_host_api_url + "/index.php/addon/DuoguanUser/Api/getShareInfo.html", {
            mmodule: "duoguan_housekeeping"
        }, function(t) {
            s.shareInfo = t;
        });
    },
    onShow: function() {
        var s = this;
        t.get(a.hk_request_url + "documents.html", {
            cid: this.categoryId,
            ver: "2.0.0"
        }, function(t, a) {
            if (console.log(t), console.log(a), t.length) {
                s.data.data = t;
                for (var i = 0, d = 0, n = [], r = 0; r < t.length; r++) e.wxParse("content_" + r, "html", t[r].content, s), 
                i += parseFloat(t[r].price), d += parseFloat(t[r].earnest_price), n.push(t[r].id);
                s.setData({
                    total: i,
                    earnest_total: d,
                    pinfo: a.parent,
                    data: s.data.data,
                    ids: n.join(",")
                });
            } else wx.showModal({
                content: "服务信息未找到，请稍后再试...",
                showCancel: !1,
                success: function() {
                    wx.navigateBack();
                }
            });
        });
    },
    onNavigateTap: function(t) {
        wx.navigateTo({
            url: t.currentTarget.dataset.url
        });
    },
    reduce: function(t) {
        var a = t.currentTarget.dataset.index;
        this.data.data[a].num <= 1 ? this.data.data[a].num = 1 : (this.data.data[a].num = --this.data.data[a].num, 
        this.setData({
            data: this.data.data,
            total: parseFloat((this.data.total - parseFloat(this.data.data[a].price)).toFixed(2)),
            earnest_total: parseFloat((this.data.earnest_total - parseFloat(this.data.data[a].earnest_price)).toFixed(2)),
            num: this.data.data[a].num
        }));
    },
    add: function(t) {
        var a = t.currentTarget.dataset.index;
        this.data.data[a].num = ++this.data.data[a].num, this.setData({
            data: this.data.data,
            total: parseFloat((this.data.total + parseFloat(this.data.data[a].price)).toFixed(2)),
            earnest_total: parseFloat((this.data.earnest_total + parseFloat(this.data.data[a].earnest_price)).toFixed(2)),
            num: this.data.data[a].num
        });
    },
    onShareAppMessage: function() {
        return this.data = this.data || {}, {
            title: this.data.title || "附近家政",
            desc: this.data.desc || "",
            path: "pages/reservation/detail/detail?cid=" + this.categoryId
        };
    },
    onPushSubmit: function(a) {
        t.pushFormId(a.detail.formId);
        var e = "../reseve/reseve?ids=" + this.data.ids;
        wx.navigateTo({
            url: e
        });
    }
});