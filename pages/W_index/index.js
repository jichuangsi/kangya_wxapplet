// pages/W_index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '康牙医生',
    img_arr:['','',''],
    clinic_phone:'',
    clinic_name: '',
    clinic_address: '',
    contacts: '',
    phone: '',
    time: '',
    bz: '',
    follownum: '',
    doctor_arr: '',
    project_arr: '',
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
      url: 'http://192.168.31.251/W_index.json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result == 200) {
          self.setData({
            img_arr: res.data.img_arr,
            clinic_phone: res.data.clinic_phone,
            clinic_name: res.data.clinic_name,
            clinic_address: res.data.clinic_address,
            contacts: res.data.contacts,
            phone: res.data.phone,
            time: res.data.time,
            bz: res.data.bz,
            follownum: res.data.follownum,
            doctor_arr: res.data.doctor_arr,
            project_arr: res.data.project_arr,
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