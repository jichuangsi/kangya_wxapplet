// pages/VIPdetails/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: '会员卡详情',
    customerid: '',
    clinicid: '',
    patdetails: '',
    vipcard: ''
  },

  onChange(event) {
    this.setData({
      active: event.detail.name
    })
  },
  Patientdetailsgo(){
    wx.navigateTo({
      url: '../Patientdetails/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '患者会员卡'
    })
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];
    this.setData({
      customerid: Page.data.customerid ? Page.data.customerid : '',
      clinicid: Page.data.clinicid ? Page.data.clinicid : '',
      patdetails: Page.data.patdetails ? Page.data.patdetails : '',
      vipcard: Page.data.vipcard ? Page.data.vipcard : ''
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