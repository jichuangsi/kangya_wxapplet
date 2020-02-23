// pages/medicalTemplate/index.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '病历模板',
    activeKey: 0,
    checkid:'',
    arr:[
      {id:1,title:'粘膜病'},
      { id: 2, title: '牙周炎' }
    ],
    arr1: [
      { id: 101, title: '龈乳头炎' }
    ]
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onChange(event) {
    // wx.showToast({
    //   icon: 'none',
    //   title: `切换至第${event.detail}项`
    // });checkid
    this.setData({ checkid: '' })
  },
  checkclick(e){
    this.setData({ checkid: e.currentTarget.dataset.id})
  },
  checkgo(e) {
    wx.navigateTo({
      url: '../Templatedetails/index?title=' + e.currentTarget.dataset.text,
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