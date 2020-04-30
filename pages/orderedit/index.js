// pages/orderedit/index.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '修改预约',
    check_num:0,
    show: false,
    time:'',
    Patient_name: '',
    doctor_name: '',
    Duration: '',
    Matter: '',
    orderbz: '',
    calendarConfig: {
      // 配置内置主题
      theme: 'elegant',
      chooseAreaMode: false,
    },
    patient:'',
    doctor:'',
    item:'',
    scheduleidentity: '',
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
      url: getApp().data.APIS + '/schedule/scsaveschedule',
      method: 'post',
      data: {
        "schclinicid": self.data.patient.clinicuniqueid,
        "customerid": self.data.patient.customerid, 
        "name": self.data.patient.patientname, 
        "clinicid": self.data.patient.clinicuniqueid, 
        "patientid": self.data.patient.patientid, 
        "phone": self.data.patient.phone, 
        "wechatid": '', 
        "phone1": self.data.patient.phone1, 
        "phonevestee1": self.data.patient.phonevestee1, 
        "phonevestee2": self.data.patient.phonevestee2, 
        "age": self.data.patient.age, 
        "sex": self.data.patient.sex, 
        "birthday1": self.data.patient.birthday, 
        "openid": '', 
        "ComeFrom": self.data.patient.comefrom, 
        "ComeFrom2": self.data.patient.comefrom2, 
        "ComeFrom2pid": self.data.patient.comefrom2pid, 
        "ComeFrom3": self.data.patient.comefrom3, 
        "ComeFrom3pid": self.data.patient.comefrom3pid, 
        "schedule": {
          "datestr": self.data.time, 
          "starttime": self.data.Duration.split('~')[0], 
          "endtime": self.data.Duration.split('~')[1], 
          "items": self.data.Matter, 
          "doctorid": self.data.doctor.doctorid, 
          "doctorname": self.data.doctor.name,
          "visitstatus": self.data.check_num, 
          "scheduleidentity": self.data.scheduleidentity, 
          "schedulemanid": self.data.doctor.doctorid, 
          "scheduleman": self.data.doctor.name, 
          "remark": self.data.orderbz, 
          "scServerID": ""
        }
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
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
          },1000)
        }else{
          wx.showToast({
            title: '失败',
            duration: 2000
          })
        }
      }
    })
  },
  Patientgo() {
    if(this.data.title=='添加预约'&&this.data.patient==''){
      wx.navigateTo({
        url: '../Patientlist/index?state=1',
      })
    }
  },
  checkclick(e){
    this.setData({ check_num: e.currentTarget.dataset.text})
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
        time: e.detail.year + '-' + e.detail.month + '-' + e.detail.day
      })
    this.onClose()
    console.log(this.data.time)
  },
  Colleaguego(){
    wx.navigateTo({
      url: '../Colleague/index?title=医生&&state=2',
    })
  },
  Patienteditgo(e) {
    let btn = e.currentTarget.dataset.btn ? '&&btnstate=1' : ''
    let textstate = e.currentTarget.dataset.textstate ? '&&textstate=1' : ''
    let value = e.currentTarget.dataset.value ? '&&value=' + e.currentTarget.dataset.value : ''
    wx.navigateTo({
      url: '../Patientedit/index?title=' + e.currentTarget.dataset.text + btn + textstate + value,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    console.log(options.title)
    this.setData({
      title: options.title,
      power_arr: prevPage.data.power_arr,
      user: prevPage.data.user,
    })
    if (options.title !='添加预约'){
      this.setData({
        patient: {
          clinicuniqueid: prevPage.data.item.clinicuniqueid,
          customerid: prevPage.data.item.customerid,
          patientname: prevPage.data.item.name,
          patientid: prevPage.data.item.patientid,
          phone: prevPage.data.item.phone,
          age: prevPage.data.item.age,
          sex: prevPage.data.item.sex,
          sex: prevPage.data.item.sex,
        },
        Duration: prevPage.data.item.starttime + '~' + prevPage.data.item.endtime,
        time: prevPage.data.item.scheduledate,
        check_num: prevPage.data.item.visitstatus,
        doctor: {
          name: prevPage.data.item.scheduleman,
          doctorid: prevPage.data.item.schedulemanid
        },
        Matter: prevPage.data.item.items,
        orderbz: prevPage.data.item.remark,
        scheduleidentity: prevPage.data.item.scheduleidentity,
      })
    } else if (options.title == '添加预约' && prevPage.data.patdetails) {
      this.setData({
        patient: {
          clinicuniqueid: prevPage.data.patdetails.clinicuniqueid,
          customerid: prevPage.data.patdetails.customerid,
          patientname: prevPage.data.patdetails.name,
          patientid: prevPage.data.patdetails.patientid,
          phone: prevPage.data.patdetails.phone,
          age: prevPage.data.patdetails.age,
          sex: prevPage.data.patdetails.sex,
        },
        check_num: prevPage.data.check_num,
        doctor: {
          name: prevPage.data.patdetails.referraldoct,
          doctorid: prevPage.data.patdetails.referraldoctidentity
        },
      })
    }
    console.log(1111)
    console.log(prevPage.data.patdetails)
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