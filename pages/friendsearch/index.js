// pages/friendsearch/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchtext: '',
    arr: [],
    state: 0,
    scrollTop: 'A',
    project_list: [],
  },
  back() {
    wx.navigateBack({
      delta: 1
    })
  },
  searchclick(e) {
    console.log(e)
    this.setData({
      arr: [1], 
      project_list: [
        { index: 'A' },
        { index: 'B' },
        { index: 'C' },
        { index: 'D' },
        { index: 'E' }
      ]
    })
    console.log(this.data.project_list)
  },
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.state)
    this.setData({
      state: options.state ? options.state:0
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