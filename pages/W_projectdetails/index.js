// pages/W_projectdetails/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    item:''
  },
  W_ordergo(e) {
    let item = this.data.item
    wx.navigateTo({
      url: '../W_order/index?title=' + this.data.title + '&&servicesname=' + item.servicesname + '&&weiwebserviceidentity=' + item.weiwebserviceidentity,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.item)
    console.log(unescape(options.item))
    this.setData({
      item: JSON.parse(unescape(options.item)),
      title:options.title
    })
    wx.setNavigationBarTitle({
      title: options.title?options.title:''
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
    let item = escape(JSON.stringify(this.data.item))
    return {
      title: this.data.title,
      desc: '分享页面的内容',
      path: '/pages/W_projectdetails/index?title=' + this.data.title + '&&item=' + item  // 路径，传递参数到指定页面。
    }
  }
})