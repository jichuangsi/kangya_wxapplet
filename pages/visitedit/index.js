// pages/visitedit/index.js/
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '修改回访',
    check_text: '已回访',
    show: false,
    time: '',
    Patient_name: '',
    doctor_name: '',
    visittype: '',
    visitcontent: '',
    visitresult: '',
    Voicefile: [],
    calendarConfig: {
      // 配置内置主题
      theme: 'elegant',
      chooseAreaMode: false,
    },
    patient:'',
    doctor:'',
    visit:'',
    visitidentity: '',
    power_arr: [],
    user: '',
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/editpatvisit',
      method: 'post',
      data: {
        "customerid": self.data.patient.customerid, 
        "name": self.data.patient.patientname,
        "date": self.data.time, 
        "retvisuser": self.data.doctor.name, 
        "useridentity": self.data.doctor.doctorid, 
        "state": self.data.check_text == '已回访'?4:3, 
        "record": self.data.visitcontent, 
        "returntype": self.data.visittype, 
        "remark": self.data.visitresult, 
        "studyidentity": "", 
        "visitidentity": self.data.visitidentity, 
        "clinicid": self.data.patient.clinicuniqueid
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            self.onClickLeft()
          }, 1000)
        } else {
          wx.showToast({
            title: '失败',
            duration: 2000
          })
        }
      },
    })
  },
  Patientgo() {
    if (this.data.title == '添加回访'&&this.data.patient == '') {
      wx.navigateTo({
        url: '../Patientlist/index?state=1',
      })
    }
  },
  Soundgo() {
    wx.navigateTo({
      url: '../Sound/index',
    })
  },
  checkclick(e) {
    this.setData({ check_text: e.currentTarget.dataset.text })
  },
  showpoup() {
    this.setData({ show: true })
  },
  onClose() {
    this.setData({ show: false })
  },

  doSomeThing() {
    // 调用日历方法
    this.calendar.enableArea();
  },
  afterTapDay(e) {
    console.log('afterTapDay', e.detail); // => { currentSelect: {}, allSelectedDays: [] }
    this.setData({
      time: e.detail.year + '年' + e.detail.month + '月' + e.detail.day + '日'
    })
    this.onClose()
    console.log(this.data.time)
  },
  Colleaguego() {
    wx.navigateTo({
      url: '../Colleague/index?title=医生&&state=2',
    })
  },
  Patienteditgo(e) {
    let btn = e.currentTarget.dataset.btn?'&&btnstate=1':''
    let textstate = e.currentTarget.dataset.textstate ? '&&textstate=1' : ''
    let value = e.currentTarget.dataset.value ? '&&value=' + e.currentTarget.dataset.value : ''
    console.log(e.currentTarget.dataset.btn)
    wx.navigateTo({
      url: '../Patientedit/index?title=' + e.currentTarget.dataset.text + btn + textstate + value,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];
    this.setData({
      title: options.title,
      power_arr: Page.data.power_arr,
      user: Page.data.user,
    })
    console.log(Page.data)
    if (options.title !='添加回访'){
      this.setData({
        patient:{
          customerid: Page.data.patdetails != '' ? Page.data.patdetails.customerid : Page.data.visit.customerid,
          patientname: Page.data.patdetails != '' ? Page.data.patdetails.name : Page.data.visit.customername,
          clinicuniqueid: Page.data.patdetails != '' ? Page.data.patdetails.clinicuniqueid : Page.data.visit.clinicid,
        },
        doctor:{
          name: Page.data.visit.retvisuser,
          doctorid: Page.data.visit.useridentity,
        },
        check_text: Page.data.visit.retvisrecord,
        visitcontent: Page.data.visit.retvisititem,
        visittype: Page.data.visit.returntype,
        visitresult: Page.data.visit.remark,
        time: Page.data.visit.returndate,
        visitidentity: Page.data.visit.visitidentity,
      })
    } else if (options.title == '添加回访' && Page.data.patdetails) {
      this.setData({
        patient: {
          customerid: Page.data.patdetails != '' ? Page.data.patdetails.customerid : Page.data.visit.customerid,
          patientname: Page.data.patdetails != '' ? Page.data.patdetails.name : Page.data.visit.customername,
          clinicuniqueid: Page.data.patdetails != '' ? Page.data.patdetails.clinicuniqueid : Page.data.visit.clinicid,
        },
        doctor: {
          name: Page.data.patdetails.referraldoct,
          doctorid: Page.data.patdetails.referraldoctidentity
        },
      })
    }
    wx.setNavigationBarTitle({
      title: options.title
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
    console.log(this.data.patient)
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