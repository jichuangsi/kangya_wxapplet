// pages/information/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexnum: 0,
    tabnum:1,
    show:false,
    left_text:'我的',
    system_arr:[],
    remind:[],
    zli:[],
    messages_arr:[],
    friend_arr:[]
  },
  sss(event) {
    console.log(event.detail)
    this.setData({
      indexnum: event.detail.current
    })
    console.log(this.data.indexnum)
  },
  remindgo(e) {
    wx.navigateTo({
      url: '../remind/index?title='+e.currentTarget.dataset.text,
    })
  },
  tabclick(e) {
    this.setData({
      indexnum: e.currentTarget.dataset.index
    })
  },
  leftclick() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  tab(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      tabnum: e.currentTarget.dataset.id
    })
    this.setData({
      left_text: e.currentTarget.dataset.id == 1?'全部':'我的'
    })
  },
  getpatient() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/getpatientmsglist',
      method: 'post',
      data: {
        pageno: 1,
        isshowselectmsg:0
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            friend_arr: res.data.list.userlist,
            messages_arr: res.data.list.userlist,
            remind: res.data.list.clinicid,
            zli: res.data.list.zli
          })
        }
      }
    })
  },
  chatgo(e){
    wx.navigateTo({
      url: '../chat/index?openid=' + e.currentTarget.dataset.item.openid + '&&title=' + e.currentTarget.dataset.item.customername,
    })
  },
  detailsgo(e) {
    let customerid = e.currentTarget.dataset.item.customerid ? e.currentTarget.dataset.item.customerid : ''
    let clinicid = e.currentTarget.dataset.item.clinicid ? e.currentTarget.dataset.item.clinicid : ''
    wx.navigateTo({
      url: '../Patientdetails/index?customerid=' + customerid + '&&clinicid=' + clinicid,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getpatient()
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