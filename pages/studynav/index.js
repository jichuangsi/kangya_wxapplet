// pages/studynav/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
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
    pageIndex: 0,
    pagestate: true,
    grid_arr: [],
    id: '',
    isOverShare: true
  },
  onChange(event){
    this.setData({
      active: event.detail.name,
      course_arr:[],
      pageIndex: 0,
      id: this.data.grid_arr[event.detail.index].id
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
  uptouch(){
    if(this.data.pagestate){
      if(this.data.state == 1){
        this.getdata3(this.data.id)
      } else if (this.data.state == 2) {
        if (this.data.title == '直播预告') {
          this.getdata4()
        } else if (this.data.title == '系列课') {
          this.getdata5()
        } else {
          this.getdata3(this.data.id)
        }
      }
    }
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
          let arr = self.data.course_arr
          arr.push(...res.data.list)
          self.setData({
            course_arr: arr
          })
          if (res.data.list.length == 0) {
            self.setData({
              pagestate: false
            })
          } else {
            self.setData({
              pageIndex: self.data.course_arr.length,
              pagestate: true
            })
          }
        }
      }
    })
  },
  getdata5() {
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
          let arr = self.data.course_arr
          arr.push(...res.data.list)
          self.setData({
            course_arr: arr
          })
          if (res.data.list.length == 0) {
            self.setData({
              pagestate: false
            })
          } else {
            self.setData({
              pageIndex: self.data.course_arr.length,
              pagestate: true
            })
          }
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
              self.setData({
                id: res.data.list[i].id
              })
            }
          }
          self.getdata3(id)
        }
      }
    })
  },
  getdata3(id) {
    let self = this
    self.setData({
      pagestate: false
    })
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'getkd',
        p: id + '|' + self.data.pageIndex
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
          let arr = self.data.course_arr
          arr.push(...res.data.list)
          self.setData({
            course_arr: arr
          })
          if (res.data.list.length == 0) {
            self.setData({
              pagestate: false
            })
          } else {
            self.setData({
              pageIndex: self.data.course_arr.length,
              pagestate: true
            })
          }
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
      state: options.state,
      title:options.title
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
    return {
      title: this.data.title,
      desc: '分享页面的内容',
      path: '/pages/study/index?state=' + this.data.state + '&&title=' + this.data.title + '&&id=' + this.data.id  // 路径，传递参数到指定页面。
    }
  }
})