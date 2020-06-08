// pages/S_Collection/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '商城',
    del_state: 0,
    all_num: 0,
    all_price: 0.00,
    allstate: 0,
    check_arr: [],
    Invalid_arr: [],
    user:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  edit(e) {
    this.setData({
      del_state: e.currentTarget.dataset.index
    })
  },
  del(e) {
    console.log(e.currentTarget.dataset.index)
    let arr = wx.getStorageSync('lovelist')?JSON.parse(wx.getStorageSync('lovelist')):[]
    let arr1 = wx.getStorageSync('loveidlist')?JSON.parse(wx.getStorageSync('loveidlist')):[]
    let arr2 = []
    Dialog.confirm({
      title: '标题',
      message: '您确定要取消收藏吗？'
    }).then(() => {
      if(e.currentTarget.dataset.index==0||e.currentTarget.dataset.index){
        arr1.splice(e.currentTarget.dataset.index,1)
        arr.splice(e.currentTarget.dataset.index,1)
      }else{
        for(let i =0;i<this.data.Invalid_arr.length;i++){
          if(this.data.Invalid_arr[i].state!=1){
            arr2.push(this.data.Invalid_arr[i])
          }
        }
        arr = []
        arr1 = []
        for(let j =0;j<arr2.length;j++){
          arr.push(arr2[j])
          arr1.push(arr2[j].id)
        }
      }
      this.setData({
        Invalid_arr:arr
      })
      wx.setStorageSync('lovelist', JSON.stringify(arr))
      wx.setStorageSync('loveidlist', JSON.stringify(arr1))
      // on confirm
    }).catch(() => {
      // on cancel
    });
  },
  check(e) {
    let first_index = e.currentTarget.dataset.first_index
    let index = e.currentTarget.dataset.index
    let arr1 = this.data.Invalid_arr
    arr1[index].state = arr1[index].state == 0 ? 1 : 0
    this.setData({
      Invalid_arr: arr1
    })
    this.all()
  },
  allcheck() {
    let arr1 = this.data.Invalid_arr
    for (let i = 0; i < arr1.length; i++) {
      arr1[i].state = this.data.allstate == 0 ? 1 : 0
    }
    this.setData({
      Invalid_arr: arr1
    })
    this.all()
  },
  all() {
    let arr1 = this.data.Invalid_arr
    let arr2 = []
    let a = true
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].state == 1) {

          arr2.push(arr1[i])
        } else {
          a = false
        }
    }
    this.setData({
      check_arr: arr2,
      allstate: a ? 1 : 0
    })
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.API+'/S_Collection.json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result == 200) {
          self.setData({
            Invalid_arr: res.data.Invalid_arr
          })
        }
      },
    })
  },
  getuser(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: "get",
      data: {
        "plugin":'getcartuserinfo'
      },
      header: {
        "token": wx.getStorageSync("token")
      },
      success: function(res) {
        console.log(54361)
        console.log(res)
        self.setData({
          user:res.data.list[0]
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商城'
    })
    this.getuser()
    this.setData({
      Invalid_arr : wx.getStorageSync('lovelist')?JSON.parse(wx.getStorageSync('lovelist')):[]
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