// pages/achievementNext/index.js
const CHARTS = require('../../data/wxcharts-min.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '关于康牙医生',
    chart_arr1: [],
    chart_arr2: [],
    chart_arr3: [],
    doctor_arr:[],
    project_num: [], 
    project_payfee:[],
    active:'人数统计',
    clinicid: '',
    bengindate: '',
    enddate: ''
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
  pieShow(index,data) {
      let pie = {
        canvasId: 'pieGraph' + index, // canvas-id
        type: 'pie', // 图表类型，可选值为pie, line, column, area, ring
        series: data,
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
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/report/Bespeak',
      method: 'post',
      data: {
        clinicid: self.data.clinicid,
        bengindate: self.data.bengindate,
        enddate: self.data.enddate,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          console.log(typeof (res.data.list[0].num))
          self.setData({
            chart_arr1:[
              { name: '初诊', data: res.data.list[0].num },
              { name: '复诊', data: res.data.list[1].num }
            ]
          })
          self.pieShow(1, self.data.chart_arr1)
        }
      }
    })
    wx.request({
      url: getApp().data.APIS + '/report/TreatmentTotal',
      method: 'post',
      data: {
        clinicid: self.data.clinicid,
        bengindate: self.data.bengindate,
        enddate: self.data.enddate,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr2 = []
          for(let i = 0;i<res.data.list.length;i++){
            arr2.push({ name: res.data.list[i].item, data: res.data.list[i].num})
          }
          self.setData({
            chart_arr2: arr2

          })
          self.pieShow(2, self.data.chart_arr2)
        }
      }
    })
    wx.request({
      url: getApp().data.APIS + '/report/ComeFromTotal',
      method: 'post',
      data: {
        clinicid: self.data.clinicid,
        bengindate: self.data.bengindate,
        enddate: self.data.enddate,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr3 = []
          for (let i = 0; i < res.data.list.length; i++) {
            arr3.push({ name: res.data.list[i].comefrom, data: Number(res.data.list[i].scount) })
          }
          self.setData({
            chart_arr3: arr3
          })
          self.pieShow(3, self.data.chart_arr3)
        }
      }
    })
  }, 
  getdoctorranking() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/report/doctorrank',
      method: 'post',
      data: {
        clinicid: self.data.clinicid,
        bengindate: self.data.bengindate,
        enddate: self.data.enddate,
        pageno:1,
        pagesize:10
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            doctor_arr: res.data.list.doctorrank
          })
        }
      }
    })
  },
  getprojectranking() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/report/handleitem',
      method: 'post',
      data: {
        clinicid: self.data.clinicid,
        bengindate: self.data.bengindate,
        enddate: self.data.enddate,
        pageno:1,
        pagesize:10
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            project_num: res.data.list.handlenum,
            project_payfee: res.data.list.handledeal,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    this.setData({
      title: options.title,
      clinicid: prevPage.data.clinicid,
      bengindate: prevPage.data.bengindate,
      enddate: prevPage.data.enddate
    })
    wx.setNavigationBarTitle({
      title:options.title
    })
    if (options.title == '就诊患者') {
      this.getdata()
    } else if (options.title == '医生排名') {
      this.getdoctorranking()
    } else if (options.title == '热门项目') {
      this.getprojectranking()
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