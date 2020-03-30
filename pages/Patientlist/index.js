// pages/Patientlist/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'患者',
    show:false,
    state:0,
    check_list:0,
    nav1: '就诊时间',
    nav2: '患者类型',
    nav3: '会员等级',
    nav4: '其他条件',
    nav_num: 1,
    nav1_arr: ['全部', '当天就诊', '本周就诊', '本月就诊'],
    nav2_arr: ['全部', '拔牙', '补牙', '义诊', '活动假牙', '洁牙', '正畸', '种植', '检查'],
    nav3_arr: ['全部', '金卡会员', '银卡会员', '铜卡会员'],
    nav4_arr: ['全部', '微信用户', '有病史用户', '有影像用户', '欠款用户', '预付用户'],
    grouping_arr:[],
    patient_arr:[],
    li_num:1,
    pageIndex:1,
    pagetotal:0
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  searchgo(){
    wx.navigateTo({
      url: '../friendsearch/index?state=2',
    })
  },
  showPopup(e) {
    this.setData({ show: true, nav_num: e.currentTarget.dataset.index });
  },
  li_box_click(e){
    console.log(e.currentTarget.dataset.index)
    this.setData({ li_num: this.data.li_num == e.currentTarget.dataset.index ? 0 : e.currentTarget.dataset.index });
    this.getpatientlist(e.currentTarget.dataset.id)
  },
  onClose() {
    this.setData({ show: false });
  },
  nav1click(e){
    this.setData({
      nav1: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '就诊时间'
    })
  },
  nav2click(e) {
    this.setData({
      nav2: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '患者类型'
    })
  },
  nav3click(e) {
    this.setData({
      nav3: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '会员等级'
    })
  },
  nav4click(e) {
    this.setData({
      nav4: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '其他条件'
    })
  },
  Patientclick(e){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  
    if(this.data.state == 0){
      wx.navigateTo({
        url: '../Patientdetails/index?customerid=' + e.currentTarget.dataset.customerid + '&&clinicid=' + e.currentTarget.dataset.clinicid,
      })
    }else{
      prevPage.setData({
        patient: e.currentTarget.dataset.item
      })
      console.log(prevPage.data.patient)
      this.onClickLeft()
    }
  },
  addgo(){
    wx.navigateTo({
      url: '../AddPatient/index',
    })
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/patientbasegroup',
      method: 'post',
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if(res.data.info =='ok'){
          self.setData({
            grouping_arr:res.data.list
          })
          self.getpatientlist(res.data.list[0].dictionaryidentity)
        }
      }
    })
  },
  getpatientlist(id) {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/qupatient',
      method: 'post',
      data: {
        pageno: self.data.pageIndex,
        pagesize: '20',
        patgroupid: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if(res.data.info =='ok'){
          self.setData({
            patient_arr:res.data.list
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ state: options.state ? options.state : 0 })
    wx.setNavigationBarTitle({
      title: '患者'
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