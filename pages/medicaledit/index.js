// pages/medicaledit/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '新增病历',
    check_text: '初诊病历',
    checked: false,
    show: false,
    time:'',
    calendarConfig: {
      // 配置内置主题
      theme: 'elegant',
      chooseAreaMode: false,
    },
    medical:{
      arr1:[
        {id:1,text:''}
      ]
    }
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    wx.navigateTo({
      url: '../medicalTemplate/index',
    })
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
  checkclick(e) {
    this.setData({ check_text: e.currentTarget.dataset.text })
  },
  onChange(e) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: e.detail });
  },
  editgo(e) {
    wx.navigateTo({
      url: '../edit/index?title=' + e.currentTarget.dataset.text,
    })
  },
  Colleaguego() {
    wx.navigateTo({
      url: '../Colleague/index?state=3',
    })
  }, 
  ygo() {
    wx.navigateTo({
      url: '../Tooth/index',
    })
  },
  showpopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  btn(){
    wx.navigateBack({
      delta: 1,
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