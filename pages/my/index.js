// pages/lzq/index.js
Page({
  data: {
    user:'',
    tokenState:true
  },
  getPerinfo() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/member/Perinfo',
      method: 'post',
      header: {
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(1)
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            user: res.data.list[0]
          })
        }
      }
    })
  },
  logingo(){
    wx.navigateTo({
      url: '../authorize/index',
    })
  },
  mydatago(){
    wx.navigateTo({
      url: '../Mydata/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPerinfo()
    this.setData({
      tokenState:wx.getStorageSync('token')?false:true
    })
    console.log(123456789)
    console.log(this.data.tokenState)
    console.log(987654321)
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