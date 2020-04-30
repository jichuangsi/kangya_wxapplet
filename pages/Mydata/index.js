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
    sex:'',
    jc:'',
    dq:'',
    qm:'',
    xm:[],
    ll:'',
    userimg:''
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
  pz() {
    let self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        self.setData({
          userimg: res.tempFilePaths,
          show: false
        })
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
        self.setData({
          userimg: res.tempFilePaths,
          show: false
        })
      }
    })
  },
  areaclick(e){
    console.log(e.detail.values)
    this.setData({ show: false });
  },
  sexclcik(e){
    this.setData({
      sex: e.currentTarget.dataset.text, 
      show: false
    })

  },
  editgo(e) {
    let value = e.currentTarget.dataset.value ? '&&value=' + e.currentTarget.dataset.value : ''
    wx.navigateTo({
      url: '../Mydataedit/index?title=' + e.currentTarget.dataset.text + value
    })
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data:{
        plugin:'selfsign',
        p:''
      },
      header: {
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(1)
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            qm: res.data.list[0].sign,
            ll: res.data.list[0].exp,
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的资料'
    })
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];
    this.setData({
      areaList: require("../../data/area.js").default,
      name: Page.data.user.name,
      age: Page.data.user.age,
      sex: Page.data.user.sex,
      jc: Page.data.user.grade,
      dq: Page.data.user.area,
      xm: Page.data.user.expert.split('|'),
      userimg: Page.data.user.picture
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