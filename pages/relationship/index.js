// pages/relationship/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'新增亲友关系',
    show:false,
    relationship:'',
    patient:'',
    patdetails:'',
    bz: '',
    power_arr: [],
    user: ''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    let self = this
    if (self.data.patient!=''){
      wx.request({
        url: getApp().data.APIS + '/patient/quintroducer',
        method: 'post',
        data: {
          name: self.data.patient.name,
          qtype: 1,
          customerid: self.data.patdetails.customerid,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded', //修改此处即可
          'token':wx.getStorageSync('token')
        },
        success: function (res) {
          console.log(res)
          if (res.data.info == 'ok') {
            self.onClickLeft()
            var pages = getCurrentPages();
            var Page = pages[pages.length - 2];//
            Page.getdata()
          }
        }
      })
    }else{
      wx.showToast({
        icon:'none',
        title: '请选择亲友',
      })
    }
  },
  show(){
    this.setData({show:true})
  },
  onClose() {
    this.setData({ show: true })
  },
  relationship(e) {
    this.setData({ show: false, relationship: e.currentTarget.dataset.text });
  },
  Patientgo(){
    wx.navigateTo({
      url: '../Patientlist/index?state=1',
    })
  },
  ipt(e){
    console.log(e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '新增亲友关系'
    })
    var pages = getCurrentPages();
    var Page = pages[pages.length - 2];//
    this.setData({
      power_arr: Page.data.power_arr,
      user: Page.data.user,
      patdetails: Page.data.patdetails,
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

  }
})