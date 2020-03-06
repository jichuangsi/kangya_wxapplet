// pages/erocdetails/index.js
const CHARTS = require('../../data/wxcharts-min.js');
var util = require('../../utils/util.js');
var TIME = util.formatTime(new Date()).split(' ')[0];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '营销',
    time: TIME,
    show: false,
    calendarConfig: {
      // 配置内置主题
      theme: 'elegant',
      chooseAreaMode: false,
    },
    check_num:0,
    consultationnum: 0,
    dealnum: 0,
    lossnum: 0,
    Chart_arr:[],
    Ranking_arr:[]
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  oneday(){
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  checkclick(e){
    console.log(e.currentTarget.dataset.index)
    this.setData({ check_num: e.currentTarget.dataset.index });
  },
  doSomeThing() {
    // 调用日历方法
    console.log(this.calendar)
    this.calendar.enableArea();
  },
  afterTapDay(e) {
    console.log('afterTapDay', e.detail); // => { currentSelect: {}, allSelectedDays: [] }
    if (this.data.title == '每日看板') {
      this.setData({
        time: e.detail.year + '/' + e.detail.month + '/' + e.detail.day
      })
      this.onClose()
    } else {
      let arr = this.calendar.getSelectedDay()
      this.setData({
        time: arr[0].year + '/' + arr[0].month + '/' + arr[0].day + '~' + arr[arr.length - 1].year + '/' + arr[arr.length - 1].month + '/' + arr[arr.length - 1].day
      })
      this.onClose()
    }
    console.log(this.data.time)
  },
  pieShow() {
    let self = this
    for (let i = 0; i < self.data.Chart_arr.length;i++){
      console.log('pieGraph' + i)
    let pie = {
      canvasId: 'pieGraph'+i, // canvas-id
      type: 'column', // 图表类型，可选值为pie, line, column, area, ring
      width: 330,
      height: 300,
      animation: true,
      categories: self.data.Chart_arr[i].title_arr,
      series: [{
        name: self.data.Chart_arr[i].state,
        data: self.data.Chart_arr[i].value_arr,
        format: function (val, name) {
          return val
          // .toFixed(2) + '万';
        }
      }],
      yAxis: {
        format: function (val) {
          return val
          //  + '万';
        },
        title: '',
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15
        }
      }
    };
      new CHARTS(pie);
    }
  },
  getdata(){
    let self = this
    wx.request({
      url: getApp().data.API+'/eroc.json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result == 200) {
          self.setData({
            consultationnum: res.data.consultationnum,
            dealnum: res.data.dealnum,
            lossnum: res.data.lossnum,
            Chart_arr: res.data.Chart_arr,
            Ranking_arr: res.data.Ranking_arr
          })
          self.pieShow()
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.getdata()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (this.data.title == '每日看板') {
      this.setData({
        calendarConfig: {
          theme: 'elegant',
          chooseAreaMode: false,
        }
      })
      this.doSomeThing()
    } else {
      this.setData({
        calendarConfig: {
          theme: 'elegant',
          chooseAreaMode: true,
        }
      })
      this.doSomeThing()
    }
    this.calendar.cancelAllSelectedDay()
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