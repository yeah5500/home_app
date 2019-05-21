var t = require("../../../utils/data"), e = require("../../../utils/requestUtil.js"), a = require("../../../utils/underscore.js");

getApp();

Page({
    isShowLoading: !0,
    data: {
        max_upload_img_count: 4,
        uploadFiles: [],
        isUpload: !1,
        anonymouse: 0,
        orderId: 0,
        business: 0,
        disabled: !1,
        full: 5,
        line: 0
    },
    onLoad: function(t) {
        this.setData({
            orderId: t.id
        }), wx.setStorageSync("active", t.active), this.onPullDownRefresh(t.id);
    },
    onPullDownRefresh: function(a) {
        var s = this;
        e.get(t.hk_request_url + "reseveDetail.html", {
            id: a
        }, function(t) {
            s.setData({
                business: t.business,
                companytitle: t.companytitle,
                headimg: t.headimg
            });
        }, this);
    },
    onAddStart: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.full, s = this.data.line;
        this.setData({
            full: a + (e + 1),
            line: s - (e + 1)
        });
    },
    onReduceStart: function(t) {
        var e = t.currentTarget.dataset.index + 1, a = 5 - e;
        this.setData({
            full: e,
            line: a
        });
    },
    onChooseImg: function(t) {
        var e = this.data.uploadFiles, s = this;
        wx.chooseImage({
            count: 4 - e.length,
            success: function(t) {
                a.each(t.tempFilePaths, function(t) {
                    return e.push({
                        file: t,
                        status: 0
                    });
                }), s.setData({
                    uploadFiles: e
                }), s.onUploadFile();
            }
        });
    },
    onUploadFile: function() {
        var a = this, s = this;
        if (!this.data.isUpload) {
            s.setData({
                isUpload: !0,
                disabled: !0
            });
            var i = this.data.uploadFiles;
            !function n(o) {
                var u = i[o];
                2 == u.status ? n(o + 1) : (u.status = 1, a.setData({
                    uploadFiles: i
                }), e.upload(t.hk_request_url + "uploadImg.html", u.file, "file", {}, function(t) {
                    u.url = t, u.status = 2, s.setData({
                        uploadFiles: i
                    });
                }, s, {
                    completeAfter: function() {
                        ++o < i.length ? n(o) : s.setData({
                            isUpload: !1,
                            disabled: !1
                        });
                    },
                    error: function() {
                        return u.status = 3;
                    },
                    failAfter: function() {
                        return u.status = 3;
                    }
                }));
            }(0);
        }
    },
    onPreviewTap: function(t) {
        var e = t.currentTarget.dataset.index, s = this.data.uploadFiles, i = new Array();
        a.each(s, function(t) {
            return i.push(t.file);
        }), wx.previewImage({
            current: i[e],
            urls: i
        });
    },
    onDeleteImg: function(t) {
        var e = this.data.uploadFiles, a = t.currentTarget.dataset.index;
        e.splice(a, 1), this.setData({
            uploadFiles: e
        });
    },
    onAnonymousComment: function(t) {
        var e = t.detail.value;
        e = e == [] || 0 == e ? 0 : 1, this.setData({
            anonymouse: e
        });
    },
    onPushSubmit: function(s) {
        e.pushFormId(s.detail.formId);
        var i = this.data.uploadFiles, n = new Array();
        a.each(i, function(t) {
            return n.push(t.url);
        }), n = n.join("##");
        var o = s.detail.value.comment, u = {
            businessid: this.data.business,
            orderid: this.data.orderId,
            star: this.data.full,
            comment: o,
            image: n,
            type: 1,
            anonymous: this.data.anonymouse
        };
        e.post(t.hk_request_url + "comment.html", u, function(t) {
            wx.showModal({
                title: "提示信息",
                content: t,
                showCancel: !1,
                complete: function() {
                    wx.switchTab({
                        url: "../order-list/order-list"
                    });
                }
            });
        }, this);
    }
});