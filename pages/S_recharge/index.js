// pages/S_recharge/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'商城',
    state:0,
    money:0.00,
    money_state:true,
    active:'全部',
    cash_arr:[],
    budget_arr:[],
    check_index:0,
    user:''
  },
  onClickLeft() {
    if (this.data.state==0){
      wx.navigateBack({
        delta: 1
      })
    }else{
      this.setData({
        state: 0
      })
    }
  },
  moneyclick(){
    this.setData({
      money_state:this.data.money_state?false:true
    })
  },
  btn1() {
    this.setData({
      state: 1
    })
  },
  btn2(e) {
    this.setData({
      state: 2,
      check_index: e.currentTarget.dataset.index
    })
  },
  // getdata() {
  //   let self = this
  //   wx.request({
  //     url: getApp().data.API+'/S_recharge.json',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     success: function (res) {
  //       console.log(res.data)
  //       if (res.data.result == 200) {
  //         self.setData({
  //           money: res.data.money,
  //           cash_arr: res.data.cash_arr,
  //           assemble_arr: res.data.assemble_arr,
  //           budget_arr: res.data.budget_arr
  //         })
  //         console.log(self.data.budget_arr)
  //       }
  //     },
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商城'
    })
    // this.getdata()
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];//
    this.setData({
      user:Page.data.user
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