// pages/W_project/index.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '康牙医生',
    arr:[
      { img: '', title: '牙齿种植', price: '0', id: 0 },
      { img: '', title: '牙齿矫正', price: '0', id: 1 },
      { img: '', title: '根管治疗', price: '0', id: 2 },
      { img: '', title: '牙齿美容', price: '0', id: 3 }
    ],
    clinicid: '',
    isOverShare: true
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  iphoneclick(e) {
    console.log(e.currentTarget.dataset.iphone)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.iphone //仅为示例，并非真实的电话号码
    })
  },
  go(e){
    let item = escape(JSON.stringify(e.currentTarget.dataset.item))
    wx.navigateTo({
      url: '../W_projectdetails/index?title=' + this.data.title + '&&item=' + item,
    })
  },
  W_ordergo(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../W_order/index?title=' + this.data.title + '&&servicesname=' + item.servicesname + '&&weiwebserviceidentity=' + item.weiwebserviceidentity,
    })
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/VWeb/ServerGet',
      method: 'post',
      data: {
        "clinicid": self.data.clinicid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(111)
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            arr: res.data.list
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
      clinicid: wx.getStorageSync('clinicid') ? wx.getStorageSync('clinicid') : ''
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
      path: '/pages/W_project/index?title=' + this.data.title + '&&id=' + this.data.clinicid  // 路径，传递参数到指定页面。
    }
  }
})