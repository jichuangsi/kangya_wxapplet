// pages/AddPatient/index.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '患者资料',
    active: '基本信息',
    customerid:'',
    show: false,
    show_num: 0,
    star_num: 0,
    sex_num: 0,
    checked: false,
    currentDate: new Date().getTime(),
    minDate: 320049973000,
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    check_time: '',
    columns: ['网络咨询', '朋友介绍', '家住附近', '诊所网站'],
    check_columns: '',
    areaList: [],
    check_area: '',
    patdetails:'',
    Patientlist: {
      name: '',
      doctor: '',
      age: '',
      check_project: '',
      check_Occupation: '',
      check_Education: '',
      check_ascription1: '',
      check_ascription2: '',
      hobby: '',
      Economic: '',
      qq: '',
      mailbox: '',
      iphone1: '',
      iphone2: '',
      address: '',
      remarks: '',
      patient_num:'',
      vip_star:'',
      vip_num:''
    },
    informationlist: {
      IDCard: '',
      socialcard: '',
      Consultant: '',
      Insurance: '',
      Introducer: '',
      powergrid: '',
      impression: '',
      Habit: '',
      experience: '',
      allergy: '',
      past: '',
      ask: ''
    },
    relationship_arr:[
      { name: '莫须有', relationship:'同事'}
    ],
    power_arr: [],
    user: ''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  abc(event) {
    this.setData({
      active: event.detail.name
    })
    console.log(this.data.active)
  }, 
  Patientdetailsgo(e){
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../Patientdetails/index?customerid=' + item.prelationclinicid + '&&clinicid=' + item.clinicid,
    })
  },
  relationshipgo(){
    wx.navigateTo({
      url: '../relationship/index',
    })
  },
  onConfirm(event) {
    this.setData({
      currentDate: event.detail,
      show: false,
      check_time: this.timestampToTime(event.detail)
    });
  },
  onConfirm1(event) {
    this.setData({
      check_columns: event.detail.value,
      show: false
    });
  },
  onCancel() {
    this.setData({ show: false });
  },
  onChange(e) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: e.detail });
  },
  show(e) {
    this.setData({ show: true, show_num: e.currentTarget.dataset.index });
  },
  onClose() {
    this.setData({ show: false });
  },
  star(e) {
    this.setData({ show: false, star_num: e.currentTarget.dataset.index });
  },
  sex(e) {
    this.setData({ show: false, sex_num: e.currentTarget.dataset.index==1?'男':'女' });
  },
  editgo(e) {
    let btn = e.currentTarget.dataset.btn ? '&&btnstate=1' : ''
    let iptstate = e.currentTarget.dataset.iptstate ? '&&iptstate=1' : ''
    let textstate = e.currentTarget.dataset.textstate ? '&&textstate=1' : ''
    let value = e.currentTarget.dataset.value ? '&&value=' + e.currentTarget.dataset.value : ''
    let typestate = e.currentTarget.dataset.typestate ? '&&typestate=' + e.currentTarget.dataset.typestate : ''
    wx.navigateTo({
      url: '../Patientedit/index?title=' + e.currentTarget.dataset.text + iptstate + btn + textstate + value + typestate
    })
  },
  Colleaguego(e) {
    wx.navigateTo({
      url: '../Colleague/index?state=1&&title=' + e.currentTarget.dataset.text
    })
  },
  timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D;
  },
  areaclick(e) {
    this.setData({ show: false, check_area: e.detail.values[0].name + e.detail.values[1].name + e.detail.values[2].name });
  },
  btn() {
    this.onClickLeft()
  },
  messagego() {
    wx.navigateTo({
      url: '../Patientinformation/index',
    })
  },
  getdata(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/qupatientbyid',
      method: 'post',
      data: {
        customerid: self.data.customerid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            patdetails: res.data.list.patdetails[0],
            relationship_arr:res.data.list.friend,
            star_num: res.data.list.patdetails[0].patientstar,
            sex_num: res.data.list.patdetails[0].sex,
            check_time: res.data.list.patdetails[0].birthday,
            check_columns: res.data.list.patdetails[0].comefrom + res.data.list.patdetails[0].comefrom2 + res.data.list.patdetails[0].comefrom3 + res.data.list.patdetails[0].comefrom21 + res.data.list.patdetails[0].comefrom22 + res.data.list.patdetails[0].comefrom23 + res.data.list.patdetails[0].comefrom31 + res.data.list.patdetails[0].comefrom32 + res.data.list.patdetails[0].comefrom33 + res.data.list.patdetails[0].comefrom41 + res.data.list.patdetails[0].comefrom42 + res.data.list.patdetails[0].comefrom43,
            Patientlist: {
              name: res.data.list.patdetails[0].name,
              doctor: res.data.list.patdetails[0].referraldoct,
              age: res.data.list.patdetails[0].age,
              check_project: res.data.list.patdetails[0].treatment,
              check_Occupation: res.data.list.patdetails[0].occupation,
              check_Education: '',
              check_ascription1: res.data.list.patdetails[0].phonevestee1,
              check_ascription2: res.data.list.patdetails[0].phonevestee2,
              hobby: '',
              Economic: '',
              qq: res.data.list.patdetails[0].qq,
              mailbox: res.data.list.patdetails[0].email,
              iphone1: res.data.list.patdetails[0].phone,
              iphone2: res.data.list.patdetails[0].phone1,
              address: res.data.list.patdetails[0].address,
              remarks: res.data.list.patdetails[0].remark,
              patient_num: res.data.list.patdetails[0].patientid,
              vip_star: res.data.list.patdetails[0].viptype,
              vip_num: res.data.list.patdetails[0].vipnumber
            },
            informationlist: {
              IDCard: res.data.list.patdetails[0].idno,
              socialcard: '',
              Consultant: '',
              Insurance: '',
              Introducer: res.data.list.patdetails[0].introducer,
              powergrid: '',
              impression: res.data.list.patdetails[0].impressioninfo,
              Habit: '',
              experience: res.data.list.patdetails[0].visithistory,
              allergy: res.data.list.patdetails[0].allergichistory,
              past: res.data.list.patdetails[0].diseasehistory,
              ask: ''
            }
          })
          console.log(self.data.Patientlist)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pages = getCurrentPages();
    var Page = pages[pages.length - 2];//
    this.setData({
      areaList: require("../../data/area.js").default,
      customerid: Page.data.customerid,
      power_arr: Page.data.power_arr,
      user: Page.data.user
    })
    wx.setNavigationBarTitle({
      title: '患者资料',
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
    let self = this
    if (self.data.power_arr.code10003.has || self.data.power_arr.code10007.has){
      wx.request({
        url: getApp().data.APIS + '/patient/addpatient',
        method: 'post',
        data: {
          "customer": JSON.stringify(
            {
              "Clinicuniqueid": self.data.patdetails.clinicuniqueid,
              "CustomerID": self.data.patdetails.customerid,
              "PatientID": self.data.patdetails.patientid,
              "Name": self.data.Patientlist.name,
              "Picture": self.data.patdetails.picture,
              "Sex": self.data.sex,
              "Birthday": self.data.check_time,
              "Age": self.data.Patientlist.age,
              "PatientStar": self.data.star_num,
              "Phone": self.data.Patientlist.iphone1,
              "PhoneVestee1": self.data.Patientlist.check_ascription1,
              "Phone1": self.data.Patientlist.iphone2,
              "WorkPhone": "",
              "WorkAddress": "",
              "CommInsurance": "",
              "CommInsuranceID": "",
              "PhoneVestee2": self.data.Patientlist.check_ascription2,
              "ImpressionInfo": self.data.informationlist.impression,
              "ComeFrom": self.data.check_columns,
              "ComeFrom2": "",
              "ComeFrom2pid": "28220801069395242",
              "ComeFrom3": "",
              "ComeFrom3pid": "",
              "ComeFrom21": "",
              "ComeFrom22": "",
              "ComeFrom22pid": "",
              "ComeFrom23": "",
              "ComeFrom23pid": "",
              "ComeFrom31": "",
              "ComeFrom32": "",
              "ComeFrom32pid": "",
              "ComeFrom33": "",
              "ComeFrom33pid": "",
              "ComeFrom41": "",
              "ComeFrom42": "",
              "ComeFrom42pid": "",
              "ComeFrom43": "",
              "ComeFrom43pid": "",
              "IDNo": self.data.informationlist.IDCard,
              "Introducer": self.data.informationlist.Introducer,
              "ReferralDoct": self.data.Patientlist.doctor,
              "ReferralDoctIdentity": self.data.Patientlist.doctorid,
              "Treatment": self.data.Patientlist.check_project,
              "Country": "中国",
              "Province": self.data.Patientlist.Province,
              "City": self.data.Patientlist.City,
              "Town": self.data.Patientlist.Town,
              "Address": self.data.Patientlist.address,
              "Remark": self.data.Patientlist.remark,
              "PatGroup": "990001",
              "PatGroupName": "最近客户",
              "QQ": self.data.Patientlist.qq,
              "IntroducerId": "",
              "IntroducerSource": "1",
              "Email": self.data.Patientlist.mailbox,
              "Counselor": "",
              "Wechat": "",
              "DiseaseHistory": self.data.informationlist.past,
              "AllergicHistory": self.data.informationlist.allergy,
              "VisitHistory": self.data.informationlist.experience,
              "BrushNum": "",
              "BrushMin": "",
              "SmokeNum": "",
              "Complained": "",
              "Symptom": "",
              "InitialJudge": "",
              "BrushType": "",
              "Occupation": self.data.Patientlist.check_Occupation,
              "FirstTimeDoct": "",
              "OrthodonticNO": "",
              "YellowCode": "",
              "keyword1": "",
              "keyword2": "",
              "keyword3": "",
              "keyword4": "",
              "keyword5": "",
              "keyword6": "",
              "keyword7": "",
              "keyword8": "",
              "keyword9": "",
              "keyword10": "",
              "keyword11": "",
              "keyword12": "",
              "keyword13": "",
              "keyword14": "",
              "keyword15": "",
              "keyword16": "",
              "keyword17": "",
              "keyword18": "",
              "keyword19": "",
              "keyword20": ""
            }
          ),
          "oldcustomer": JSON.stringify(self.data.patdetails)
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' //修改此处即可
        },
        success: function (res) {
          console.log(res)
          if (res.data.info == 'ok') {
          } else {
          }
        }
      })
    }
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