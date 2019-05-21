function e(e, o) {
    if (!(e instanceof o)) throw new TypeError("Cannot call a class as a function");
}

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var o = function() {
    function e(e, o) {
        for (var t = 0; t < o.length; t++) {
            var a = o[t];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(e, a.key, a);
        }
    }
    return function(o, t, a) {
        return t && e(o.prototype, t), a && e(o, a), o;
    };
}(), t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("./underscore.js")), a = "undefined" == typeof wx ? "alipay" : "wechat", n = "wechat" === a, s = "alipay" === a, i = function() {
    function a() {
        e(this, a);
    }
    return o(a, null, [ {
        key: "uploadFile",
        value: function(e) {
            return e.fileName = e.name, e.fileType = e.fileType || "image", a.os.isWechat() ? wx.uploadFile(e) : my.uploadFile(e);
        }
    }, {
        key: "alert",
        value: function(e, o) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "提示", s = t.default.extend({
                title: n,
                content: e,
                showCancel: !1,
                success: o
            });
            a.os.isWechat() ? wx.showModal(s) : my.alert(s);
        }
    }, {
        key: "confirm",
        value: function(e, o) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "提示", s = t.default.extend({
                title: n,
                content: e,
                success: o
            });
            a.os.isWechat() ? wx.showModal(s) : my.confirm(s);
        }
    }, {
        key: "showLoading",
        value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
            a.os.isWechat() ? wx.showLoading ? wx.showLoading({
                title: e
            }) : wx.showToast({
                title: e,
                icon: "loading",
                duration: 1e4
            }) : my.showLoading({
                content: e
            });
        }
    } ]), a;
}();

i.os = {
    isWechat: function() {
        return n;
    },
    isAlipay: function() {
        return s;
    },
    name: function() {
        return a;
    }
}, i.request = i.os.isWechat() ? wx.request : my.httpRequest, i.downloadFile = i.os.isWechat() ? wx.downloadFile : my.downloadFile, 
i.navigateTo = i.os.isWechat() ? wx.navigateTo : my.navigateTo, i.redirectTo = i.os.isWechat() ? wx.redirectTo : my.redirectTo, 
i.navigateBack = i.os.isWechat() ? wx.navigateBack : my.navigateBack, i.switchTab = i.os.isWechat() ? wx.switchTab : my.switchTab, 
i.getSystemInfo = i.os.isWechat() ? wx.getSystemInfo : my.getSystemInfo, i.getSystemInfoSync = i.os.isWechat() ? wx.getSystemInfoSync : my.getSystemInfoSync, 
i.authLogin = i.os.isWechat() ? wx.login : my.getAuthCode, i.getSetting = i.os.isWechat() ? wx.getSetting : function() {
    console.warn("支付宝不支持:getSetting");
}, i.setSetting = i.os.isWechat() ? wx.setSetting : function() {
    console.warn("支付宝不支持:setSetting");
}, i.getUserInfo = i.os.isWechat() ? wx.getUserInfo : my.getAuthUserInfo, i.getLocation = i.os.isWechat() ? wx.getLocation : my.getLocation, 
i.chooseLocation = i.os.isWechat() ? wx.chooseLocation : my.chooseLocation || function() {
    console.warn("支付宝不支持地图位置选择");
}, i.openLocation = i.os.isWechat() ? wx.openLocation : my.openLocation, i.canIUse = i.os.isWechat() ? wx.canIUse : my.canIUse, 
i.makePhoneCall = i.os.isWechat() ? wx.makePhoneCall : function(e) {
    my.makePhoneCall({
        number: e.phoneNumber
    });
}, i.showShareMenu = i.os.isWechat() ? wx.showShareMenu : my.showShareMenu || function() {
    console.warn("支付宝不支持显示分享按钮~");
}, i.hideShareMenu = i.os.isWechat() ? wx.hideShareMenu : my.hideShareMenu || function() {
    console.warn("支付宝不支持隐藏分享按钮~");
}, i.stopPullDownRefresh = i.os.isWechat() ? wx.stopPullDownRefresh : my.stopPullDownRefresh, 
i.pageScrollTo = i.os.isWechat() ? wx.pageScrollTo : my.pageScrollTo, i.getStorage = i.os.isWechat() ? wx.getStorage : my.getStorage, 
i.getStorageSync = i.os.isWechat() ? wx.getStorageSync : function(e) {
    return my.getStorageSync({
        key: e
    }).data;
}, i.setStorage = i.os.isWechat() ? wx.setStorage : my.setStorage, i.setStorageSync = i.os.isWechat() ? wx.setStorageSync : function(e, o) {
    my.setStorageSync({
        key: e,
        data: o
    });
}, i.removeStorage = i.os.isWechat() ? wx.removeStorage : my.removeStorage, i.removeStorageSync = i.os.isWechat() ? wx.removeStorageSync : function(e) {
    my.removeStorageSync({
        key: e
    });
}, i.clearStorage = i.os.isWechat() ? wx.clearStorage : my.clearStorage, i.clearStorageSync = i.os.isWechat() ? wx.clearStorageSync : my.clearStorageSync, 
i.getStorageInfo = i.os.isWechat() ? wx.getStorageInfo : my.getStorageInfo, i.getStorageInfoSync = i.os.isWechat() ? wx.getStorageInfoSync : my.getStorageInfoSync, 
i.showToast = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    e.content = e.title, i.os.isWechat() ? wx.showToast(e) : my.showToast(e);
}, i.hideToast = i.os.isWechat() ? wx.hideToast : my.hideToast, i.hideLoading = i.os.isWechat() ? wx.hideLoading || wx.hideToast : my.hideLoading, 
i.setNavigationBarTitle = i.os.isWechat() ? wx.setNavigationBarTitle : my.setNavigationBar, 
i.setNavigationBarColor = i.os.isWechat() ? wx.setNavigationBarColor : my.setNavigationBar, 
i.showNavigationBarLoading = i.os.isWechat() ? wx.showNavigationBarLoading : my.showNavigationBarLoading, 
i.hideNavigationBarLoading = i.os.isWechat() ? wx.hideNavigationBarLoading : my.hideNavigationBarLoading, 
i.chooseImage = i.os.isWechat() ? wx.chooseImage : my.chooseImage, i.previewImage = i.os.isWechat() ? wx.previewImage : my.previewImage, 
i.saveImage = i.os.isWechat() ? wx.saveImage : my.saveImage, i.getImageInfo = i.os.isWechat() ? wx.getImageInfo : my.getImageInfo || function() {
    console.warn("支付宝不支持 getImageInfo 方法");
}, i.chooseAddress = i.os.isWechat() ? wx.chooseAddress : my.chooseAddress || function() {
    console.warn("支付宝不支持选择地址");
}, exports.default = i, "undefined" != typeof module && (module.exports = i);