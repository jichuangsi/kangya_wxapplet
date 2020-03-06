// pages/achievementNext/index.js
const CHARTS = require('../../data/wxcharts-min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '关于康牙医生',
    chart_arr:[],
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
  pieShow(data) {
    for (let i = 0; i < this.data.chart_arr.length; i++) {
      console.log('pieGraph' + i)
      console.log(this.data.chart_arr[i].child)
      let pie = {
        canvasId: 'pieGraph'+i, // canvas-id
        type: 'pie', // 图表类型，可选值为pie, line, column, area, ring
        series: this.data.chart_arr[i].child,
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
    }
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.API+'/achievementNext.json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result == 200) {
          self.setData({
            chart_arr: res.data.chart_arr,
            doctor_arr: res.data.doctor_arr,
            project_arr: res.data.project_arr,
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
    console.log(options)
    this.setData({
      title:options.title,
    })
    console.log(this.data.ec)
    wx.setNavigationBarTitle({
      title:options.title
    })
    this.getdata()
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