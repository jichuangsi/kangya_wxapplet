// pages/studynav/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:1,
    show:false,
    active: '种植',
    tabnum:1,
    result: [],
    addname:'',
    addmechanism:"",
    addOther:"",
    addphone:"",
    first_arr: [1, 1],
    course_arr:[],
    pageIndex: 1,
    pageCount: 0,
    grid_arr: [],
  },
  onChange(event){
    this.setData({
      active: event.detail.name,
      course_arr:[]
    })
    wx.setNavigationBarTitle({
      title: event.detail.name
    })
    this.getdata3(this.data.grid_arr[event.detail.index].id)
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  tab(e){
    console.log(e.currentTarget.dataset.id)
    this.setData({
      tabnum: e.currentTarget.dataset.id
    })
  }, 
  addonChange(event) {
    this.setData({
      result: event.detail
    });
  },

  getdata4() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'querydoc',
        p: JSON.stringify({
          'labels': '直播,推荐',
          'start': 0,
          'limit': 10
        })
      },
      header: {
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.info == 'ok') {
          for (let i = 0; i < res.data.list.length; i++) {
            res.data.list[i].content = self.removecode(res.data.list[i].content)
          }
          self.setData({
            course_arr: res.data.list
          })
        }
      }
    })
  },
  getdata5() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'querydoc',
        p: JSON.stringify({
          'labels': '系列视频',
          'start': 0,
          'limit': 10
        })
      },
      header: {
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.info == 'ok') {
          for (let i = 0; i < res.data.list.length; i++) {
            res.data.list[i].content = self.removecode(res.data.list[i].content)
          }
          self.setData({
            course_arr: res.data.list
          })
        }
      }
    })
  }, 
  getdata2(title) {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'getkd',
        p: '5342754'
      },
      header: {
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        if (res.data.info == 'ok') {

          self.setData({
            grid_arr: res.data.list,
            active: title
          })
          let id = ''
          for (let i = 0; i < res.data.list.length;i++){
            if (res.data.list[i].title == title){
              id = res.data.list[i].id
            }
          }
          self.getdata3(id)
        }
      }
    })
  },
  getdata3(id) {
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
          for (let i = 0; i < res.data.list.length; i++) {
            res.data.list[i].content = self.removecode(res.data.list[i].content)
          }
          self.setData({
            course_arr: res.data.list
          })
        }
      }
    })
  },
  removecodeex(content, s, e) {
      if (content.indexOf(s) > -1) {
        return content.split(s)[1].split(e)[0]
      }
      return content
  },
  removecode(d, s, e) {
    let self = this
      var s = s || '//<![CDATA['
      var e = e || '//]]>'
      return d.replace(s + self.removecodeex(d, s, e) + e, '')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      // active:options.title,
      state: options.state
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
    if (options.state == 1) {
      this.getdata2(options.title)
    }else if(options.state == 2){
      if (options.title == '直播预告') {
        this.getdata4()
      } else if (options.title == '系列课') {
        this.getdata5()
      } else {
        this.getdata3(options.id)
      }
    }
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