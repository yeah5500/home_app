var app=getApp();

var t = require("../../../utils/util"), e = require("../../../utils/requestUtil"), a = (require("../../../utils/underscore"), 
require("../../../utils/data")), n = require("../../../utils/underscore.js");

Page({
    shareInfo: null,
    data: {
        isEmpty: !1,
        hasMore: !0,
        page: 1,
        config:{
          imgs:[
            1,2,3,
          ]
        },
      data:[
        { title: '家政', cover:'/images/estate-category-icons/rent.png '},
        { title: '家政', cover: '/images/estate-category-icons/rent-out-regist.png ' },
        { title: '家政', cover: '/images/estate-category-icons/rent.png ' },
        { title: '家政', cover: '/images/estate-category-icons/rent.png ' }
      ],
      contents:['测试','哈哈哈啊']
    },
    onLoad: function(t) {
      app.util.request({
        url: "entry/wxapp/api&s=" + encodeURIComponent('index/test'),
        cachetime: "0",
        method:'POST',
        header: {
          "content-type": "application/json"
        },
        success:function(res){
            console.log(res.data);
        }
      });
    },
  
});