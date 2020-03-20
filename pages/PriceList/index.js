// pages/PriceList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'价目表',
    activeKey:'全部',
    check_id: 0,
    LookTeethimg:"",
    PriceList_arr: [],
    PriceListclick_arr:[],
    all_PriceListclick_arr:[],
    videolist_arr: [],
    videolistclick_arr: [],
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight(){
    wx.redirectTo({
      url: '../Pricesearch/index'
    })
  },
  first_click(e){
    let index = e.currentTarget.dataset.index
    let arr = this.data.videolist_arr
    if (e.currentTarget.dataset.state == 0){
      arr[index].state = 1
      this.setData({
        videolist_arr: arr
      })
    }else{
      arr[index].state = 0
      this.setData({
        videolist_arr: arr
      })
    }
  },
  litextclick(e) {
    let self = this
    this.setData({
      check_id: e.currentTarget.dataset.id
    })
    wx.request({
      url: getApp().data.API+'/PriceListClick.json',
      data: {
        id: e.currentTarget.dataset.id
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result == 200) {
          self.setData({
            videolistclick_arr: res.data.videoclick_arr
          })
        }
      },
    })
  },
  onChange(event) {
    let self = this
    console.log(event.detail)
    self.setData({
      activeKey: event.detail.name
    })
    if (self.data.PriceList_arr[event.detail] == '全部'){
      this.setData({
        PriceListclick_arr: self.data.all_PriceListclick_arr
      })
    }else{
      let arr = self.data.all_PriceListclick_arr
      let arr1 = []
      for (let i = 0; i < arr.length;i++){
        if (arr[i].feetype == self.data.PriceList_arr[event.detail]){
          arr1.push(arr[i])
        }
      }
      this.setData({
        PriceListclick_arr: arr1
      })
    }
  },
  getvod() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/video/getvod/EOk6llnOcw9X1e4',
      method: 'get',
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
          })
        }
      }
    })
  },
  gethandle() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/sysset/gethandle',
      method: 'post',
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = self.data.PriceList_arr
          arr.push('全部')
          for (let i = 0; i < res.data.list.length;i++){
            if (arr.indexOf(res.data.list[i].feetype)==-1){
              arr.push(res.data.list[i].feetype)
            }
          }
          console.log(arr)
          self.setData({
            PriceList_arr: arr,
            PriceListclick_arr: res.data.list,
            all_PriceListclick_arr:res.data.list
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
      title: options.title
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
    if (options.title == '价目表') {
      this.gethandle()
    } else if (options.title == '医患沟通视频') {
      this.getvod()
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