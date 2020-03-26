// pages/M_programmeedit/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:'',
    state:''
  },
  ipt(e) {
    let arr = this.data.arr
    arr.fee = e.detail.value
    this.setData({
      arr: arr
    })
  },
  textipt(e) {
    let arr = this.data.arr
    arr.remark = e.detail.value
    this.setData({
      arr: arr
    })
  },
  addone(){
    let arr = this.data.arr
    arr.billnumber = Number(arr.billnumber) +1
    this.setData({
      arr: arr
    })
  },
  delone() {
    let arr = this.data.arr
    if (Number(arr.billnumber)>1){
      arr.billnumber = Number(arr.billnumber) - 1
      this.setData({
        arr: arr
      })
    }
  },
  Colleaguego() {
    wx.navigateTo({
      url: '../Colleague/index?title=医生&&state=2',
    })
  },
  programmego(){
    wx.navigateTo({
      url: '../PriceList/index?title=价目表&&state=1',
    })
  },
  btn(){
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '修改'
    })
    this.setData({
      arr: JSON.parse(options.item),
      state:options.state
    })
    console.log(this.data.arr)
    console.log(this.data.state)
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