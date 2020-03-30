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
    nav2_arr: ['全部'],
    calendarConfig: {
      // 配置内置主题
      theme: 'elegant',
      chooseAreaMode: true,
    },
    show:false,
    begindate: '',
    enddate: '',
    arr:[],
    order_arr:[],
    doctorid:''
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
      nav2: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '医生',
      doctorid: e.currentTarget.dataset.doctorid
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
  getorder(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/schedule/scscheduleday',
      method: 'post',
      data: {
        bengindate: self.data.bengindate,
        enddate: self.data.enddate
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          for (let i = 0; i < res.data.list.length; i++) {
            console.log(res.data.list[i].schedule)
            if (res.data.list[i].schedule) {
              for (let j = 0; j < res.data.list[i].schedule.length; j++) {
                if (self.data.title == '预约') {
                  if (res.data.list[i].schedule[j].customerid == patdetails.customerid) {
                    arr.push(res.data.list[i].schedule[j])
                  }
                } else {
                  arr.push(res.data.list[i].schedule[j])
                }
              }
            }
          }
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
          let arr = self.data.nav2_arr
          arr.push(...res.data.list.schdoctor)
          self.setData({
            nav2_arr: arr
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