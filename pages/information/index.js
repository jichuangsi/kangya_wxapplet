// pages/information/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexnum: 0,
    tabnum:1,
    show:false,
    left_text:'我的',
    system_arr:[],
    remind:[],
    zli:[],
    messages_arr:[],
    friend_arr:[],
    power_arr: '',
    user: ''
  },
  sss(event) {
    console.log(event.detail)
    this.setData({
      indexnum: event.detail.current
    })
    console.log(this.data.indexnum)
  },
  remindgo(e) {
    wx.navigateTo({
      url: '../remind/index?title='+e.currentTarget.dataset.text,
    })
  },
  tabclick(e) {
    this.setData({
      indexnum: e.currentTarget.dataset.index
    })
  },
  leftclick() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  tab(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      tabnum: e.currentTarget.dataset.id
    })
    this.setData({
      left_text: e.currentTarget.dataset.id == 1?'全部':'我的'
    })
  },
  getpatient() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/getpatientmsglist',
      method: 'post',
      data: {
        pageno: 1,
        isshowselectmsg:0
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            friend_arr: res.data.list.userlist,
            messages_arr: res.data.list.userlist,
            remind: res.data.list.clinicid,
            zli: res.data.list.zli
          })
        }
      }
    })
  },
  chatgo(e){
    let state = e.currentTarget.dataset.state ? '&&state=' + e.currentTarget.dataset.state:''
    wx.navigateTo({
      url: '../chat/index?openid=' + e.currentTarget.dataset.item.openid + '&&title=' + e.currentTarget.dataset.item.customername + state,
    })
  },
  detailsgo(e) {
    console.log(e.currentTarget.dataset.item.openid)
    // let customerid = e.currentTarget.dataset.item.customerid
    // let clinicid = e.currentTarget.dataset.item.clinicid
    // wx.navigateTo({
    //   url: '../Patientdetails/index?customerid=' + customerid + '&&clinicid=' + clinicid,
    // })
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/wechatinfo',
      method: 'get',
      data: {
        openid: e.currentTarget.dataset.item.openid,
      },
      // header: {
      //   'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      // },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let customerid = e.currentTarget.dataset.item.customerid
          let clinicid = res.data.list[0].schedule[0].customerid
          wx.navigateTo({
            url: '../Patientdetails/index?customerid=' + customerid + '&&clinicid=' + clinicid,
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
        console.log(1)
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            user: res.data.list[0]
          })
          // self.getrole1(res.data.list[0].userid)
          self.getrole(res.data.list[0].userid)
        }
      }
    })
  },
  getrole(id, role) {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'getmodulerole',
        p: id + '|' + (role ? role : '咨询员')
      },
      success: function (res) {
        console.log(2)
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let a = {
          }
          for (let i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].groupname.indexOf('app') != -1) {
              arr.push(res.data.list[i])
              a = {
                code10001: a.code10001 ? a.code10001 : res.data.list[res.data.list[i].code.indexOf('10001') != -1 ? i : 999],
                code10603: a.code10603 ? a.code10603 : res.data.list[res.data.list[i].code.indexOf('10603') != -1 ? i : 999],
                code10605: a.code10605 ? a.code10605 : res.data.list[res.data.list[i].code.indexOf('10605') != -1 ? i : 999],
                code10606: a.code10606 ? a.code10606 : res.data.list[res.data.list[i].code.indexOf('10606') != -1 ? i : 999],
                code10607: a.code10607 ? a.code10607 : res.data.list[res.data.list[i].code.indexOf('10607') != -1 ? i : 999],
                code10608: a.code10608 ? a.code10608 : res.data.list[res.data.list[i].code.indexOf('10608') != -1 ? i : 999],
                code10609: a.code10609 ? a.code10609 : res.data.list[res.data.list[i].code.indexOf('10609') != -1 ? i : 999],
                code10610: a.code10610 ? a.code10610 : res.data.list[res.data.list[i].code.indexOf('10610') != -1 ? i : 999],
                code10701: a.code10701 ? a.code10701 : res.data.list[res.data.list[i].code.indexOf('10701') != -1 ? i : 999],
                code10702: a.code10702 ? a.code10702 : res.data.list[res.data.list[i].code.indexOf('10702') != -1 ? i : 999],
                code10703: a.code10703 ? a.code10703 : res.data.list[res.data.list[i].code.indexOf('10703') != -1 ? i : 999],
                code10704: a.code10704 ? a.code10704 : res.data.list[res.data.list[i].code.indexOf('10704') != -1 ? i : 999],
                code10706: a.code10706 ? a.code10706 : res.data.list[res.data.list[i].code.indexOf('10706') != -1 ? i : 999],
                code10707: a.code10707 ? a.code10707 : res.data.list[res.data.list[i].code.indexOf('10707') != -1 ? i : 999],
                code10801: a.code10801 ? a.code10801 : res.data.list[res.data.list[i].code.indexOf('10801') != -1 ? i : 999],
                code10802: a.code10802 ? a.code10802 : res.data.list[res.data.list[i].code.indexOf('10802') != -1 ? i : 999],
                code10803: a.code10803 ? a.code10803 : res.data.list[res.data.list[i].code.indexOf('10803') != -1 ? i : 999],
                code10901: a.code10901 ? a.code10901 : res.data.list[res.data.list[i].code.indexOf('10901') != -1 ? i : 999],
                code10002: a.code10002 ? a.code10002 : res.data.list[res.data.list[i].code.indexOf('10002') != -1 ? i : 999],
                code10604: a.code10604 ? a.code10604 : res.data.list[res.data.list[i].code.indexOf('10604') != -1 ? i : 999],
                code10705: a.code10705 ? a.code10705 : res.data.list[res.data.list[i].code.indexOf('10705') != -1 ? i : 999],
                code10602: a.code10602 ? a.code10602 : res.data.list[res.data.list[i].code.indexOf('10602') != -1 ? i : 999],
                code10303: a.code10303 ? a.code10303 : res.data.list[res.data.list[i].code.indexOf('10303') != -1 ? i : 999],
                code10103: a.code10103 ? a.code10103 : res.data.list[res.data.list[i].code.indexOf('10103') != -1 ? i : 999],
                code10601: a.code10601 ? a.code10601 : res.data.list[res.data.list[i].code.indexOf('10601') != -1 ? i : 999],
                code10102: a.code10102 ? a.code10102 : res.data.list[res.data.list[i].code.indexOf('10102') != -1 ? i : 999],
                code10101: a.code10101 ? a.code10101 : res.data.list[res.data.list[i].code.indexOf('10101') != -1 ? i : 999],
                code10009: a.code10009 ? a.code10009 : res.data.list[res.data.list[i].code.indexOf('10009') != -1 ? i : 999],
                code10008: a.code10008 ? a.code10008 : res.data.list[res.data.list[i].code.indexOf('10008') != -1 ? i : 999],
                code10007: a.code10007 ? a.code10007 : res.data.list[res.data.list[i].code.indexOf('10007') != -1 ? i : 999],
                code10006: a.code10006 ? a.code10006 : res.data.list[res.data.list[i].code.indexOf('10006') != -1 ? i : 999],
                code10005: a.code10005 ? a.code10005 : res.data.list[res.data.list[i].code.indexOf('10005') != -1 ? i : 999],
                code10004: a.code10004 ? a.code10004 : res.data.list[res.data.list[i].code.indexOf('10004') != -1 ? i : 999],
                code10104: a.code10104 ? a.code10104 : res.data.list[res.data.list[i].code.indexOf('10104') != -1 ? i : 999],
                code10301: a.code10301 ? a.code10301 : res.data.list[res.data.list[i].code.indexOf('10301') != -1 ? i : 999],
                code10302: a.code10302 ? a.code10302 : res.data.list[res.data.list[i].code.indexOf('10302') != -1 ? i : 999],
                code10201: a.code10201 ? a.code10201 : res.data.list[res.data.list[i].code.indexOf('10201') != -1 ? i : 999],
                code10304: a.code10304 ? a.code10304 : res.data.list[res.data.list[i].code.indexOf('10304') != -1 ? i : 999],
                code10405: a.code10405 ? a.code10405 : res.data.list[res.data.list[i].code.indexOf('10405') != -1 ? i : 999],
                code10503: a.code10503 ? a.code10503 : res.data.list[res.data.list[i].code.indexOf('10503') != -1 ? i : 999],
                code10502: a.code10502 ? a.code10502 : res.data.list[res.data.list[i].code.indexOf('10502') != -1 ? i : 999],
                code10501: a.code10501 ? a.code10501 : res.data.list[res.data.list[i].code.indexOf('10501') != -1 ? i : 999],
                code10305: a.code10305 ? a.code10305 : res.data.list[res.data.list[i].code.indexOf('10305') != -1 ? i : 999],
                code10406: a.code10406 ? a.code10406 : res.data.list[res.data.list[i].code.indexOf('10406') != -1 ? i : 999],
                code10407: a.code10407 ? a.code10407 : res.data.list[res.data.list[i].code.indexOf('10407') != -1 ? i : 999],
                code10404: a.code10404 ? a.code10404 : res.data.list[res.data.list[i].code.indexOf('10404') != -1 ? i : 999],
                code10403: a.code10403 ? a.code10403 : res.data.list[res.data.list[i].code.indexOf('10403') != -1 ? i : 999],
                code10402: a.code10402 ? a.code10402 : res.data.list[res.data.list[i].code.indexOf('10402') != -1 ? i : 999],
                code10401: a.code10401 ? a.code10401 : res.data.list[res.data.list[i].code.indexOf('10401') != -1 ? i : 999],
                code10003: a.code10003 ? a.code10003 : res.data.list[res.data.list[i].code.indexOf('10003') != -1 ? i : 999],
              }
            }
          }
          self.setData({
            power_arr: a
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getpatient()
    this.getPerinfo()
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