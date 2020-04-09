// pages/medicaledit/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '新增病历',
    check_text: '初诊病历',
    checked: false,
    show: false,
    patdetails:'',
    complain: '',
    repetition: '',
    disease: '',
    past: '',
    allergy: '',
    inspect: [
      {lt:'',rt:'',lb:'',rb:'',text:''}
    ],
    auxiliary: [
      { lt: '', rt: '', lb: '', rb: '', text: '' }
    ],
    diagnose: [
      { lt: '', rt: '', lb: '', rb: '', text: '' }
    ],
    programme: [
      { lt: '', rt: '', lb: '', rb: '', text: '' }
    ],
    treat: [
      { lt: '', rt: '', lb: '', rb: '', text: '' }
    ],
    advice: '',
    img_arr:[],
    doctor_name: '',
    nurse_name:'',
    time:'',
    calendarConfig: {
      // 配置内置主题
      theme: 'elegant',
      chooseAreaMode: false,
    },
    medical:{
      arr1:[
        {id:1,text:''}
      ]
    },
    doctor: '',
    doctor1: '',
    img_arr:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    wx.navigateTo({
      url: '../medicalTemplate/index',
    })
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
  checkclick(e) {
    this.setData({ check_text: e.currentTarget.dataset.text })
  },
  onChange(e) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: e.detail });
    console.log(e.detail)
    if (e.detail){
      let arr1 = this.data.inspect
      let arr2 = this.data.auxiliary
      let arr3 = this.data.diagnose
      let arr4 = this.data.programme
      let arr5 = this.data.treat
      arr2[0].lt = arr1[0].lt
      arr2[0].rt = arr1[0].rt
      arr2[0].lb = arr1[0].lb
      arr2[0].rb = arr1[0].rb
      arr3[0].lt = arr1[0].lt
      arr3[0].rt = arr1[0].rt
      arr3[0].lb = arr1[0].lb
      arr3[0].rb = arr1[0].rb
      arr4[0].lt = arr1[0].lt
      arr4[0].rt = arr1[0].rt
      arr4[0].lb = arr1[0].lb
      arr4[0].rb = arr1[0].rb
      arr5[0].lt = arr1[0].lt
      arr5[0].rt = arr1[0].rt
      arr5[0].lb = arr1[0].lb
      arr5[0].rb = arr1[0].rb
      this.setData({
        auxiliary: arr2,
        diagnose: arr3,
        programme: arr4,
        treat: arr5,
      })
    }
  },
  editgo(e) {
    wx.navigateTo({
      url: '../edit/index?title=' + e.currentTarget.dataset.text + '&&value=' + e.currentTarget.dataset.value + '&&index=' + e.currentTarget.dataset.index,
    })
  },
  Colleaguego(e) {
    let another = '&&another='+e.currentTarget.dataset.another
    wx.navigateTo({
      url: '../Colleague/index?title=医生&&state=2' + another,
    })
  },
  Soundgo() {
    wx.navigateTo({
      url: '../Sound/index',
    })
  },
  ygo(e) {
    wx.navigateTo({
      url: '../Tooth/index?index=' + e.currentTarget.dataset.index + '&&text='+e.currentTarget.dataset.text,
    })
  },
  showpopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  btn(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/insmedicarecord',
      method: 'post',
      data: {
        "ae": JSON.stringify(self.data.auxiliary),
        "allergyhistory": self.data.allergy, 
        "assistant": "", 
        "assistantidentity": "",
        "clinicuniqueid": self.data.patdetails.clinicuniqueid, 
        "comment": "", 
        "customerid": self.data.patdetails.customerid, 
        "da": self.data.advice, 
        "datastatus": '1', 
        "dg": JSON.stringify(self.data.diagnose), 
        "diseasekey": "", 
        "doctorid": self.data.doctor1.doctorid, 
        "emrversion": "1", 
        "exam": JSON.stringify(self.data.inspect), 
        "examdate": self.data.time, 
        "examdoctor": self.data.doctor1.name, 
        "hpi": self.data.disease, 
        "imglist": JSON.stringify(self.data.img_arr), 
        "isfirstvisit": self.check_text == '初诊病历' ? 0 : 1, 
        "lastoperator": "", 
        "mediarecordidentity": "", 
        "nurse": self.data.doctor.name, 
        "nurseidentity": self.data.doctor.doctorid, 
        "pc": self.data.complain != '' ? self.data.complain : self.data.repetition, 
        "pi": self.data.past, 
        "plan": JSON.stringify(self.data.programme),
        "recordidentity": "", 
        "serverid": "0", 
        "studyidentity": "433348299364450304", 
        "tr": JSON.stringify(self.data.treat),
        "updatetime": "", 
        "undefined": "433348299364450304"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
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
  add(e){
    if (e.currentTarget.dataset.text == 'inspect') {
      let arr = this.data.inspect
      if (arr[arr.length - 1].lt != '' || arr[arr.length - 1].rt != '' || arr[arr.length - 1].lb != '' || arr[arr.length - 1].rb != '' || arr[arr.length - 1].text != ''){
        arr.push({ lt: '', rt: '', lb: '', rb: '', text: '' })
        this.setData({
          inspect: arr
        })
      }
    } else if (e.currentTarget.dataset.text == 'auxiliary') {
      let arr = this.data.auxiliary
      if (arr[arr.length - 1].lt != '' || arr[arr.length - 1].rt != '' || arr[arr.length - 1].lb != '' || arr[arr.length - 1].rb != '' || arr[arr.length - 1].text != '') {
        arr.push({ lt: '', rt: '', lb: '', rb: '', text: '' })
        this.setData({
          auxiliary: arr
        })
      }
    } else if (e.currentTarget.dataset.text == 'diagnose') {
      let arr = this.data.diagnose
      if (arr[arr.length - 1].lt != '' || arr[arr.length - 1].rt != '' || arr[arr.length - 1].lb != '' || arr[arr.length - 1].rb != '' || arr[arr.length - 1].text != '') {
        arr.push({ lt: '', rt: '', lb: '', rb: '', text: '' })
        this.setData({
          diagnose: arr
        })
      }
    } else if (e.currentTarget.dataset.text == 'programme') {
      let arr = this.data.programme
      if (arr[arr.length - 1].lt != '' || arr[arr.length - 1].rt != '' || arr[arr.length - 1].lb != '' || arr[arr.length - 1].rb != '' || arr[arr.length - 1].text != '') {
        arr.push({ lt: '', rt: '', lb: '', rb: '', text: '' })
        this.setData({
          programme: arr
        })
      }
    } else if (e.currentTarget.dataset.text == 'treat') {
      let arr = this.data.treat
      if (arr[arr.length - 1].lt != '' || arr[arr.length - 1].rt != '' || arr[arr.length - 1].lb != '' || arr[arr.length - 1].rb != '' || arr[arr.length - 1].text != '') {
        arr.push({ lt: '', rt: '', lb: '', rb: '', text: '' })
        this.setData({
          treat: arr
        })
      }
    }
  },
  del(e) {
    if (e.currentTarget.dataset.text == 'inspect') {
      let arr = this.data.inspect
      arr.splice(arr.length-1,1)
      this.setData({
        inspect:arr
      })
    } else if (e.currentTarget.dataset.text == 'auxiliary') {
      let arr = this.data.auxiliary
      arr.splice(arr.length - 1, 1)
      this.setData({
        auxiliary: arr
      })
    } else if (e.currentTarget.dataset.text == 'diagnose') {
      let arr = this.data.diagnose
      arr.splice(arr.length - 1, 1)
      this.setData({
        diagnose: arr
      })
    } else if (e.currentTarget.dataset.text == 'programme') {
      let arr = this.data.programme
      arr.splice(arr.length - 1, 1)
      this.setData({
        programme: arr
      })
    } else if (e.currentTarget.dataset.text == 'treat') {
      let arr = this.data.treat
      arr.splice(arr.length - 1, 1)
      this.setData({
        treat: arr
      })
    }
  },

  // { "ae": [{ "lb": "4B", "lt": "B", "rb": "1", "rt": "3", "text": "66" }, { "lt": "B", "lb": "2", "rt": "B", "rb": "3", "text": "19" }], 
  // "allergyhistory": "33", 
  // "assistant": "", 
  // "assistantidentity": "",
  // "clinicuniqueid": "", 
  // "comment": "", 
  // "customerid": "422770870503276544", 
  // "da": "1212", 
  // "datastatus": "1", 
  // "dg": [{ "lb": "4B", "lt": "B", "rb": "1", "rt": "3", "text": "77" }, { "lt": "", "lb": "5", "rt": "7", "rb": "C7", "text": "18" }], 
  // "diseasekey": "", 
  // "doctorid": "422774237507764224", 
  // "emrversion": "1", 
  // "exam": [{ "lb": "4B", "lt": "B", "rb": "1", "rt": "3", "text": "44" }, { "lt": "65", "lb": "3", "rt": "D", "rb": "", "text": "55" }], 
  // "examdate": "2020-01-04 14:59", 
  // "examdoctor": "李医生", 
  // "hpi": "22", 
  // "imglist": [{ "mediaimageidentity": "", "seriesuid": "47959263692763415", "sopuid": "47959264152592980", "studyuid": "47959248021102150", "psrc": "http://139.129.85.215/image/WADO.php?action=LoadImage", "url": "http://139.129.85.215/image/WADO.php?action=LoadImage&StudyUID=47959248021102150&SeriesUID=47959263692763415&SopUID=47959264152592980&t=1575631950&rows=100" }], 
  // "isfirstvisit": "0", 
  // "lastoperator": "", 
  // "mediarecordidentity": "", 
  // "nurse": "林晓琪", 
  // "nurseidentity": "422161121828306944", 
  // "pc": "11", 
  // "pi": "出美国的", 
  // "plan": [{ "lb": "4B", "lt": "B", "rb": "1", "rt": "3", "text": "88" }, { "lt": "1", "lb": "", "rt": "", "rb": "4", "text": "17" }],
  // "recordidentity": "", 
  // "serverid": "0", 
  // "studyidentity": "433348299364450304", 
  // "tr": [{ "lb": "4B", "lt": "B", "rb": "1", "rt": "3", "text": "99" }, { "lt": "3", "lb": "", "rt": "", "rb": "E", "text": "16" }],
  //  "updatetime": "", 
  //  "undefined": "433348299364450304" }

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    this.setData({
      title:options.title,
      patdetails: prevPage.data.patdetails
    })
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