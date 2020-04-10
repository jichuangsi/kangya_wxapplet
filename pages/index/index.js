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
    shopshow:''
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
        wx.showToast({
          title: '成功',
          duration: 2000
        })
      }
    })
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
      url: '../QRCode/index',
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
  Hospital_click(e){
    console.log(e.currentTarget.dataset.name)
    this.setData({ name: e.currentTarget.dataset.name, id: e.currentTarget.dataset.id })
  },
  getdata(){
    let self = this
    wx.request({
      url: getApp().data.APIS +'/market/massage/BaseData',
      success:function(res){
        console.log(res)
        if(res.data.info == 'ok'){
          self.setData({
            Hospital_arr:res.data.list,
            id: res.data.list[0].clinicid
          })
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
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            user:res.data.list[0]
          })
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
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
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
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
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
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
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
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
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
        color: '#02ada0',
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
        color: '#02ada0',
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
        color: '#02ada0',
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
  getrole(id,role) {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'getmodulerole',
        p: id + '|' + (role ? role : '管理员')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let a = ''
          for(let i = 0; i<res.data.list.length;i++){
            if (res.data.list[i].groupname.indexOf('app')!=-1){
              arr.push(res.data.list[i])
              if (res.data.list[i].code == '10901'){
                a = res.data.list[i]
              }
            }
          }
          console.log(arr)
          self.setData({
            power_arr:arr,
            shopshow:a
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
    wx.request({
      url: getApp().data.API+'/index.json',
      headers: {
        'Content-Type': 'application/json'
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

  },
  bindViewTap: function() {
  },
})
