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
    Invalid_arr: [
      {
        img: '../../../images/my_service_icon_prepaid.png',
        title: 'VOCO/我和 PRovicl氢氧化钙临时观桥粘接剂',
        price: 36.00,
        tags: '红',
        state: 0
      }, {
        img: '../../../images/my_service_icon_prepaid.png',
        title: 'VOCO/我和 PRovicl氢氧化钙临时观桥粘接剂',
        price: 36.00,
        tags: '红',
        state: 0
      }
    ]
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
  del() {
    Dialog.confirm({
      title: '标题',
      message: '您确定要取消收藏吗？'
    }).then(() => {
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
      arr1[i].state = arr1[i].state == 0 ? 1 : 0
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})