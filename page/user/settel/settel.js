var t = require("../../../utils/data.js"), e = require("../../../utils/requestUtil.js");

Page({
    data: {
        yzm_btn_text: "获取验证码",
        this_user_phone: "",
        yzm_btn_disabled: !0,
        yzm_all_time: 60,
        bind_tel: !1,
        mobile: 0,
        tsmsg: ""
    },
    onLoad: function(t) {
        this.setData({
            bind_tel: "0" != t.is_bind,
            mobile: t.is_bind
        });
    },
    formSubmit: function(i) {
        var s = i.detail.value, n = {
            tel: s.user_phone,
            code: s.user_phone_yzm,
            type: 2
        };
        e.post(t.hk_request_url + "bindPhone.html", n, function(t) {
            wx.showToast({
                title: t,
                icon: "success",
                duration: 1500,
                success: function() {
                    wx.navigateBack();
                }
            });
        }, this);
    },
    check_phone_bind: function(t) {
        var e = this, i = t.detail.value;
        /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/.test(i) ? i == e.data.mobile ? e.setData({
            yzm_btn_disabled: !0,
            tsmsg: "您输入的是当前绑定的手机号!"
        }) : e.setData({
            yzm_btn_disabled: !1,
            this_user_phone: i,
            tsmsg: ""
        }) : e.setData({
            yzm_btn_disabled: !0,
            tsmsg: "手机号码格式不正确!"
        });
    },
    send_phone_code_bind: function() {
        var i = this, s = {
            type: 2,
            phone: i.data.this_user_phone,
            _: Date.now()
        };
        e.get(t.hk_request_url + "sendPhoneCode.html", s, function(t) {
            i.initgetUserPhoneCode();
        }, i);
    },
    initgetUserPhoneCode: function() {
        var t = this;
        t.setData({
            yzm_btn_disabled: !0
        }), t.getShengTime();
    },
    getShengTime: function() {
        var t = this;
        t.data.yzm_all_time--, t.data.yzm_all_time > 0 ? (t.setData({
            yzm_btn_text: "等待" + t.data.yzm_all_time + "秒"
        }), setTimeout(function() {
            t.getShengTime();
        }, 1e3)) : t.setData({
            yzm_btn_disabled: !1,
            yzm_btn_text: "获取验证码",
            yzm_all_time: 60
        });
    }
});