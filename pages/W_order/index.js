// pages/W_order/index.js
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '康牙医生',
    name:'',
    iphone:'',
    bz:'',
    show:false,
    check_num:0,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    columns: ['8:00~10:00', '10:00~12:00', '14:00~16:00', '16:00~18:00'],
    columns_timeslot: ['8:00~10:00', '10:00~12:00', '14:00~16:00', '16:00~18:00'],
    columns_project: ['牙齿种植', '牙齿矫正', '根管治疗', '牙齿美容'],
    columns_doctor: ['默认医生'],
    check_time: '',
    check_timeslot: '',
    check_project: '',
    check_doctor: '',
    doctorid: ''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  btn() {
    var tpl = {
      'schclinicid': this.data.clinicid,
      'customerid': '',
      'name': '',
      'clinicid': this.data.clinicid,
      'patientid': '',
      'phone': '',
      'wechatid': '',
      'phone1': '',
      'phonevestee1': '本人',
      'phonevestee2': '本人',
      'age': '',
      'sex': '',
      'birthday1': ' --',
      'openid': '',
      'ComeFrom': '网络咨询',
      'ComeFrom2': ' ',
      'ComeFrom2pid': '网络咨询',
      'ComeFrom3': '',
      'ComeFrom3pid': '',
      'schedule[datestr]': '',
      'schedule[starttime]': '',
      'schedule[endtime]': '',
      'schedule[items]': '',
      'schedule[doctorid]': '',
      'schedule[doctorname]': '',
      'schedule[visitstatus]': ' 1',
      'schedule[scheduleidentity]': ' ',
      'schedule[schedulemanid]': '',
      'schedule[scheduleman]': '',
      'schedule[remark]': '',
      'schedule[scServerID]': ''
    }
    var d = this.data
    var xdata = {
      'schedule[datestr]': d.check_time,
      'name': d.name,
      'schedule[remark]':d.bz,
      'phone': d.iphone,
      'openid': wx.getStorageSync('token'),
      'schedule[starttime]': d.check_timeslot.split("~")[0].split(":")[0],
      'schedule[endtime]': d.check_timeslot.split("~")[1].split(":")[0],
      'schedule[items]': d.check_project,
      'schedule[doctorid]': d.doctorid,
      'schedule[doctorname]': d.check_doctor
    }
    for (var o in xdata) {
      tpl[o] = xdata[o]
    }
    console.log(123)
    console.log(getApp())
    wx.request({
      url: getApp().data.APIS + '/schedule/scsaveschedule',
      method: "post",
      data: tpl,
      header: {
        "token": wx.getStorageSync('token'),
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(res)
        Toast('预约成功~');
        setTimeout(function() {
          wx.navigateBack({
            delta: 1,
          })
        }, 1000)
      }
    });
  },
  nameipt(e){
    console.log(e.detail.value)
    this.setData({ name: e.detail.value })
  },
  phoneipt(e) {
    console.log(e.detail.value)
    this.setData({ iphone: e.detail.value })
  },
  bzipt(e) {
    console.log(e.detail.value)
    this.setData({ bz: e.detail.value })
  },
  showpoup(e){
    this.setData({ check_num: e.currentTarget.dataset.index, show: true })
    if (this.data.check_num == 1) {
      this.setData({
        columns: this.data.columns_timeslot
      });
    } else if (this.data.check_num == 2) {
      this.setData({
        columns: this.data.columns_project_value
      });
    } else if (this.data.check_num == 3) {
      this.setData({
        columns: this.data.columns_doctor_value
      });
    }
  },
  onClose() {
    this.setData({ show: false })
  },
  onConfirm(event) {
    this.setData({
      currentDate: event.detail,
      show: false,
      check_time: this.timestampToTime(event.detail)
    });
  },
  onConfirm1(event) {
    console.log(event)
    if(this.data.check_num==1){
      this.setData({
        check_timeslot: event.detail.value,
        show: false
      });
    } else if (this.data.check_num == 2){
      this.setData({
        check_project: event.detail.value,
        show: false
      });
    } else if (this.data.check_num == 3) {
      this.setData({
        check_doctor: event.detail.value,
        show: false,
        doctorid:this.data.columns_doctor[event.detail.index].doctorid
      });
    }
  },
  onCancel() {
    this.setData({ show: false });
  },
  timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D;
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/VWeb/ServerGet',
      method: 'post',
      data: {
        "clinicid": self.data.clinicid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(111)
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          for(let i = 0;i<res.data.list.length;i++){
            arr.push(res.data.list[i].servicesname)
          }
          self.setData({
            columns_project: res.data.list,
            columns_project_value:arr
          })
        }
      }
    })
    wx.request({
      url: getApp().data.APIS + '/VWeb/DoctorGet',
      method: 'post',
      data: {
        "clinicid": self.data.clinicid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(111)
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          for (let i = 0; i < res.data.list.length; i++) {
            arr.push(res.data.list[i].doctorname)
          }
          self.setData({
            columns_doctor: res.data.list,
            columns_doctor_value: arr
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ 
      title: options.title,
      check_doctor: options.doctorname ? options.doctorname : '',
      check_project: options.servicesname ? options.servicesname : '',
      clinicid: wx.getStorageSync('clinicid') ? wx.getStorageSync('clinicid') : ''
    })
    wx.setNavigationBarTitle({
      title: options.title?options.title:''
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