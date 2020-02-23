// pages/Arrears/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '历史欠款',
    nav1: '就诊项目',
    nav2: '主治医生',
    nav_num: 1,
    nav1_arr: ['全部', '拔牙', '补牙', '义诊', '活动假牙', '洁牙', '正畸', '种植', '检查'],
    nav2_arr: ['全部', '李青青', '李医生', '莫医生', '伍医生'],
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  showPopup(e) {
    this.setData({ show: true, nav_num: e.currentTarget.dataset.index });
  },
  onClose() {
    this.setData({ show: false });
  },
  nav1click(e) {
    this.setData({
      nav1: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '就诊项目'
    })
  },
  nav2click(e) {
    this.setData({
      nav2: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '主治医生'
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