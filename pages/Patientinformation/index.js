// pages/Patientinformation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '填写诊前信息',
    informationlist:{
      IDCard:'',
      socialcard:'',
      Consultant:'',
      Insurance:'',
      Introducer:'',
      powergrid:'',
      impression:'',
      Habit:'',
      experience:'',
      allergy:'',
      past:'',
      ask:''
    },
    power_arr: [],
    user: ''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  editgo(e) {
    let btn = e.currentTarget.dataset.btn ? '&&btnstate=1' : ''
    let iptstate = e.currentTarget.dataset.iptstate ? '&&iptstate=1' : ''
    let textstate = e.currentTarget.dataset.textstate ? '&&textstate=1' : ''
    let value = e.currentTarget.dataset.value ? '&&value=' + e.currentTarget.dataset.value : ''
    wx.navigateTo({
      url: '../Patientedit/index?title=' + e.currentTarget.dataset.text + iptstate + btn + textstate + value
    })
  },
  back() {
    var pages = getCurrentPages();
    var Page = pages[pages.length - 2];//
    Page.setData({
      informationlist: this.data.informationlist
    })
    this.onClickLeft()
  },
  btn() {
    let self = this
    var pages = getCurrentPages();
    var Page = pages[pages.length - 2];//
    wx.request({
      url: getApp().data.APIS + '/patient/addpatient',
      method: 'post',
      data: {
        "clinicid": "", 
        "customerid": "", 
        "customer": JSON.stringify(
          {
            "Referral": "",
            "PatientID": "*(无病历号)",
            "Name": Page.data.Patientlist.name,
            "Picture": "",
            "Sex": Page.data.sex,
            "Birthday": Page.data.check_time,
            "Age": Page.data.Patientlist.age,
            "PatientStar": Page.data.star_num,
            "Phone": Page.data.Patientlist.iphone1,
            "PhoneVestee1": Page.data.Patientlist.check_ascription1,
            "Phone1": Page.data.Patientlist.iphone2,
            "WorkPhone": "",
            "WorkAddress": "",
            "CommInsurance": "",
            "CommInsuranceID": "",
            "PhoneVestee2": Page.data.Patientlist.check_ascription2,
            "ImpressionInfo": self.data.informationlist.impression,
            "ComeFrom": Page.data.check_columns,
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
            "ReferralDoct": Page.data.Patientlist.doctor,
            "ReferralDoctIdentity": Page.data.Patientlist.doctorid,
            "Treatment": Page.data.Patientlist.check_project,
            "Country": "中国",
            "Province": Page.data.Patientlist.Province,
            "City": Page.data.Patientlist.City,
            "Town": Page.data.Patientlist.Town,
            "Address": Page.data.Patientlist.address,
            "Remark": Page.data.Patientlist.remark,
            "PatGroup": "990001",
            "PatGroupName": "最近客户",
            "QQ": Page.data.Patientlist.qq,
            "IntroducerId": "",
            "IntroducerSource": "1",
            "Email": Page.data.Patientlist.mailbox,
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
            "Occupation": Page.data.Patientlist.check_Occupation,
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
        "oldcustomer": ""
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
          setTimeout(function(){
            wx.navigateBack({
              delta: 2,
            })
          }, 1000)
        } else {
          wx.showToast({
            title: '失败',
            duration: 2000
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
      title: '填写诊前信息',
    })
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];//
    this.setData({
      power_arr: Page.data.power_arr,
      user: Page.data.user
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