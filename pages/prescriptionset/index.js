// pages/prescriptionset/index.js// pages/prescription/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '编辑处方模板',
    arr: [
      { title: '甲硝锉片', text: '口服一日三次', num: 0, price: 1.00, id: 101 }, { title: '维生素C片', text: '口服一日三次', num: 0, price: 3.00, id: 102 }, { title: '芬必得', text: '必要时口服', num: 0, price: 2.00, id: 103 },
    ],
    check_arr: []
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },

  onClickRight() {
    wx.navigateBack({
      delta: 1
    })
  },
  editgo(e){
    wx.navigateTo({
      url: '../prescriptionedit/index?value=' + e.currentTarget.dataset.text,
    })
  },
  ipt(e) {
    console.log(e)
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    let arr2 = this.data.arr
    arr2[index].price = e.detail.value
    this.setData({
      arr: arr2
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '编辑处方模板'
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