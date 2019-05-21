getApp();

var e = require("../../../utils/requestUtil.js"), s = require("../../../utils/data.js"), t = require("../../../utils/underscore.js");

Page({
    tradeNo: null,
    source: null,
    refundType: 0,
    data: {
        cancelType: "",
        business: 0,
        disabled: !1
    },
    onLoad: function(e) {
        this.tradeNo = e.tradeNo, this.source = e.source, this.setData({
            cancelType: e.type,
            business: e.business,
            sendstatus: e.sendstatus || 0
        });
    },
    onChanged: function(e) {
        this.refundType = e.detail.value;
    },
    onNavigateTo: function(e) {
        "changeBusiness" == e.currentTarget.dataset.name && this.setData({
            cancelType: "change"
        });
    },
    onPushSubmit: function(a) {
        if (e.pushFormId(a.detail.formId), !e.isLoading(this.pushRQId)) {
            var i = a.detail.value.remark, u = t.extend({
                tradeNo: this.tradeNo,
                source: this.source,
                cancelType: this.data.cancelType,
                refundType: this.refundType,
                remark: i,
                business: this.data.business
            }, a.detail.value);
            this.pushRQId = e.post(s.hk_request_url + "cancel.html", u, function(e) {
                wx.showModal({
                    title: "温馨提示",
                    content: e,
                    showCancel: !1,
                    complete: function(e) {
                        wx.switchTab({
                            url: "../order-list/order-list"
                        });
                    }
                });
            }, this), this.setData({
                pushRQId: this.pushRQId
            });
        }
    }
});