// pages/S_address/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'商城',
    state:0,
    check_num:'住宅',
    arr: [ '住宅', '办公', '其他'],
    areaList:[],
    show:false,
    checked:true,
    address_arr:[],
    check_address:{
      address: "",
      addresstype: "",
      name: "",
      phone: "",
      zip:''
    },
    area_text:'',
    user:'',
    user_id:'',
    edit_state:false,
    check_state:0
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  stateclick(e){
    console.log(e)
    if(e.currentTarget.dataset.item){
      this.setData({
        state:1,
        check_address:e.currentTarget.dataset.item,
        check_num:e.currentTarget.dataset.item.addresstype,
        area_text:'',
        edit_state:true
      })
    }else{
      this.setData({
        state:1,
        check_num:'住宅',
        area_text:'',
        edit_state:false
      })
    }
  },
  check_click(e){
    this.setData({
      check_num: e.currentTarget.dataset.text
    })
  },
  showpopup(){
    this.setData({
      show:true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  btn(){
    let self = this
    console.log(self.data.che)
    let data = self.data.check_address
    data.address = self.data.area_text+data.address
    data.addresstype = self.data.check_num
    data.user_id = self.data.user_id
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: "post",
      data: {
        "plugin":self.data.edit_state?'updateaddr':'addaddr',
        "data":JSON.stringify(data)
      },
      header: {
        "token": wx.getStorageSync("token"),
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(res) {
        console.log(777)
        console.log(res)
        self.setData({
          state: 0
        })
        self.getdata()
      }
    });
    // self.setData({
    //   state: 0
    // })
    // self.getdata()
  },
  qxbtn(){
    this.setData({
      state: 0
    })
  },
  areaclick(e) {
    console.log(e.detail.values)
    let text = ''
    for(let i = 0;i<e.detail.values.length;i++){
      text+=e.detail.values[i].name
    }
    this.setData({ show: false,area_text:text });
  },
  iptn(e){
    let data = this.data.check_address
    data.name = e.detail.value
    this.setData({
      check_address:data
    })
  },
  iptp(e){
    let data = this.data.check_address
    data.phone = e.detail.value
    this.setData({
      check_address:data
    })
  },
  ipta(e){
    let data = this.data.check_address
    data.address = e.detail.value
    this.setData({
      check_address:data
    })
  },
  iptz(e){
    let data = this.data.check_address
    data.zip = e.detail.value
    this.setData({
      check_address:data
    })
  },
  onChange({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: detail });
  },
  getuser(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: "get",
      data: {
        "plugin":'getcartuserinfo'
      },
      header: {
        "token": wx.getStorageSync("token")
      },
      success: function(res) {
        console.log(res)
        self.setData({
          user:res.data.list[0]
        })
      }
    });
    wx.request({
      url: getApp().data.APIS + '/member/Perinfo',
      method: 'post',
      header: {
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(1)
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            user_id: res.data.list[0].userid
          })
        }
      }
    })
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: "get",
      data: {
        "plugin":'getaddr'
      },
      header: {
        "token": wx.getStorageSync("token")
      },
      success: function(res) {
        console.log(res)
        self.setData({
          address_arr:res.data.list
        })
      }
    });
  },
  checkAddress(e){
    console.log(e.currentTarget.dataset.item)
    if(this.data.check_state==1){
      let pages = getCurrentPages();
      let Page = pages[pages.length - 2];//
      Page.setData({
        address_arr:e.currentTarget.dataset.item
      })
      wx.navigateBack({
        delta: 1
      })
    }
  },
  // formatDuring(mss){
  //   var days = parseInt(mss / (1000 * 60 * 60 * 24));
  //   var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //   var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  //   var seconds = (mss % (1000 * 60)) / 1000;
  //   return days + " 天 " + hours + " 小时 " + minutes + " 分钟 ";
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      areaList: require("../../data/area.js").default,
      check_state:options.check==1?1:0
    })
    console.log(this.data.areaList)
    wx.setNavigationBarTitle({
      title: '商城'
    })
    this.getdata()
    this.getuser()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(this.formatDuring(691200000))
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