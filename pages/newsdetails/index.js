// pages/newsdetails/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"断牙重接",
    id:0,
    user:'',
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
  // onShareAppMessage: function (res) {
  //   return {
  //     title: '牙医小程序',
  //     path: this.data.url,  // 路径，传递参数到指定页面。
  //     imageUrl: '../../imgs/xx.png', // 分享的封面图
  //      success: function (res) {
  //       // 转发成功
  //       console.log("转发成功:" + JSON.stringify(res));
  //     },
  //     fail: function (res) {
  //       // 转发失败
  //       console.log("转发失败:" + JSON.stringify(res));
  //     }
  //   }
  // },
  getdata() {
    let self = this
    wx.request({
      url: 'http://192.168.31.251/newsdetails.json',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        id: self.data.id
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result == 200) {
          self.setData({
            title: res.data.title,
            user: res.data.user,
            time: res.data.time,
            look: res.data.look,
            message: res.data.message,
            text_arr: res.data.text_arr,
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.route)
    this.setData({
      id: options.id
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