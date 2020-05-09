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
    grid_arr:[],
    nav_arr:[],
    borderstate: false,
    pageIndex:1,
    pageCount:0
  },
  methods:{
    uptouch() {
      console.log(4454545)
      if (this.data.pageIndex > this.data.pageCount){

      } else {
        this.getdata()
      }
    },
    getdata() {
      let self = this
      wx.request({
        url: getApp().data.APIS + '/svc/a',
        method: 'get',
        data: {
          plugin: 'querydoc',
          p: JSON.stringify({
            'labels': '直播',
            'start': 0,
            'limit': 4
          })
        },
        header: {
          'token': wx.getStorageSync('token')
        },
        success: function (res) {
          if (res.data.info == 'ok') {
            self.setData({
              nav_arr: res.data.list
            })
          }
        }
      })
    },
    getdata1() {
      let self = this
      wx.request({
        url: getApp().data.APIS + '/svc/a',
        method: 'get',
        data: {
          plugin: 'querydoc',
          p: JSON.stringify({
            'labels':'直播,推荐',
            'start':0,
            'limit':3
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
              Notice_arr:res.data.list
            })
          }
        }
      })
    },
    getdata3() {
      let self = this
      wx.request({
        url: getApp().data.APIS + '/svc/a',
        method: 'get',
        data: {
          plugin: 'querydoc',
          p: JSON.stringify({
            'labels': '系列视频',
            'start': 0,
            'limit': 3
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
              series_arr: res.data.list
            })
          }
        }
      })
    }, 
    getdata4() {
      let self = this
        wx.request({
        url: getApp().data.APIS + '/svc/a',
        method: 'get',
        data: {
          plugin: 'querydoc',
          p: JSON.stringify({
            'labels': '单课程',
            'start': 0,
            'limit': 3
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
            'labels': '置顶',
            'start': 0,
            'limit': 3
          })
        },
        header: {
          'token': wx.getStorageSync('token')
        },
        success: function (res) {
          console.log(111)
          console.log(res)
          console.log(222)
          if (res.data.info == 'ok') {
            self.setData({
              img_arr: res.data.list
            })
          }
        }
      })
    }, 
    getdata2() {
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
              grid_arr:res.data.list
            })
            console.log(self.data.grid_arr)
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
  },
  attached() {
    this.getdata()
    this.getdata1()
    this.getdata2()
    this.getdata3()
    this.getdata4()
    this.getdata5()
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
    console.log(1111)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})