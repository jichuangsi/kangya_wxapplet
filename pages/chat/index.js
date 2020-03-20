// pages/chat/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '空白',
    arr:[],
    text:'',
    openid:'',
    newopenid:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight(){
    wx.navigateTo({
      url: '../Patientdetails/index',
    })
  },
  ipttext(e) {
    this.setData({
      text: e.detail.value
    })
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/getpatientmsg',
      method: 'post',
      data: {
        openid: self.data.openid,
        openidtype: 1,
        isshowselectmsg: 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          for (let i = 0; i < res.data.list.data.records.length;i++){
            if (res.data.list.data.records[i].content.indexOf('picurl') != '-1' || res.data.list.data.records[i].content.indexOf('customername') != '-1' || res.data.list.data.records[i].content.indexOf('sex') != '-1') {
              res.data.list.data.records[i].content = ''
            }
          }
          self.setData({
            newopenid: res.data.list.data.openid,
            arr: res.data.list.data.records
          })
          console.log(self.data.arr)
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
      title:options.title,
      openid: options.openid
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