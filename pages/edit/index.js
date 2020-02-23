// pages/edit/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '患者详情',
  },

  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    let self = this
    let arr;
    if (this.data.title == '输入姓名') {
      wx.getStorage({
        key: 'Patientlist',
        success: function (res) {
          arr = res.data
          arr.name = self.data.name
          wx.setStorage({
            key: 'Patientlist',
            data: arr,
          })
        },
      })
    }
    if (this.data.title == '影像浏览') {
      wx.navigateTo({
        url: '../img/index?state=1&&title=选择影像',
      })
    }else{
      self.onClickLeft()
    }
  },
  nameipt(e) {
    this.setData({ name: e.detail.value })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ title: options.title })
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