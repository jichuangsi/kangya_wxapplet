// pages/W_team/index.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '康牙医生',
    doctor_arr:[]
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  W_ordergo() {
    wx.navigateTo({
      url: '../W_order/index?title=' + this.data.title,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ title: options.title })
    wx.setNavigationBarTitle({
      title: options.title
    })
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    this.setData({
      doctor_arr: prevPage.data.doctor_arr
    })
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