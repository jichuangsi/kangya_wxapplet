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
  pieShow(data) {
    let pie = {
      canvasId: 'pieGraph', // canvas-id
      type: 'area', // 图表类型，可选值为pie, line, column, area, ring
      width: 330,
      height: 300,
      background: '#fff',
      dataLabel: true,
      categories: [],
      series: [{
        name: '业绩',
        data: [],//设置某一个值为null会出现断层
        format: function (val) {
          return val.toFixed(2) + '元';
        }
      }],
      yAxis: {
        title: '成交金额 (元)',
        format: function (val) {
          return val.toFixed(2);
        },
        fontColor: "#333",
        titleFontColor: "#333",
        min: 0,
        gridColor: "#333"
      },
      xAxis: {
        fontColor: "#333",
        titleFontColor: "#333",
        gridColor: "#333"
      }
    };
    new CHARTS(pie);
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