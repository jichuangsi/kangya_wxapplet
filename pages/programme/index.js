// pages/programme/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '设置方案',
    active:'处置选择',
    price:0,
    num:0,
    show:false,
    arr:[
      {title:'修复费',text:'固定义齿修复',num:0,price:10.00,id:101}
    ],
    check_arr:[]
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onChange(event) {
    this.setData({
      active: event.detail.name
    })
  },
  showpopup() {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  addone(e){
    let index = e.currentTarget.dataset.index
    let arr1 = []
    let arr2 = this.data.arr
    arr2[index].num = arr2[index].num + 1
    arr1.push(arr2[index])
    this.setData({
      check_arr:arr1,
      arr: arr2
    })
    this.allprice()
  },
  delone(e) {
    let index = e.currentTarget.dataset.index
    let arr1 = []
    let arr2 = this.data.arr
    arr2[index].num = arr2[index].num - 1
    arr1.push(arr2[index])
    this.setData({
      check_arr: arr1,
      arr: arr2
    })
    this.allprice()
  },
  allprice(){
    let arr1 = this.data.check_arr
    let priceall = 0
    let numall = 0
    for(let i=0;i<arr1.length;i++){
      if (arr1[i].num == 0){
        arr1.splice(i,1)
      }else{
        priceall += arr1[i].num * arr1[i].price
        numall += arr1[i].num 
      }
    }
    console.log(numall)
    this.setData({
      check_arr: arr1,
      price: priceall,
      num: numall
    })
  },
  delcheckone(e){
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.item.id
    let arr1 = this.data.check_arr
    arr1.splice(index, 1)
    let arr2 = this.data.arr
    for (let i = 0; i < arr2.length; i++) {
      if (arr2[i].id == id) {
        arr2[i].num = 0
      }
    }
    this.setData({
      check_arr: arr1,
      arr: arr2
    })
    this.allprice()
  },
  delall() {
    let self = this
    let arr1 = []
    let arr2 = self.data.arr
    Dialog.confirm({
      title: '提示',
      message: '您确定清除所有方案吗？'
    }).then(() => {
      // on confirm
      for (let i = 0; i < arr2.length; i++) {
        arr2[i].num = 0
      }
      self.setData({
        check_arr: arr1,
        arr: arr2
      })
      self.allprice()
      self.onClose()
    }).catch(() => {
      // on cancel
    })
  },
  next(){
    wx.navigateTo({
      url: '../Tooth/index?state=1'
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