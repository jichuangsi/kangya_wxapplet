// pages/friendsearch/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchtext: '',
    arr: [],
    state: 0,
    Patientstate:0,
    scrollTop: 'A',
    project_list: [],
    pageIndex:1,
    another: 0,
    power_arr: [],
    user: '',
  },
  back() {
    wx.navigateBack({
      delta: 1
    })
  },
  searchclick(e) {
    console.log(e)
    this.getdoctor(e.detail.value)
  },
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
  },
  detailsgo(e){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 3]; 
    if (this.data.Patientstate == 0) {
      wx.navigateTo({
        url: '../Colleaguedetails/index?item=' + JSON.stringify(e.currentTarget.dataset.item),
      })
    } else {
      if (this.data.state == 1) {
        let list = prevPage.data.Patientlist
        list.doctor = e.currentTarget.dataset.name
        list.doctorid = e.currentTarget.dataset.item.doctorid
        prevPage.setData({
          Patientlist: list
        })
      } else {
        if (this.data.another == 0) {
          prevPage.setData({
            doctor: e.currentTarget.dataset.item
          })
        } else {
          prevPage.setData({
            doctor1: e.currentTarget.dataset.item
          })
        }
      }
      wx.navigateBack({
        delta: 2
      })
    }
  },
  getdoctor(value) {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/sysset/employeetreelist',
      method: 'post',
      data: {
        pageno: self.data.pageIndex,
        pagesize: 100,
        keyword: value
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            project_list: res.data.list
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.Patientstate)
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];
    this.setData({
      Patientstate: options.Patientstate ? options.Patientstate : 0,
      state: options.state ? options.state : 0,
      another: options.another ? options.another : 0,
      power_arr: Page.data.power_arr ? Page.data.power_arr : '',
      user: Page.data.user ? Page.data.user : '',
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

  }
})