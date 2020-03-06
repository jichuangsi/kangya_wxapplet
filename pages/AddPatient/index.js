// pages/AddPatient/index.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '添加患者',
    show: false,
    show_num:0,
    star_num: 0,
    sex_num: 0,
    checked: false,
    currentDate: new Date().getTime(),
    minDate: 320049973000,
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    check_time:'',
    columns: ['网络咨询', '朋友介绍', '家住附近', '诊所网站'],
    check_columns:'',
    areaList: [],
    check_area:'',
    Patientlist:{
      name:'',
      doctor:'',
      age:'',
      check_project: '',
      check_Occupation:'',
      check_Education:'',
      check_ascription1:'',
      check_ascription2:'',
      hobby:'',
      Economic:'',
      qq:'',
      mailbox:'',
      iphone1:'',
      iphone2:'',
      address: '',
      remarks: ''
    }
  },
  onClickLeft() {
    wx.clearStorage('Patientlist')
    wx.clearStorage('informationlist')
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
  },
  onConfirm(event) {
    this.setData({
      currentDate: event.detail,
      show: false,
      check_time: this.timestampToTime(event.detail)
    });
  },
  onConfirm1(event){
    this.setData({
      check_columns: event.detail.value,
      show: false
    });
  },
  onCancel(){
    this.setData({ show: false });
  },
  onChange(e) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: e.detail });
  },
  show(e){
    this.setData({ show: true, show_num: e.currentTarget.dataset.index });
  },
  onClose(){
    this.setData({ show: false });
  },
  star(e) {
    this.setData({ show: false, star_num: e.currentTarget.dataset.index });
  },
  sex(e) {
    this.setData({ show: false, sex_num: e.currentTarget.dataset.index });
  },
  editgo(e) {
    console.log(e.currentTarget.dataset.text)
    wx.navigateTo({
      url: '../Patientedit/index?title=' + e.currentTarget.dataset.text
    })
  },
  Colleaguego(e) {
    wx.navigateTo({
      url: '../Colleague/index?state=1&&title=' + e.currentTarget.dataset.text
    })
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
  areaclick(e) {
    this.setData({ show: false, check_area: e.detail.values[0].name + e.detail.values[1].name+e.detail.values[2].name});
  },
  btn(){
    this.onClickLeft()
  },
  messagego() {
    wx.navigateTo({
      url: '../Patientinformation/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      areaList: require("../../data/area.js").default
    })
    wx.setStorage({
      key: 'Patientlist',
      data: this.data.Patientlist,
    })
    wx.setNavigationBarTitle({
      title:'添加患者'
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
      key: 'Patientlist',
      success: function(res) {
        self.setData({
          Patientlist: res.data
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