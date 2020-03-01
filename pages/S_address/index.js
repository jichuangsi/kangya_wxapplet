// pages/S_address/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'商城',
    state:0,
    check_num:0,
    arr: ['公司', '住宅', '诊所', '其他'],
    areaList:[],
    show:false,
    checked:true
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  stateclick(){
    this.setData({
      state:1
    })
  },
  check_click(e){
    this.setData({
      check_num: e.currentTarget.dataset.index
    })
  },
  showpopup(){
    this.setData({
      show:true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  btn(){
    this.setData({
      state: 2
    })
  },
  areaclick(e) {
    console.log(e.detail.values)
    this.setData({ show: false });
  },
  onChange({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: detail });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      areaList: require("../../data/area.js").default
    })
    console.log(this.data.areaList)
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