// pages/achievement/index.js
const CHARTS = require('../../data/wxcharts-min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav_num:0,
    check_nav_num:0,
    time:'',
    list: ['08:00', '', '', '22:00'],
    list_data: [0,0],
    achievement: '',
    receivable: '',
    discount: '',
    payment: '',
    first:'',
    last:'',
    first_z: 0,
    repeat_z: 0,
    calendarConfig: {
      // 配置内置主题
      theme: 'elegant',
      chooseAreaMode: false,
    },
    show:false,
    check_time:true,
    clinicid:'',
    bengindate: '',
    enddate: '',
    user:false
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },

  onClose() {
    this.setData({ show: false });
  },
  onClickRight(){
    this.setData({ show: true });
  },
  navclick(e){
    let index = e.currentTarget.dataset.index
    let a = new Date()
    let year = a.getFullYear()
    let month = a.getMonth()
    let day = a.getDate()
    this.setData({
      nav_num: index,
      check_time:true,
      bengindate: year + '-' + month + '-' + day,
      enddate: year + '-' + month + '-' + day
    })
    if (index ==0){
      this.getdata()
    } else if (index == 1) {
      this.getdata()
    } else if (index == 2) {
      this.getdata()
    }
  },
  check_navclick(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      check_nav_num: index,
    })
    if (index == 1){
      this.setData({
        calendarConfig: {
          theme: 'elegant',
          chooseAreaMode: true,
        }
      })
      this.doSomeThing()
    } else {
      this.setData({
        calendarConfig: {
          theme: 'elegant',
          chooseAreaMode: false,
        }
      })
      this.doSomeThing()
    }
    this.calendar.cancelAllSelectedDay()
  },
  doSomeThing() {
    // 调用日历方法
    this.calendar.enableArea();
  },
  afterTapDay(e) {
    console.log('afterTapDay', e.detail); // => { currentSelect: {}, allSelectedDays: [] }
    if(this.data.check_nav_num == 0){
      this.setData({
        time: e.detail.year + '年' + e.detail.month + '月' + e.detail.day + '日',
        bengindate: e.detail.year + '-' + e.detail.month + '-' + e.detail.day,
        enddate: e.detail.year + '-' + e.detail.month + '-' + e.detail.day
      })
      this.onClose()
    }else{
      let arr = this.calendar.getSelectedDay()
      this.setData({
        time: arr[0].year + '年' + arr[0].month + '月' + arr[0].day + '日' + '~' + arr[arr.length - 1].year + '年' + arr[arr.length - 1].month + '月' + arr[arr.length - 1].day + '日',
        bengindate: arr[0].year + '-' + arr[0].month + '-' + arr[0].day,
        enddate: arr[arr.length - 1].year + '-' + arr[arr.length - 1].month + '-' + arr[arr.length - 1].day
      })
      this.onClose()
    }
    this.setData({
      check_time:false
    })
    this.getdata()
  },


  pieShow(data) {
    let pie = {
      canvasId: 'pieGraph', // canvas-id
      type: 'area', // 图表类型，可选值为pie, line, column, area, ring
      width: 330,
      height: 300,
      background:'#16c7ae',
      dataLabel: true,
      categories: this.data.list,
      series: [{
        name:'业绩',
        data: this.data.list_data,//设置某一个值为null会出现断层
        format: function (val) {
          return val.toFixed(2) + '元';
        }
      }],
      yAxis: {
        title: '成交金额 (元)',
        format: function (val) {
          return val.toFixed(2);
        },
        fontColor: "#fff",
        titleFontColor: "#fff",
        min: 0,
        gridColor: "#fff"
      },
      xAxis: {
        fontColor: "#fff",
        titleFontColor: "#fff",
        gridColor: "#fff"
      }
    };
    new CHARTS(pie);
  },
  getdata(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/finance/income2',
      method: 'post',
      data: {
        pageno: self.data.pageIndex,
        pagesize: 100,
        bengindate: self.data.bengindate,
        enddate: self.data.enddate,
        clinicid: self.data.clinicid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = []
          let val = ''
          for (let i = 0; i < res.data.list.length; i++) {
            arr.push(res.data.list[i].date)
            val = res.data.list[i].paidfee.indexOf(',') != -1 ? Number(res.data.list[i].paidfee.split(',')[0] + res.data.list[i].paidfee.split(',')[1]) : Number(res.data.list[i].paidfee)
            arr1.push(val)
          }
          self.setData({
            list: arr,
            list_data: arr1,
            achievement: res.data.main.baseinfo.paidfee,
            receivable: res.data.main.baseinfo.needpay,
            discount: res.data.main.baseinfo.dischargefee,
            payment: res.data.main.baseinfo.advpay,
          })
          self.pieShow()
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/finance/incomedebts',
      method: 'post',
      data: {
        bengindate: self.data.bengindate,
        enddate: self.data.enddate,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            first: res.data.list.begindebts,
            last: res.data.list.enddebts
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.user))
    this.pieShow()

    let a = new Date()
    let year = a.getFullYear()
    let month = a.getMonth()
    let day = a.getDate()
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    this.setData({
      nav_num: options.state,
      user: options.user?JSON.parse(options.user):'',
      clinicid: options.user ? JSON.parse(options.user).clinicuniqueid: prevPage.data.Hospital_arr[0].clinicid,
      time: year + '年' + month + '月' + day + '日',
      bengindate: year + '-' + month + '-' + day,
      enddate: year + '-' + month + '-' + day
    })
    if (options.state == 0) {
      this.getdata()
    } else if (options.state == 1) {
      this.getdata()
    } else if (options.state == 2) {
      this.getdata()
    }
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