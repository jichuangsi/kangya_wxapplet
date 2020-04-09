// pages/Patientlist/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'患者',
    show:false,
    state:0,
    check_list:0,
    nav1: '是否欠费',
    nav2: '就诊项目',
    nav3: '会员等级',
    nav4: '咨询师',
    treatment:'',
    viptype: '',
    counselor: '',
    isfee:'',
    nav_num: 1,
    nav1_arr: ['全部', '是', '否'],
    nav2_arr: ['全部', '治疗', '修复', '种植', '正畸', '检查', '洗牙', '其他'],
    nav3_arr: [
      { viptype:'全部',id:''}
    ],
    nav4_arr: [
      { name: '全部' }
    ],
    grouping_arr:[],
    patient_arr:[],
    li_num:1,
    pageIndex:1,
    pagetotal:0
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  searchgo(){
    wx.navigateTo({
      url: '../Patientsearch/index?state='+this.data.state,
    })
  },
  showPopup(e) {
    this.setData({ show: true, nav_num: e.currentTarget.dataset.index });
  },
  li_box_click(e){
    console.log(e.currentTarget.dataset.index)
    this.setData({ li_num: this.data.li_num == e.currentTarget.dataset.index ? 0 : e.currentTarget.dataset.index });
    this.getpatientlist(e.currentTarget.dataset.id)
  },
  onClose() {
    this.setData({ show: false });
  },
  nav1click(e){
    let num = ''
    if (e.currentTarget.dataset.text == '是') {
      num = 1
    } else if (e.currentTarget.dataset.text == '否') {
      num = 0
    }
    this.setData({
      nav1: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '是否欠费',
      isfee: e.currentTarget.dataset.text != '全部' ? num : '',
    })
    if (e.currentTarget.dataset.text != '全部') {
      this.checkpatientlist()
    } else {
      this.getpatientlist()
    }
  },
  nav2click(e) {
    this.setData({
      nav2: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '就诊项目',
      treatment: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '',
    })
    if (e.currentTarget.dataset.text != '全部') {
      this.checkpatientlist()
    } else {
      this.getpatientlist()
    }
  },
  nav3click(e) {
    this.setData({
      nav3: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '会员等级',
      viptype: e.currentTarget.dataset.id
    })
    if (e.currentTarget.dataset.text != '全部'){
      this.checkpatientlist()
    } else {
      this.getpatientlist()
    }
  },
  nav4click(e) {
    this.setData({
      nav4: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : '咨询师',
      counselor: e.currentTarget.dataset.text != '全部' ? e.currentTarget.dataset.text : ''
    })
    if (e.currentTarget.dataset.text != '全部') {
      this.checkpatientlist()
    } else {
      this.getpatientlist()
    }
  },
  Patientclick(e){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  
    if(this.data.state == 0){
      wx.navigateTo({
        url: '../Patientdetails/index?customerid=' + e.currentTarget.dataset.customerid + '&&clinicid=' + e.currentTarget.dataset.clinicid,
      })
    }else{
      prevPage.setData({
        patient: e.currentTarget.dataset.item
      })
      console.log(prevPage.data.patient)
      this.onClickLeft()
    }
  },
  addgo(){
    wx.navigateTo({
      url: '../AddPatient/index',
    })
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/patientbasegroup',
      method: 'post',
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if(res.data.info =='ok'){
          self.setData({
            grouping_arr:res.data.list
          })
          self.getpatientlist(res.data.list[0].dictionaryidentity)
        }
      }
    })
  },
  getpatientlist(id) {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/qupatient',
      method: 'post',
      data: {
        pageno: self.data.pageIndex,
        pagesize: '100',
        patgroupid: id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if(res.data.info =='ok'){
          self.setData({
            patient_arr:res.data.list
          })
        }
      }
    })
  },
  checkpatientlist() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/qupatient',
      method: 'post',
      data: {
        pageno: self.data.pageIndex,
        pagesize: '100',
        isfee: self.data.isfee,
        viptype: self.data.viptype,
        counselor: self.data.counselor,
        treatment: self.data.treatment
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            patient_arr: res.data.list
          })
        }
      }
    })
  },
  getvipinfolist() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/market/vipinfolist',
      method: 'post',
      data: {
        pageno: self.data.pageIndex,
        pagesize: '100',
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(4546)
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = self.data.nav3_arr
          arr.push(...res.data.list)
          self.setData({
            nav3_arr: arr
          })
        }
      }
    })
  },

  getdoctor() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/sysset/employeetreelist',
      method: 'post',
      data: {
        pageno: self.data.pageIndex,
        pagesize: 20
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(123456)
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = self.data.nav4_arr
          arr.push(...res.data.list)
          self.setData({
            nav4_arr:arr
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ state: options.state ? options.state : 0 })
    wx.setNavigationBarTitle({
      title: '患者'
    })
    this.getdata()
    this.getvipinfolist()
    this.getdoctor()
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