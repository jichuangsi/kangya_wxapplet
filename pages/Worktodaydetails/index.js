// pages/Worktodaydetails/index.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '今日工作',
    arr:[],
    pageIndex:'',
    pageCount:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  uptouch(){
    if (this.data.pageIndex > this.data.pageCount) {

    } else {
      this.getdata()
    }
  },
  getdata() {
    let self = this
    wx.request({
      url: 'http://192.168.31.251/Worktodaydetails.json',
      headers: {
        'Content-Type': 'application/json'
      },
      data:{
        title:self.data.title
      },
      success: function (res) {
        console.log(res.data)
        let arr = self.data.arr
        arr.push(...res.data.arr)
        let index = self.data.pageIndex + 1 
        if (res.data.result == 200) {
          self.setData({
            arr: res.data.arr,
            pageIndex:index
          })
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ title: options.title })
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