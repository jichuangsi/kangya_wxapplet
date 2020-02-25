// pages/achievementNext/index.js
const CHARTS = require('../../data/wxcharts-min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '关于康牙医生',
    a1: [
      { name: '初诊', data: 4 },
      { name: '复诊', data: 3 }
    ],
    a2: [
      { name: '未分类', data: 6 },
      { name: '洗牙', data: 1 }
    ],
    a3: [
      { name: '未分类', data: 2 },
      { name: '网络咨询', data: 1 },
      { name: '家住附近', data: 2 }
    ],
    doctor_arr:[
      {name:'李医生',money:'930.00'}
    ],
    project_arr: [
      { name: '其他', num: '6', money: '930.00' }
    ],
    active:'人数统计'
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

  pieShow1(data) {
    let pie = {
      canvasId: 'pieGraph1', // canvas-id
      type: 'pie', // 图表类型，可选值为pie, line, column, area, ring
      series: this.data.a1,
      width: 380, // 宽度，单位为px
      height: 300, // 高度，单位为px
      legend: {
        orient: 'vertical',
      }, // 是否显示图表下方各类别的标识
      dataLabel: true, // 是否在图表中显示数据内容值
      extra: {
        pie: {
          offsetAngle: -90
        }
      }
    };
    new CHARTS(pie);
  },
  pieShow2(data) {
    let pie = {
      canvasId: 'pieGraph2', // canvas-id
      type: 'pie', // 图表类型，可选值为pie, line, column, area, ring
      series: this.data.a2,
      width: 380, // 宽度，单位为px
      height: 300, // 高度，单位为px
      legend: {
        orient: 'vertical',
      }, // 是否显示图表下方各类别的标识
      dataLabel: true, // 是否在图表中显示数据内容值
      extra: {
        pie: {
          offsetAngle: -90
        }
      }
    };
    new CHARTS(pie);
  },
  pieShow3(data) {
    let pie = {
      canvasId: 'pieGraph3', // canvas-id
      type: 'pie', // 图表类型，可选值为pie, line, column, area, ring
      series: this.data.a3,
      width: 380, // 宽度，单位为px
      height: 300, // 高度，单位为px
      legend: {
        orient: 'vertical',
      }, // 是否显示图表下方各类别的标识
      dataLabel: true, // 是否在图表中显示数据内容值
      extra: {
        pie: {
          offsetAngle: -90
        }
      }
    };
    new CHARTS(pie);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.pieShow1()
    this.pieShow2()
    this.pieShow3()
    this.setData({
      title:options.title,
    })
    console.log(this.data.ec)
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