// pages/Colleague/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '同事',
    scrollTop: 'A',
    project_list: [
      { index: 'A' },
      { index: 'B' },
      { index: 'C' },
      { index: 'D' },
      { index: 'E' }
    ],
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },

  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
  },
  searchgo(){
    wx.navigateTo({
      url: '../friendsearch/index?state=1',
    })
  },
  detailsgo(){
    wx.navigateTo({
      url: '../Colleaguedetails/index',
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