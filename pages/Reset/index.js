// pages/Reset/index.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    time: '60秒后重新获取',
    timestate: true,
  },
  getcode() {
    let self = this
    let time = 60
    self.setData({
      timestate: false
    })
    timeout = setInterval(function () {
      if (time <= 0) {
        clearInterval(timeout)
        self.setData({
          timestate: true
        })
      } else {
        time--
        self.setData({
          time: time + '秒后重新获取'
        })
      }
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '重设密码'
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