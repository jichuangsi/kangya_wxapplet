// pages/Patientlist/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'患者',
    show:false,
    nav1: '就诊时间',
    nav2: '患者类型',
    nav3: '会员等级',
    nav4: '其他条件',
    nav_num: 1,
    nav1_arr: ['全部', '当天就诊', '本周就诊', '本月就诊'],
    nav2_arr: ['全部', '拔牙', '补牙', '义诊', '活动假牙', '洁牙', '正畸', '种植', '检查'],
    nav3_arr: ['全部', '金卡会员', '银卡会员', '铜卡会员'],
    nav4_arr: ['全部', '微信用户', '有病史用户', '有影像用户', '欠款用户', '预付用户'],
    arr:[1,1,1,1],
    li_num:1
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  searchgo(){
    wx.navigateTo({
      url: '../friendsearch/index?state=2',
    })
  },
  showPopup(e) {
    this.setData({ show: true, nav_num: e.currentTarget.dataset.index });
  },
  li_box_click(e){
    this.setData({ li_num: this.data.li_num == e.currentTarget.dataset.index ? 0 : e.currentTarget.dataset.index });
  },
  onClose() {
    this.setData({ show: false });
  },
  nav1click(e){
    this.setData({
      nav1: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '就诊时间'
    })
  },
  nav2click(e) {
    this.setData({
      nav2: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '患者类型'
    })
  },
  nav3click(e) {
    this.setData({
      nav3: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '会员等级'
    })
  },
  nav4click(e) {
    this.setData({
      nav4: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '其他条件'
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