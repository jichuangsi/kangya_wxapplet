// pages/VIP/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    customerid:  '',
    clinicid: '',
    patdetails: '',
    vipcard:''
  },
  VIPdetailsgo(){
    wx.navigateTo({
      url: '../VIPdetails/index',
    })
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/rechargeinfo',
      method: 'post',
      data: {
        customerid: self.data.patdetails.customerid,
        clinicid: self.data.patdetails.clinicuniqueid,
        vipcardid: self.data.patdetails.vipcardidentity
      },
      header: {
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            vipcard: res.data.list[0]
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '会员卡'
    })
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];
    this.setData({
      customerid: Page.data.customerid ? Page.data.customerid : '',
      clinicid: Page.data.clinicid ? Page.data.clinicid : '',
      patdetails: Page.data.patdetails ? Page.data.patdetails : ''
    })
    console.log(this.data.patdetails)
    this.getdata()
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