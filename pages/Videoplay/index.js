// pages/Videoplay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'sadds',
    state:0,
    lovestate: false,
    arr:[1,1,1,1,1,1,1],
    text:'',
    show:false
  },

  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  ipttext(e) {
    this.setData({
      text: e.detail.value
    })
  },
  send() {
    this.setData({
      text: ''
    })
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false, text: '' });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title ? options.title:'',
      state: options.state ? options.state:0
    })
  },
  loveclick(){
    this.setData({
      lovestate:!this.data.lovestate
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