// pages/achievementNext/index.js
import * as echarts from '../../ec-canvas/echarts';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '关于牙医管家',
    ec: '',
    ec1: '',
    ec2: '',
    a1: [1],
    b1: [1],
    c1: [1],
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


  initChart(canvas, width, height) {
    let self = this
    console.log(canvas)
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    canvas.setChart(chart);

    var option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}:{d}%'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['0%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              fontSize: '30',
              rich:{}
            },
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 4, name: '初诊' },
            { value: 3, name: '复诊' },
          ]
        }
      ]
    };

    chart.setOption(option);
    return chart;
  },
  initChart1(canvas, width, height) {
    let self = this
    console.log(canvas)
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    canvas.setChart(chart);

    var option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}:{d}%'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['0%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              fontSize: '30',
              rich: {}
            },
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 6, name: '未分类' },
            { value: 1, name: '洗牙' },
          ]
        }
      ]
    };

    chart.setOption(option);
    return chart;
  },
  initChart2(canvas, width, height) {
    let self = this
    console.log(canvas)
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    canvas.setChart(chart);

    var option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}:{d}%'
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['0%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
              fontSize: '30',
              rich: {}
            },
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 4, name: '未分类' },
            { value: 2, name: '家住附近' },
            { value: 1, name: '网络咨询' },
          ]
        }
      ]
    };

    chart.setOption(option);
    return chart;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title:options.title,
      ec: {
        onInit: this.initChart
      },
      ec1: {
        onInit: this.initChart1
      },
      ec2: {
        onInit: this.initChart2
      }
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