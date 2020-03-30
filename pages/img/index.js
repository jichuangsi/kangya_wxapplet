// pages/img/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '影像',
    show: false,
    state:0,
    arr:[],
    customerid: '',
    clinicid:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    this.setData({show:true})
  },
  onClose() {
    this.setData({ show: false });
  },
  pz() {
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
  imgclick(e){
      wx.previewImage({
        current: e.currentTarget.dataset.item.url, // 当前显示图片的http链接
        urls: [e.currentTarget.dataset.item.url] // 需要预览的图片http链接列表
      })
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/patientimagelist',
      method: 'post',
      data: {
        customerid: self.data.customerid,
        clinicid: self.data.clinicid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          for (let i = 0; i < res.data.list.imagelist.length;i++){
            res.data.list.imagelist[i].state = 0
          }
          self.setData({
            arr: res.data.list.imagelist
          })
        }
      }
    })
  },
  check_img(e){
    let index = e.currentTarget.dataset.index
    let arr = this.data.arr
    arr[index].state = arr[index].state == 0 ? 1 : 0
    this.setData({
      arr: arr
    })
  },
  btn(){
    let pages = getCurrentPages();
    let currPage = pages[pages.length - 3];
    let prevPage = pages[pages.length - 2]; 
    let arr = []
    for(let i = 0;i<this.data.arr.length;i++){
      if (this.data.arr[i].state == 1){
        arr.push(this.data.arr[i])
      }
    }
    console.log(currPage.data)
    console.log(prevPage.data)
    currPage.setData({
      img_arr:arr
    })
    prevPage.setData({
      img_arr: arr
    })
    this.onClickLeft()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ title: options.title, state: options.state ? options.state:0 })
    wx.setNavigationBarTitle({
      title: options.title ? options.title :'影像'
    })
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];
    this.setData({
      customerid: Page.data.customerid,
      clinicid: Page.data.clinicid
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