// pages/Consultationedit/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '修改咨询',
    show: false,
    time: '',
    complaints: '',
    basicdemand: '',
    potentialdemand: '',
    programme: '',
    record: '',
    proposal: '',
    communicatetype: '',
    doctor_name: '',
    consultid:'',
    calendarConfig: {
      // 配置内置主题
      theme: 'elegant',
      chooseAreaMode: false,
    },
    doctor:'',
    doctor1:'',
    patienta: '',
    power_arr: [],
    user: '',
    addon:[],
    index:0
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/SaveConsult',
      method: 'post',
      data: {
        "addon": JSON.stringify(self.data.addon),
        "customerid": self.data.patienta.customerid, 
        "consultid": self.data.consultid, 
        "faceconsultdatetime": self.data.time, 
        "consultdoctname": self.data.doctor1.name, 
        "consultdoctid": self.data.doctor1.doctorid, 
        "consulttype": self.data.communicatetype, 
        "consultmemo": self.data.complaints, 
        "consultresult": self.data.programme, 
        "consulthandle": self.data.basicdemand, 
        "consultmark": self.data.record, 
        "consultpotential": self.data.potentialdemand, 
        "consultadvice": self.data.proposal, 
        "recordername": self.data.doctor.name, 
        "recorderid": self.data.doctor.doctorid, 
        "transtatus": "1"
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
      }
    })
  },
  Patientgo() {
    if (this.data.title == '添加回访') {
      wx.navigateTo({
        url: '../Patientlist/index?state=1',
      })
    }
  },
  Soundgo() {
    let index = this.data.title == '修改处置' ? 4 : 3
    wx.navigateTo({
      url: '../Sound/index?state='+index,
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
  Colleaguego(e) {
    let another = e.currentTarget.dataset.another ?'&&another=1':''
    wx.navigateTo({
      url: '../Colleague/index?title=医生&&state=2' + another,
    })
  },
  editgo(e) {
    wx.navigateTo({
      url: '../edit/index?title=' + e.currentTarget.dataset.text + '&&value=' + e.currentTarget.dataset.value,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];
    this.setData({
      title: options.title,
      patienta: Page.data.patdetails
    })
    console.log(this.data.patienta)
    wx.setNavigationBarTitle({
      title: options.title
    })
    if (options.title == '修改咨询') {
      let item = Page.data.arr[options.index]
      console.log(item)
      this.setData({
        index: options.index,
        consultid: item.consultid,
        time: item.faceconsultdatetime,
        complaints: '',
        basicdemand: '',
        potentialdemand: '',
        programme: '',
        record: item.faceconsultmark,
        proposal: '',
        communicatetype: item.faceconsulttype,
        doctor_name: item.facerecordername,
        doctor:{
          name: item.facerecordername,
        },
        power_arr: Page.data.power_arr,
        user: Page.data.user,
        addon: item.addon ? item.addon:[],
      })
    }
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
      if (e.currentTarget.dataset.item.id){
        wx.request({
          url: getApp().data.APIS + '/svc/a',
          method: 'post',
          data: {
            plugin: 'deladdon',
            id: e.currentTarget.dataset.item.id,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' //修改此处即可
          },
          success: function (res) {
            console.log(res)
            if (res.data.info == 'ok') {
            }
          }
        })
      }
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
  del() {
    let self = this
    Dialog.confirm({
      title: '提示',
      message: '您确定删除这条咨询吗？'
    }).then(() => {
      wx.request({
        url: getApp().data.APIS + '/patient/DelConsult',
        method: 'post',
        data: {
          "consultid": self.data.consultid
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
            setTimeout(function(){
              self.onClickLeft()
            },1000)
          } else {
            wx.showToast({
              title: '失败',
              duration: 2000
            })
          }
        }
      })
      // on confirm
    }).catch(() => {
      // on cancel
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
    if (this.audioCtx) {
      this.audioCtx.pause()
    }
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