getApp(), require("../../../utils/util");

var e = require("../../../utils/requestUtil"), i = (require("../../../utils/underscore"), 
require("../../../utils/data"));

Page({
    data: {
        disabled: !1,
        tel: ""
    },
    onLoad: function(e) {
        this.setData({
            tel: "0" == e.is_bind ? "" : e.is_bind
        });
    },
    onPushSubmit: function(t) {
        var s = this;
        if (e.pushFormId(t.detail.formId), !e.isLoading(this.refundRQId)) {
            var a = t.detail.value.remark, u = t.detail.value.mobile;
            this.refundRQId = e.post(i.hk_request_url + "suggest.html", {
                remark: a,
                mobile: u
            }, function(e) {
                s.setData({
                    disabled: !0
                }), wx.showToast({
                    title: "提交成功",
                    icon: "success",
                    mask: !0,
                    duration: 1e3
                }), setTimeout(function() {
                    wx.hideToast(), wx.navigateBack();
                }, 1e3);
            }, this, {
                isShowLoading: !0
            });
        }
    }
});