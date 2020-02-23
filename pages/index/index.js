//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    show: false, 
    name:'广州大一口腔门诊',
    achievement_arr: require('../../data/indexdata.js').default.achievement_arr,
    Hospital_arr: require('../../data/indexdata.js').default.Hospital_arr,
    moneystatus:false,
    borderstate:false,
    showleft:false,
    Worktoday: require('../../data/indexdata.js').default.nav.Today,
    Tomorroworder: require('../../data/indexdata.js').default.nav.Tomorrow,
    Historyarrears: require('../../data/indexdata.js').default.nav.History,
  },
  
  //事件处理函数
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },
  showPopupleft() {
    this.setData({ showleft: true });
  },

  onCloseleft() {
    this.setData({ showleft: false });
  },
  moneystatusclick(){
    console.log(this.data.moneystatus)
    this.setData({ moneystatus: !this.data.moneystatus });
  },
  saoclick(){
    var _this = this;
    _this.setData({ showleft: false });
    wx.scanCode({        //扫描API
      success: function (res) {
        console.log(res);    //输出回调信息
        wx.showToast({
          title: '成功',
          duration: 2000
        })
      }
    })
  },
  qrcodego(){
    wx.navigateTo({
      url: '../QRCode/index',
    })
    this.setData({ showleft: false });
  },
  Worktodaygo(){
    wx.navigateTo({
      url: '../Worktoday/index',
    })
  },
  addgo(){
    wx.navigateTo({
      url: '../AddPatient/index',
    })
    this.setData({ showleft: false });
  },
  addordergo(){
    wx.navigateTo({
      url: '../orderedit/index?title=添加预约',
    })
    this.setData({ showleft: false });
  },
  addvisitgo() {
    wx.navigateTo({
      url: '../visitedit/index?title=添加回访',
    })
    this.setData({ showleft: false });
  },
  ordergo(){
    wx.navigateTo({
      url: '../order/index?title=明日预约',
    })
  },
  Arrearsgo() {
    wx.navigateTo({
      url: '../Arrears/index',
    })
  },
  Hospital_click(e){
    console.log(e.currentTarget.dataset.name)
    this.setData({ name: e.currentTarget.dataset.name})
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: '../../data/a.json',
      success: function (res) {
        console.log(222)},
      fail: function (res) { console.log(res)},
      complete: function (res) { console.log(res)},
    })
    wx.request({
      url: '../../data/a.json', //仅为示例，并非真实的接口地址
      success(res) {
        console.log(res)
        console.log(222)
      }
    })
  },
  bindViewTap: function() {
  },
})
