// pages/Management/index.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '处置',
    arr: [
    ],
    customerid: '',
    clinicid: ''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    wx.navigateTo({
      url: '../Managementedit/index?title=确认内容',
    })
  },
  Soundgo() {
    wx.navigateTo({
      url: '../Sound/index',
    })
  },
  Agreeimggo() {
    wx.navigateTo({
      url: '../Agreeimg/index',
    })
  },
  editgo() {
    wx.navigateTo({
      url: '../Managementedit/index?title=修改处置',
    })
  },
  Pricego(e) {
    wx.navigateTo({
      url: '../Price/index?title=划价&&item=' + JSON.stringify(e.currentTarget.dataset.item),
    })
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/getpatienthandlelist',
      method: 'post',
      data: {
        CustomerID: self.data.customerid,
        clinicid: self.data.customerid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        for(let i = 0;i<res.data.list.studylist.length;i++){
          if (res.data.list.studylist[i].handlelist){
            res.data.list.studylist[i].allfee = 0
            for (let j = 0; j < res.data.list.studylist[i].handlelist.length; j++) {
              res.data.list.studylist[i].allfee += Number(res.data.list.studylist[i].handlelist[j].billnumber) * res.data.list.studylist[i].handlelist[j].fee.indexOf(',') != '-1' ? Number(res.data.list.studylist[i].handlelist[j].fee.split(',')[0] + res.data.list.studylist[i].handlelist[j].fee.split(',')[1]) : Number(res.data.list.studylist[i].handlelist[j].fee)
            }
          }
        }
        if (res.data.info == 'ok') {
          self.setData({
            arr : res.data.list.studylist
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:'处置'
    })
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];
    this.setData({
      customerid: Page.data.customerid,
      clinicid: Page.data.clinicid
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