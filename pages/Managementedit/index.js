// pages/Managementedit/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '处置',
    arr: '',
    isfirstvisit:0,
    time:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    wx.navigateTo({
      url: '../programme/index?state=0',
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
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];//
    let myDate = new Date();
    this.setData({
      title:options.title,
      arr: options.title == '修改处置' ? JSON.parse(options.item) : Page.data.patdetails,
      isfirstvisit: Page.data.arr.length>0?1:0,
      time: myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate() + ' ' + myDate.getHours() + ':' + myDate.getMinutes()
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
    console.log(Page.data)
    console.log(this.data.arr)
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
      // wx.navigateBack({
      //   delta: 1,
      // })
    }).catch(() => {
      // on cancel
    })
  },
  Toothgo(){
    wx.navigateTo({
      url: '../Tooth/index',
    })
  },
  Colleaguego() {
    wx.navigateTo({
      url: '../Colleague/index?title=医生&&state=2',
    })
  },
  editgo(e) {
    wx.navigateTo({
      url: '../M_programmeedit/index?item=' + JSON.stringify(e.currentTarget.dataset.item) + '&&state=' + e.currentTarget.dataset.state,
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