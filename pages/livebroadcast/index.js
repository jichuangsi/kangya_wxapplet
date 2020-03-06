// pages/livebroadcast/index.js
Component({

  /**
   * 页面的初始数据
   */
  data: {
    course_arr: [],
    Notice_arr:[],
    series_arr:[],
    img_arr:[],
    borderstate: false,
    pageIndex:1,
    pageCount:0
  },
  methods:{
    uptouch() {
      if (this.data.pageIndex > this.data.pageCount){

      } else {
        this.getdata()
      }
    },
    getdata() {
      let self = this
      wx.request({
        url: getApp().data.API+'/livebroadcast.json',
        headers: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          let arr = self.data.course_arr
          arr.push(...res.data.course_arr)
          let index = self.data.pageIndex +1 
          if (res.data.result == 200) {
            self.setData({
              course_arr: arr,
              pageIndex: index,
              pageCount: res.data.pageCount,
              Notice_arr: res.data.course_arr,
              series_arr: res.data.course_arr,
              img_arr:res.data.course_arr
            })
          }
        },
      })
    },
  },
  attached(){

    console.log(111)
    this.getdata()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(111)
    this.getdata()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(111)
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
    console.log(456)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(1111)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})