// pages/W_index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '康牙医生',
    img_arr:['','',''],
    clinicid:'',
    clinic_phone: '',
    isOverShare: true
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  iphoneclick(){
    let self = this
    wx.makePhoneCall({
      phoneNumber: self.data.clinic_phone //仅为示例，并非真实的电话号码
    })
  },
  getdata(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/VWeb/BannerGet',
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
            img_arr:res.data.list
          })
        }
      }
    })
    wx.request({
      url: getApp().data.APIS + '/VWeb/ClinicGet',
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
          self.setData({
            clinic_phone: res.data.list[0].phone
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
      clinicid: options.id ? options.id : '422063022055030784'
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
      path: '/pages/W_index/index?title=' + this.data.title + '&&id=' + this.data.clinicid  // 路径，传递参数到指定页面。
    }
  }
})