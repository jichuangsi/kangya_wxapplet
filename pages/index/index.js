//index.js
//获取应用实例
const app = getApp()
let Charts = require('../../data/wxcharts-min.js');



Page({
  data: {
    show: false, 
    name:'广州大一口腔门诊',
    chats:true,
    id:'',
    achievement_arr: [
      { title: "今日", money: "0.00" },
      { title: "本月", money: "0.00" },
      { title: "本年", money: "0.00" }
    ],
    Hospital_arr: [],
    nav_arr:[],
    moneystatus:false,
    borderstate:false,
    showleft:false,
    Worktoday: 0,
    Tomorroworder: 0,
    Historyarrears: 0,
    user:'',
    day_arr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    month_arr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    year_arr: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    power_arr:[],
    shopshow:'',
    yjstate:true,
    clinicid:'',
    logo:'',
    worker_nav:[],
    tokenState:false,
    banner_arr:[]
  },
  
  //事件处理函数
  showPopup() {
    this.setData({ show: true, chats:false });
    console.log(this.data.chats)
  },

  onClose() {
    this.setData({ show: false, chats: true });
    console.log(this.data.chats)
  },
  showPopupleft() {
    this.setData({ showleft: true, chats: false });
  },
  
  onCloseleft() {
    this.setData({ showleft: false, chats: true });
  },
  moneystatusclick(){
    console.log(this.data.moneystatus)
    this.setData({ moneystatus: !this.data.moneystatus });
  },
  saoclick(){
    var _this = this;
    _this.setData({ showleft: false });
    wx.scanCode({        //扫描API
      success: function (res) {
        console.log(res);    //输出回调信息
        // wx.showToast({
        //   title: '成功',
        //   duration: 2000
        // })
        _this.wxcode(res.result.split('ticket=')[0])
      }
    })
  },
  wxcode(qrcode) {
    //*************************放在扫码登录界面******************************** */
    var that = this;
    var xdata = getApp().data
    wx.login({
      // 调用 login 获取 code
      success: function (res) {
        var code = res.code;
        wx.getUserInfo({
          // 调用 getUserInfo 获取 encryptedData 和 iv
          success: function (res) {
            // success
            xdata.userInfo = res.userInfo;
            var encryptedData = res.encryptedData || 'encry';
            var iv = res.iv || 'iv';
            wx.request({ // 发送请求 获取 jwt
              url: xdata.APIS + '/svc/a',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                plugin: 'wxcode',
                qrcode: qrcode,
                code: code,
                username: encryptedData,
                password: iv,
                grant_type: "password",
                auth_approach: 'wxapp',
              },
              method: "POST",
              success: function (res) {
                if (res.statusCode === 200) {
                  wx.navigateTo({
                    url: '/pages/Relationclinic/index?state=1&&clinicnum=' + res.data.list[0].clinic,
                  })
                } else {
                  // 如果没有注册调用注册接口
                  // 提示错误信息
                  wx.showToast({
                    title: res.data.text,
                    icon: 'success',
                    duration: 2000
                  });
                  wx.navigateTo({
                    url: '/pages/Relationclinic/index?state=0',
                  })
                }
              },
              fail: function (res) {
                console.log('request token fail');
              }
            })
          },
          fail: function (res) {
            console.log('request token fail');
          }
        })
      }
    });
  },
  shopinggo(){
    wx.navigateToMiniProgram({
      appId: 'wx6692a7dc586f5a61', // 要跳转的小程序的appid
      path: 'pages/test/test', // 跳转的目标页面
      extarData: {
      },
      success(res) {
        // 打开成功  
      },
      fail(err){
        console.log(err)
      }
    }) 
  },
  Workbenchgo() {
    wx.navigateTo({
      url: '../Workbench/index',
    })
  },
  qrcodego(){
    wx.navigateTo({
      url: '../QRCode/index?title=诊所二维码&&state=0',
    })
    this.setData({ showleft: false, chats: true });
  },
  Worktodaygo(){
    wx.navigateTo({
      url: '../Worktoday/index',
    })
  },
  addgo(){
    wx.navigateTo({
      url: '../AddPatient/index',
    })
    this.setData({ showleft: false, chats: true });
  },
  addordergo(){
    wx.navigateTo({
      url: '../orderedit/index?title=添加预约',
    })
    this.setData({ showleft: false, chats: true });
  },
  addvisitgo() {
    wx.navigateTo({
      url: '../visitedit/index?title=添加回访',
    })
    this.setData({ showleft: false, chats: true });
  },
  ordergo(){
    wx.navigateTo({
      url: '../order/index?title=明日预约',
    })
  },
  Arrearsgo() {
    wx.navigateTo({
      url: '../Arrears/index',
    })
  },
  yjgo(e){
    if (this.data.power_arr.code10802.has){
      wx.navigateTo({
        url: '../../component/pages/achievement/index?state=' + e.currentTarget.dataset.index,
      })
    } else {
      wx.navigateTo({
        url: '../../component/pages/achievement/index?user=' + this.data.user.userid + '&&state=' + e.currentTarget.dataset.index,
      })
    }
  },
  Hospital_click(e){
    console.log(e.currentTarget.dataset.name)
    this.setData({ 
      name: e.currentTarget.dataset.name, 
      id: e.currentTarget.dataset.id, 
      clinicid: e.currentTarget.dataset.id,
      logo: e.currentTarget.dataset.logo,
    })
    wx.setStorageSync('clinicid', e.currentTarget.dataset.id)
  },
  getdata(){
    let self = this
    wx.request({
      // /market/massage/BaseData
      url: getApp().data.APIS +'/svc/a',
      header: {
        'token':wx.getStorageSync('token')
      },
      data:{
        plugin:'clientInfo',
        p:''
      },
      success:function(res){
        if(res.data.info == 'ok'){
          self.setData({
            Hospital_arr: res.data.list,
            name: res.data.list[0].clinicName,
            logo: res.data.list[0].logo,
            id: res.data.list[0].clinicid,
            clinicid: res.data.list[0].clinicid
          })
          wx.setStorageSync('clinicid', res.data.list[0].clinicid)
          let date = new Date();
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
          let bengindate= year + '/' + month + '/' +'01'
          let enddate = year + '/' + month+1 + '/' + '01'
          self.getswiper(res.data.list[0].clinicid, bengindate, enddate)
          self.getcharts(res.data.list[0].clinicid)
        }
      }
    })
  },
  getnav() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method:'get',
      data:{
        plugin: 'gethomedf',
        p: '1'
      },
      header: {
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(512346)
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            worker_nav:res.data.list[0]
          })
        }
      }
    })
  },
  getswiper(id, bengindata, enddate) {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/report/studyinfo',
      method:'post',
      data:{
        clinkid:id,
        bengindate: bengindata,
        enddate: enddate
      },
      header: {
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            
          })
        }
      }
    })
  },
  getPerinfo() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/member/Perinfo',
      method: 'post',
      header: {
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(1)
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            user:res.data.list[0]
          })
          // self.getrole1(res.data.list[0].userid)
          self.getrole(res.data.list[0].userid)
        }
      }
    })
  },
  gettotal() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/homepagelefttotal',
      method: 'post',
      data: {
        doctorid: '',
        indexlsit: '1,2,3,4,5,6,7,8'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            Worktoday: res.data.list[0].studycount,
            Tomorroworder: res.data.list[0].netschcount,
          })
        }
      }
    })
    wx.request({
      url: getApp().data.APIS + '/patient/homepagetotal',
      method: 'post',
      data: {
        doctorid: '',
        indexlsit: '1,2,3,4,5,6'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
          })
        }
      }
    })
  },
  getcharts(id){
    let self = this
    let date = new Date()
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    console.log(day)
    wx.request({
      url: getApp().data.APIS + '/report/chainclinicday',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        "data[clinicid]": id,
        "data[begindate]": year +'/'+ month+'/01',
        "data[enddate]": year + '/' + month + '/31',
        "data[flag]": ''
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          if (res.data.list) {
            let a_arr = self.data.achievement_arr
            let price = 0
            let arr = self.data.day_arr
            let arr1 = self.data.month_arr
            for (let i = 0; i < res.data.list.length; i++) {
              if (res.data.list[i].date.split('-')[2] == day){
                arr[day - 1] = res.data.list[i].totalfee
                a_arr[0].money = res.data.list[i].totalfee
              }
              arr1[Number(res.data.list[i].date.split('-')[2]) - 1] = res.data.list[i].totalfee
              price += res.data.list[i].totalfee
            }
            a_arr[1].money = price
            self.setData({
              day_arr: arr,
              month_arr: arr1,
              achievement_arr: a_arr
            })
            for(let j = 0;j<arr.length;j++){
              if (arr[j] > 0) {
                self.getdaycharts()
              }
            }
            for (let k = 0; k < arr1.length; k++) {
              if (arr1[k] > 0) {
                self.getmonthcharts()
              }
            }
          }
        }
      }
    })
    wx.request({
      url: getApp().data.APIS + '/report/chainclinicday',
      method: 'post',
      data: {
        pageno: 1,
        pagesize: 10,
        "data[clinicid]": id,
        "data[begindate]": year + '/1/1',
        "data[enddate]": year+1 + '/1/1',
        "data[flag]": 'year'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          if (res.data.list) {
            let y_arr = self.data.achievement_arr
            let y_price = 0
            let arr2 = self.data.year_arr
            for (let i = 0; i < res.data.list.length; i++) {
              arr2[Number(res.data.list[i].date.split('-0')[1]) - 1] = res.data.list[i].totalfee
              y_price += res.data.list[i].totalfee
            }
            y_arr[2].money = y_price
            self.setData({
              year_arr: arr2,
              achievement_arr: y_arr
            })
            for (let q = 0; q < arr2.length; q++) {
              if (arr2[q] > 0) {
                self.getyearcharts()
              }
            }
          }
        }
      }
    })
  },
  getdaycharts(){
    let self =this
    new Charts({
      canvasId: 'canvas0',
      type: 'area',
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
      series: [{
        name: '',
        data: self.data.day_arr,
        color: '#01c7b5',
        format: function (val) {
          return '';
        }
      }],
      background: 'transparent',
      legend: false,
      dataPointShape:false,
      xAxis: {
        fontColor: 'transparent',
        gridColor: 'transparent',
        format: function (val) {
          return '';
        }
      },
      yAxis: {
        disabled: false,
        min: 0,
        gridColor: 'transparent',
        format: function (val) {
          return '';
        }
      },
      width: 440,
      height: 220
    });
  },
  getmonthcharts() {
    let self = this
    new Charts({
      canvasId: 'canvas1',
      type: 'area',
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
      series: [{
        name: '',
        data: self.data.month_arr,
        color: '#01c7b5',
        format: function (val) {
          return '';
        }
      }],
      background: 'transparent',
      legend: false,
      dataPointShape: false,
      xAxis: {
        fontColor: 'transparent',
        gridColor: 'transparent',
        format: function (val) {
          return '';
        }
      },
      yAxis: {
        disabled: false,
        min: 0,
        gridColor: 'transparent',
        format: function (val) {
          return '';
        }
      },
      width: 440,
      height: 220
    });
  },
  getyearcharts() {
    let self = this
    new Charts({
      canvasId: 'canvas2',
      type: 'area',
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      series: [{
        name: '',
        data: self.data.year_arr,
        color: '#01c7b5',
        format: function (val) {
          return '';
        }
      }],
      background: 'transparent',
      legend: false,
      dataPointShape: false,
      xAxis: {
        fontColor: 'transparent',
        gridColor: 'transparent',
        format: function (val) {
          return '';
        }
      },
      yAxis: {
        disabled: false,
        min: 0,
        gridColor: 'transparent',
        format: function (val) {
          return '';
        }
      },
      width: 440,
      height: 220
    });
  },
  getrole1(id, role) {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'setrole',
        p: '管理员'
      },
      header: {
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(2)
        console.log(res)
        if (res.data.info == 'ok') {
        }
      }
    })
  },
  getrole(id,role) {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'getmodulerole',
        p: id + '|' + (role ? role : '护士')
      },
      header: {
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(2)
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let a = {
          }
          let c = {}
          for(let i = 0; i<res.data.list.length;i++){
            if (res.data.list[i].groupname.indexOf('app') != -1) {
              a = {
                code10001: a.code10001 ? a.code10001 : res.data.list[res.data.list[i].code.indexOf('10001')!=-1?i:999],
                code10603: a.code10603 ? a.code10603 : res.data.list[res.data.list[i].code.indexOf('10603')!=-1?i:999],
                code10605: a.code10605 ? a.code10605 : res.data.list[res.data.list[i].code.indexOf('10605') != -1 ? i : 999],
                code10606: a.code10606 ? a.code10606 : res.data.list[res.data.list[i].code.indexOf('10606') != -1 ? i : 999],
                code10607: a.code10607 ? a.code10607 : res.data.list[res.data.list[i].code.indexOf('10607') != -1 ? i : 999],
                code10608: a.code10608 ? a.code10608 : res.data.list[res.data.list[i].code.indexOf('10608') != -1 ? i : 999],
                code10609: a.code10609 ? a.code10609 : res.data.list[res.data.list[i].code.indexOf('10609') != -1 ? i : 999],
                code10610: a.code10610 ? a.code10610 : res.data.list[res.data.list[i].code.indexOf('10610') != -1 ? i : 999],
                code10701: a.code10701 ? a.code10701 : res.data.list[res.data.list[i].code.indexOf('10701')!= -1 ? i : 999],
                code10702: a.code10702 ? a.code10702 : res.data.list[res.data.list[i].code.indexOf('10702')!= -1 ? i : 999],
                code10703: a.code10703 ? a.code10703 : res.data.list[res.data.list[i].code.indexOf('10703')!= -1 ? i : 999],
                code10704: a.code10704 ? a.code10704 : res.data.list[res.data.list[i].code.indexOf('10704')!= -1 ? i : 999],
                code10706: a.code10706 ? a.code10706 : res.data.list[res.data.list[i].code.indexOf('10706')!= -1 ? i : 999],
                code10707: a.code10707 ? a.code10707 : res.data.list[res.data.list[i].code.indexOf('10707')!= -1 ? i : 999],
                code10801: a.code10801 ? a.code10801 : res.data.list[res.data.list[i].code.indexOf('10801')!= -1 ? i : 999],
                code10802: a.code10802 ? a.code10802 : res.data.list[res.data.list[i].code.indexOf('10802')!= -1 ? i : 999],
                code10803: a.code10803 ? a.code10803 : res.data.list[res.data.list[i].code.indexOf('10803')!= -1 ? i : 999],
                code10901: a.code10901 ? a.code10901 : res.data.list[res.data.list[i].code.indexOf('10901')!= -1 ? i : 999],
                code10002: a.code10002 ? a.code10002 : res.data.list[res.data.list[i].code.indexOf('10002')!= -1 ? i : 999],
                code10604: a.code10604 ? a.code10604 : res.data.list[res.data.list[i].code.indexOf('10604')!= -1 ? i : 999],
                code10705: a.code10705 ? a.code10705 : res.data.list[res.data.list[i].code.indexOf('10705')!= -1 ? i : 999],
                code10602: a.code10602 ? a.code10602 : res.data.list[res.data.list[i].code.indexOf('10602')!= -1 ? i : 999],
                code10303: a.code10303 ? a.code10303 : res.data.list[res.data.list[i].code.indexOf('10303')!= -1 ? i : 999],
                code10103: a.code10103 ? a.code10103 : res.data.list[res.data.list[i].code.indexOf('10103')!= -1 ? i : 999],
                code10601: a.code10601 ? a.code10601 : res.data.list[res.data.list[i].code.indexOf('10601')!= -1 ? i : 999],
                code10102: a.code10102 ? a.code10102 : res.data.list[res.data.list[i].code.indexOf('10102')!= -1 ? i : 999],
                code10101: a.code10101 ? a.code10101 : res.data.list[res.data.list[i].code.indexOf('10101')!= -1 ? i : 999],
                code10009: a.code10009 ? a.code10009 : res.data.list[res.data.list[i].code.indexOf('10009')!= -1 ? i : 999],
                code10008: a.code10008 ? a.code10008 : res.data.list[res.data.list[i].code.indexOf('10008')!= -1 ? i : 999],
                code10007: a.code10007 ? a.code10007 : res.data.list[res.data.list[i].code.indexOf('10007')!= -1 ? i : 999],
                code10006: a.code10006 ? a.code10006 : res.data.list[res.data.list[i].code.indexOf('10006')!= -1 ? i : 999],
                code10005: a.code10005 ? a.code10005 : res.data.list[res.data.list[i].code.indexOf('10005')!= -1 ? i : 999],
                code10004: a.code10004 ? a.code10004 : res.data.list[res.data.list[i].code.indexOf('10004')!= -1 ? i : 999],
                code10104: a.code10104 ? a.code10104 : res.data.list[res.data.list[i].code.indexOf('10104')!= -1 ? i : 999],
                code10301: a.code10301 ? a.code10301 : res.data.list[res.data.list[i].code.indexOf('10301')!= -1 ? i : 999],
                code10302: a.code10302 ? a.code10302 : res.data.list[res.data.list[i].code.indexOf('10302')!= -1 ? i : 999],
                code10201: a.code10201 ? a.code10201 : res.data.list[res.data.list[i].code.indexOf('10201')!= -1 ? i : 999],
                code10304: a.code10304 ? a.code10304 : res.data.list[res.data.list[i].code.indexOf('10304')!= -1 ? i : 999],
                code10405: a.code10405 ? a.code10405 : res.data.list[res.data.list[i].code.indexOf('10405')!= -1 ? i : 999],
                code10503: a.code10503 ? a.code10503 : res.data.list[res.data.list[i].code.indexOf('10503')!= -1 ? i : 999],
                code10502: a.code10502 ? a.code10502 : res.data.list[res.data.list[i].code.indexOf('10502')!= -1 ? i : 999],
                code10501: a.code10501 ? a.code10501 : res.data.list[res.data.list[i].code.indexOf('10501')!= -1 ? i : 999],
                code10305: a.code10305 ? a.code10305 : res.data.list[res.data.list[i].code.indexOf('10305')!= -1 ? i : 999],
                code10406: a.code10406 ? a.code10406 : res.data.list[res.data.list[i].code.indexOf('10406')!= -1 ? i : 999],
                code10407: a.code10407 ? a.code10407 : res.data.list[res.data.list[i].code.indexOf('10407')!= -1 ? i : 999],
                code10404: a.code10404 ? a.code10404 : res.data.list[res.data.list[i].code.indexOf('10404')!= -1 ? i : 999],
                code10403: a.code10403 ? a.code10403 : res.data.list[res.data.list[i].code.indexOf('10403')!= -1 ? i : 999],
                code10402: a.code10402 ? a.code10402 : res.data.list[res.data.list[i].code.indexOf('10402')!= -1 ? i : 999],
                code10401: a.code10401 ? a.code10401 : res.data.list[res.data.list[i].code.indexOf('10401')!= -1 ? i : 999],
                code10003: a.code10003 ? a.code10003 : res.data.list[res.data.list[i].code.indexOf('10003')!= -1 ? i : 999],
              }
            } else if (res.data.list[i].code == '30000'){
              c = res.data.list[i]
            }
          }
          a.code30000 = c
          console.log(a)
          let b = true
          if (a.code10802.has){
            b = true
          } else {
            b = false
          }
          self.setData({
            power_arr:a,
            yjstate: b
          })
        }
      }
    })
  },
  getbanner(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'getcartdoc',
        p: '5996939',
      },
      header: {
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(3333)
        console.log(res)
        if (res.data.info == 'ok') {
          // self.getshop()
          self.setData({
            banner_arr:res.data.list[0].content
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self =this
    self.getdata()
    self.getPerinfo()
    self.gettotal()
    self.getnav()
    self.getbanner()
    wx.request({
      url: getApp().data.API+'/index.json',
      headers: {
        'Content-Type': 'application/json', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        // console.log(res.data)
        if (res.data.result == 200){
          self.setData({
            nav_arr: res.data.nav_arr
          })
        }
      },
    })
    self.setData({
      tokenState:wx.getStorageSync('token')?true:false
    })
  },
  bindViewTap: function() {
  },
})
