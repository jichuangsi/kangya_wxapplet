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
    list: ['08:00', '22:00'],
    list_data: [0,0],
    a1: [
      { name: '初诊', data: 4 },
      { name: '初诊', data: 3 }
    ],
    calendarConfig: {
      // 配置内置主题
      theme: 'elegant',
      chooseAreaMode: false,
    },
    show:false
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
    this.setData({
      nav_num: index,
    })
    if (index ==0){
      this.setData({
        list: ['08:00', '22:00']
      })
      this.pieShow()
    } else if (index == 1) {
      this.setData({
        list: ['1日', '31日']
      })
      this.pieShow()
    } else if (index == 2) {
      this.setData({
        list: ['1月', '12月']
      })
      this.pieShow()
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
        time: e.detail.year + '年' + e.detail.month + '月' + e.detail.day + '日'
      })
      this.onClose()
    }else{
      let arr = this.calendar.getSelectedDay()
      this.setData({
        time: arr[0].year + '年' + arr[0].month + '月' + arr[0].day + '日' + '~' + arr[arr.length - 1].year + '年' + arr[arr.length - 1].month + '月' + arr[arr.length - 1].day + '日'
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.pieShow()
    this.setData({
      nav_num: options.state
    })

    if (options.state == 0) {
      this.setData({
        list: ['08:00', '22:00']
      })
      this.pieShow()
    } else if (options.state == 1) {
      this.setData({
        list: ['1日', '31日']
      })
      this.pieShow()
    } else if (options.state == 2) {
      this.setData({
        list: ['1月', '12月']
      })
      this.pieShow()
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