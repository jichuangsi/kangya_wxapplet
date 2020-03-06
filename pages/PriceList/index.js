// pages/PriceList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'价目表',
    activeKey:'全部',
    check_id: 0,
    LookTeethimg:"",
    PriceList_arr: [],
    PriceListclick_arr:[],
    videolist_arr: [],
    videolistclick_arr: [],
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight(){
    wx.redirectTo({
      url: '../Pricesearch/index'
    })
  },
  first_click(e){
    let index = e.currentTarget.dataset.index
    let arr = this.data.videolist_arr
    if (e.currentTarget.dataset.state == 0){
      arr[index].state = 1
      this.setData({
        videolist_arr: arr
      })
    }else{
      arr[index].state = 0
      this.setData({
        videolist_arr: arr
      })
    }
  },
  litextclick(e) {
    let self = this
    this.setData({
      check_id: e.currentTarget.dataset.id
    })
    wx.request({
      url: 'http://192.168.31.251/PriceListClick.json',
      data: {
        id: e.currentTarget.dataset.id
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result == 200) {
          self.setData({
            videolistclick_arr: res.data.videoclick_arr
          })
        }
      },
    })
  },
  onChange(event) {
    let self = this
    self.setData({
      activeKey: event.detail.name
    })
    wx.request({
      url: 'http://192.168.31.251/PriceListClick.json',
      data:{
        title: event.detail.name
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result == 200) {
          self.setData({
            PriceListclick_arr: res.data.PriceListclick_arr
          })
        }
      },
    })
  },
  getdata() {
    let self =this
    wx.request({
      url: 'http://192.168.31.251/PriceList.json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result == 200) {
          self.setData({
            PriceList_arr: res.data.PriceList_arr,
            videolist_arr: res.data.video_arr,
            LookTeethimg: res.data.LookTeethimg,
            activeKey: res.data.PriceList_arr[0]
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title
    })
    wx.setNavigationBarTitle({
      title: options.title
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