var e = require("../../../utils/data.js"), t = require("../../../utils/requestUtil.js");

Page({
    data: {
        yzm_btn_text: "获取验证码",
        this_user_phone: "",
        yzm_btn_disabled: !0,
        yzm_all_time: 60
    },
    onLoad: function(e) {},
    formSubmit: function(n) {
        var a = n.detail.value, i = {
            name: a.user_true_name,
            tel: a.user_phone,
            code: a.user_phone_yzm
        };
        t.post(e.hk_request_url + "cooperation.html", i, function(e) {
            wx.showModal({
                title: "温馨提示",
                content: e,
                showCancel: !1,
                success: function(e) {
                    e.confirm && wx.navigateBack();
                }
            });
        }, this);
    },
    check_phone_bind: function(e) {
        var t = this, n = e.detail.value;
        /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/.test(n) ? t.setData({
            yzm_btn_disabled: !1,
            this_user_phone: n
        }) : t.setData({
            yzm_btn_disabled: !0
        });
    },
    send_phone_code_bind: function() {
        var n = this, a = {
            type: 1,
            phone: n.data.this_user_phone,
            _: Date.now()
        };
        t.get(e.hk_request_url + "sendPhoneCode.html", a, function(e) {
            n.initgetUserPhoneCode();
        }, n);
    },
    initgetUserPhoneCode: function() {
        var e = this;
        e.setData({
            yzm_btn_disabled: !0
        }), e.getShengTime();
    },
    getShengTime: function() {
        var e = this;
        e.data.yzm_all_time--, e.data.yzm_all_time > 0 ? (e.setData({
            yzm_btn_text: "等待" + e.data.yzm_all_time + "秒"
        }), setTimeout(function() {
            e.getShengTime();
        }, 1e3)) : e.setData({
            yzm_btn_disabled: !1,
            yzm_btn_text: "获取验证码",
            yzm_all_time: 60
        });
    }
});