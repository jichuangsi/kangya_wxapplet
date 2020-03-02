// pages/S_card/index.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '商城',
    state:0,
    active:'未使用',
    yh_arr: [
      {
        state: 0,
        price: 20,
        m_price: 299,
        time: '2020-02-26至2020-03-01',
        title: '拼团券',
        text: '限拼团可用'
      }
    ],
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  
  btnclick(e) {
    let index = e.currentTarget.dataset.index
    let arr = this.data.yh_arr
    if (arr[index].state == 0) {
      arr[index].state = 1
      this.setData({
        yh_arr: arr
      })
    } else {
      if (this.data.nav_num == 1) {
        wx.navigateTo({
          url: '../S_Productlist/index?title==拼团专区',
        })
      } else {
        wx.navigateTo({
          url: '../S_Productlist/index',
        })
      }
    }
  },
  stateclick(e) {
    this.setData({
      state: e.currentTarget.dataset.index
    })
    console.log(this.data.state)
  },
  onChange(event) {
    this.setData({
      active: event.detail.name
    })
  },
  
  S_coupongo() {
    wx.navigateTo({
      url: '../S_coupon/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商城'
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