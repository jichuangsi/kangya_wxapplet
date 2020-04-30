// pages/eroc/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '营销',
    clinicid: '',
    power_arr: '',
    user: '',
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  go(){
    console.log(1111)
    wx.navigateTo({
      url: '../component/pages/erocdetails/index',
      success: function(res) {console.log(res)},
      fail: function (res) { console.log(res)},
      complete: function (res) { console.log(res)},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    this.setData({
      title:options.title,
      clinicid: prevPage.data.clinicid,
      power_arr: prevPage.data.power_arr,
      user: prevPage.data.user,
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