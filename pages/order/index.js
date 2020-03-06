// pages/order/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '预约列表',
    active: '网络预约',
    show: false,
    order_arr:[],
    num:0,
    state1: '处理状态',
    state2: '状态',
    state3: '医生',
    showbottom:false,
    calendarConfig: {
      // 配置内置主题
      theme: 'elegant',
      chooseAreaMode: false,
    },
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
  onClose() {
    this.setData({ show: false });
  },
  onClickRight() {
    if(this.data.title == '预约列表'){
      this.setData({ show: true });
    }else{
      wx.navigateTo({
        url: '../orderedit/index?title=添加预约',
      })
    }
  },
  afterTapDay(e) {
    console.log('afterTapDay', e.detail); // => { currentSelect: {}, allSelectedDays: [] }
    this.onClose()
  },
  del(){
    Dialog.confirm({
      title: '提示',
      message: '您确定删除这条预约吗？'
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    })
  },
  detailsgo(e) {
    let item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../orderdetails/index?item=' + item,
    })
  },
  numshow(e){
    this.setData({ num: e.currentTarget.dataset.index,showbottom:true})
  },
  onClosebottom() {
    this.setData({ showbottom: false })
  },
  numclick(e) {
    this.setData({ state1: e.currentTarget.dataset.text, showbottom: false })
  },
  numclick1(e) {
    this.setData({ state2: e.currentTarget.dataset.text, showbottom: false })
  },
  numclick2(e) {
    this.setData({ state3: e.currentTarget.dataset.text, showbottom: false })
  },
  addgo(){
    wx.navigateTo({
      url: '../orderedit/index?title=添加预约',
    })
  },
  searchgo() {
    wx.navigateTo({
      url: '../friendsearch/index?state=3',
    })
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.API+'/order.json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result == 200) {
          self.setData({
            order_arr: res.data.order_arr,
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({ title:options.title})
    wx.setNavigationBarTitle({
      title: options.title
    })
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