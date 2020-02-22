// pages/achievement/index.js
import * as echarts from '../../ec-canvas/echarts';
let listd = ['08:00', '22:00']
let listm = ['01日', '31日']
let listy = ['1月', '12月']

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav_num:0,
    ec: 0,
    list: ['08:00', '22:00'],
    list_date: [0, 0]
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  navclick(e){
    let index = e.currentTarget.dataset.index
    this.setData({
      nav_num: index,
    })
    if (index == 0) {
      this.setData({
        list: listd,
        ec: {
          onInit: this.initChart
        }
      })
    } else if (index == 1) {
      console.log(111)
      this.setData({
        list: listm,
        ec: {
          onInit: this.initChart
        }
      })
      console.log(this.data.list)
    } else if (index == 2) {
      this.setData({
        list: listy,
        ec: {
          onInit: this.initChart
        }
      })
    }
  },


  initChart(canvas, width, height) {
    let self = this
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    canvas.setChart(chart);

    var option = {
      xAxis: {
        type: 'category',
        data: self.data.list
      },
      yAxis: {
        type: 'value', 
        splitLine: {
          　　　　show: false
        　　}
      },



      textStyle: {
        fontSize: 24,
        color: '#fff',
        rich: {}
      },
      series: [{
        label: {
          normal: {
            textStyle: {
              fontSize: 24,
              color: '#09fbfd',
              rich: {}
            }
          }
        },
        data: self.data.list_date,
        type: 'line',
        itemStyle: {
          normal: {
            color: '#8cd5c2', //改变折线点的颜色
            lineStyle: {
              color: '#8cd5c2' //改变折线颜色
            }
          }
        },

      }]
    };

    chart.setOption(option);
    return chart;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      nav_num: options.state,
      ec: {
        onInit: this.initChart
      }
    })
    if (options.state == 0){
      this.setData({
        list: listd,
        ec: {
          onInit: this.initChart
        }
      })
    } else if (options.state == 1){
      this.setData({
        list: listm,
        ec: {
          onInit: this.initChart
        }
      })
    } else if (options.state == 2) {
      this.setData({
        list: listy,
        ec: {
          onInit: this.initChart
        }
      })
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