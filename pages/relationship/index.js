// pages/relationship/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'新增亲友关系',
    show:false,
    relationship:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    this.onClickLeft()
  },
  show(){
    this.setData({show:true})
  },
  onClose() {
    this.setData({ show: true })
  },
  relationship(e) {
    this.setData({ show: false, relationship: e.currentTarget.dataset.text });
  },
  Patientgo(){
    wx.navigateTo({
      url: '../Patientlist/index?state=1',
    })
  },
  editgo(e){
    wx.navigateTo({
      url: '../Patientedit/index?title=' + e.currentTarget.dataset.text
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