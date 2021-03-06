// pages/Management/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '处置',
    arr: [
    ],
    customerid: '',
    clinicid: '',
    patdetails:'',
    power_arr:[],
    user:'',
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    wx.navigateTo({
      url: '../Managementedit/index?title=确认内容',
    })
  },
  Soundgo(e) {
    wx.navigateTo({
      url: '../Sound/index?state=1&&index=' + e.currentTarget.dataset.index,
    })
  },
  Agreeimggo(e) {
    wx.navigateTo({
      url: '../Agreeimg/index?state=1&&index=' + e.currentTarget.dataset.index,
    })
  },
  playaudio(e){
    if (!this.audioCtx) {
      this.audioCtx = wx.createAudioContext('audio' + e.currentTarget.dataset.id)
      this.audioCtx.play()
    }else{
      if (e.currentTarget.dataset.id == this.audioCtx.audioId.split('audio')[1]) {
        if (this.audiopause == 1) {
          this.audioCtx.play()
          this.audiopause = 2
        } else {
          this.audioCtx.pause()
          this.audiopause = 1
        }
      } else {
        this.audioCtx = wx.createAudioContext('audio' + e.currentTarget.dataset.id)
        this.audioCtx.play()
      }
    }
  },
  editgo(e) {
    //  && e.currentTarget.dataset.index.doctoridexam == this.data.userid
    if (this.data.power_arr.code10103.has || (this.data.power_arr.code10102.has)) {
      wx.navigateTo({
        url: '../Managementedit/index?title=修改处置&&index=' + JSON.stringify(e.currentTarget.dataset.index),
      })
    }else{
      wx.showToast({
        title: '暂无权限',
        icon: 'none',
        duration: 1000
      })
    }
  },
  Pricego(e) {
    //  && e.currentTarget.dataset.item.doctoridexam == this.data.userid
    if (this.data.power_arr.code10103.has || (this.data.power_arr.code10102.has)) {
      wx.navigateTo({
        url: '../Price/index?title=划价&&item=' + JSON.stringify(e.currentTarget.dataset.item),
      })
    } else {
      wx.showToast({
        title: '暂无权限',
        icon: 'none',
        duration: 1000
      })
    }
  },
  deladdon(e){
    let self = this
    Dialog.confirm({
      title: '提示',
      message: '您确定删除这录音吗？'
    }).then(() => {
      wx.request({
        url: getApp().data.APIS + '/svc/a',
        method: 'post',
        data: {
          plugin: 'deladdon',
          id: e.currentTarget.dataset.id,
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
              duration: 1000
            })
            self.getdata()
          }
        }
      })
      // on confirm
    }).catch(() => {
      // on cancel
    })
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/getpatienthandlelist',
      method: 'post',
      data: {
        CustomerID: self.data.customerid,
        clinicid: self.data.customerid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        for (let i = 0; i < res.data.list.studylist.length; i++) {
          res.data.list.studylist[i].allfee = 0
          if (res.data.list.studylist[i].handlelist){
            for (let j = 0; j < res.data.list.studylist[i].handlelist.length; j++) {
              res.data.list.studylist[i].allfee += Number(res.data.list.studylist[i].handlelist[j].billnumber) * res.data.list.studylist[i].handlelist[j].fee.indexOf(',') != '-1' ? Number(res.data.list.studylist[i].handlelist[j].fee.split(',')[0] + res.data.list.studylist[i].handlelist[j].fee.split(',')[1]) : Number(res.data.list.studylist[i].handlelist[j].fee)
            }
          }
        }
        if (res.data.info == 'ok') {
          self.setData({
            arr : res.data.list.studylist
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
      title:'处置'
    })
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];
    this.setData({
      customerid: Page.data.customerid,
      clinicid: Page.data.clinicid,
      patdetails: Page.data.patdetails,
      power_arr: Page.data.power_arr,
      user: Page.data.user,
    })
    console.log(this.data.user)
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
    if (this.audioCtx){
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