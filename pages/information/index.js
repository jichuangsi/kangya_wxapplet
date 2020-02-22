// pages/information/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexnum: 0,
    tabnum:1,
    show:false,
    left_text:'我的',
    messages_arr:[1,2,3],
    friend_arr:[1,2,3]
  },
  sss(event) {
    console.log(event.detail)
    this.setData({
      indexnum: event.detail.current
    })
    console.log(this.data.indexnum)
  },
  tabclick(e) {
    this.setData({
      indexnum: e.currentTarget.dataset.index
    })
  },
  leftclick() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  tab(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      tabnum: e.currentTarget.dataset.id
    })
    this.setData({
      left_text: e.currentTarget.dataset.id == 1?'全部':'我的'
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