// pages/S_Detail/index.js
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'商城',
    star:false,
    active:'图文详情',
    show_num:0,
    show:false,
    check_title:'',
    yh_arr:[
      {
        state:0,
        price:20,
        m_price:299,
        time:'2020-02-26至2020-03-01',
        title: '拼团券',
        text: '限拼团可用'
      }
    ],
    gg_arr: [
      { state: 0, title: '1付加厚型10.8g,尺寸7' },
      { state: 0, title: '1付加厚型10.8g,尺寸7.5' }
    ],
    check_gg: '',
    check_num: 30,
    gg_min:30,
    price: 334.00,
    old_price:360.00,
    assemble_price:270.00,
    time: 30 * 60 * 60 * 1000,
    buystate:0
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  love(){
    this.setData({
      star:this.data.star?false:true
    })
  },
  sygo(){
    wx.navigateTo({
      url: '../S_index/index',
    })
  },
  gwgo() {
    wx.navigateTo({
      url: '../S_shopcart/index',
    })
  },
  gwclick() {
    this.setData({
      show: true,
      show_num: 1
    })
  },
  onChange(event) {
    this.setData({
      active: event.detail.name
    })
  },
  showpopup(e) {
    this.setData({
      show: true,
      show_num: e.currentTarget.dataset.index
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  ggclick(e) {
    this.setData({
      check_gg: e.currentTarget.dataset.text
    })
  }, 
  addone(){
    let num = this.data.check_num + 1
    this.setData({
      check_num: num
    })
  },
  delone() {
    if(this.data.gg_min<this.data.check_num){
      let num = this.data.check_num - 1
      this.setData({
        check_num: num
      })
    }
  },
  gg_btn() {
    Toast('加入购物车成功~');
    this.onClose()
  },
  buy_btn() {
    this.onClose()
  },
  ptclcik(){
    Dialog.alert({
      title: '拼团玩法',
      message: '全面拼团，所有用户都可以直接参团或开团;拼团成功，指开团在规定时间内达到规定成团人数；拼团失败，指开团后在规定的时间内未能找到相应人数的好友参团，该团失败，系统取消该团订单，退款原路退回；'
    }).then(() => {
      // on close
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      check_title:options.title,
      buystate: options.buystate
    })
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