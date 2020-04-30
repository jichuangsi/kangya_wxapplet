// pages/chat/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '空白',
    state:0,
    arr:[],
    text:'',
    openid:'',
    newopenid:'',
    newheadimgurl:'',
    show:false,
    nowitem: '',
    power_arr: [],
    user: '',
    img_arr:[],
    customerid: '',
    clinicid: '',
    name: '',
    sex: '',
    mediarecordidentity: '',
    examdoctor: '',
    examdate: '',
    video:{
      "title": "",
      "picurl": "",
      "desc": "",
      "videoidentity": "",
      "type": ""
    }
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight(){
    wx.navigateTo({
      url: '../Patientdetails/index',
    })
  },
  ipttext(e) {
    this.setData({
      text: e.detail.value
    })
  },
  yzgo() {
    this.inputfocus()
    wx.navigateTo({
      url: '../advice/index?title=医嘱消息模板',
    })
  },
  twyzgo() {
    this.inputfocus()
    wx.navigateTo({
      url: '../advice/index?title=选择图文',
    })
  },
  yxgo() {
    this.inputfocus()
    wx.navigateTo({
      url: '../img/index?title=选择影像&&msgstate=1',
    })
  },
  blgo() {
    this.inputfocus()
    wx.navigateTo({
      url: '../../component/pages/medical/index?title=选择病历',
    })
  },
  spyzgo() {
    this.inputfocus()
    wx.navigateTo({
      url: '../PriceList/index?title=选择视频',
    })
  },
  send() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/getsendclinicmsg',
      method: 'get',
      data: {
        openid: self.data.openid,
        msgsource:1,
        msgcode:1,
        msgtype:'text',
        content: self.data.text,
        token:''
      },
      header: {
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if(res.data.info == 'ok'){
          wx:wx.showToast({
            title: res.data.list.info,
            icon: 'none',
          })
          self.setData({
            text:''
          })
          self.getdata()
        }
      }
    })
  },
  sendimg() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/getsendclinicmsg',
      method: 'get',
      data: {
        openid: self.data.openid,
        msgsource: 1,
        msgcode: 1,
        msgtype: 'image',
        content: JSON.stringify(self.data.img_arr),
        token: ''
      },
      header: {
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          wx: wx.showToast({
            title: res.data.list.info,
            icon: 'none',
          })
          self.setData({
            text: ''
          })
          self.getdata()
        }
      }
    })
  },
  sendmedical() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/sendmedicarecord',
      method: 'post',
      data: {
        typename: "牙周检查", 
        isweixin: 1, 
        customerid: self.data.customerid, 
        customername: self.data.name, 
        mediarecordidentity: self.data.mediarecordidentity, 
        examdate: self.data.examdate, 
        examdoctor: self.data.examdoctor, 
        clinicid: self.data.clinicid,
        textcenter: '', 
        describe: ''
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.getdata()
        }
      }
    })
  },
  sendvideo() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/getsendclinicmsg',
      method: 'post',
      data: {
        openid: self.data.openid,
        msgsource: 1,
        msgcode: 1,
        msgtype: 'videoadvance',
        content: JSON.stringify(self.data.video),
        token: ''
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          wx: wx.showToast({
            title: res.data.list.info,
            icon: 'none',
          })
          self.setData({
            text: ''
          })
          self.getdata()
        }
      }
    })
  },
  showPopup() {
    this.setData({
      show: true
    })
  },
  inputfocus() {
    this.setData({
      show: false
    })
  },
  videogo(e) {
    e.currentTarget.dataset.item.link = e.currentTarget.dataset.item.videourl
    e.currentTarget.dataset.item.name = e.currentTarget.dataset.item.title
    this.setData({
      nowitem: e.currentTarget.dataset.item
    })
    wx.navigateTo({
      url: '../Videoplay/index?state=0',
    })
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/getpatientmsg',
      method: 'post',
      data: {
        openid: self.data.openid,
        openidtype: 1,
        isshowselectmsg: 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(1)
        console.log(res)
        if (res.data.info == 'ok') {
          for (let i = 0; i < res.data.list.data.records.length;i++){
            res.data.list.data.records[i].dxstate = 0
            if (res.data.list.data.records[i].msgtype != 'text' && res.data.list.data.records[i].msgtype != 'image') {
              res.data.list.data.records[i].content = JSON.parse(res.data.list.data.records[i].content)
              if (res.data.list.data.records[i].msgtype == 'medicalrecord') {
                res.data.list.data.records[i].dxstate = 1
                res.data.list.data.records[i].content.exam = JSON.parse(res.data.list.data.records[i].content.exam)
              } else if (res.data.list.data.records[i].msgtype == 'videoadvance') {
                res.data.list.data.records[i].dxstate = 2
              } else if (res.data.list.data.records[i].msgtype == 'textadvance') {
                res.data.list.data.records[i].dxstate = 3
              }
            }
          }
          let arr1 = res.data.list.data.records.sort(function (a, b) {
            return new Date(a.updatetime).getTime() - new Date(b.updatetime).getTime();
          })
          console.log(arr1)
          self.setData({
            newheadimgurl: res.data.list.data.headimgurl,
            newopenid: res.data.list.data.openid,
            arr: res.data.list.data.records,
            clinicid: arr1[0].clinicid
          })
          console.log(self.data.arr)
        }
      }
    })
  },
  getuser() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/wechatinfo',
      method: 'get',
      data: {
        openid: self.data.openid,
      },
      header: {
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            customerid: res.data.list[0].schedule[0].customerid,
            name: res.data.list[0].customer[0].name,
            sex: res.data.list[0].customer[0].sex
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面

    console.log(prevPage.data)
    this.setData({
      title:options.title,
      openid: options.openid,
      state: options.state ? options.state:0,
      power_arr: prevPage.data.power_arr,
      user: prevPage.data.user,
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.getdata()
    this.getuser()
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
    if(this.data.text != ''){
      console.log(1)
      this.send()
    } else if (this.data.img_arr.length > 0) {
      console.log(2)
      this.sendimg()
    } else if (this.data.mediarecordidentity != '') {
      console.log(3)
      this.sendmedical()
    } else if (this.data.video.title != '') {
      console.log(4)
      this.sendvideo()
    }
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