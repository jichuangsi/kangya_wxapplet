// pages/W_address/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '康牙医生',
    longitude: 113.324520,
    latitude: 23.099994,
    clinicid: '',
      markers: [{
        iconPath: "https://www.kyawang.com/uploads/images/kyshop.png",
        id: 0,
        latitude: 23.0792313540048,
        longitude: 113.27764750328029,
        width: 50,
        height: 50
    }],
    isOverShare: true,
    rw_url:''
  },

  iphoneclick() {
    let self = this
    wx.makePhoneCall({
      phoneNumber: self.data.clinic_phone //仅为示例，并非真实的电话号码
    })
  },
  W_ordergo() {
    wx.navigateTo({
      url: '../W_order/index?title=' + this.data.title,
    })
  },
  getdata() {
    let self = this
    wx.request({
      url: self.data.rw_url ? self.data.rw_url:getApp().data.APIS + '/VWeb/ClinicGet',
      method: 'post',
      data: {
        "clinicid": self.data.clinicid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let zb = self.bd09togcj02(res.data.list[0].longitude,res.data.list[0].latitude)
          console.log(zb)
          self.setData({
            longitude: res.data.list[0].longitude,
            latitude: res.data.list[0].latitude,
            clinic_phone: res.data.list[0].phone,
            markers: [{
              iconPath: "https://www.kyawang.com/uploads/images/kyshop.png",
              id: 0,
              latitude: zb[1],
              longitude: zb[0],
              width: 50,
              height: 50
            }]
          })
          console.log(self.data.markers)
        }
      }
    })
  },
  bd09togcj02(bd_lon, bd_lat) {
    var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
    var x = bd_lon - 0.0065;
    var y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    return [gg_lng, gg_lat]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title,
      clinicid: options.id ? options.id : '422063022055030784',
      rw_url: options.rw_url ? options.rw_url : ''
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.getdata()
    this.mapCtx = wx.createMapContext('map')
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
      path: '/pages/W_address/index?title=' + this.data.title + '&&id=' + this.data.clinicid + '&&rw_url=' + this.data.rw_url  // 路径，传递参数到指定页面。
    }
  }
})