// pages/Scheduling/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title:'排班',
    time_arr:[],
    r_arr:[
      {
        name:'李清琴',
        child:[]
      }
    ]
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    wx.navigateTo({
      url: '../Schedulingset/index',
    })
  },
  datatime(){
    var d1 = new Date(2020, 2, 1);
    var d2 = new Date(2020, 3, 1);
    var arr = []
    var arr2 = this.data.r_arr
    for (var i = d1.getTime(); i < d2.getTime(); i += 24 * 60 * 60 * 1000) {
      var d3 = new Date(i);
      var day = d3.getDate();
      var str = "周" + "日一二三四五六".charAt(d3.getDay());
      arr.push({ date: day, week:str})
      arr2[0].child.push({state:0})
    }
    this.setData({
      time_arr:arr,
      r_arr: arr2
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.datatime()
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