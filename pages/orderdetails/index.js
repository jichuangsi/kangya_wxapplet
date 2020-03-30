// pages/orderdetails/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '预约详情',
    item:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight(){
    let self = this
    Dialog.confirm({
      title: '提示',
      message: '您确定删除这条预约吗？'
    }).then(() => {
      wx.request({
        url: getApp().data.APIS + '/schedule/sccancelschedule',
        method: 'post',
        data: {
          "scheduleidentity": self.data.item.scheduleidentity,
          "name": self.data.item.name,
          "lostmemo": ""
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
            self.onClickLeft()
          } else {
            wx.showToast({
              title: '失败',
              duration: 2000
            })
          }
        }
      })
      // on confirm
      wx.navigateBack({
        delta: 1
      })
    }).catch(() => {
      // on cancel
    })
  },
  chatgo(){
    wx.navigateTo({
      url: '../chat/index?title=空白',
    })
  },
  editgo() {
    wx.navigateTo({
      url: '../orderedit/index?title=修改预约',
    })
  },
  iphoneclick(){
    let self = this
    wx.makePhoneCall({
      phoneNumber: self.data.item.phone //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '预约详情'
    })
    let item = JSON.parse(options.item)
    this.setData({
      item: item
    })
    console.log(item)
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