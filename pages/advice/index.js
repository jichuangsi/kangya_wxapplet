// pages/advice/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeName: '0',
    arr:[],
    title:''
  },
  onChange(event) {
    this.setData({
      activeName: event.detail
    });
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/getconventemplate',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(1)
        console.log(res)
        if (res.data.info == 'ok' && res.data.list) {
          self.setData({
            arr:res.data.list
          })
        }
      }
    })
  },
  gettwdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/getgraphiclist',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(1)
        console.log(res)
        if (res.data.info == 'ok' && res.data.list) {
          self.setData({
            arr: res.data.list
          })
          console.log(self.data.arr.length)
        }
      }
    })
  },
  check(e) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      text: e.currentTarget.dataset.text
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.setData({
      title: options.title
    })
    if (options.title == '医嘱消息模板') {
      this.getdata()
    } else {
      this.gettwdata()
    }
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