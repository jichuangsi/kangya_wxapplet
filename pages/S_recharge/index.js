// pages/S_recharge/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'商城',
    state:0,
    money:0.00,
    money_state:true,
    active:'全部'
  },
  onClickLeft() {
    if (this.data.state==0){
      wx.navigateBack({
        delta: 1
      })
    }else{
      this.setData({
        state: 0
      })
    }
  },
  moneyclick(){
    this.setData({
      money_state:this.data.money_state?false:true
    })
  },
  btn1() {
    this.setData({
      state: 1
    })
  },
  btn2() {
    this.setData({
      state: 2
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