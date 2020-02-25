// pages/coursedetails/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '课程详情',
    collection:false,
    love:false,
    url:'',
    more_arr:[1,2,3]
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '康牙医生小程序',
      path: this.data.url,  // 路径，传递参数到指定页面。
      imageUrl: '../../imgs/xx.png', // 分享的封面图
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  collectionclick(e){
    if (e.currentTarget.dataset.state == 0) {
      this.setData({
        collection: true
      })
    }else{
      this.setData({
        collection: false
      })
    }
  }, 
  loveclick(e){
    if(e.currentTarget.dataset.state == 0) {
      this.setData({
        love: true
      })
    }else {
      this.setData({
        love: false
      })
    }
  }, 
  videogo(){
    wx.navigateTo({
      url: '../Videoplay/index?state=1',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url: this.route
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