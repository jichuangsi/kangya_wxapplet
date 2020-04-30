// pages/Worktoday/index.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '今日工作',
    arr:[],
    pageIndex:1,
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  getdata(){
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
        pageno:self.data.pageIndex,
        pagesize:100
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = [0,0,0,0,0,0]
          for(let i = 0;i<res.data.list.length;i++){
            console.log(res.data.list[i].status)
            if (res.data.list[i].status == '0'){
              arr[0] = arr[0]+1
            } else if (res.data.list[i].status == '2') {
              arr[1] = arr[1] + 1
            } else if (res.data.list[i].status == '3') {
              arr[2] = arr[2] + 1
            } else if (res.data.list[i].status == '4') {
              arr[3] = arr[3] + 1
            } else if (res.data.list[i].status == '5') {
              arr[4] = arr[4] + 1
            } else if (res.data.list[i].status == '460') {
              arr[5] = arr[5] + 1
            }
          }
          self.setData({
            arr:arr
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
      title:'今日工作'
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