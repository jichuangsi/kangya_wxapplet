// pages/Managementedit/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '处置',
    arr: '',
    isfirstvisit:0,
    time: '',
    patdetails:'',
    price: '0',
    audio_arr:[],
    img_arr:[],
    index:0
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    wx.navigateTo({
      url: '../programme/index?state=0',
    })
  },
  Soundgo() {
    let index = this.data.title =='修改处置'?2:3
    wx.navigateTo({
      url: '../Sound/index?state=' + index,
    })
  },
  Agreeimggo() {
    let index = this.data.title == '修改处置' ? 2 : 3
    wx.navigateTo({
      url: '../Agreeimg/index?state=' + index,
    })
  },
  prescriptiongo(){
    wx.navigateTo({
      url: '../prescription/index',
    })
  },
  deladdon(e) {
    let self = this
    Dialog.confirm({
      title: '提示',
      message: '您确定删除这录音吗？'
    }).then(() => {
      let arr = self.data.audio_arr
      arr.splice(e.currentTarget.dataset.index,1)
      self.setData({
        audio_arr: arr
      })
      if (e.currentTarget.dataset.item.id) {
        wx.request({
          url: getApp().data.APIS + '/svc/a',
          method: 'post',
          data: {
            plugin: 'deladdon',
            id: e.currentTarget.dataset.item.id,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded', //修改此处即可
            'token':wx.getStorageSync('token')
          },
          success: function (res) {
            console.log(res)
            if (res.data.info == 'ok') {
              let pages = getCurrentPages();
              let Page = pages[pages.length - 2];//
              Page.getdata()
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
    console.log(e)
    console.log(e.currentTarget.dataset.index)
    if (!this.audioCtx) {
      this.audioCtx = wx.createAudioContext('audio' + e.currentTarget.dataset.index)
      this.audioCtx.play()
    } else {
      if (e.currentTarget.dataset.index == this.audioCtx.audioId.split('audio')[1]) {
        if (this.audiopause == 1) {
          this.audioCtx.play()
          this.audiopause = 2
        } else {
          this.audioCtx.pause()
          this.audiopause = 1
        }
      } else {
        this.audioCtx = wx.createAudioContext('audio' + e.currentTarget.dataset.index)
        this.audioCtx.play()
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];//
    let myDate = new Date();
    let arr1 = []
    let arr2 = []
    if (options.title == '修改处置'){
      for (let i = 0; i < Page.data.arr[options.index].addon.length; i++) {
        if (Page.data.arr[options.index].addon[i].type == 'image') {
          arr1.push(Page.data.arr[options.index].addon[i])
        } else {
          arr2.push(Page.data.arr[options.index].addon[i])
        }
      }
    }
    this.setData({
      title:options.title,
      index: options.index,
      arr: options.title == '修改处置' ? Page.data.arr[options.index] : {handlelist:[]},
      audio_arr: options.title == '修改处置' ? arr2 : [],
      img_arr: options.title == '修改处置' ? arr1 : [],
      patdetails: Page.data.patdetails,
      isfirstvisit: Page.data.arr.length>0?1:0,
      time: myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate() + ' ' + myDate.getHours() + ':' + myDate.getMinutes(),
      price: options.title == '修改处置' ? Page.data.arr[options.index].allfee: '0'
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
    console.log(Page.data.arr[options.index])
    console.log(this.data.audio_arr)
    console.log(this.data.img_arr)
  },
  btn() {
    let self = this
    let addon = self.data.audio_arr
    addon.push(...self.data.img_arr)
    wx.request({
      url: getApp().data.APIS + '/patient/SaveHandleList',
      method: 'post',
      data: {
        addon: JSON.stringify(addon),
        study: JSON.stringify(self.data.arr.handlelist),
        studyidentity: self.data.arr.studyidentity,
        customerid: self.data.patdetails.customerid,
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
          let pages = getCurrentPages();
          let Page = pages[pages.length - 2];//
          setTimeout(function(){
            self.onClickLeft()
            Page.getdata()
          },1000)
        } else {
          wx.showToast({
            title: '失败',
            duration: 2000
          })
        }
      }
    })
  },
  delone(e) {
    let self = this
    let arr = self.data.arr
    let index = e.currentTarget.dataset.index
    let price = 0
    Dialog.confirm({
      title: '提示',
      message: '您确定删除该方案吗？'
    }).then(() => {
      arr.handlelist.splice(index,1)
      for (let j = 0; j < arr.handlelist.length; j++) {
        price += Number(arr.handlelist[j].billnumber) * arr.handlelist[j].fee.indexOf(',') != -1 ? Number(arr.handlelist[j].fee.split(',')[0] + arr.handlelist[j].fee.split(',')[1]) : Number(arr.handlelist[j].fee)
      }
      self.setData({
        arr: arr,
        price:price
      })
    }).catch(() => {
      // on cancel
    })
  },
  del() {
    Dialog.confirm({
      title: '提示',
      message: '您确定删除该处置吗？'
    }).then(() => {
      // on confirm
      // wx.navigateBack({
      //   delta: 1,
      // })
    }).catch(() => {
      // on cancel
    })
  },
  Toothgo(e) {
    wx.navigateTo({
      url: '../Tooth/index?index=' + e.currentTarget.dataset.index + '&&text=' + e.currentTarget.dataset.text,
    })
  },
  Colleaguego(e) {
    let another = '&&another=' + e.currentTarget.dataset.another
    let index = '&&index=' + e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../Colleague/index?title=医生&&state=4' + another+index,
    })
  },
  editgo(e) {
    wx.navigateTo({
      url: '../M_programmeedit/index?item=' + JSON.stringify(e.currentTarget.dataset.item) + '&&state=' + e.currentTarget.dataset.state +'&&index=' + e.currentTarget.dataset.index,
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