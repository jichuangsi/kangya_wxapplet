// pages/payment/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '预交款记录',
    arr: [],
    customerid: '',
    clinicid: ''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1,
    })
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/advpatientinfo',
      method: 'post',
      data: {
        customerid: self.data.customerid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            arr: res.data.list.advpayfeelist
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '预交款记录'
    })
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];
    this.setData({
      customerid: Page.data.customerid,
      clinicid: Page.data.clinicid
    })
    this.getdata()
    console.log(111)
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