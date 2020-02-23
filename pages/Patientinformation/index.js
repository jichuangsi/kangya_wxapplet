// pages/Patientinformation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '填写诊前信息',
    informationlist:{
      IDCard:'',
      socialcard:'',
      Consultant:'',
      Insurance:'',
      Introducer:'',
      powergrid:'',
      impression:'',
      Habit:'',
      experience:'',
      allergy:'',
      past:'',
      ask:''
    }
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  editgo(e) {
    console.log(e.currentTarget.dataset.text)
    wx.navigateTo({
      url: '../Patientedit/index?title=' + e.currentTarget.dataset.text
    })
  },
  back(){
    this.onClickLeft()
  },
  btn(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorage({
      key: 'informationlist',
      data: this.data.informationlist,
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
    let self = this
    wx.getStorage({
      key: 'informationlist',
      success: function (res) {
        self.setData({
          informationlist: res.data
        })
      },
    })
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