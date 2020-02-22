// pages/feedbackbtn/index.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '意见反馈',
    state:0,
    check_num: 0,
    title_text:'',
    text_text:'',
    iphone: 15452346856,
    check_iphone:0,
    show:false,
    img_arr:[]
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  checkiphone(e){
    this.setData({ check_iphone: e.currentTarget.dataset.id})
  },
  checknum(e) {
    this.setData({ check_num: e.currentTarget.dataset.id })
  },
  title_change(e) {
    this.setData({ title_text: e.detail.value })
  },
  text_change(e) {
    this.setData({ text_text: e.detail.value })
  },
  iphone_num(e) {
    this.setData({ iphone: e.detail.value })
  },

  pz() {
    let self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        let arr = [];
        arr = self.data.img_arr
        arr.push(res.tempFilePaths)
        self.setData({ img_arr: arr, show: false })
      }
    })
  },
  xc() {
    let self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        let arr = [];
        arr = self.data.img_arr
        arr.push(res.tempFilePaths)
        self.setData({ img_arr: arr, show: false})
      }
    })
  },
  delimg(e) {
    let arr = [];
    let index = e.currentTarget.dataset.index;
    arr = this.data.img_arr
    arr.splice(index, 1)
    this.setData({ img_arr: arr })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ state: options.state})
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