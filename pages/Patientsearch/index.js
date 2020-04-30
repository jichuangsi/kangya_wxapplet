// pages/Patientsearch/index.js
var today_date = new Date()
var today_time = today_date.getFullYear() + "-" + (today_date.getMonth() + 1) + "-" + today_date.getDate()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav1: '患者分组',
    nav2: '检查医生',
    nav1_arr: ['全部'],
    doctor_arr:['全部'],
    arr:[],
    time: today_time + '~' + today_time,
    nav_num: 1,
    calendarConfig: {
      // 配置内置主题
      theme: 'elegant',
      chooseAreaMode: true,
    },
    doctorid:'',
    pageIndex:1,
    searchtext:'',
    state: 0,
    power_arr: [],
    user: ''
  },
  searchclick(e){
    console.log(e)
    this.setData({ searchtext: e.detail.value });
    this.getpatient()
  },
  Patientclick(e) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 3];
    console.log(this.data.state)
    if (this.data.state == 0) {
      wx.navigateTo({
        url: '../Patientdetails/index?customerid=' + e.currentTarget.dataset.customerid + '&&clinicid=' + e.currentTarget.dataset.clinicid,
      })
    } else {
      prevPage.setData({
        patient: e.currentTarget.dataset.item
      })
      wx.navigateBack({
        delta: 2,
      })
    }
  },
  onClose() {
    this.setData({ show: false });
  },
  showPopup(e) {
    this.setData({ show: true, nav_num: e.currentTarget.dataset.index });
  },
  nav1click(e) {
    this.setData({
      nav1: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '状态'
    })
    this.getpatient()
    this.onClose()
  },
  nav2click(e) {
    this.setData({
      nav2: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '医生',
      doctorid: e.currentTarget.dataset.doctorid
    })
    this.getpatient()
    this.onClose()
  },
  doSomeThing() {
    // 调用日历方法
    this.calendar.enableArea();
  },
  afterTapDay(e) {
    console.log('afterTapDay', e.detail); // => { currentSelect: {}, allSelectedDays: [] }
    let arr = this.calendar.getSelectedDay()
    this.setData({
      time: arr[0].year + '-' + arr[0].month + '-' + arr[0].day + '~' + arr[arr.length - 1].year + '-' + arr[arr.length - 1].month + '-' + arr[arr.length - 1].day,
      bengindate: arr[0].year + '-' + arr[0].month + '-' + arr[0].day,
      enddate: arr[arr.length - 1].year + '-' + arr[arr.length - 1].month + '-' + arr[arr.length - 1].day
    })
    this.getpatient()
    this.onClose()
  },
  getpatient() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/qupatient',
      method: 'post',
      data: {
        pageno: self.data.pageIndex,
        pagesize: '100',
        keywor: self.data.searchtext,
        referraldoct: self.data.nav2,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            arr: res.data.list
          })
        }
      }
    })
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/patientbasegroup',
      method: 'post',
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            nav1_arr: res.data.list
          })
        }
      }
    })
  },
  getdoctor() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/schedule/microlettercondition',
      method: 'post',
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            doctor_arr: res.data.list.schdoctor
          })
          console.log(self.data.doctor_arr)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];//
    this.setData({
      state: options.state,
      power_arr: Page.data.power_arr,
      user: Page.data.user
    })
    this.getdata()
    this.getdoctor()
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