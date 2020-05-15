// pages/W_index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '康牙医生',
    arr:[],
    img_arr:['','',''],
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  gridclick(e){
    console.log(e)
    let item = e.currentTarget.dataset.item
    let stype = e.currentTarget.dataset.item.stype
    if (stype == 'article'){
      wx.navigateTo({
        url: '/pages/Newslist/index?title=' + item.name + '&&id=' + item.value,
      })
    } else if (stype == 'course') {
      wx.navigateTo({
        url: '/pages/studynav/index?title='+item.name+'&&state=2&&id=' + item.value,
      })
    } else if (stype == 'video') {
      wx.navigateTo({
        url: '/pages/PriceList/index?title=医患沟通视频&&value=' + item.value,
      })
    } else if (stype == 'link') {
      wx.navigateTo({
        url: item.value,
      })
    } else if (stype == 'app') {
      wx.navigateToMiniProgram({
        appId: item.value.appid, // 要跳转的小程序的appid
        path: item.value.page, // 跳转的目标页面
        extarData: {
        },
        success(res) {
          // 打开成功  
        },
        fail(err) {
          console.log(err)
        }
      }) 
    } else if (stype == 'api') {
      console.log(item.value.page + '&&id' + item.value.p.clinicid)
      let url_id = item.value.page.indexOf('?') != -1 ? '&&id=' + item.value.p.clinicid : '?id=' + item.value.p.clinicid
      wx.navigateTo({
        url: '/' + item.value.page + url_id + '&&rw_url=' + item.value.url,
      })
    } else if (stype == 'article1') {
      wx.navigateTo({
        url: '/pages/newsdetails/index?title=' + item.name + '&&id=' + item.value,
      })
    } else if (stype == 'course1') {
      wx.navigateTo({
        url: '/pages/coursedetails/index?id=' + item.value,
      })
    }
  },
  getdata(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin:'gethomedoc',
        p:5996551
      },
      header: {
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            arr: res.data.list[0].content
          })
        }
      }
    })
  },
  getimg() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'getkd',
        p: 5996551
      },
      header: {
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(1)
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            img_arr: res.data.list
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ title: '康牙医生' })
    wx.setNavigationBarTitle({
      title: '康牙医生'
    })
    this.getdata()
    this.getimg()
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