// pages/studynav/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:1,
    show:false,
    active: '种植',
    tabnum:1,
    result: [],
    addname:'',
    addmechanism:"",
    addOther:"",
    addphone:"",
    first_arr: [1, 1],
    course_arr:[],
    pageIndex: 1,
    pageCount: 0
  },
  onChange(event){
    this.setData({
      active: event.detail.name,
      course_arr:[]
    })
    wx.setNavigationBarTitle({
      title: event.detail.name
    })
    this.getdata()
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  tab(e){
    console.log(e.currentTarget.dataset.id)
    this.setData({
      tabnum: e.currentTarget.dataset.id
    })
  }, 
  addonChange(event) {
    this.setData({
      result: event.detail
    });
  },
    getdata() {
      let self = this
      wx.request({
        url: getApp().data.API +'/studynav.json',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          let arr = self.data.course_arr
          arr.push(...res.data.course_arr)
          let index = self.data.pageIndex +1 
          if (res.data.result == 200) {
            self.setData({
              course_arr: arr,
              pageIndex: index,
              pageCount: res.data.pageCount,
            })
          }
        },
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      active:options.id,
      state: options.state
    })
    wx.setNavigationBarTitle({
      title: options.id
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