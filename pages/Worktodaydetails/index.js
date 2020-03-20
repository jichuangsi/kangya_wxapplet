// pages/Worktodaydetails/index.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '今日工作',
    arr:[],
    pageIndex:'',
    pageCount:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  uptouch(){
    if (this.data.pageIndex > this.data.pageCount) {

    } else {
      this.getdata()
    }
  },
  getdata() {
    let self = this
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let bengindate = year + '/' + month + '/' + day
    let enddate = year + '/' + month + '/' + day
    wx.request({
      url: getApp().data.APIS + '/patient/visittoday',
      method: 'post',
      data: {
        bengindate: bengindate,
        enddate: enddate,
        pageno: self.data.pageIndex,
        pagesize: 100
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          for (let i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].status == '0' && self.data.title =='预约未到') {
              arr.push(res.data.list[i])
            } else if (res.data.list[i].status == '2' && self.data.title =='待分诊') {
              arr.push(res.data.list[i])
            } else if (res.data.list[i].status == '3' && self.data.title == '待接诊/治疗中') {
              arr.push(res.data.list[i])
            } else if (res.data.list[i].status == '4' && self.data.title == '待缴费') {
              arr.push(res.data.list[i])
} else if (res.data.list[i].status == '5' && self.data.title== '已完成') {
              arr.push(res.data.list[i])
} else if (res.data.list[i].status == '460' && self.data.title== '已缴费') {
              arr.push(res.data.list[i])
            }
          }
          self.setData({
            arr: arr
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ title: options.title })
    wx.setNavigationBarTitle({
      title: options.title
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