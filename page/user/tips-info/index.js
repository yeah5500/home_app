function e(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}

var n = e(require("../../../utils/listener")), t = require("../../../utils/data"), r = e(require("../../../utils/requestUtil"));

Page({
    userInfo: null,
    data: {},
    onLoad: function(e) {},
    onUnload: function() {
        n.default.fireEventListener("user.get_info", [ this.userInfo ]);
    },
    onUserInfoTap: function(e) {
        var n = this;
        wx.canIUse("button.open-type.getUserInfo") || wx.openSetting({
            success: function(e) {
                e.authSetting["scope.userInfo"] && wx.getUserInfo({
                    success: function(e) {
                        n.userInfo = e.userInfo, wx.navigateBack();
                    }
                });
            }
        });
    },
    onUserInfo: function(e) {
        var n = e.detail;
        if (n.userInfo) {
            var u = this.userInfo = n.userInfo;
            r.default.post(t.duoguan_user_info_post_url, {
                nickname: u.nickName,
                headimgurl: u.avatarUrl || u.avatar,
                sex: u.gender,
                city: u.city,
                province: u.province,
                country: u.country,
                language: u.language
            }, function() {
                wx.navigateBack();
            });
        } else console.error("授权失败：", e);
    }
});