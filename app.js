

App({
    onLaunch: function() {
        wx.getStorageSync("utoken");
    },
    setLog: function(o, n) {},
    getUserInfo: function(n) {
        var t = this;
        if (this.globalData.userInfo) "function" == typeof n && n(this.globalData.userInfo); else {
            var e = wx.getStorageSync("utoken");
            wx.login({
                success: function(a) {
               
                    var u = a.code;
                    wx.getUserInfo({
                        success: function(a) {
                            t.globalData.userInfo = a.userInfo, wx.request({
                                url: o.duoguan_auth_login_url,
                                method: "POST",
                                data: {
                                    utoken: e,
                                    code: u,
                                    token: o.duoguan_user_token,
                                    encryptedData: a.encryptedData,
                                    iv: a.iv
                                },
                                fail: function(o) {
                                    console.dir(o);
                                },
                                success: function(o) {
                                    var e = o.data.utoken;
                                    wx.setStorageSync("utoken", e), t.globalData.utoken = e, t.globalData.userInfo.utoken = e, 
                                    "function" == typeof n && n(t.globalData.userInfo);
                                }
                            });
                        }
                    });
                }
            });
        }
    },
    getNewToken: function(n) {
        var t = this, e = wx.getStorageSync("utoken");
        wx.login({
            success: function(a) {
                console.log(a);
                var u = a.code;
                wx.getUserInfo({
                    success: function(a) {
                        t.globalData.userInfo = a.userInfo, wx.request({
                            url: o.duoguan_auth_login_url,
                            method: "POST",
                            data: {
                                utoken: e,
                                code: u,
                                token: o.duoguan_user_token,
                                encryptedData: a.encryptedData,
                                iv: a.iv
                            },
                            fail: function(o) {
                                console.dir(o);
                            },
                            success: function(o) {
                                var e = o.data.utoken;
                                wx.setStorageSync("utoken", e), t.globalData.utoken = e, t.globalData.userInfo.utoken = e, 
                                "function" == typeof n && n(e);
                            }
                        });
                    },
                    fail: function(o) {
                        console.log(o);
                    }
                });
            },
            fail: function(o) {
                console.log(o);
            }
        });
    },
  request: function (a) {
    a.data || (a.data = {});
    var t = wx.getStorageSync("access_token");
    t && (a.data.access_token = t), a.data._uniacid = this.siteInfo.uniacid, a.data._acid = this.siteInfo.acid,
      wx.request({
        url: a.url,
        header: a.header || {
          "content-type": "application/x-www-form-urlencoded"
        },
        data: a.data || {},
        method: a.method || "GET",
        dataType: a.dataType || "json",
        success: function (t) {
          if (t.data.code == -100) {
            wx.showModal({
              title: '提示',
              content: '小程序应用未注册，请联系开发者',
              showCancel: false
            })
          }
          -1 == t.data.code ? wx.showToast({
            title: 'access_token效验失败',
            icon: 'none',
          }) : a.success && a.success(t.data);
        },
        fail: function (t) {
          console.warn("--- request fail >>>"), console.warn(t), console.warn("<<< request fail ---");
          var e = getApp();
          e.is_on_launch ? (e.is_on_launch = !1, wx.showModal({
            title: "网络请求出错",
            content: t.errMsg,
            showCancel: !1,
            success: function (t) {
              t.confirm && a.fail && a.fail(t);
            }
          })) : (wx.showToast({
            title: '地址请求出错',
            icon: 'none'
          }), a.fail && a.fail(t));
        },
        complete: function (t) {
          200 != t.statusCode && (console.log(a.url, '---66'), console.log("--- request http error >>>"), console.log(t.statusCode),
            console.log(t.data), console.log("<<< request http error ---")), a.complete && a.complete(t);
        }
      });
  },
    globalData: {
        userInfo: "",
        utoken: ""
    }
    ,
  api: require("api.js"),
  setApi: function () {
    var o = this.siteInfo.siteroot;
    o = o.replace("app/index.php", ""), o += "/api.php?s=",
      this.api = function t(e) {
        for (var a in e) "string" == typeof e[a] ? e[a] = e[a].replace("{$_api_root}", o) : e[a] = t(e[a]);
        return e;
      }(this.api);
    var t = this.api.default.index, e = t.substr(0, t.indexOf("/api.php"));
    this.webRoot = e;
  },
  webRoot: null,
  util: require("we7/resource/js/util.js"),
  siteInfo: require("siteinfo.js"),
});