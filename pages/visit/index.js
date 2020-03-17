// pages/visit/index.js/
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '回访',
    visit_arr:[],
    show: false,
    num: 0,
    state:0,
    state2: '状态',
    state3: '医生',
    time:'',
    showbottom: false,
    calendarConfig: {
      // 配置内置主题
      theme: 'elegant',
      chooseAreaMode: false,
    },
    customerid: '',
    clinicid: '',
    patdetails: ''
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
    if (this.data.state == 0) {
      this.setData({ show: true });
    } else {
      wx.navigateTo({
        url: '../visitedit/index?title=添加回访',
      })
    }
  },
  afterTapDay(e) {
    console.log('afterTapDay', e.detail); // => { currentSelect: {}, allSelectedDays: [] }
    this.setData({
      time: year + '-' + month < 10 ? '0' + month : month + '-' + day < 10 ? '0' + day : day
    })
    this.onClose()
  },
  del() {
    Dialog.confirm({
      title: '提示',
      message: '您确定删除这条回访吗？'
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    })
  },
  detailsgo(e) {
    let item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../visitdetails/index?item=' + item,
    })
  },
  numshow(e) {
    this.setData({ num: e.currentTarget.dataset.index, showbottom: true })
  },
  onClosebottom() {
    this.setData({ showbottom: false })
  },
  numclick1(e) {
    this.setData({ state2: e.currentTarget.dataset.text, showbottom: false })
  },
  numclick2(e) {
    this.setData({ state3: e.currentTarget.dataset.text, showbottom: false })
    console.log(this.data.state3)
  },
  addgo() {
    wx.navigateTo({
      url: '../visitedit/index?title=添加回访',
    })
  },
  searchgo() {
    wx.navigateTo({
      url: '../friendsearch/index?state=3',
    })
  },
  getdata(){
    let self = this
    if(self.data.state == 0){
      wx.request({
        url: getApp().data.APIS + '/returnvisit/visitlist',
        method: 'post',
        data: {
          begindate: self.data.time,
          enddate: self.data.time,
          visitperson: "",
          impressioninfo: "",
          totalcount: "-1",
          studyitem: "",
          consultname: "",
          pageno: "1",
          doctorid: "",
          visitdata: "",
          visitpersonname: "全部",
          pagesize: "10",
          clinicid: "",
          patient: ""
        },
        success: function (res) {
          console.log(res)
          if (res.data.info == 'ok') {
            self.setData({
              visit_arr: res.data.list
            })
          }
        },
      })
    } else {
      wx.request({
        url: getApp().data.APIS + '/patient/patvisit',
        method: 'post',
        data: {
          customerid: self.data.customerid,
          clinicid: self.data.clinicid
        },
        success: function (res) {
          console.log(res)
          if (res.data.info == 'ok') {
            self.setData({
              visit_arr: res.data.list
            })
          }
        },
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ state: options.state ? options.state:0 })
    wx.setNavigationBarTitle({
      title: '回访'
    })
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];
    this.setData({
      customerid: Page.data.customerid ? Page.data.customerid:'',
      clinicid: Page.data.clinicid ? Page.data.clinicid : '',
      patdetails: Page.data.patdetails ? Page.data.patdetails : ''
    })
    console.log(this.data.patdetails)
    this.getdata()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(this.data.visit_arr)
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