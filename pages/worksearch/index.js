// pages/worksearch/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchtext: '',
    state:0,
    nav1: '状态',
    nav2: '医生',
    time:'',
    nav_num: 1,
    nav1_arr: ['全部', '已预约', '已确定', '已到达', '已流失'],
    nav2_arr: ['全部', '李青青', '李医生', '莫医生'],
    calendarConfig: {
      // 配置内置主题
      theme: 'elegant',
      chooseAreaMode: true,
    },
    show:false,
    begindate: '',
    enddate: '',
    arr:[]
  },
  showPopup(e) {
    this.setData({ show: true, nav_num: e.currentTarget.dataset.index });
  },
  onClose() {
    this.setData({ show: false });
  },
  nav1click(e) {
    this.setData({
      nav1: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '状态'
    })
    this.onClose()
  },
  nav2click(e) {
    this.setData({
      nav2: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '医生'
    })
    this.onClose()
  },

  doSomeThing() {
    // 调用日历方法
    this.calendar.enableArea();
  },
  afterTapDay(e) {
    console.log('afterTapDay', e.detail); // => { currentSelect: {}, allSelectedDays: [] }
    let arr = this.calendar.getSelectedDay()
    this.setData({
      time:  arr[0].month + '月' + arr[0].day + '日' + '~' +  arr[arr.length - 1].month + '月' + arr[arr.length - 1].day + '日',
      bengindate: arr[0].year + '-' + arr[0].month + '-' + arr[0].day,
      enddate: arr[arr.length - 1].year + '-' + arr[arr.length - 1].month + '-' + arr[arr.length - 1].day
    })
    this.onClose()
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
              arr: res.data.list
            })
          }
        },
      })
    }else{

    }
  },
  detailsgo(e) {
    let item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../visitdetails/index?item=' + item,
    })
  },
  searchclick(){
    this.getdata()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      state:options.state
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