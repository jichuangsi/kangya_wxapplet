// pages/W_team/index.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '康牙医生',
    doctor_arr:[],
    clinicid: '',
    isOverShare: true,
    rw_url:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  W_ordergo(e) {
    console.log(e.currentTarget.dataset.item)
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../W_order/index?title=' + this.data.title + '&&doctorname=' + item.doctorname + '&&doctorid=' + item.doctorid,
    })
  },

  getdata() {
    let self = this
    wx.request({
      url: self.data.rw_url ? self.data.rw_url :getApp().data.APIS + '/VWeb/DoctorGet',
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
            doctor_arr: res.data.list
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
      clinicid: wx.getStorageSync('clinicid') ? wx.getStorageSync('clinicid') : '',
      rw_url: options.rw_url ? options.rw_url : ''
    })
    console.log(this.data.rw_url)
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
      path: '/pages/W_team/index?title=' + this.data.title + '&&id=' + this.data.clinicid + '&&rw_url=' + this.data.rw_url  // 路径，传递参数到指定页面。
    }
  }
})