// pages/worksearch/index.js
var today_date = new Date()
var today_time = today_date.getFullYear() + "-" + (today_date.getMonth() + 1) + "-" + today_date.getDate()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchtext: '',
    state:0,
    nav1: '状态',
    nav2: '医生',
    nav1_state: '',
    time: today_time + '~' + today_time,
    nav_num: 1,
    nav1_arr: [
      { id: '', name: '全部' },
      { id: '1', name: '已预约' },
      { id: '1', name: '已确定' },
      { id: '2', name: '已过期' },
      { id: '3', name: '已到达' },
      { id: '8', name: '已流失' },
    ],
    nav3_arr: [
      { id: '', name: '全部' },
      { id: '3', name: '待回访' },
      { id: '4', name: '已回访' },
      { id: '5', name: '待跟进' },
    ],
    nav2_arr: ['全部'],
    calendarConfig: {
      // 配置内置主题
      theme: 'elegant',
      chooseAreaMode: true,
    },
    show:false,
    begindate: today_time,
    enddate: today_time,
    arr:[],
    order_arr:[],
    doctorid: '',
    power_arr: [],
    user: '',
  },
  ipt(e){
    let text = e.detail.value.replace(/\s*/g, "")
    this.setData({
      searchtext: text
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
      nav1: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '状态',
      nav1_state: e.currentTarget.dataset.id
    })
    this.onClose()
    this.searchclick()
  },
  nav2click(e) {
    this.setData({
      nav2: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : this.data.state == 1 ? '医生':'回访人',
      doctorid: e.currentTarget.dataset.doctorid
    })
    this.onClose()
    this.searchclick()
  },

  doSomeThing() {
    // 调用日历方法
    this.calendar.enableArea();
  },
  afterTapDay(e) {
    console.log('afterTapDay', e.detail); // => { currentSelect: {}, allSelectedDays: [] }
    let arr = this.calendar.getSelectedDay()
    this.setData({
      time: arr[0].year + '-' + arr[0].month + '-' + arr[0].day + '~' + arr[arr.length - 1].year + '-' + arr[arr.length - 1].month + '-' + arr[arr.length - 1].day,
      bengindate: arr[0].year + '-' + arr[0].month + '-' + arr[0].day,
      enddate: arr[arr.length - 1].year + '-' + arr[arr.length - 1].month + '-' + arr[arr.length - 1].day
    })
    this.onClose()
    this.searchclick()
  },
  getdata(){
    let self = this
    if(self.data.state == 0){
      wx.request({
        url: getApp().data.APIS + '/returnvisit/visitlist',
        method: 'post',
        data: {
          begindate: self.data.begindate,
          enddate: self.data.enddate,
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
          patient: self.data.searchtext
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
  getorder(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/schedule/scschedulelist',
      method: 'post',
      data: {
        "begindate": self.data.bengindate, 
        "enddate": self.data.enddate, 
        "pageno": 1, 
        "pagesize": 20, 
        "doctorid": self.data.doctorid, 
        "departmentid": "", 
        "counselor": "", 
        "totalcount": -1, 
        "status": self.data.nav1_state, 
        "issche": "1",
        "cancelstatus": "", 
        "keyword": self.data.searchtext
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = res.data.list
          // for (let i = 0; i < res.data.list.length; i++) {
          //   console.log(res.data.list[i].schedule)
          //   if (res.data.list[i].schedule) {
          //     for (let j = 0; j < res.data.list[i].schedule.length; j++) {
          //       if (self.data.title == '预约') {
          //         if (res.data.list[i].schedule[j].customerid == patdetails.customerid) {
          //           arr.push(res.data.list[i].schedule[j])
          //         }
          //       } else {
          //         arr.push(res.data.list[i].schedule[j])
          //       }
          //     }
          //   }
          // }
          console.log(arr)
          self.setData({
            order_arr: arr
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
  detailsgo(e) {
    let item = JSON.stringify(e.currentTarget.dataset.item)
    if(this.data.state == 0){
      wx.navigateTo({
        url: '../visitdetails/index?item=' + item,
      })
    }else{
      wx.navigateTo({
        url: '../orderdetails/index?item=' + item,
      })
    }
  },
  searchclick(){
    if (this.data.state == 0) {
      this.getdata()
    } else {
      this.getorder()
    }
  },
  visit_del(e) {
    let self = this
    Dialog.confirm({
      title: '提示',
      message: '您确定删除这条回访吗？'
    }).then(() => {
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
      // on confirm
    }).catch(() => {
      // on cancel
    })
  },
  order_del(e) {
    let self = this
    Dialog.confirm({
      title: '提示',
      message: '您确定删除这条预约吗？'
    }).then(() => {
      wx.request({
        url: getApp().data.APIS + '/schedule/sccancelschedule',
        method: 'post',
        data: {
          "scheduleidentity": e.currentTarget.dataset.item.scheduleidentity,
          "name": e.currentTarget.dataset.item.name,
          "lostmemo": ""
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
      // on confirm
    }).catch(() => {
      // on cancel
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];
    this.setData({
      state:options.state,
      nav2: options.state == 1 ? '医生' : '回访人',
      power_arr: Page.data.power_arr,
      user: Page.data.user,
    })
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