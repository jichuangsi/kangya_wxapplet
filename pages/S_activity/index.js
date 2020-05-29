// pages/S_activity/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '商城',
    nav_arr: [
      { title: '单品买3件送1件', state: 0 },
      { title: '满1000元送1件', state: 0 },
      { title: '满499元减150元', state: 0 },
      { title: '满299元减20元', state: 0 },
    ],
    nav_text: 0,
    arr: [
      {
        id: 0,
        img: '../../images/my_service_icon_prepaid.png',
        title: 'VOCO/我和 PRovicl氢氧化钙PRovicl氢氧化钙临时观桥粘接剂临时观桥粘接剂',
        price: 36.00,
        oldprice: 46.00,
        tags: '红',
        state: '单品买3件送1件'
      },
      {
        id: 0,
        img: '../../images/my_service_icon_prepaid.png',
        title: 'VOCO/我和 PRovicl氢氧化钙PRovicl氢氧化钙临时观桥粘接剂临时观桥粘接剂',
        price: 36.00,
        oldprice: 46.00,
        tags: '红',
        state: '单品买3件送1件'
      },
      {
        id: 0,
        img: '../../images/my_service_icon_prepaid.png',
        title: 'VOCO/我和 PRovicl氢氧化钙PRovicl氢氧化钙临时观桥粘接剂临时观桥粘接剂',
        price: 36.00,
        oldprice: 46.00,
        tags: '红',
        state: '单品买3件送1件'
      }
    ]
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  navclick(e) {
    this.setData({
      nav_text: e.currentTarget.dataset.text
    })
    this.getdata(e.currentTarget.dataset.text)
  },
  getdata(text) {
    let self = this
    wx.request({
      url: getApp().data.API+'/S_activity.json',
      headers: {
        'Content-Type': 'application/json'
      },
      data:{
        text:text
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result == 200) {
          self.setData({
            nav_arr: res.data.nav_arr,
            arr: res.data.arr,
            nav_text: res.data.nav_arr[0].title
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '商城'
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