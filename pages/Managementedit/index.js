// pages/Managementedit/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '处置',
    arr: [
      {
        username: '空白',
        time: '2020-02-20 17:38',
        name: '试试',
        text: '测试'
        // arr1:[
        //   { title: '沟通记录', text: '测试' }
        // ]
      },
    ]
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    wx.navigateTo({
      url: '../programme/index',
    })
  },
  Soundgo() {
    wx.navigateTo({
      url: '../Sound/index',
    })
  },
  Agreeimggo() {
    wx.navigateTo({
      url: '../Agreeimg/index',
    })
  },
  prescriptiongo(){
    wx.navigateTo({
      url: '../prescription/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title:options.title
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
  },
  btn(){
    this.onClickLeft()
  },
  del() {
    Dialog.confirm({
      title: '提示',
      message: '您确定删除该处置吗？'
    }).then(() => {
      // on confirm
      wx.navigateBack({
        delta: 1,
      })
    }).catch(() => {
      // on cancel
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