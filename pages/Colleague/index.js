// pages/Colleague/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '同事',
    scrollTop: 'A',
    state:0,
    project_list: [],
    pageIndex:1
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },

  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
  },
  searchgo(){
    if(this.data.state==0){
      wx.navigateTo({
        url: '../friendsearch/index?state=1',
      })
    }else{
      wx.navigateTo({
        url: '../friendsearch/index?state=1&&Patientstate=1',
      })
    }
  },
  detailsgo(e) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2]; 
    if(this.data.state == 0){
      wx.navigateTo({
        url: '../Colleaguedetails/index?item=' + JSON.stringify(e.currentTarget.dataset.item),
      })
    }else{
      if (this.data.state == 1){
        let list = prevPage.data.Patientlist
        list.doctor = e.currentTarget.dataset.name
        prevPage.setData({
          Patientlist: list
        })
      }else if (this.data.state == 2 && this.data.state == 2){
        prevPage.setData({
          doctor_name: e.currentTarget.dataset.name
        })
      }
      this.onClickLeft()
    }
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/sysset/employeetreelist',
      method: 'post',
      data: {
        pageno:self.data.pageIndex,
        pagesize:20
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            project_list:res.data.list
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      state: options.state ? options.state:0,
      title: options.title ? options.title :'同事'
    })
    wx.setNavigationBarTitle({
      title: options.title ? options.title : '同事'
    })
    this.getdata()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {

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