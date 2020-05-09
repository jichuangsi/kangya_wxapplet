// pages/coursedetails/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '课程详情',
    collection:false,
    love:false,
    url:'',
    item:'',
    imgurl:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  collectionclick(e){
    if (e.currentTarget.dataset.state == 0) {
      this.setData({
        collection: true
      })
    }else{
      this.setData({
        collection: false
      })
    }
  }, 
  loveclick(e){
    if(e.currentTarget.dataset.state == 0) {
      this.setData({
        love: true
      })
    }else {
      this.setData({
        love: false
      })
    }
  }, 
  videogo(){
    wx.navigateTo({
      url: '../Videoplay/index?state=1',
    })
  },
  getdata(id) {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'getcoursedoc',
        p: id
      },
      header: {
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let a = res.data.list[0].content
          let b = a.substring(a.indexOf('<script'), a.indexOf('</script>') + 9)
          let c = a.substring(0, a.indexOf('<h3'))
          res.data.list[0].content = a.split(b)[0] + a.split(b)[1]
          res.data.list[0].content = res.data.list[0].content.split(c)[1]
          res.data.list[0].content = res.data.list[0].content.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
          let q = res.data.list[0].content.substring(0, res.data.list[0].content.indexOf('课程简介</h3>') + 9)
          res.data.list[0].content = res.data.list[0].content.split(q)[1]
          let w = res.data.list[0].content.substring(res.data.list[0].content.indexOf('<h3 id="'), res.data.list[0].content.length-1)
          res.data.list[0].content = res.data.list[0].content.split(w)[0]
          let d = c.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
          res.data.list[0].version.when = self.myFunction(res.data.list[0].version.when)
          self.setData({
            imgurl :d,
            item:res.data.list[0],
            collection: res.data.list[0].courseInfo.isForus?1:0
          })
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
    this.setData({
      url: this.route
    })
    wx.setNavigationBarTitle({
      title:'课程详情'
    })
    this.getdata(options.id)
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
      title: '康牙医生小程序',
      path: this.data.url,  // 路径，传递参数到指定页面。
      imageUrl: '../../imgs/xx.png', // 分享的封面图
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})

