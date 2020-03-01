// pages/W_order/index.js
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '康牙医生',
    name:'',
    iphone:'',
    bz:'',
    show:false,
    check_num:0,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    columns: ['8:00~10:00', '10:00~12:00', '14:00~16:00', '16:00~18:00'],
    columns_timeslot: ['8:00~10:00', '10:00~12:00', '14:00~16:00', '16:00~18:00'],
    columns_project: ['牙齿种植', '牙齿矫正', '根管治疗', '牙齿美容'],
    columns_doctor: ['默认医生'],
    check_time: '',
    check_timeslot: '',
    check_project: '',
    check_doctor: ''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  btn() {
    Toast('预约成功~');
    setTimeout(function(){
      wx.navigateBack({
        delta: 1,
      })
    },1000)
  },
  nameipt(e){
    console.log(e.detail.value)
    this.setData({ name: e.detail.value })
  },
  phoneipt(e) {
    console.log(e.detail.value)
    this.setData({ iphone: e.detail.value })
  },
  bzipt(e) {
    console.log(e.detail.value)
    this.setData({ bz: e.detail.value })
  },
  showpoup(e){
    this.setData({ check_num: e.currentTarget.dataset.index, show: true })
    if (this.data.check_num == 1) {
      this.setData({
        columns: this.data.columns_timeslot
      });
    } else if (this.data.check_num == 2) {
      this.setData({
        columns: this.data.columns_project
      });
    } else if (this.data.check_num == 3) {
      this.setData({
        columns: this.data.columns_doctor
      });
    }
  },
  onClose() {
    this.setData({ show: false })
  },
  onConfirm(event) {
    this.setData({
      currentDate: event.detail,
      show: false,
      check_time: this.timestampToTime(event.detail)
    });
  },
  onConfirm1(event) {
    if(this.data.check_num==1){
      this.setData({
        check_timeslot: event.detail.value,
        show: false
      });
    } else if (this.data.check_num == 2){
      this.setData({
        check_project: event.detail.value,
        show: false
      });
    } else if (this.data.check_num == 3) {
      this.setData({
        check_doctor: event.detail.value,
        show: false
      });
    }
  },
  onCancel() {
    this.setData({ show: false });
  },
  timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ title: options.title })
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