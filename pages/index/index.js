//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    show: false, 
    name:'广州大一口腔门诊',
    achievement_arr: [],
    Hospital_arr: [],
    nav_arr:[],
    moneystatus:false,
    borderstate:false,
    showleft:false,
    Worktoday: '',
    Tomorroworder: '',
    Historyarrears: '',
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
    let self =this
    wx.request({
      url: 'http://192.168.31.251/index.json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result == 200){
          self.setData({
            achievement_arr: res.data.achievement_arr,
            Hospital_arr: res.data.Hospital_arr,
            Worktoday: res.data.Today,
            Tomorroworder: res.data.Tomorrow,
            Historyarrears: res.data.History,
            nav_arr: res.data.nav_arr
          })
        }
      },
    })

  },
  bindViewTap: function() {
  },
})
