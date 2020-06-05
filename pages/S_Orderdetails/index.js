// pages/S_Orderdetails/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'商城',
    state:0,
    id:'',
    item:'',
    check_item:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  stateclick(){
    this.setData({state:0})
  },
  stateclick2() {
    this.setData({ state: 2 })
  },
  del() {
    Dialog.confirm({
      title: '标题',
      message: '您确定要删除订单吗？'
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    });
  },
  S_invoicego() {
    wx.navigateTo({
      url: '../S_invoice/index',
    })
  },
  shgo(){
    wx.navigateTo({
      url: '../S_Service/index?state=1',
    })
  },
  getcartorderdetail(id){
    let self = this
    wx.request({
      url: getApp().data.APIS +"/svc/a",
      method: "get",
      data: {
        "plugin": 'getcartorderdetail',
        "p": id
      },
      header: {
          "token": wx.getStorageSync("token"),
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(777)
        console.log(res)
        res.data.list[0].createDate = self.getLocalTime(res.data.list[0].createDate)
        self.setData({
          item:res.data.list[0]
        })
      }
  });
  },
  getLocalTime(nS) { 
    return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " "); 
  },
  btn(){
    let self = this
    wx.request({
      url: getApp().data.APIS + "/lab/pay/",
      method: "POST",
      data: {
        "token": wx.getStorageSync("token"),"orderId":self.data.id
      },
      header: {
        "content-type": "application/json"
      },
      success: function(e) {
        console.log(788)
        console.log(e)
        // 签权调起支付 
        if(!e.data.data){
          wx.showToast({
            title: '支付失败',
            icon: 'none',
          })
        }
        wx.requestPayment({
          'timeStamp': e.data.data.timeStamp,
          'nonceStr': e.data.data.nonceStr,
          'package': e.data.data.package,
          'signType': e.data.data.signType,
          'paySign': e.data.data.paySign,
          'success': function(res) {
            console.log(res, "成功")
            wx.showToast({
              title: '支付成功',
              icon: 'success',
            })
            wx.redirectTo({
              url: '../S_my/index',
            })
          },
          'fail': function(res) {
            console.log("支付失败", res)
          },
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];//
    this.setData({
      state:options.state,
      id:options.id,
      check_item:Page.data.check_item
    })
    wx.setNavigationBarTitle({
      title: '商城'
    })
    console.log(this.data.check_item)
    this.getcartorderdetail(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})