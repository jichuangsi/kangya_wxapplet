// pages/Arrears/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '历史欠款',
    nav1: '就诊项目',
    nav2: '主治医生',
    nav_num: 1,
    nav1_arr: ['全部', '治疗', '修复', '种植', '正畸', '检查', '洗牙', '其他'],
    nav2_arr: ['全部', '李青青', '李医生', '莫医生', '伍医生'],
    arr: [],
    pageIndex: '',
    pageCount: '',
    clinicid:'',
    customerid:'',
    name:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  showPopup(e) {
    this.setData({ show: true, nav_num: e.currentTarget.dataset.index });
  },
  onClose() {
    this.setData({ show: false });
  },
  nav1click(e) {
    this.setData({
      nav1: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '就诊项目'
    })
  },
  nav2click(e) {
    this.setData({
      nav2: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '主治医生'
    })
  },
  uptouch() {
    if (this.data.pageIndex > this.data.pageCount) {

    } else {
      this.getdata()
    }
  },
  chargego(e){
    this.setData({
      customerid: e.currentTarget.dataset.item.customerid,
      clinicid: e.currentTarget.dataset.item.clinicid,
    })
    wx.navigateTo({
      url: '../charge/index',
    })
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/SelBillinfo',
      method: 'post',
      data: {
        pageno:self.data.pageIndex,
        pagesize:20,
        clinicid: self.data.clinicid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = res.data.list.billinfo
          let arr1 = []
          for(let i = 0;i<arr.length;i++){
            if (arr[i].arrearagemoney!='0.00'){
              arr1.push(arr[i])
            }
          }
          self.setData({
            arr: arr1
          })
        }
      }
    })
  },
  getdoctor(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/schedule/microlettercondition',
      method: 'post',
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            nav2_arr: res.data.list.schdoctor
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
      title:'历史欠款'
    })
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];//当前页
    this.setData({
      clinicid: Page.data.Hospital_arr[0].clinicid,
      name: Page.data.user.name
    })
    this.getdata()
    this.getdoctor()
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