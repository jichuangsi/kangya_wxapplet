// pages/Videoplay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'sadds',
    state:0,
    lovestate: false,
    arr:[],
    text:'',
    show: false,
    client: '',
    item:'',
    item_kc: '',
    isOverShare: true
  },


  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  ipttext(e) {
    this.setData({
      text: e.detail.value
    })
  },
  send() {
    this.senddata()
  },
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false, text: '' });
  },
  getdata(id) {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'comment',
        p: JSON.stringify({
          id: id,
          start:0,
          limit:10
        })
      },
      header: {
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(getApp().data.APIS)
        console.log(id)
        console.log(112335)
        console.log(res)
        if (res.data.info == 'ok') {
          for(let i =0;i<res.data.list[0].length;i++){
            res.data.list[0][i].version.when = self.myFunction(res.data.list[0][i].version.when)
          }
          self.setData({
            arr: res.data.list[0]
          })
        }
      }
    })
  },
  senddata(id) {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a?plugin=addcomment&p=kyawang',
      method: 'post',
      data: {
        id: self.data.item_kc.id,
        value:self.data.text
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            text: ''
          })
          self.getdata(self.data.item_kc.id)
        }
      }
    })
  },
  myFunction(time) {
    var dateee = new Date(time).toJSON();

    var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')

    return date

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.url) {
      wx.setNavigationBarTitle({
        title: options.title
      })
      this.setData({
        item: {
          link: options.url + '?' + options.url_h + '&files=' + options.files
        },
        title: options.title,
        state: options.state
      })
      console.log(this.data.item)
    } else {
      var pages = getCurrentPages();
      var Page = pages[pages.length - 2];//
      this.setData({
        state: options.state ? options.state : 0,
      })
      wx.setNavigationBarTitle({
        title: options.title
      })
      if (this.data.state == 0) {
        this.setData({
          item: Page.data ? Page.data.nowitem : '',
          title: Page.data ? Page.data.nowitem.name : ''
        })
        wx.setNavigationBarTitle({
          title: Page.data ? Page.data.nowitem.name : ''
        })
      } else if (this.data.state == 1) {
        if (Page) {
          this.setData({
            item_kc: Page.data.item
          })
          this.getdata(Page.data.item.id)
        } else {
          console.log(unescape(options.item_video))
          console.log(unescape(options.item_courseInfo))
          this.setData({
            item_kc: {
              id: options.item_id,
              video: JSON.parse(unescape(options.item_video)),
              courseInfo: JSON.parse(unescape(options.item_courseInfo)),
              hit: options.item_hit,
            }
          })
          this.getdata(options.item_id)
        }
      }
    }
    console.log(options)
  },
  loveclick(){
    this.setData({
      lovestate:!this.data.lovestate
    })
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
    if(this.data.state == 0){
      let url_q = this.data.item.link.split('?')[0]
      let url_h = this.data.item.link.split('?')[1]
      return {
        title: this.data.title,
        desc: '分享页面的内容',
        path: '/pages/Videoplay/index?title=' + this.data.title + '&&url=' + url_q + '&&state=' + this.data.state + '&&url_h=' + url_h  // 路径，传递参数到指定页面。
      }
    } else if (this.data.state == 1) {
      let item_id = this.data.item_kc.id
      let item_video = escape(JSON.stringify(this.data.item_kc.video))
      let item_courseInfo = escape(JSON.stringify(this.data.item_kc.courseInfo))
      let item_hit = this.data.item_kc.hit
      return {
        title: '康牙医生',
        desc: '分享页面的内容',
        path: '/pages/Videoplay/index?title=&&state=' + this.data.state + '&&item_id=' + item_id + '&&item_video=' + item_video + '&&item_courseInfo=' + item_courseInfo + '&&item_hit=' + item_hit  // 路径，传递参数到指定页面。
      }
    }
  }
})