// pages/Consultation/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '咨询',
    arr: [
    ],
    patdetails: '',
    power_arr: [],
    user: '',
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    wx.navigateTo({
      url: '../Consultationedit/index?title=新增咨询',
    })
  },
  playaudio(e) {
    if (!this.audioCtx) {
      this.audioCtx = wx.createAudioContext('audio' + e.currentTarget.dataset.id)
      this.audioCtx.play()
    } else {
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
  del(e){
    let self = this
    Dialog.confirm({
      title: '提示',
      message: '您确定删除这条咨询吗？'
    }).then(() => {
      // on confirm
      wx.request({
        url: getApp().data.APIS + '/patient/DelConsult',
        method: 'post',
        data: {
          "consultid": e.currentTarget.dataset.item.consultid
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
            self.getdata()
          } else {
            wx.showToast({
              title: '失败',
              duration: 2000
            })
          }
        }
      })
    }).catch(() => {
      // on cancel
    })
  },
  Consultationgo(e){
    wx.navigateTo({
      url: '../Consultationedit/index?title=修改咨询&&index=' + e.currentTarget.dataset.index,
    })
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/SelConsult',
      method: 'post',
      data: {
        consulttype: '全部',
        customerid: self.data.customerid,
        clinicid: self.data.clinicid
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:'咨询'
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
    // console.log(this.data.patdetails)
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