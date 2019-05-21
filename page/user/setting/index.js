Page({
    data: {},
    onLoad: function(t) {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onNavigateTap: function(t) {
        var a = t.currentTarget.dataset, e = a.url, n = a.name;
        "wechat_address" == n ? wx.chooseAddress({}) : "wechat_setting" == n ? wx.OpenSetting({}) : "wechat_clear" == n ? (wx.showToast({
            title: "正在清理中...",
            icon: "loading",
            duration: 10
        }), wx.clearStorageSync(), wx.showToast({
            title: "清理完成",
            icon: "success",
            duration: 1500
        })) : wx.navigateTo({
            url: e
        });
    }
});