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
    user:''
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
  Workbenchgo() {
    wx.navigateTo({
      url: '../Workbench/index',
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
  getdata(){
    let self = this
    wx.request({
      url: getApp().data.APIS +'/market/massage/BaseData',
      success:function(res){
        console.log(res)
        if(res.data.info == 'ok'){
          self.setData({
            Hospital_arr:res.data.list
          })
          let date = new Date();
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
          let bengindate= year + '/' + month + '/' +'01'
          let enddate = year + '/' + month+1 + '/' + '01'
          self.getswiper(res.data.list[0].clinicid, bengindate, enddate)
        }
      }
    })
  },
  getswiper(id, bengindata, enddate) {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/report/studyinfo',
      method:'post',
      data:{
        clinkid:id,
        bengindate: bengindata,
        enddate: enddate
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            
          })
        }
      }
    })
  },
  getPerinfo() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/member/Perinfo',
      method: 'post',
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            user:res.data.list[0]
          })
        }
      }
    })
  },
  gettotal() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/homepagelefttotal',
      method: 'post',
      data: {
        doctorid: '',
        indexlsit: '1,2,3,4,5,6,7,8'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            Worktoday: res.data.list[0].studycount,
            Tomorroworder: res.data.list[0].netschcount,
          })
        }
      }
    })
    wx.request({
      url: getApp().data.APIS + '/patient/homepagetotal',
      method: 'post',
      data: {
        doctorid: '',
        indexlsit: '1,2,3,4,5,6'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(111)
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self =this
    self.getdata()
    self.getPerinfo()
    self.gettotal()
    wx.request({
      url: getApp().data.API+'/index.json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        // console.log(res.data)
        if (res.data.result == 200){
          self.setData({
            achievement_arr: res.data.achievement_arr,
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
