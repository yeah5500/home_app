var _api_root = "{$_api_root}", api = {

  default: {
    index: _api_root,
    nav_template: _api_root + 'option/nav_template',
    getIndexData: _api_root + 'option/getIndexData',
    menu_template: _api_root + 'option/menu_template',
    order_template: _api_root + 'option/order_template',
    userinfo: _api_root + 'option/userinfo',
  },
  user: {
    judge_type: _api_root + 'module_api/judgeType',
    login: _api_root + 'user/login',
    getQrcode: _api_root + 'user/getQrcode',
    feedback: _api_root + 'user/feedback', //-------
    check_phone: _api_root + 'user/check_phone',
    send_sms: _api_root + 'user/send_sms',
    binding_phone: _api_root + 'user/binding_phone',
    loginGrow: _api_root + 'user/loginGrow', //获取成长值
    signGrow: _api_root + 'user/signGrow', //签到
    wx_official_openid: _api_root + 'user/wx_official_openid', //检测是否绑定微信公众号
    getNews: _api_root + 'user/getNews', //获取用户消息通知
    vipInfo: _api_root + 'user/vipInfo', //获取会员基本信息
    signList: _api_root + 'user/signList', //获取当月用户签到数据
    collect: _api_root + "user/collect",//scj 2018-9-14
  },
  runner: {
    apply_runner: _api_root + 'runner/apply_runner',          //-----
    upload: _api_root + 'runner/upload',                     //-----
    check: _api_root + 'runner/check',                     //-----
    normal: _api_root + 'runner/normal',//scj-2018-9-12
    getNews: _api_root + 'runner/getNews',//获取配送员消息通知
    refundPromiseMoney: _api_root + 'runner/refundPromiseMoney',//保证金申请退款
    withdrawList: _api_root + "runner/withdrawList",//配送员提现记录列表
  },
  apply:{
    deposit_price: _api_root + 'apply/deposit_price',       //s
    check: _api_root + 'apply/check',                       //检测跑腿人员申请
    upload: _api_root + 'apply/upload',                     //上传图片
    apply_runner: _api_root + 'apply/apply_runner',          //申请跑腿
  },
  article: {
    details: _api_root + 'article/details',//-----scj-2018-8-29
  },
  address: {
    index: _api_root + 'address/index',
    add: _api_root + 'address/add',
    set_default: _api_root + 'address/set_default',
    delete: _api_root + 'address/delete',
    details: _api_root + 'address/details',
    update: _api_root + 'address/update',
  },
  label: {
    index: _api_root + 'label/index',
    add: _api_root + 'label/add',
    delete: _api_root + 'label/delete',
  },
  coupon: {
    index: _api_root + 'coupon/index',  //-----scj-2018-8-29
    receive: _api_root + 'coupon/receive',//-----scj-2018-8-29
    my_coupon: _api_root + 'coupon/my_coupon',//-----scj-2018-8-29
    forward: _api_root + 'coupon/forward',//----转发红包
  },
  store: {
    getPromiseMoney: _api_root + 'store/getPromiseMoney', //-----scj-2018-8-29
  },
  payment:{
    recharge: _api_root + 'payment/recharge',
    deliver: _api_root + 'payment/deliver',         //微信支付
    givepay: _api_root + 'payment/givepay',         //微信支付
    linePay: _api_root + 'payment/linePay',         //帮排队价格支付
    paypromiseMoney: _api_root + 'payment/paypromiseMoney',    //保证金缴纳
    DrivePay: _api_root + 'payment/DrivePay',         //帮代价格支付
    agencyPay: _api_root + 'payment/agencyPay',         //帮办格支付
    HomeWorkPay: _api_root + 'payment/HomeWorkPay',         //家政格支付
    payVip: _api_root + 'payment/payVip',         //家政格支付
  },
  wallet:{
    user: _api_root + 'wallet/user',
    index: _api_root + 'coupon/index',  //-----scj-2018-8-29
    receive: _api_root + 'coupon/receive',//-----scj-2018-8-29
    my_coupon: _api_root + 'coupon/my_coupon',//-----scj-2018-8-29
    bankcard: _api_root + 'wallet/bankcard',
    bankList: _api_root + 'wallet/bankList',    //我的银行卡
    bankadd: _api_root + 'wallet/bankadd',      //添加银行卡
    delete: _api_root + 'wallet/delete',       //删除银行卡
    set_default: _api_root + 'wallet/set_default',       //删除银行卡
    details: _api_root + 'wallet/details',       //银行卡详情
  },
  withdraw: {
    bank: _api_root + 'withdraw/bank', //scj-2018-9-8 用户银行卡提现
    alipay: _api_root + 'withdraw/alipay', //scj-2018-9-8 用户银行卡提现
    wx: _api_root + 'withdraw/wx', //scj-2018-9-8 用户银行卡提现
  },
  store:{
    getPromiseMoney: _api_root + 'store/getPromiseMoney', 
  },
  order: {
    HeJiangOrder: _api_root +'module_api/HeJiangOrder',
    sumbit_ShenHe: _api_root +'module_api/sumbitShenHe',//
    YesJoint: _api_root +'module_api/yesJoint',//可对接模块的列表
    upload: _api_root + 'order/upload', //上传图片
    getDeliverRules: _api_root + 'order/getDeliverRules', //帮我买
    getGiveRules: _api_root + 'order/getGiveRules', //帮我送
    surcharge: _api_root + 'order/surcharge', //帮我买帮我时间送附加费
    getLineRules: _api_root + 'order/getLineRules', //帮排队时间获取价格
    linePay: _api_root + 'order/linePay', //帮排队支付
    getUserOrderList: _api_root + 'order/getUserOrderList', //scj-2018-9-6 主页订单
    getDriveRules: _api_root + 'order/getDriveRules', //代价下单规则
    getHomeWorkRules: _api_root + 'order/getHomeWorkRules', //家政下单规则
    getAgencyRules: _api_root + 'order/getAgencyRules', //代办下单规则
    orderDel: _api_root + 'order/orderDel', //用户取消订单
    orderDun: _api_root + "order/orderDun",//催单
    getUserOrderOne: _api_root + "order/getUserOrderOne",//2018-9-15 获取订单详情
    userconfirm: _api_root + "order/userconfirm",//2018-9-17 订单完成
    feedback: _api_root + "order/feedback",//2018-9-17 订单完成
  },
  runner_order: {
    getRunnerOrderList: _api_root + 'runner_order/getRunnerOrderList', //scj-2018-9-6 跑腿订单
    receipt: _api_root + 'runner_order/receipt', //scj-2018-9-6 跑腿抢单
    orderToGet: _api_root + "runner_order/orderToGet",//scj-2018-9-11 抢单
    isService: _api_root + "runner_order/isService",//scj-2018-9-12 完成订单
    feedback: _api_root + "runner_order/feedback",//订单评价
    getRunnerOrderOne: _api_root + "runner_order/getRunnerOrderOne",//配送员获取订单详情
  },
  runner_withdraw:{
    bank: _api_root + 'runner_withdraw/bank', //scj-2018-9-7 跑腿银行卡提现
    alipay: _api_root + 'runner_withdraw/alipay', //scj-2018-9-7 跑腿银行卡提现
    wx: _api_root + 'runner_withdraw/wx', //scj-2018-9-7 微信提现
    alipay: _api_root + 'runner_withdraw/alipay', //配送员支付宝提现
    
  },
  location:{
    checkArea: _api_root + 'location/checkArea', //判断当前位置是否在下单限制区域
  },
  count: {
    countOrder: _api_root + 'count/countOrder', //订单统计和收入统计
  },


};

module.exports = api;