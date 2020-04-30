// pages/medicalTemplate/index.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '病历模板',
    activeKey: 0,
    checkid:'',
    arr_title:[],
    all_arr:[],
    arr:[
    ],
    arr1: [
    ]
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onChange(event) {
    // wx.showToast({
    //   icon: 'none',
    //   title: `切换至第${event.detail}项`
    // });checkid
    console.log(event.detail)
    this.setData({
      arr: this.data.all_arr[event.detail].child,
      checkid:'',
    })
  },
  checkclick(e){
    this.setData({ checkid: e.currentTarget.dataset.id})
    this.getnext()
  },
  checkgo(e) {
    wx.navigateTo({
      url: '../Templatedetails/index?title=' + e.currentTarget.dataset.text + '&&id=' + e.currentTarget.dataset.id,
    })
  },
  getdata(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/sysset/getcasetree',
      method: 'post',
      data:{
        "clinicid": "", 
        "read": 1, 
        "emrtpl": "emr"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            arr_title: res.data.list,
            all_arr: res.data.list,
            arr: res.data.list[0].child,
          })
        }
      },
    })
  },
  getnext() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/sysset/getcasethirdtree',
      method: 'post',
      data: {
        "emrtemplateidentity": self.data.checkid, 
        "read": 1, 
        "emrtpl": "emr"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            arr1:res.data.list
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '病历模板'
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