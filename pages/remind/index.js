// pages/remind/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    arr:[],
    remindid:''
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/getpatientmsg',
      method: 'post',
      data: {
        openid: self.data.remindid,
        openidtype: 1,
        isshowselectmsg: 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            
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
      title: options.title
    })
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    this.setData({
      title: options.title,
      remindid: prevPage.data.remind[0].openid
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