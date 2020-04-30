// pages/Pricesearch/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchtext: '',
    arr:[],
    check_arr:[]
  },
  back() {
    wx.navigateBack({
      delta: 1
    })
  },
  search(e){
    let text = e.detail.value.replace(/\s*/g, "")
    let arr = this.data.arr
    let arr1 = []
    for(let i = 0;i<arr.length;i++){
      if (arr[i].handlename.indexOf(text)!=-1){
        arr1.push(arr[i])
      }
    }
    this.setData({
      searchtext: text,
      check_arr:arr1
    })
  },
  searchclick(e) {
    console.log(e)
    console.log(this.data.searchtext)
  },
  gethandle() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/sysset/gethandle',
      method: 'post',
      headers: {
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            arr: res.data.list,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gethandle()
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