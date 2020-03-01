// pages/Schedulingset/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '班次设置',
    show:false
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    if (this.data.title == '班次设置') {
      console.log(this.data.title)
      this.setData({
        title: '添加班次'
      })
      return
    }
    if(this.data.title=='编辑班次'){
      Dialog.confirm({
        message: '确定删除该班次'
      }).then(() => {
        // on confirm
      }).catch(() => {
        // on cancel
      });
    }
    if (this.data.title == '添加班次') {
      this.setData({
        title: '班次设置'
      })
    }
  },
  edit() {
    this.setData({
      title: '编辑班次'
    })
  },
  showpopup(){
    this.setData({
      show:true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  Patienteditgo(e) {
    wx.navigateTo({
      url: '../Patientedit/index?title=' + e.currentTarget.dataset.text,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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