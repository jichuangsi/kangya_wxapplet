// pages/studysearch/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:'单课程',
    searchtext:'',
    first_arr:[],
    pageIndex:0,
    pagestate:true
  },
  back(){
    wx.navigateBack({
      delta: 1
    })
  },
  uptouch(){
    console.log(this.data.pagestate)
    if (this.data.pagestate){
      if (this.data.active == '单课程') {
        this.getdata4(this.data.searchtext)
      } else if (this.data.active == '系列课程') {
        this.getdata3(this.data.searchtext)
      } else if (this.data.active == '主播') {
        this.getdata1(this.data.searchtext)
      }
    }
  },
  ipt(e) {
    this.setData({
      searchtext: e.detail.value
    })
  },
  searchclick(e){
    this.setData({
      searchtext: e.detail.value
    })
    console.log(this.data.searchtext)
    if (this.data.active == '单课程'){
      this.getdata4(this.data.searchtext)
    } else if (this.data.active == '系列课程') {
      this.getdata3(this.data.searchtext)
    } else if (this.data.active == '主播') {
      this.getdata1(this.data.searchtext)
    }
  },
  onChange(event) {
    this.setData({
      active: event.detail.name,
      first_arr:[],
      pageIndex:0
    })
    if (this.data.active == '单课程') {
      this.getdata4(this.data.searchtext)
    } else if (this.data.active == '系列课程') {
      this.getdata3(this.data.searchtext)
    } else if (this.data.active == '主播') {
      this.getdata1(this.data.searchtext)
    }
  },
  getdata1(title) {
    let self = this
    self.setData({
      pagestate: false
    })
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'querydoc',
        p: JSON.stringify({
          'labels': '直播,推荐',
          'start': self.data.pageIndex,
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
          let arr = self.data.first_arr
          arr.push(...res.data.list)
          self.setData({
            first_arr: arr
          })
          if (res.data.list.length == 0) {
            self.setData({
              pagestate: false
            })
          } else {
            self.setData({
              pageIndex: self.data.first_arr.length,
              pagestate: true
            })
          }
        }
      }
    })
  },
  getdata3(title) {
    let self = this
    self.setData({
      pagestate: false
    })
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'querydoc',
        p: JSON.stringify({
          'labels': '系列视频',
          'start': self.data.pageIndex,
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
          let arr = self.data.first_arr
          arr.push(...res.data.list)
          self.setData({
            first_arr: arr
          })
          if (res.data.list.length == 0) {
            self.setData({
              pagestate: false
            })
          } else {
            self.setData({
              pageIndex: self.data.first_arr.length,
              pagestate: true
            })
          }
        }
      }
    })
  },
  getdata4(title) {
    let self = this
    self.setData({
      pagestate: false
    })
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'querydoc',
        p: JSON.stringify({
          'labels': '单课程',
          'start': self.data.pageIndex,
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
          let arr = self.data.first_arr
          arr.push(...res.data.list)
          self.setData({
            first_arr: arr
          })
          if (res.data.list.length == 0) {
            self.setData({
              pagestate: false
            })
          } else {
            self.setData({
              pageIndex: self.data.first_arr.length,
              pagestate: true
            })
          }
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