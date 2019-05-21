function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

e(require("../../../utils/underscore")), e(require("../../../utils/util")), e(require("../../../utils/listener"));

var t = require("../../../utils/data"), u = e(require("../../../utils/requestUtil"));

getApp();

Page({
    data: {
        userInfo: {}
    },
    onLoad: function() {
        this.onPullDownRefresh();
    },
    formSubmit: function(e) {
        u.default.isLoading(this.submitId) || (this.submitId = u.default.post(t.duoguan_user_info_post_url, e.detail.value, function(e) {
            wx.showToast({
                title: "资料更新成功",
                icon: "success",
                duration: 2e3
            });
        }));
    },
    onPullDownRefresh: function() {
        var e = this;
        u.default.get(t.duoguan_user_info_url, {}, function(t) {
            e.setData({
                userInfo: t
            });
        }, this, {
            completeAfter: wx.stopPullDownRefresh
        });
    }
});