Page({
    data: {},
    onLoad: function(t) {
        this.setData({
            type: t.type
        });
    },
    onNavigationTo: function(t) {
        wx.navigateBack();
    }
});