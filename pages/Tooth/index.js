// pages/Tooth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '标记牙位',
    active:'恒牙',
    state:0,
    arr1:[
      { state: 0, text: 8, id: 0 },
      { state: 0, text: 7, id: 1 },
      { state: 0, text: 6, id: 2 },
      { state: 0, text: 5, id: 3 },
      { state: 0, text: 4, id: 4 },
      { state: 0, text: 3, id: 5 },
      { state: 0, text: 2, id: 6 },
      { state: 0, text: 1, id: 7 },
      { state: 0, text: 1, id: 8 },
      { state: 0, text: 2, id: 9 },
      { state: 0, text: 3, id: 10 },
      { state: 0, text: 4, id: 11 },
      { state: 0, text: 5, id: 12 },
      { state: 0, text: 6, id: 13 },
      { state: 0, text: 7, id: 14 },
      { state: 0, text: 8, id: 15 },
    ],
    arr2: [
      { state: 0, text: 8, id: 0 },
      { state: 0, text: 7, id: 1 },
      { state: 0, text: 6, id: 2 },
      { state: 0, text: 5, id: 3 },
      { state: 0, text: 4, id: 4 },
      { state: 0, text: 3, id: 5 },
      { state: 0, text: 2, id: 6 },
      { state: 0, text: 1, id: 7 },
      { state: 0, text: 1, id: 8 },
      { state: 0, text: 2, id: 9 },
      { state: 0, text: 3, id: 10 },
      { state: 0, text: 4, id: 11 },
      { state: 0, text: 5, id: 12 },
      { state: 0, text: 6, id: 13 },
      { state: 0, text: 7, id: 14 },
      { state: 0, text: 8, id: 15 },
    ],
    arr3: [
      { state: 0, text: 'E', id: 0 },
      { state: 0, text: 'D', id: 1 },
      { state: 0, text: 'C', id: 3 },
      { state: 0, text: 'B', id: 5 },
      { state: 0, text: 'A', id: 7 },
      { state: 0, text: 'A', id: 8 },
      { state: 0, text: 'B', id: 10 },
      { state: 0, text: 'C', id: 12 },
      { state: 0, text: 'D', id: 14 },
      { state: 0, text: 'E', id: 15 },
    ],
    arr4: [
      { state: 0, text: 'E', id: 0 },
      { state: 0, text: 'D', id: 1 },
      { state: 0, text: 'C', id: 3 },
      { state: 0, text: 'B', id: 5 },
      { state: 0, text: 'A', id: 7 },
      { state: 0, text: 'A', id: 8 },
      { state: 0, text: 'B', id: 10 },
      { state: 0, text: 'C', id: 12 },
      { state: 0, text: 'D', id: 14 },
      { state: 0, text: 'E', id: 15 },
    ]
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  btn() {
    if(this.data.state == 1){
      wx.navigateBack({
        delta: 2
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
  },
  onChange(event) {
    this.setData({
      active: event.detail.name
    })
  },
  check1(e){
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    let arr = this.data.arr1
    arr[index].state = arr[index].state==0?1:0
    console.log(arr)
    this.setData({arr1 :arr})
  },
  check2(e) {
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    let arr = this.data.arr2
    arr[index].state = arr[index].state == 0 ? 1 : 0
    console.log(arr)
    this.setData({ arr2: arr })
  },
  check3(e) {
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    let arr = this.data.arr3
    arr[index].state = arr[index].state == 0 ? 1 : 0
    console.log(arr)
    this.setData({ arr3: arr })
  },
  check4(e) {
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    let arr = this.data.arr4
    arr[index].state = arr[index].state == 0 ? 1 : 0
    console.log(arr)
    this.setData({ arr4: arr })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ state: options.state })
    wx.setNavigationBarTitle({
      title: '标记牙位'
    })
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