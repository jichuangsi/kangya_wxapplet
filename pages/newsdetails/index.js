// pages/newsdetails/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"断牙重接",
    id:0,
    name:'',
    time:'',
    look:'',
    message:'',
    text_arr:[]
  },

  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },

  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      // url: 'https://kyys.kyawang.com/svc/a',
      method: 'get',
      data: {
        plugin: 'getdoc',
        p: self.data.id
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            message: res.data.list[0].comment,
            look: res.data.list[0].hit,
            time: res.data.list[0].version.when,
            name: res.data.list[0].version.by.username,
            text_arr: res.data.list[0].content
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.route)
    this.setData({
      id: options.id,
      title: options.title
    })
    wx.setNavigationBarTitle({
      title: options.title
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