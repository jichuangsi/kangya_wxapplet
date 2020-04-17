// pages/Patientdetails/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'患者详情',
    show: false,
    borderstate:false,
    customerid: '',
    clinicid: '',
    patdetails:'',
    friend:'',
    power_arr:[],
    user:'',
    check_num:1,
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight(){
    this.setData({
      show:true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  iphoneclick(){
    wx.makePhoneCall({
      phoneNumber: this.data.patdetails.phone //仅为示例，并非真实的电话号码
    })
  },
  delwx() {
    Dialog.confirm({
      title: '解除微信',
      message: '确定解除关联微信吗？'
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    });
  },
  delPatient(){
    Dialog.confirm({
      title: '删除患者',
      message: '确定删除？'
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    });
  },
  addyuyue(){
    wx.navigateTo({
      url: '../orderedit/index?title=添加预约',
    })
  },
  chatgo() {
    wx.navigateTo({
      url: '../chat/index',
    })
  },
  Patienteditgo() {
    wx.navigateTo({
      url: '../Patientedit/index?title=编辑分组',
    })
  },
  editgo(e) {
    let btn = e.currentTarget.dataset.btn ? '&&btnstate=1' : ''
    let iptstate = e.currentTarget.dataset.iptstate ? '&&iptstate=1' : ''
    let textstate = e.currentTarget.dataset.textstate ? '&&textstate=1' : ''
    let value = e.currentTarget.dataset.value ? '&&value=' + e.currentTarget.dataset.value : ''
    wx.navigateTo({
      url: '../Patientedit/index?title=' + e.currentTarget.dataset.text + iptstate + btn + textstate + value
    })
  },
  getdata(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/qupatientbyid',
      method: 'post',
      data: {
        customerid: self.data.customerid,
        clinicid: self.data.clinicid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            friend: res.data.list.friend,
            patdetails: res.data.list.patdetails[0]
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '患者详情',
    })
    var pages = getCurrentPages();
    var Page = pages[pages.length - 2];//
    this.setData({
      customerid:options.customerid,
      clinicid:options.clinicid,
      power_arr: Page.data.power_arr,
      user: Page.data.user
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
    console.log(1123)
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