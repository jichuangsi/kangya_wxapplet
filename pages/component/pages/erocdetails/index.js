// pages/erocdetails/index.js
const CHARTS = require('../../../../data/wxcharts-min.js');
var util = require('../../../../utils/util.js');
var TIME = util.formatTime(new Date()).split(' ')[0];

import * as echarts from '../../ec-canvas/echarts.js';

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
    Chart_arr:[],
    Ranking_arr:[],
    clinicid: '',
    begindate: TIME,
    enddate: TIME,
    Daily: '',
    Daily_rank1: [],
    Daily_rank2: [],
    Daily_rank3: [],
    attendance:'',
    attendance_total1: '',
    attendance_total2: '',
    attendance_total3: '',
    attendance_rank1: [],
    attendance_rank2: [],
    order_total1:'',
    expenditure_total:'',
    showdata:false,
    popup_title:'',


    // attendance1: '',
    // attendance2: '',
    // attendance3: '',
    // attendance4: '', 
    // attendance5:'',

    // order1: '',
    // order2: '',
    // order3: '',
    // order4: '',
    // order5: '',
    // order6:'',

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
  ontitle(e) {
    this.setData({ popup_title: e.currentTarget.dataset.text,showdata: true });
  },
  onClosedata() {
    this.setData({ showdata: false });
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
        time: e.detail.year + '/' + e.detail.month + '/' + e.detail.day,
        begindate: e.detail.year + '/' + e.detail.month + '/' + e.detail.day,
        enddate: e.detail.year + '/' + e.detail.month + '/' + e.detail.day
      })
      this.onClose()
    } else {
      let arr = this.calendar.getSelectedDay()
      this.setData({
        time: arr[0].year + '/' + arr[0].month + '/' + arr[0].day + '~' + arr[arr.length - 1].year + '/' + arr[arr.length - 1].month + '/' + arr[arr.length - 1].day,
        begindate: arr[0].year + '/' + arr[0].month + '/' + arr[0].day,
        enddate: arr[arr.length - 1].year + '/' + arr[arr.length - 1].month + '/' + arr[arr.length - 1].day
      })
      this.onClose()
    }
    this.getdata()
    console.log(this.data.time)
  },
  getDaily(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/report/cashincome',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            Daily:res.data.list
          })
        }
      }
    })
    wx.request({
      url: getApp().data.APIS + '/report/itemrank',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            Daily_rank1: res.data.list.itemrank
          })
        }
      }
    })
    wx.request({
      url: getApp().data.APIS + '/report/doctorrank',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            Daily_rank2: res.data.list.doctorrank
          })
        }
      }
    })
    wx.request({
      url: getApp().data.APIS + '/report/counselorrank',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            Daily_rank3: res.data.list.counselorrank
          })
        }
      }
    })
  },
  getattendance(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/report/studyinfo',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num==0?'day':'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            attendance:res.data.list
          })
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/firstvisit',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(1313)
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = [
            { name: '初诊人次', data: [] },
            { name: '流失人次', data: [] },
            { name: '流失率', data: [] }
          ]
          let arr2 = [
            {name:'初诊成交总额',data:[]}
          ]
          let total = {
            visit: 0,
            lost: 0,
            free: 0
          }
          if (res.data.list.firstdeal && res.data.list.firstlost && res.data.list.firstvisit){
            for (let i = 0; i < res.data.list.firstdeal.length;i++){
              arr.push(res.data.list.firstdeal[i].studydate)
              arr2[0].data.push(res.data.list.firstdeal[i].payfee)
              total.free += res.data.list.firstdeal[i].payfee
            }
            for (let j = 0; j < res.data.list.firstlost.length; j++) {
              arr1[1].data.push(res.data.list.firstlost[j].num)
              total.lost += res.data.list.firstlost[j].num
            }
            for (let k = 0; k < res.data.list.firstvisit.length; k++) {
              arr1[0].data.push(res.data.list.firstvisit[k].num)
              arr1[2].data.push(arr1[1].data[k]/res.data.list.firstvisit[k].num)
              total.visit += res.data.list.firstvisit[k].num
            }

            self.setData({
              attendance_total1: total,
              attendance1: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    legend: {
                      y: 'bottom',
                      data: ['初诊人次', '流失人次', '流失率']
                    },
                    color: ['#c2d4ff', '#8ca8ec', '#e7bce2'],
                    grid: {
                      left: '10%',
                      right: '10%',
                      bottom: '10%',
                      containLabel: true
                    },
                    xAxis: [
                      {
                        type: 'category',
                        "axisLabel": {
                          interval: 0,
                          rotate: 40
                        },
                        boundaryGap: true,
                        data: arr
                      }
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                      },
                      {
                        type: 'value',
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                      }
                    ],
                    series: [
                      {
                        name: '初诊人次',
                        type: 'bar',
                        data: arr1[0].data
                      },
                      {
                        name: '流失人次',
                        type: 'bar',
                        data: arr1[1].data
                      },
                      {
                        name: '流失率',
                        type: 'line',
                        data: arr1[2].data
                      }
                    ]
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '初诊人次详情', showdata: true });
                  })
                  return chart;
                }
              },
              attendance2: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    legend: {
                      y: 'bottom',
                      data: ['初诊成交总额']
                    },
                    color: ['#cbe7a7'],
                    xAxis: [
                      {
                        type: 'category',
                        boundaryGap: true,
                        data: arr
                      },
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        min: 0
                      },
                      {
                        type: 'value',
                        min: 0
                      }
                    ],
                    series: [
                      {
                        name: '初诊成交总额',
                        type: 'bar',
                        data: arr2[0].data
                      }
                    ]
                  };
                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '初诊成交总额', showdata: true });
                  })
                  return chart;
                }
              }
            })
          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/refralvisit',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {

          let arr = []
          let arr1 = [
            { name: '复诊人次', data: [] },
            { name: '复诊成交总额', data: [] }
          ]
          let total = {
            visit: 0,
            free: 0
          }
          if (res.data.list.refraldeal && res.data.list.refralvisit) {
            for (let i = 0; i < res.data.list.refraldeal.length; i++) {
              arr.push(res.data.list.refraldeal[i].studydate)
              arr1[1].data.push(res.data.list.refraldeal[i].payfee)
              total.free += res.data.list.refraldeal[i].payfee
            }
            for (let k = 0; k < res.data.list.refralvisit.length; k++) {
              arr1[0].data.push(res.data.list.refralvisit[k].num)
              total.visit += res.data.list.refralvisit[k].num
            }

            self.setData({
              attendance_total2: total,
              attendance3: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    legend: {
                      y: 'bottom',
                      data: ['复诊人次', '复诊成交总额']
                    },
                    color: ['#f2abae', '#ffcfae'],
                    xAxis: [
                      {
                        type: 'category',
                        boundaryGap: true,
                        data: arr
                      },
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        min: 0
                      },
                      {
                        type: 'value',
                        min: 0
                      }
                    ],
                    series: [
                      {
                        name: '复诊人次',
                        type: 'line',
                        yAxisIndex: 1,
                        data: arr1[0].data
                      },
                      {
                        name: '复诊成交总额',
                        type: 'bar',
                        data: arr1[1].data
                      }
                    ]
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '复诊人次详情', showdata: true });
                  })
                  return chart;
                }
              }
            })
          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/newvisit',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = [
            { name: '新诊人次', data: [] },
            { name: '流失人次', data: [] },
            { name: '流失率', data: [] }
          ]
          let arr2 = [
            { name: '新诊成交总额', data: [] }
          ]
          let total = {
            visit: 0,
            lost: 0,
            free: 0
          }
          if (res.data.list.newdeal && res.data.list.newlost && res.data.list.newvisit) {
            for (let i = 0; i < res.data.list.newdeal.length; i++) {
              arr.push(res.data.list.newdeal[i].studydate)
              arr2[0].data.push(res.data.list.newdeal[i].payfee)
              total.free += res.data.list.newdeal[i].payfee
            }
            for (let j = 0; j < res.data.list.newlost.length; j++) {
              arr1[1].data.push(res.data.list.newlost[j].num)
              total.lost += res.data.list.newlost[j].num
            }
            for (let k = 0; k < res.data.list.newvisit.length; k++) {
              arr1[0].data.push(res.data.list.newvisit[k].num)
              arr1[2].data.push(arr1[1].data[k] / res.data.list.firstvisit[k].num)
              total.visit += res.data.list.newvisit[k].num
            }

            self.setData({
              attendance_total4: total,
              attendance4: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    legend: {
                      y: 'bottom',
                      data: ['初诊人次', '流失人次', '流失率']
                    },
                    color: ['#c2d4ff', '#8ca8ec', '#e7bce2'],
                    grid: {
                      left: '10%',
                      right: '10%',
                      bottom: '10%',
                      containLabel: true
                    },
                    xAxis: [
                      {
                        type: 'category',
                        "axisLabel": {
                          interval: 0,
                          rotate: 40
                        },
                        boundaryGap: true,
                        data: arr
                      }
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                      },
                      {
                        type: 'value',
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                      }
                    ],
                    series: [
                      {
                        name: '新诊人次',
                        type: 'bar',
                        data: arr1[0].data
                      },
                      {
                        name: '流失人次',
                        type: 'bar',
                        data: arr1[1].data
                      },
                      {
                        name: '流失率',
                        type: 'line',
                        data: arr1[2].data
                      }
                    ]
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '新诊人次详情', showdata: true });
                  })
                  return chart;
                }
              },
              attendance5: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    legend: {
                      y: 'bottom',
                      data: ['初诊成交总额']
                    },
                    color: ['#cbe7a7'],
                    xAxis: [
                      {
                        type: 'category',
                        boundaryGap: true,
                        data: arr
                      },
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        min: 0
                      },
                      {
                        type: 'value',
                        min: 0
                      }
                    ],
                    series: [
                      {
                        name: '新诊成交总额',
                        type: 'bar',
                        data: arr2[0].data
                      }
                    ]
                  };
                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '新诊成交总额', showdata: true });
                  })
                  return chart;
                }
              }
            })
          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/handleitem',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            attendance_rank1: res.data.list.handlenum,
            attendance_rank2: res.data.list.handledeal
          })
        }
      }
    })

  },
  getorder() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/report/RecodeSchedule',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = [
            { name: '新诊人次', data: [] },
            { name: '复诊人次', data: [] },
            { name: '初诊人次', data: [] }
          ]
          let total = {
            visit: 0
          }
          if (res.data.list) {
            for (let i = 0; i < res.data.list.length; i++) {
              arr.push(res.data.list[i].date)
              arr1[0].data.push(res.data.list[i].newstatussum)
              arr1[1].data.push(res.data.list[i].relstatussum)
              arr1[2].data.push(res.data.list[i].visitstatussum)
              total.free += res.data.list[i].payfee
            }
            self.setData({
              order_total1: total,
              order1: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    legend: {
                      y: 'bottom',
                      data: ['新诊人次', '复诊人次', '初诊人次']
                    },
                    color: ['#7bb5ed', '#414144', '#bfd5ff'],
                    grid: {
                      left: '10%',
                      right: '10%',
                      bottom: '10%',
                      containLabel: true
                    },
                    xAxis: [
                      {
                        type: 'category',
                        "axisLabel": {
                          interval: 0,
                          rotate: 40
                        },
                        data: arr
                      }
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                      }
                    ],
                    series: [
                      {
                        name: '新诊人次',
                        type: 'bar',
                        stack: '新诊',
                        data: arr1[0].data
                      },
                      {
                        name: '复诊人次',
                        type: 'bar',
                        stack: '初复诊',
                        data: arr1[1].data
                      },
                      {
                        name: '初诊人次',
                        type: 'bar',
                        stack: '初复诊',
                        data: arr1[2].data
                      }
                    ]
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '诊所预约人次', showdata: true });
                  })
                  return chart;
                }
              },
            })
          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/CusBespeak',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = [
            { name: '未到', value: [] },
            { name: '到达', value: [] },
            { name: '失约', value: [] }
          ]
          if (res.data.list) {
            for (let i = 0; i < res.data.list.length; i++) {
              if (res.data.list[i].status == '3') {
                arr1[1].value = res.data.list[i].num
                arr1[1].name += res.data.list[i].num
              } else if (res.data.list[i].status == '2') {
                arr1[2].value = res.data.list[i].num
                arr1[2].name += res.data.list[i].num
              } else if (res.data.list[i].status == '1') {
                arr1[0].value = res.data.list[i].num
                arr1[0].name += res.data.list[i].num
              }
            }
            self.setData({
              order2: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    color: ['#7bb5ed', '#444447', '#f8a45e', '#94ea82'],
                    series: [
                      {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: arr1,
                        emphasis: {
                          itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                        }
                      }
                    ]
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '预约情况占比', showdata: true });
                  })
                  return chart;
                }
              },
            })
          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/DocBespeak',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = [
            { name: '医生预约情况统计(人次)', data: [] }
          ]
          if (res.data.list) {
            for (let i = 0; i < res.data.list.length; i++) {
              arr.push(res.data.list[i].doctorname)
              arr1[0].data.push(res.data.list[i].num)
            }
            self.setData({
              order3: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    legend: {
                      y: 'bottom',
                      data: arr
                    },
                    color: ['#94ea82'],
                    grid: {
                      left: '10%',
                      right: '10%',
                      bottom: '10%',
                      containLabel: true
                    },
                    xAxis: [
                      {
                        type: 'category',
                        "axisLabel": {
                          interval: 0,
                          rotate: 40
                        },
                        data: arr
                      }
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                      }
                    ],
                    series: [
                      {
                        name: '医生预约情况统计',
                        type: 'bar',
                        data: arr1[0].data
                      }
                    ]
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '医生预约情况统计', showdata: true });
                  })
                  return chart;
                }
              },
            })
          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/BespeakItem',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = [
            { name: '预约项目统计', data: [] }
          ]
          if (res.data.list) {
            for (let i = 0; i < res.data.list.length; i++) {
              arr.push(res.data.list[i].item)
              arr1[0].data.push(res.data.list[i].num)
            }
            self.setData({
              order4: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    color: ['#e7b8df'],
                    grid: {
                      left: '10%',
                      right: '10%',
                      bottom: '10%',
                      containLabel: true
                    },
                    xAxis: [
                      {
                        type: 'category',
                        "axisLabel": {
                          interval: 0,
                          rotate: 40
                        },
                        data: arr
                      }
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                      }
                    ],
                    series: [
                      {
                        name: '预约项目统计',
                        type: 'bar',
                        data: arr1[0].data
                      }
                    ]
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '预约项目统计', showdata: true });
                  })
                  return chart;
                }
              },
            })
          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/Bespeak',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = [
            { name: '初诊', value: [] },
            { name: '复诊', value: [] }
          ]
          if (res.data.list) {
            for (let i = 0; i < res.data.list.length; i++) {
              if (res.data.list[i].visitstatus == '0') {
                arr1[1].value = res.data.list[i].num
                arr1[1].name += res.data.list[i].num
              } else if (res.data.list[i].visitstatus == '1') {
                arr1[0].value = res.data.list[i].num
                arr1[0].name += res.data.list[i].num
              }
            }
            self.setData({
              order5: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    color: ['#89a9ec', '#c0d5ff', '#f8a45e'],
                    series: [
                      {
                        name: '预约初复诊情况',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: arr1,
                        emphasis: {
                          itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                        }
                      }
                    ]
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '预约初复诊情况', showdata: true });
                  })
                  return chart;
                }
              },
            })
          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/CBespeak',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = []
          if (res.data.list) {
            for (let i = 0; i < res.data.list.length; i++) {
              arr1.push({ name: res.data.list[i].visitnum + res.data.list[i].num, value: res.data.list[i].num})
            }
            self.setData({
              order6: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    color: ['#efc760', '#ffedba'],
                    series: [
                      {
                        name: '预约到诊和自然到诊情况',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: arr1,
                        emphasis: {
                          itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                        }
                      }
                    ]
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '预约到诊和自然到诊情况', showdata: true });
                  })
                  return chart;
                }
              },
            })
          }
        }
      }
    })
  },
  getpower() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/report/PowerNetInfo',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(1)
        console.log(res)
        if (res.data.info == 'ok') {
          if(res.data.list){

          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/QueryState',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(2)
        console.log(res)
        if (res.data.info == 'ok') {
          if (res.data.list) {
            let arr1 = [
              { name: '电网预约' + res.data.list.scount+'人', value: res.data.list.scount }, 
              { name: '到院就诊' + res.data.list.ccount + '人', value: res.data.list.ccount },
              { name: '成交金额' + res.data.list.afee, value: res.data.list.afee.indexOf(',') != -1 ? Number(res.data.list.afee.split(',')[0] + res.data.list.afee.split(',')[1]) : Number(res.data.list.afee)},
            ]
            self.setData({
              hpower2: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    color: ['#89a9ec', '#c0d5ff', '#f8a45e'],
                    series: [
                      {
                        name: '咨询初诊情况',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: arr1,
                        emphasis: {
                          itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                        }
                      }
                    ]
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '咨询初诊情况', showdata: true });
                  })
                  return chart;
                }
              },
            })
          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/QueryTool',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(3)
        console.log(res)
        if (res.data.info == 'ok') {
          if (res.data.list) {

          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/ComeFrom',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(4)
        console.log(res)
        if (res.data.info == 'ok') {
          if (res.data.list) {

          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/QueryItem',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(5)
        console.log(res)
        if (res.data.info == 'ok') {
          if (res.data.list) {

          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/PowerConsult',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(6)
        console.log(res)
        if (res.data.info == 'ok') {
          if (res.data.list) {

          }
        }
      }
    })
  },
  getmarket() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/report/AddressTotal',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = []
          if (res.data.list) {
            for (let i = 0; i < res.data.list.length; i++) {
              arr1.push({ name: res.data.list[i].area, value: Number(res.data.list[i].scount) })
            }
            self.setData({
              market1: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    color: ['#89a9ec', '#c0d5ff', '#f8a45e'],
                    series: [
                      {
                        name: '区域分布',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: arr1,
                        emphasis: {
                          itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                        }
                      }
                    ]
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '区域分布', showdata: true });
                  })
                  return chart;
                }
              },
            })
          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/AgeTotal',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = []
          if (res.data.list) {
            arr1=[
              { name: '17-30岁', value: Number(res.data.list[0].lage) + Number(res.data.list[0].lastage) + Number(res.data.list[0].lsage)},
              { name: '31-50岁', value: Number(res.data.list[0].mage) + Number(res.data.list[0].sage) + Number(res.data.list[0].smallage) }
            ]
            self.setData({
              market2: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    color: ['#89a9ec', '#c0d5ff', '#f8a45e'],
                    series: [
                      {
                        name: '年龄分布',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: arr1,
                        emphasis: {
                          itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                        }
                      }
                    ]
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '年龄分布', showdata: true });
                  })
                  return chart;
                }
              },
            })
          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/SexTotal',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          if (res.data.list) {
            let arr = ['男', '女', '未知']
            let arr1 = [
              { name: '性别分布', type: 'bar', data: [res.data.list[0].mcount, res.data.list[0].ncount, res.data.list[0].wcount] }
            ]
            self.setData({
              market3: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    color: ['#89a9ec', '#c0d5ff', '#f8a45e'],
                    grid: {
                      left: '10%',
                      right: '10%',
                      bottom: '10%',
                      containLabel: true
                    },
                    xAxis: [
                      {
                        type: 'value'
                      }
                    ],
                    yAxis: [
                      {
                        type: 'category',
                        data: arr
                      }
                    ],
                    series: arr1
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '性别分布', showdata: true });
                  })
                  return chart;
                }
              },
            })
          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/StarTotal',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          if (res.data.list) {
            let arr = ['暂无', '1星', '2星', '3星', '4星', '5星']
            let arr1 = [
              { name: '患者星级', data: [res.data.list[0].zstar, res.data.list[0].onestar, res.data.list[0].twostar, res.data.list[0].threestar, res.data.list[0].fourstar, res.data.list[0].fivestar] }
            ]
            self.setData({
              market4: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    color: ['#94ea82'],
                    grid: {
                      left: '10%',
                      right: '10%',
                      bottom: '10%',
                      containLabel: true
                    },
                    xAxis: [
                      {
                        type: 'category',
                        "axisLabel": {
                          interval: 0,
                          rotate: 40
                        },
                        data: arr
                      }
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                      }
                    ],
                    series: [
                      {
                        name: '患者星级',
                        type: 'bar',
                        data: arr1[0].data
                      }
                    ]
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '患者星级', showdata: true });
                  })
                  return chart;
                }
              },
            })
          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/TreatmentTotal',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = []
          if (res.data.list) {
            for (let i = 0; i < res.data.list.length; i++) {
              arr1.push({ name: res.data.list[i].item + res.data.list[i].num, value: res.data.list[i].num })
            }
            self.setData({
              market6: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    color: ['#89a9ec', '#c0d5ff', '#f8a45e'],
                    series: [
                      {
                        name: '患者就诊项目',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: arr1,
                        emphasis: {
                          itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                        }
                      }
                    ]
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '患者就诊项目', showdata: true });
                  })
                  return chart;
                }
              },
            })
          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/ComeFromTotal',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = [
            { name: '来源分析', data: []}
          ]
          if (res.data.list) {
            for (let i = 0; i < res.data.list.length; i++) {
              arr.push(res.data.list[i].comefrom)
              arr1[0].data.push(Number(res.data.list[i].scount))
            }
            self.setData({
              market7: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    color: ['#94ea82'],
                    grid: {
                      left: '10%',
                      right: '10%',
                      bottom: '10%',
                      containLabel: true
                    },
                    xAxis: [
                      {
                        type: 'category',
                        "axisLabel": {
                          interval: 0,
                          rotate: 40
                        },
                        data: arr
                      }
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                      }
                    ],
                    series: [
                      {
                        name: '来源分析',
                        type: 'bar',
                        data: arr1[0].data
                      }
                    ]
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '来源分析', showdata: true });
                  })
                  return chart;
                }
              },
            })
          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/ComeTotal',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(1)
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = [
            { name: '来店时间段', data: [] }
          ]
          if (res.data.list.cometotal) {
            for (let i = 0; i < res.data.list.cometotal.length; i++) {
              arr.push(res.data.list.cometotal[i].tdate)
              arr1[0].data.push(res.data.list.cometotal[i].ccount)
            }
            self.setData({
              market9: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    color: ['#f8a45e'],
                    grid: {
                      left: '10%',
                      right: '10%',
                      bottom: '10%',
                      containLabel: true
                    },
                    xAxis: [
                      {
                        type: 'category',
                        "axisLabel": {
                          rotate: 40
                        },
                        data: arr
                      }
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                      }
                    ],
                    series: [
                      {
                        name: '来店时间段分析',
                        type: 'line',
                        data: arr1[0].data
                      }
                    ]
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '来店时间段分析', showdata: true });
                  })
                  return chart;
                }
              },
            })
          }
        }
      }
    })
  },
  getconsult(){

  },
  getconsulting() {

  },
  getbusiness() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/report/businessincome',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = [
            { name: '诊所实收', data: [] },
            { name: '现金流入', data: [] }
          ]
          if (res.data.list.businessincome && res.data.list.cashincome) {
            for (let i = 0; i < res.data.list.businessincome.length; i++) {
              arr.push(res.data.list.businessincome[i].date)
              arr1[0].data.push(res.data.list.businessincome[i].totalfee)
            }
            for (let i = 0; i < res.data.list.cashincome.length; i++) {
              arr1[1].data.push(res.data.list.cashincome[i].payfee)
            }
            self.setData({
              business1: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    color: ['#8ca8ec', '#333'],
                    grid: {
                      left: '10%',
                      right: '10%',
                      bottom: '10%',
                      containLabel: true
                    },
                    xAxis: [
                      {
                        type: 'category',
                        "axisLabel": {
                          interval: 0,
                          rotate: 40
                        },
                        data: arr
                      }
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                      }
                    ],
                    series: [
                      {
                        name: '诊所实收',
                        type: 'line',
                        data: arr1[0].data
                      },
                      {
                        name: '现金流入',
                        type: 'line',
                        data: arr1[1].data
                      }
                    ]
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '收入分析', showdata: true });
                  })
                  return chart;
                }
              },
            })
          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/businesspercentage',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          if (res.data.list) {
            let arr1 = [
              { name: '预交款', value: Number(res.data.list.advancerate.split('%')[0]) },
              { name: '诊所收入', value: Number(res.data.list.incomerate.split('%')[0]) },
              { name: '会员卡', value: Number(res.data.list.viprate.split('%')[0]) },
            ]
            self.setData({
              business2: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    color: ['#89a9ec', '#c0d5ff', '#f8a45e'],
                    series: [
                      {
                        name: '现金流入占比情况',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: arr1,
                        emphasis: {
                          itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                        }
                      }
                    ]
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    console.log(123)
                    self.setData({ popup_title: '现金流入占比情况', showdata: true });
                  })
                  return chart;
                }
              },
            })
          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/vipcarddeal',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = [
            { name: '当日充值', data: [] }]
          if (res.data.list.vipcarddeal) {
            for (let i = 0; i < res.data.list.vipcarddeal.length; i++) {
              arr.push(res.data.list.vipcarddeal[i].date)
              arr1[0].data.push(res.data.list.vipcarddeal[i].payfee)
            }
            self.setData({
              business3: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    color: ['#8ca8ec'],

                    grid: {
                      left: '10%',
                      right: '10%',
                      bottom: '10%',
                      containLabel: true
                    },
                    xAxis: [
                      {
                        type: 'category',
                        "axisLabel": {
                          interval: 0,
                          rotate: 40
                        },
                        data: arr
                      }
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                      }
                    ],
                    series: [
                      {
                        name: '当日充值',
                        type: 'bar',
                        data: arr1[0].data
                      }
                    ]
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '会员卡分析', showdata: true });
                  })
                  return chart;
                }
              },
            })
          }
        }
      }
    })
    wx.request({
      url: getApp().data.APIS + '/report/advancepaydeal',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = [
            { name: '金额', data: [] }]
          if (res.data.list.advancepaydeal) {
            for (let i = 0; i < res.data.list.advancepaydeal.length; i++) {
              arr.push(res.data.list.advancepaydeal[i].date)
              arr1[0].data.push(res.data.list.advancepaydeal[i].payfee)
            }
            self.setData({
              business4: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    color: ['#8ca8ec'],

                    grid: {
                      left: '10%',
                      right: '10%',
                      bottom: '10%',
                      containLabel: true
                    },
                    xAxis: [
                      {
                        type: 'category',
                        "axisLabel": {
                          interval: 0,
                          rotate: 40
                        },
                        data: arr
                      }
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                      }
                    ],
                    series: [
                      {
                        name: '金额',
                        type: 'bar',
                        data: arr1[0].data
                      }
                    ]
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '预交款分析', showdata: true });
                  })
                  return chart;
                }
              },
            })
          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/debtdeal',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = [
            { name: '欠款分析', data: [] }]
          if (res.data.list.debtdeal) {
            for (let i = 0; i < res.data.list.debtdeal.length; i++) {
              arr.push(res.data.list.debtdeal[i].date)
              arr1[0].data.push(res.data.list.debtdeal[i].arrearadd.indexOf(',')!=-1 ? Number(res.data.list.debtdeal[i].arrearadd.split(',')[0] + res.data.list.debtdeal[i].arrearadd.split(',')[1]) : Number(res.data.list.debtdeal[i].arrearadd))
            }
            self.setData({
              business5: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {
                    color: ['#8ca8ec'],

                    grid: {
                      left: '10%',
                      right: '10%',
                      bottom: '10%',
                      containLabel: true
                    },
                    xAxis: [
                      {
                        type: 'category',
                        "axisLabel": {
                          interval: 0,
                          rotate: 40
                        },
                        data: arr
                      }
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                      }
                    ],
                    series: [
                      {
                        name: '欠款分析',
                        type: 'bar',
                        data: arr1[0].data
                      }
                    ]
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '欠款分析', showdata: true });
                  })
                  return chart;
                }
              },
            })
          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/retaildeal',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(1)
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = [
            { name: '零售分析', data: [] }]
          if (res.data.list.retaildeal) {
            for (let i = 0; i < res.data.list.retaildeal.length; i++) {
              // arr.push(res.data.list.debtdeal[i].date)
              // arr1[0].data.push(res.data.list.debtdeal[i].arrearadd.indexOf(',') != -1 ? Number(res.data.list.debtdeal[i].arrearadd.split(',')[0] + res.data.list.debtdeal[i].arrearadd.split(',')[1]) : Number(res.data.list.debtdeal[i].arrearadd))
            }
            // self.pieShow('business7', arr, arr1)
          }
        }
      }
    })
  },
  getexpenditure(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/report/PayOutInfo',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = []
          if (res.data.list) {
            // for (let i = 0; i < res.data.list.length; i++) {
            //   arr1.push({ name: res.data.list[i].area, data: Number(res.data.list[i].scount) })
            // }
            // self.pieShow('expenditure1',arr, arr1)
          }
          self.setData({
            expenditure_total: res.data.totalcount
          })
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/PayOutDetail',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = []
          if (res.data.list) {
            // for (let i = 0; i < res.data.list.length; i++) {
            //   arr1.push({ name: res.data.list[i].area, data: Number(res.data.list[i].scount) })
            // }
            // self.pieShow('expenditure1',arr, arr1)
          }
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/report/PayInfoDetail',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(1)
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = []
          if (res.data.list) {
            // for (let i = 0; i < res.data.list.length; i++) {
            //   arr1.push({ name: res.data.list[i].area, data: Number(res.data.list[i].scount) })
            // }
            // self.pieShow('expenditure1',arr, arr1)
          }
        }
      }
    })
  },
  getvisit(){

  },
  getchain(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/report/chainclinic',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(1)
        console.log(res)
        if (res.data.info == 'ok') {
          if(res.data.list){
            let arr = []
            let arr1 = []
            let total = 0
            for(let i = 0;i<res.data.list.length;i++){
              arr.push(res.data.list[i].clinicname)
              arr1.push({ name: '', type: 'bar', data: [res.data.list[i].totalfee]})
              total += res.data.list[i].totalfee
            }
            total = [total]
            self.setData({
              chain1: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {

                    grid: {
                      left: '10%',
                      right: '10%',
                      bottom: '10%',
                      containLabel: true
                    },
                    color: ['#c2d4ff', '#8ca8ec', '#e7bce2'],
                    xAxis: [
                      {
                        type: 'category',
                        "axisLabel": {
                          interval: 0,
                          rotate: 40
                        },
                        boundaryGap: true,
                        data: ['总额']
                      }
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        min: 0,
                        boundaryGap: [0.2, 0.2]
                      }
                    ],
                    series: [
                      {
                        name: '总额',
                        type: 'bar',
                        data: total
                      }
                    ]
                  };

                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '收入总额', showdata: true });
                  })
                  return chart;
                }
              },
              chain2: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {

                    grid: {
                      left: '10%',
                      right: '10%',
                      bottom: '10%',
                      containLabel: true
                    },
                    color: ['#cbe7a7'],
                    xAxis: [
                      {
                        type: 'category',
                        boundaryGap: true,
                        data: arr
                      },
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        min: 0
                      }
                    ],
                    series: arr1
                  };
                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '各诊所收入占比', showdata: true });
                  })
                  return chart;
                }
              }
            })
          }
        }
      }
    })
    wx.request({
      url: getApp().data.APIS + '/report/chainfirstpatient',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        clinicid: self.data.clinicid,
        begindate: self.data.begindate,
        enddate: self.data.enddate,
        flag: self.data.check_num == 0 ? 'day' : 'month'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(1)
        console.log(res)
        if (res.data.info == 'ok') {
          if (res.data.list) {
            let arr = []
            let arr1 = []
            let arr2 = []
            let arr3 = []
            for (let i = 0; i < res.data.list.length; i++) {
              arr.push(res.data.list[i].clinicname)
              arr1.push({ name: '', type: 'bar', data: [res.data.list[i].first] })
              arr2.push({ name: '', type: 'bar', data: [res.data.list[i].visit] })
              arr3.push({ name: '', type: 'bar', data: [res.data.list[i].newvisit] })
            }
            self.setData({
              chain3: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {

                    grid: {
                      left: '10%',
                      right: '10%',
                      bottom: '10%',
                      containLabel: true
                    },
                    color: ['#cbe7a7'],
                    xAxis: [
                      {
                        type: 'category',
                        boundaryGap: true,
                        data: arr
                      },
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        min: 0
                      }
                    ],
                    series: arr1
                  };
                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '初诊人次占比', showdata: true });
                  })
                  return chart;
                }
              },
              chain4: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {

                    grid: {
                      left: '10%',
                      right: '10%',
                      bottom: '10%',
                      containLabel: true
                    },
                    color: ['#cbe7a7'],
                    xAxis: [
                      {
                        type: 'category',
                        boundaryGap: true,
                        data: arr
                      },
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        min: 0
                      }
                    ],
                    series: arr2
                  };
                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '复诊人次占比', showdata: true });
                  })
                  return chart;
                }
              },
              chain5: {
                onInit: function (canvas, width, height, dpr) {
                  const chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr // new
                  });
                  var option = {

                    grid: {
                      left: '10%',
                      right: '10%',
                      bottom: '10%',
                      containLabel: true
                    },
                    color: ['#cbe7a7'],
                    xAxis: [
                      {
                        type: 'category',
                        boundaryGap: true,
                        data: arr
                      },
                    ],
                    yAxis: [
                      {
                        type: 'value',
                        min: 0
                      }
                    ],
                    series: arr3
                  };
                  chart.setOption(option);
                  chart.on('click', function (params) {
                    self.setData({ popup_title: '新诊人次占比', showdata: true });
                  })
                  return chart;
                }
              }
            })
          }
        }
      }
    })
  },
  getdata(){
    if(this.data.title == '每日看板'){
      this.getDaily()
    } else if (this.data.title == '就诊分析'){
      this.getattendance()
    } else if (this.data.title == '预约分析') {
      this.getorder()
    } else if (this.data.title == '电网分析') {
      this.getpower()
    } else if (this.data.title == '市场分析') {
      this.getmarket()
    } else if (this.data.title == '咨询分析') {
      this.getconsult()
    } else if (this.data.title == '诊疗分析') {
      this.getconsulting()
    } else if (this.data.title == '营业分析') {
      this.getbusiness()
    } else if (this.data.title == '支出分析') {
      this.getexpenditure()
    } else if (this.data.title == '回访分析') {
      this.getvisit()
    } else if (this.data.title == '连锁分析') {
      this.getchain()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    this.setData({
      title: options.title,
      // clinicid: prevPage.data.clinicid ? prevPage.data.clinicid:''
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