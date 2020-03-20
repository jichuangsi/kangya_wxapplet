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
    expenditure_total:''
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
  pieShow(name,time,data) {
    let self = this
    let pie = {
      canvasId: 'pieGraph' + name, // canvas-id
      type: 'column', // 图表类型，可选值为pie, line, column, area, ring
      width: 330,
      height: 300,
      animation: true,
      categories: time,
      series: data,
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
  },
  pieShow1(name, data) {
    let self = this
    let pie = {
      canvasId: 'pieGraph' + name, // canvas-id
      type: 'pie', // 图表类型，可选值为pie, line, column, area, ring
      width: 330,
      height: 300,
      series: data,
      dataLabel: true,
      animation: true,
    };
    new CHARTS(pie);
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
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = [
            { name: '初诊人次', data: [] },
            { name: '流失人次', data: [] }
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
              total.visit += res.data.list.firstvisit[k].num
            }
            self.pieShow('attendance1', arr, arr1)
            self.pieShow('attendance2', arr, arr2)
          }else{
            total={
              visit:0,
              lost:0,
              free:0
            }
          }
          self.setData({
            attendance_total1: total
          })
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
        console.log(2)
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
            self.pieShow('attendance3', arr, arr1)
          } else {
            total = {
              visit: 0,
              free: 0
            }
          }
          self.setData({
            attendance_total2: total
          })
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
            { name: '流失人次', data: [] }
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
              total.visit += res.data.list.newvisit[k].num
            }
          self.pieShow('attendance4', arr, arr1)
          self.pieShow('attendance5', arr, arr2)
          } else {
            total = {
              visit: 0,
              lost: 0,
              free: 0
            }
          }
          self.setData({
            attendance_total3: total
          })
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
            self.pieShow('order1', arr, arr1)
          } else {
            total = {
              visit: 0
            }
          }
          self.setData({
            order_total1: total
          })
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
            { name: '未到', data: [] },
            { name: '到达', data: [] },
            { name: '失约', data: [] }
          ]
          if (res.data.list) {
            for (let i = 0; i < res.data.list.length; i++) {
              if (res.data.list[i].status == '3') {
                arr1[1].data= res.data.list[i].num
              } else if (res.data.list[i].status == '2') {
                arr1[2].data= res.data.list[i].num
              } else if (res.data.list[i].status == '1') {
                arr1[0].data= res.data.list[i].num
              }
            }
            self.pieShow1('order2', arr1)
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
            self.pieShow('order3', arr, arr1)
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
            self.pieShow('order4', arr, arr1)
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
            { name: '初诊', data: [] },
            { name: '复诊', data: [] }
          ]
          if (res.data.list) {
            for (let i = 0; i < res.data.list.length; i++) {
              if (res.data.list[i].visitstatus == '0') {
                arr1[1].data = res.data.list[i].num
              } else if (res.data.list[i].visitstatus == '1') {
                arr1[0].data = res.data.list[i].num
              }
            }
            self.pieShow1('order5', arr1)
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
              arr1.push({ name: res.data.list[i].visitnum, data: res.data.list[i].num})
            }
            self.pieShow1('order6', arr1)
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
              { name: '电网预约' + res.data.list.scount+'人', data: res.data.list.scount }, 
              { name: '到院就诊' + res.data.list.ccount + '人', data: res.data.list.ccount },
              { name: '成交金额' + res.data.list.afee, data: res.data.list.afee.indexOf(',') != -1 ? Number(res.data.list.afee.split(',')[0] + res.data.list.afee.split(',')[1]) : Number(res.data.list.afee)},
            ]
            self.pieShow1('power2', arr1)
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
              arr1.push({ name: res.data.list[i].area, data: Number(res.data.list[i].scount) })
            }
            self.pieShow1('market1', arr1)
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
              { name: '17-30岁', data: Number(res.data.list[0].lage) + Number(res.data.list[0].lastage) + Number(res.data.list[0].lsage)},
              { name: '31-50岁', data: Number(res.data.list[0].mage) + Number(res.data.list[0].sage) + Number(res.data.list[0].smallage) }
            ]
            self.pieShow1('market2', arr1)
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
              { name: '性别分布', data: [res.data.list[0].mcount, res.data.list[0].ncount, res.data.list[0].wcount] }
            ]
            self.pieShow('market3', arr, arr1)
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
            self.pieShow('market4', arr, arr1)
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
              arr1.push({ name: res.data.list[i].item, data: res.data.list[i].num })
            }
            self.pieShow1('market6', arr1)
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
            self.pieShow('market7',arr, arr1)
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
            self.pieShow('market9',arr, arr1)
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
            self.pieShow('business1', arr, arr1)
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
              { name: '预交款', data: Number(res.data.list.advancerate.split('%')[0]) },
              { name: '诊所收入', data: Number(res.data.list.incomerate.split('%')[0]) },
              { name: '会员卡', data: Number(res.data.list.viprate.split('%')[0]) },
            ]
            self.pieShow1('business2', arr1)
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
            self.pieShow('business3', arr, arr1)
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
            { name: '预交款分析', data: [] }]
          if (res.data.list.advancepaydeal) {
            for (let i = 0; i < res.data.list.advancepaydeal.length; i++) {
              arr.push(res.data.list.advancepaydeal[i].date)
              arr1[0].data.push(res.data.list.advancepaydeal[i].payfee)
            }
            self.pieShow('business4', arr, arr1)
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
        console.log(1)
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = [
            { name: '预交款分析', data: [] }]
          if (res.data.list.debtdeal) {
            for (let i = 0; i < res.data.list.debtdeal.length; i++) {
              arr.push(res.data.list.debtdeal[i].date)
              arr1[0].data.push(res.data.list.debtdeal[i].arrearadd.indexOf(',')!=-1 ? Number(res.data.list.debtdeal[i].arrearadd.split(',')[0] + res.data.list.debtdeal[i].arrearadd.split(',')[1]) : Number(res.data.list.debtdeal[i].arrearadd))
            }
            self.pieShow('business5', arr, arr1)
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
        console.log(res)
        if (res.data.info == 'ok') {
          if(res.data.list){
            let arr = []
            let arr1 = [
              {'name':'总额',data:[]}
            ]
            for(let i = 0;i<res.data.list.length;i++){
              arr.push(res.data.list[i].clinicname)
              arr1[0].data.push(res.data.list[i].totalfee)
            }
            self.pieShow('chain1', arr, arr1)
            self.pieShow('chain2', arr, arr1)
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
            let arr1 = [
              { 'name': '收入总额', data: [] }
            ]
            // for (let i = 0; i < res.data.list.length; i++) {
            //   arr.push(res.data.list[i].clinicname)
            //   arr1[0].data.push(res.data.list[i].totalfee)
            // }
            // self.pieShow('chain1', arr, arr1)
            // self.pieShow('chain2', arr, arr1)
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