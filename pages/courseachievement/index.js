// pages/courseachievement/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:'',
    arr:[],
    pageIndex:1,
    pageCount:20
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
      url: getApp().data.APIS + '/patient/SelBillinfo',
      method: 'post',
      data: {
        pageno:self.data.pageIndex,
        pagesize:20,
        clinicid: self.data.user.clinicid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(1111)
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = self.data.arr
          arr.push(...res.data.list.billinfo)
          self.setData({
            arr: arr
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    this.setData({
      user: prevPage.data.user
    })
    wx.setNavigationBarTitle({
      title: '当前实收业绩明细'
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