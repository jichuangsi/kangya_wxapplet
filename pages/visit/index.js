// pages/visit/index.js/
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';

var today_date = new Date()
var today_time = today_date.getFullYear() + "-" + (today_date.getMonth() + 1) + "-" + today_date.getDate()
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
    state3: '回访人',
    nav1_state:'',
    nav1_arr: [
      { id: '', name: '全部' },
      { id: '3', name: '待回访' },
      { id: '4', name: '已回访' },
      { id: '5', name: '待跟进' },
    ],
    time:'',
    showbottom: false,
    calendarConfig: {
      // 配置内置主题
      theme: 'elegant',
      defaultDay: today_time,
      chooseAreaMode: false,
    },
    calendarConfig2: {
      // 配置内置主题
      theme: 'elegant',
      defaultDay: today_time,
      chooseAreaMode: false,
    },
    customerid: '',
    clinicid: '',
    patdetails: '',
    date: '',
    doctor_arr:'',
    power_arr: [],
    user: '',
    qx_state:false
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
  doSomeThing() {
    // 调用日历方法
    console.log(this.calendar)
    this.calendar.switchView('week', '#calendar2').then(() => { });
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
    let self = this
    console.log('afterTapDay', e.detail); // => { currentSelect: {}, allSelectedDays: [] }
    self.setData({
      time: e.detail.year + '-' + e.detail.month + '-' + e.detail.day
    })
    self.calendar.jump(e.detail.year, e.detail.month, e.detail.day, '#calendar2')
    self.calendar.switchView('week', '#calendar2').then(() => { })
    self.calendar.jump(e.detail.year, e.detail.month, e.detail.day, '#calendar1')
    self.getdata()
    self.onClose()
  },
  afterTapDay2(e) {
    let self = this
    console.log('afterTapDay', e.detail); // => { currentSelect: {}, allSelectedDays: [] }
    self.setData({
      time: e.detail.year + '-' + e.detail.month + '-' + e.detail.day,
      calendarConfig: {
        // 配置内置主题
        theme: 'elegant',
        defaultDay: e.detail.year + '-' + e.detail.month + '-' + e.detail.day,
        chooseAreaMode: false,
      }
    })
    self.calendar.jump(e.detail.year, e.detail.month, e.detail.day, '#calendar2')
    self.calendar.switchView('week', '#calendar2').then((res) => { })
    self.getdata()
    self.calendar.jump(e.detail.year, e.detail.month, e.detail.day, '#calendar1')
  },
  afterCalendarRender2() {
    if (this.data.state == 0) {
      this.calendar.switchView('week', '#calendar2').then(() => { });
    }
  },
  del(e) {
    let self = this
    Dialog.confirm({
      title: '提示',
      message: '您确定删除这条回访吗？'
    }).then(() => {
      // on confirm
      wx.request({
        url: getApp().data.APIS + '/patient/delpatvisit',
        method: 'post',
        data: {
          "visitidentity": e.currentTarget.dataset.item.visitidentity,
          "customerid": e.currentTarget.dataset.item.customerid
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' //修改此处即可
        },
        success: function (res) {
          console.log(res)
          if (res.data.info == 'ok') {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
            self.getdata()
          } else {
            wx.showToast({
              title: '失败',
              duration: 2000
            })
          }
        }
      })
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
    this.setData({ state2: e.currentTarget.dataset.text, showbottom: false, nav1_state: e.currentTarget.dataset.id })
    this.getdata()
  },
  numclick2(e) {
    this.setData({ state3: e.currentTarget.dataset.text, showbottom: false, doctorid: e.currentTarget.dataset.id })
    this.getdata()
  },
  addgo() {
    if (this.data.power_arr.code10703.has){
      wx.navigateTo({
        url: '../visitedit/index?title=添加回访',
      })
    }else{
      wx.showToast({
        icon:'none',
        title: '暂无权限',
      })
    }
  },
  searchgo() {
    wx.navigateTo({
      url: '../worksearch/index?state=0',
    })
  },
  getdata(){
    let self = this
    self.setData({
      qx_state: false
    })
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
          doctorid: self.data.doctorid,
          visitdata: self.data.nav1_state,
          visitpersonname: "全部",
          pagesize: "10",
          clinicid: "",
          patient: ""
        },
        success: function (res) {
          console.log(res)
          if (res.data.info == 'ok') {
            for(let i = 0;i<res.data.list.length;i++){
              if (res.data.list[i].visitidentity == self.data.user.userid){
                self.setData({
                  qx_state:true
                })
              }
            }
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
          console.log(res.data.list[0])
          if (res.data.info == 'ok') {
            for (let i = 0; i < res.data.list.length; i++) {
              if (res.data.list[i].visitidentity == self.data.user.userid) {
                self.setData({
                  qx_state: true
                })
              }
            }
            self.setData({
              visit_arr: res.data.list
            })
          }
        },
      })
    }
  },

  getdoctor() {
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
            doctor_arr: res.data.list.schdoctor
          })
        }
      }
    })
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
      patdetails: Page.data.patdetails ? Page.data.patdetails : '',
      power_arr: Page.data.power_arr,
      user: Page.data.user,
    })
    console.log(this.data.power_arr)
    console.log(this.data.user)
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