// pages/Colleaguedetails/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '同事资料',
    checked: false,
    img:'',
    phone:'',
    sex: '',
    age: '',
    bz: '',
    position:'',
    name:'',
    nurse:false,
    user:0,
    power_arr:[]
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onChange(e) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: e.detail });
  },
  chatgo(){
    wx.navigateTo({
      url: '../chat/index?title=百慕大',
    })
  },
  iphoneclick() {
    wx.makePhoneCall({
      phoneNumber: this.data.user.phone //仅为示例，并非真实的电话号码
    })
  },
  achievementgo() {
    let user = JSON.stringify(this.data.user)
    wx.navigateTo({
      url: '../../component/pages/achievement/index?user=' + user +'&&state=0',
    })
  },
  // getdata() {
  //   let self = this
  //   wx.request({
  //     url: getApp().data.API+'/Colleaguedetails.json',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     data:{
  //       id:self.data.id
  //     },
  //     success: function (res) {
  //       console.log(res.data)
  //       if (res.data.result == 200) {
  //         self.setData({
  //           phone: res.data.phone,
  //           sex: res.data.sex==0?'男':'女',
  //           age: res.data.age,
  //           bz: res.data.bz,
  //           nurse: res.data.nurse,
  //           img:res.data.img,
  //           name:res.data.name,
  //           position:res.data.position,
  //           checked:res.data.set
  //         })
  //       }
  //     },
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];
    this.setData({
      user: JSON.parse(options.item),
      power_arr: Page.data.power_arr ? Page.data.power_arr : '',
    })
    wx.setNavigationBarTitle({
      title: '同事资料'
    })
    // this.getdata()
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