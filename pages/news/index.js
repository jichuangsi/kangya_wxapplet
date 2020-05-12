// pages/news/index.js
Component({

  /**
   * 页面的初始数据
   */
  data: {
    active:'',
    first_arr:[],
    grid_arr:[],
    id:'',
    pageIndex:0,
    pagestate:true
  },
  methods: {
    uptouch() {
      if(this.data.pagestate){
        this.getdata1(this.data.id)
      }
    },
    onChange(e){
      console.log(e)
      this.setData({
        id: this.data.grid_arr[e.detail.index].id,
        first_arr: [],
        pageIndex: 0,
      })
      this.getdata1(this.data.grid_arr[e.detail.index].id)
    },
    getdata() {
      let self = this
      wx.request({
        url: getApp().data.APIS + '/svc/a',
        method: 'get',
        data: {
          plugin: 'getkd',
          p: '5342729'
        },
        header: {
          'token': wx.getStorageSync('token')
        },
        success: function (res) {
          console.log(11122)
          console.log(res)
          if (res.data.info == 'ok') {
            self.setData({
              grid_arr: res.data.list,
              active: res.data.list[0].title,
              id: res.data.list[0].id
            })
            self.getdata1(res.data.list[0].id)
          }
        }
      })
    },
    getdata1(id) {
      let self = this
      self.setData({
        pagestate: false
      })
      wx.request({
        url: getApp().data.APIS + '/svc/a',
        method: 'get',
        data: {
          plugin: 'getkd',
          p: id+'|'+self.data.pageIndex
        },
        header: {
          'token': wx.getStorageSync('token')
        },
        success: function (res) {
          console.log(res)
          if (res.data.info == 'ok') {
            let arr = self.data.first_arr
            arr.push(...res.data.list)
            self.setData({
              first_arr: arr
            })
            console.log(self.data.first_arr)
            if (res.data.list.length == 0) {
              self.setData({
                pagestate: false
              })
            } else {
              self.setData({
                pageIndex: self.data.first_arr.length,
                pagestate: true
              })
              console.log(self.data.pageIndex)
            }
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