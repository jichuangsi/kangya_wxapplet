// pages/medicaledit/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';
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
    studyidentity:'',
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
    addon:[]
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
      url: '../Sound/index?state=3',
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
  deladdon(e) {
    let self = this
    Dialog.confirm({
      title: '提示',
      message: '您确定删除这录音吗？'
    }).then(() => {
      let arr = self.data.addon
      arr.splice(e.currentTarget.dataset.index, 1)
      self.setData({
        addon: arr
      })
      // on confirm
    }).catch(() => {
      // on cancel
    })
  },
  playaudio(e) {
    if (!this.audioCtx) {
      this.audioCtx = wx.createAudioContext('audio' + e.currentTarget.dataset.index)
      this.audioCtx.play()
    } else {
      if (e.currentTarget.dataset.index == this.audioCtx.audioId.split('audio')[1]) {
        this.audioCtx.pause()
      } else {
        this.audioCtx = wx.createAudioContext('audio' + e.currentTarget.dataset.index)
        this.audioCtx.play()
      }
    }
  },
  btn(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/insmedicarecord',
      method: 'post',
      data: {
        "addon": JSON.stringify(self.data.addon),
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
        "studyidentity": self.data.studyidentity, 
        "tr": JSON.stringify(self.data.treat),
        "updatetime": "", 
        "undefined": self.data.studyidentity
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
    if (options.title == '病历详情'){
      console.log(options.index)
      console.log(prevPage.data.arr[options.index])
      this.setData({
        addon: prevPage.data.arr[options.index].addon ? prevPage.data.arr[options.index].addon:[],
        auxiliary: prevPage.data.arr[options.index].ae ? prevPage.data.arr[options.index].ae:this.data.allergy,
        allergy: prevPage.data.arr[options.index].allergyhistory ? prevPage.data.arr[options.index].allergyhistory : this.data.allergy,
        advice: prevPage.data.arr[options.index].da ? prevPage.data.arr[options.index].da : this.data.advice,
        diagnose: prevPage.data.arr[options.index].dg ? prevPage.data.arr[options.index].dg : this.data.diagnose,
        doctor1:{
          doctorid: prevPage.data.arr[options.index].doctorid ? prevPage.data.arr[options.index].doctorid : this.data.doctor1.doctorid,
          name: prevPage.data.arr[options.index].examdoctor ? prevPage.data.arr[options.index].examdoctor : this.data.doctor1.name,
        },
        time: prevPage.data.arr[options.index].examdate ? prevPage.data.arr[options.index].examdate : this.data.time,
        inspect: prevPage.data.arr[options.index].exam ? prevPage.data.arr[options.index].exam : this.data.inspect,
        disease: prevPage.data.arr[options.index].hpi ? prevPage.data.arr[options.index].hpi : this.data.disease,
        img_arr: prevPage.data.arr[options.index].imglist ? prevPage.data.arr[options.index].imglist : this.data.img_arr, 
        check_text: prevPage.data.arr[options.index].isfirstvisit == '0' ? '初诊病历' : '复诊病历',
        doctor: {
          doctorid: prevPage.data.arr[options.index].nurseidentity ? prevPage.data.arr[options.index].nurseidentity : this.data.doctor.doctorid,
          name: prevPage.data.arr[options.index].nurse ? prevPage.data.arr[options.index].nurse : this.data.doctor.name,
        },
        complain: prevPage.data.arr[options.index].pc ? prevPage.data.arr[options.index].pc : this.data.complain,
        repetition: prevPage.data.arr[options.index].pc ? prevPage.data.arr[options.index].pc : this.data.repetition,
        past: prevPage.data.arr[options.index].pi ? prevPage.data.arr[options.index].pi : this.data.past,
        programme: prevPage.data.arr[options.index].plan ? prevPage.data.arr[options.index].plan : this.data.programme,
        studyidentity: prevPage.data.arr[options.index].studyidentity ? prevPage.data.arr[options.index].studyidentity : this.data.studyidentity,
        treat: prevPage.data.arr[options.index].tr ? prevPage.data.arr[options.index].tr : this.data.treat,
      })
    }
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