// pages/Videoplay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'sadds',
    state:0,
    lovestate: false,
    arr:[1,1,1,1,1,1,1],
    text:'',
    show: false,
    client: '',
    item:''
  },


  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  ipttext(e) {
    this.setData({
      text: e.detail.value
    })
  },
  send() {
    this.setData({
      text: ''
    })
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false, text: '' });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.url) {
      wx.setNavigationBarTitle({
        title: options.title
      })
      this.setData({
        item: {
          link: options.url + '?' + options.url_h + '&files=' + options.files
        },
        title: options.title,
        state: options.state
      })
      console.log(this.data.item)
    } else {
      var pages = getCurrentPages();
      var Page = pages[pages.length - 2];//
      this.setData({
        state: options.state ? options.state : 0,
      })
      wx.setNavigationBarTitle({
        title: options.title
      })
      if (this.data.state == 0) {
        this.setData({
          item: Page.data ? Page.data.nowitem : '',
          title: Page.data ? Page.data.nowitem.name : ''
        })
        wx.setNavigationBarTitle({
          title: Page.data ? Page.data.nowitem.name : ''
        })
      }
    }
    console.log(options)
  },
  loveclick(){
    this.setData({
      lovestate:!this.data.lovestate
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
    console.log(this.data.item.link)
    let url_q = this.data.item.link.split('?')[0]
    let url_h = this.data.item.link.split('?')[1]
    return {
      title: this.data.title,
      desc: '分享页面的内容',
      path: '/pages/Videoplay/index?title=' + this.data.title + '&&url=' + url_q + '&&state=' + this.data.state + '&&url_h=' + url_h  // 路径，传递参数到指定页面。
    }
  }
})