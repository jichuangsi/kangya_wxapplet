// pages/S_foot/index.js// pages/foot/index.js
Component({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    state: false
  },
  properties: {
    footnum: {
      type: Number,
      value: 0,
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  attached: function () {
    this.setData({ active: this.data.footnum });
  },
  methods: {
    onChange(event) {
      this.setData({ active: event.detail });
      if (event.detail == 0) {
        wx.navigateTo({
          url: '../S_index/index'
        })
      } else if (event.detail == 1) {
        wx.navigateTo({
          url: '../S_sort/index'
        })
      } else if (event.detail == 2) {
        wx.navigateTo({
          url: '../S_shopcart/index'
        })
      } else if (event.detail == 3) {
        wx.navigateTo({
          url: '../S_my/index'
        })
      }
    },
  },
  onLoad: function (options) {
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