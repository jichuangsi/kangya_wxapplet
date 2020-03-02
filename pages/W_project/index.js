// pages/W_project/index.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '康牙医生',
    arr:[
      { img: '', title: '牙齿种植', price: '0', id: 0 },
      { img: '', title: '牙齿矫正', price: '0', id: 1 },
      { img: '', title: '根管治疗', price: '0', id: 2 },
      { img: '', title: '牙齿美容', price: '0', id: 3 }
    ]
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  iphoneclick(e) {
    console.log(e.currentTarget.dataset.iphone)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.iphone //仅为示例，并非真实的电话号码
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