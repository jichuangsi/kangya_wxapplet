// pages/Mydata/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '我的资料',
    show:false,
    text:'头像',
    areaList:[],
    name:'',
    age:'',
    jc:'',
    dq:'',
    xm:[],
    ll:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  showPopup() {
    this.setData({ show: true, text:'头像' });
  },

  showPopup1() {
    this.setData({ show: true, text: '地区' });
  },
  showPopup2() {
    this.setData({ show: true, text: '性别' });
  },
  onClose() {
    this.setData({ show: false });
  },
  pz(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
      }
    })
  },
  xc() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
      }
    })
  },
  areaclick(e){
    console.log(e.detail.values)
    this.setData({ show: false });
  },
  editgo(e) {
    let value = e.currentTarget.dataset.value ? '&&value=' + e.currentTarget.dataset.value : ''
    wx.navigateTo({
      url: '../Mydataedit/index?title=' + e.currentTarget.dataset.text + value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      areaList: require("../../data/area.js").default
    })
    console.log(this.data.areaList)
    wx.setNavigationBarTitle({
      title: '我的资料'
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