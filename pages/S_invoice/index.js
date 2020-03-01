// pages/S_invoice/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '商城',
    check_num: 0,
    arr: ['电子发票', '不开发票'],
    radio: '1',
    checked: false
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  check_click(e) {
    this.setData({
      check_num: e.currentTarget.dataset.index
    })
  },
  onChange(event) {
    this.setData({
      radio: event.detail
    });
  },
  onChange1({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: detail });
  },
  btn(){
    wx.navigateBack({
      delta: 1,
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