// pages/programme/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';
Page({

  /**
   * 页面的初始数据
   */

  data: {
    title: '设置方案',
    active:'处置选择',
    activeKey:'全部',
    price:0,
    num:0,
    show:false,
    PriceList_arr: [],
    PriceListclick_arr: [],
    all_PriceListclick_arr: [],
    check_arr:[]
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onChange(event) {
    let self = this
    console.log(event.detail)
    self.setData({
      activeKey: event.detail.name
    })
    if (self.data.PriceList_arr[event.detail] == '全部') {
      this.setData({
        PriceListclick_arr: self.data.all_PriceListclick_arr
      })
    } else {
      let arr = self.data.all_PriceListclick_arr
      let arr1 = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].feetype == self.data.PriceList_arr[event.detail]) {
          arr1.push(arr[i])
        }
      }
      this.setData({
        PriceListclick_arr: arr1
      })
    }
  },
  showpopup() {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  addone(e){
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    let arr1 = JSON.parse(JSON.stringify(this.data.check_arr))
    let arr2 = this.data.PriceListclick_arr
    let arr3 = JSON.parse(JSON.stringify(this.data.check_arr))
    arr2[index].num = arr2[index].num + 1
    if (arr1.length > 0) {
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].handlesetguid == id) {
          arr3[i].num = arr3[i].num + 1
        }
      }
    } else {
      console.log(0)
      arr3.push(arr2[index])
    }
    this.setData({
      check_arr: arr3,
      PriceListclick_arr: arr2
    })
    this.allprice()
  },
  delone(e) {
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    let arr1 = JSON.parse(JSON.stringify(this.data.check_arr))
    let arr2 = this.data.PriceListclick_arr
    let arr3 = JSON.parse(JSON.stringify(this.data.check_arr))
    arr2[index].num = arr2[index].num - 1
    if (arr1.length>0){
      for(let i = 0;i<arr1.length;i++){
        if (arr1[i].handlesetguid == id){
          arr3[i].num = arr3[i].num - 1
        }
      }
    } else {
      arr3.push(arr2[index])
    }
    this.setData({
      check_arr: arr3,
      PriceListclick_arr: arr2
    })
    this.allprice()
  },
  allprice(){
    let arr1 = this.data.check_arr
    let priceall = 0
    let numall = 0
    for(let i=0;i<arr1.length;i++){
      if (arr1[i].num == 0){
        // arr1.splice(i,1)
      }else{
        priceall += arr1[i].num * arr1[i].price
        numall += arr1[i].num 
      }
    }
    console.log(arr1)
    this.setData({
      check_arr: arr1,
      price: priceall,
      num: numall
    })
  },
  delcheckone(e){
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.item.handlesetguid
    let arr1 = this.data.check_arr
    arr1[index].num = arr1[index].num-1
    let arr2 = this.data.PriceListclick_arr
    for (let i = 0; i < arr2.length; i++) {
      if (arr2[i].handlesetguid == id) {
        arr2[i].num = 0
      }
    }
    this.setData({
      check_arr: arr1,
      PriceListclick_arr: arr2
    })
    this.allprice()
  },
  delall() {
    let self = this
    let arr1 = self.data.check_arr
    let arr2 = self.data.PriceListclick_arr
    Dialog.confirm({
      title: '提示',
      message: '您确定清除所有方案吗？'
    }).then(() => {
      // on confirm
      for (let i = 0; i < arr2.length; i++) {
        arr2[i].num = 0
      }
      for (let i = 0; i < arr1.length; i++) {
        arr1[i].num = 0
      }
      self.setData({
        check_arr: arr1,
        PriceListclick_arr: arr2
      })
      self.allprice()
      self.onClose()
    }).catch(() => {
      // on cancel
    })
  },
  next(){
    wx.navigateTo({
      url: '../Tooth/index?state=1'
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
          let arr2 = []
          for (let i = 0; i < res.data.list.length; i++) {
            if (arr.indexOf(res.data.list[i].feetype) == -1) {
              arr.push(res.data.list[i].feetype)
            }
          }

          for (let i = 0; i < res.data.list.length; i++) {
              res.data.list[i].num = 0
              res.data.list[i].price = Number(res.data.list[i].handleprice)
              arr2.push(res.data.list[i])
          }
          console.log(arr2)
          self.setData({
            PriceList_arr: arr,
            check_arr: arr2,
            PriceListclick_arr: arr2,
            all_PriceListclick_arr: arr2
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:'设置方案'
    })
    this.gethandle()
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