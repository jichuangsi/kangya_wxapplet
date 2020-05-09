// pages/studysearch/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:'单课程',
    searchtext:'',
    first_arr:[]
  },
  back(){
    wx.navigateBack({
      delta: 1
    })
  },
  searchclick(e){
    console.log(e.detail.value)
    console.log(this.data.searchtext)
    if (this.data.active == '单课程'){
      this.getdata4(e.detail.value)
    } else if (this.data.active == '系列课程') {
      this.getdata3(e.detail.value)
    } else if (this.data.active == '主播') {
      this.getdata1(e.detail.value)
    }
  },
  onChange(event) {
    this.setData({
      active: event.detail.name
    })
  },
  getdata1(title) {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'querydoc',
        p: JSON.stringify({
          'labels': '直播,推荐',
          'start': 0,
          'limit': 10,
          'title': title
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
            first_arr: res.data.list
          })
        }
      }
    })
  },
  getdata3(title) {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'querydoc',
        p: JSON.stringify({
          'labels': '系列视频',
          'start': 0,
          'limit': 10,
          'title': title
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
            first_arr: res.data.list
          })
        }
      }
    })
  },
  getdata4(title) {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'querydoc',
        p: JSON.stringify({
          'labels': '单课程',
          'start': 0,
          'limit': 10,
          'title': title
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
            first_arr: res.data.list
          })
        }
      },
      fail:function(err){
        console.log(err)
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