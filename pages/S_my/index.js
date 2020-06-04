// pages/S_my/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '商城',
    borderstate:false,
    user:'',
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 999
    })
  },
  S_rechargego(){
    wx.navigateTo({
      url: '../S_recharge/index',
    })
  },
  S_cardgo() {
    wx.navigateTo({
      url: '../S_card/index',
    })
    // wx.navigateTo({
    //   url: '../S_coupon/index',
    // })
  },
  S_Ordergo() {
    wx.navigateTo({
      url: '../S_Order/index?title=0',
    })
  },
  kfclick(){
    Dialog.confirm({
      title: '',
      message: '请添加客服微信：45554'
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    });
  },

  getuser(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: "get",
      data: {
        "plugin":'getcartuserinfo'
      },
      header: {
        "token": wx.getStorageSync("token")
      },
      success: function(res) {
        console.log(54361)
        console.log(res)
        self.setData({
          user:res.data.list[0]
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商城'
    })
    this.getuser()
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