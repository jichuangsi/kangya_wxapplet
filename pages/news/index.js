// pages/news/index.js
Component({

  /**
   * 页面的初始数据
   */
  data: {
    active:'',
    first_arr:[],
    grid_arr:[]
  },
  methods: {
    uptouch() {
    },
    onChange(e){
      console.log(e)
      this.getdata1(this.data.grid_arr[e.detail.index].id)
    },
    getdata() {
      let self = this
      wx.request({
        url: getApp().data.APIS + '/svc/a',
        method: 'get',
        data: {
          plugin: 'getkd',
          p: '5342517'
        },
        header: {
          'token': wx.getStorageSync('token')
        },
        success: function (res) {
          console.log(res)
          if (res.data.info == 'ok') {

            self.setData({
              grid_arr: res.data.list,
              active: res.data.list[0].title
            })
            self.getdata1(res.data.list[0].id)
          }
        }
      })
    },
    getdata1(id) {
      let self = this
      wx.request({
        url: getApp().data.APIS + '/svc/a',
        method: 'get',
        data: {
          plugin: 'getkd',
          p: id
        },
        header: {
          'token': wx.getStorageSync('token')
        },
        success: function (res) {
          console.log(res)
          if (res.data.info == 'ok') {

            self.setData({
              first_arr: res.data.list
            })
          }
        }
      })
    },
  },
  attached() {
    console.log(545646)
    this.getdata()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(45454)
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