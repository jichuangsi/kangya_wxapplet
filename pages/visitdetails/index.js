// pages/visitdetails/index.js/
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '回访详情',
    time: '',
    Patient_name: '',
    doctor_name: '',
    visittype: '',
    visitstate:'',
    visitcontent: '',
    visitresult: '',
    Voicefile: [],
    visit:'',
    patdetails:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    Dialog.confirm({
      title: '提示',
      message: '您确定删除这条回访吗？'
    }).then(() => {
      // on confirm
      wx.navigateBack({
        delta: 1
      })
    }).catch(() => {
      // on cancel
    })
  },
  chatgo() {
    wx.navigateTo({
      url: '../chat/index?title=空白',
    })
  },
  editgo() {
    wx.navigateTo({
      url: '../visitedit/index?title=修改回访',
    })
  },
  iphoneclick() {
    let self = this
    console.log(self.data.patdetails)
    wx.makePhoneCall({
      phoneNumber: self.data.patdetails != '' ? self.data.patdetails.phone : self.data.visit.phone //仅为示例，并非真实的电话号码
    })
  },
  detailsgo(){
    console.log(this.data.visit)
    if(this.data.patdetails == ''){
      wx.navigateTo({
        url: '../Patientdetails/index?customerid=' + this.data.visit.customerid + '&&clinicid=' + this.data.visit.clinicid,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '回访详情'
    })
    let item = JSON.parse(options.item)
    console.log(item)
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];
    console.log(Page.data)
    this.setData({
      time: item.time,
      Patient_name: item.Patient_name,
      doctor_name: item.doctor_name,
      visittype: item.visittype,
      visitstate: item.visitstate,
      visitcontent: item.visitcontent,
      visitresult: item.visitresult,
      Voicefile: item.Voicefile,
      visit: item,
      patdetails: Page.data.patdetails ? Page.data.patdetails : ''
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