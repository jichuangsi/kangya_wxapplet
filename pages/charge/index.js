// pages/charge/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'收费',
    customerid: '',
    clinicid: '',
    pageIndex:1,
    patientfee: '',
    sumlist: '',
    billinfo: [],
    power_arr: [],
    user: '',
  },
  onClickLeft(){
    wx.navigateBack({
      delta: 1,
    })
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/SelBillinfo',
      method: 'post',
      data: {
        pageno: self.data.pageIndex,
        pagesize: 20,
        customerid: self.data.customerid,
        clinicid: self.data.clinicid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            patientfee: res.data.list.patientfee[0],
            sumlist: res.data.list.sumlist[0],
            billinfo: res.data.list.billinfo
          })
        }
      }
    })
  },
  Managementgo(){
    wx.navigateTo({
      url: '../Management/index',
    })
  },
  Billdetailsgo() {
    wx.navigateTo({
      url: '../Billdetails/index',
    })
  },
  kygo() {
    wx.navigateTo({
      url: '../PriceList/index?title=看牙无忧',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:'收费'
    })
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];
    this.setData({
      customerid: Page.data.customerid,
      clinicid: Page.data.clinicid,
      power_arr: Page.data.power_arr,
      user: Page.data.user,
    })
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