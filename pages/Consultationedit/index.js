// pages/Consultationedit/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '修改咨询',
    show: false,
    time: '',
    complaints: '',
    basicdemand: '',
    potentialdemand: '',
    programme: '',
    record: '',
    proposal: '',
    communicatetype: '',
    doctor_name: '',
    calendarConfig: {
      // 配置内置主题
      theme: 'elegant',
      chooseAreaMode: false,
    },
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    wx.navigateBack({
      delta: 1
    })
  },
  Patientgo() {
    if (this.data.title == '添加回访') {
      wx.navigateTo({
        url: '../Patientlist/index?state=1',
      })
    }
  },
  checkclick(e) {
    this.setData({ check_text: e.currentTarget.dataset.text })
  },
  showpoup() {
    this.setData({ show: true })
  },
  onClose() {
    this.setData({ show: false })
  },

  doSomeThing() {
    // 调用日历方法
    this.calendar.enableArea();
  },
  afterTapDay(e) {
    console.log('afterTapDay', e.detail); // => { currentSelect: {}, allSelectedDays: [] }
    this.setData({
      time: e.detail.year + '年' + e.detail.month + '月' + e.detail.day + '日'
    })
    this.onClose()
    console.log(this.data.time)
  },
  Colleaguego() {
    wx.navigateTo({
      url: '../Colleague/index?title=医生&&state=2',
    })
  },
  editgo(e) {
    wx.navigateTo({
      url: '../edit/index?title=' + e.currentTarget.dataset.text + '&&value=' + e.currentTarget.dataset.value,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      title: options.title
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
  },
  del() {
    Dialog.confirm({
      title: '提示',
      message: '您确定删除这条咨询吗？'
    }).then(() => {
      wx.navigateBack({
        delta: 1,
      })
      // on confirm
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