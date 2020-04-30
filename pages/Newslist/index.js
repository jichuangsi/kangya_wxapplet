// pages/Newslist/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '补牙',
    News_arr:[],
    pageIndex:1,
    pageCount:0,
    id:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  uptouch() {
    if (this.data.pageIndex > this.data.pageCount) {

    } else {
      this.getdata()
    }
  },

  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      // url: 'https://kyys.kyawang.com/svc/a',
      method: 'get',
      data: {
        plugin: 'getkd',
        p: self.data.id
      },
      header: {
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            News_arr: res.data.list
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title,
      id:options.id
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
    return {
      title: this.data.title,
      desc: '分享页面的内容',
      path: '/pages/Newslist/index?title=' + this.data.title + '&&id=' + this.data.id  // 路径，传递参数到指定页面。
    }
  }
})