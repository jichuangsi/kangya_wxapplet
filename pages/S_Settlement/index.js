// pages/S_Settlement/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '商城',
    show: false,
    yh_arr: [
      {
        state: 0,
        price: 20,
        m_price: 299,
        time: '2020-02-26至2020-03-01',
        title: '拼团券',
        text: '限拼团可用'
      }
    ],
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  S_rechargego(){
    wx.navigateTo({
      url: '../S_recharge/index',
    })
  }, 
  S_addressgo() {
    wx.navigateTo({
      url: '../S_address/index',
    })
  },
  S_invoicego() {
    wx.navigateTo({
      url: '../S_invoice/index',
    })
  },
  showpopup(){
    this.setData({
      show:true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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