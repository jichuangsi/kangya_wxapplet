// pages/S_index/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'商城',
    arr:['','',''],
    activity_arr:[
      { id: 0, img: '' },
      { id: 1, img: '' },
      { id: 2, img: '' },
      { id: 3, img: '' },
    ],
    assemble_arr: [
      {
        id:0,
        img: '../../images/my_service_icon_prepaid.png',
        title: 'VOCO/我和 PRovicl氢氧化钙PRovicl氢氧化钙临时观桥粘接剂临时观桥粘接剂',
        price: 36.00,
        oldprice: 46.00,
        tags: '红',
      }, {
        id: 0,
        img: '../../images/my_service_icon_prepaid.png',
        title: 'VOCO/我和 PRovicl氢氧化钙PRovicl氢氧化钙临时观桥粘接剂临时观桥粘接剂',
        price: 36.00,
        oldprice: 46.00,
        tags: '红',
      }, {
        id: 0,
        img: '../../images/my_service_icon_prepaid.png',
        title: 'VOCO/我和 PRovicl氢氧化钙PRovicl氢氧化钙临时观桥粘接剂临时观桥粘接剂',
        price: 36.00,
        oldprice: 46.00,
        tags: '红',
      }
    ],
    Promotion_arr:[
      {
        arr:[
          {
            id: 0,
            img: '../../images/my_service_icon_prepaid.png',
            title: 'VOCO/我和 PRovicl氢氧化钙PRovicl氢氧化钙临时观桥粘接剂临时观桥粘接剂',
            price: 36.00,
            oldprice: 46.00,
            tags: '红',
          },
          {
            id: 0,
            img: '../../images/my_service_icon_prepaid.png',
            title: 'VOCO/我和 PRovicl氢氧化钙PRovicl氢氧化钙临时观桥粘接剂临时观桥粘接剂',
            price: 36.00,
            oldprice: 46.00,
            tags: '红',
          }, {
            id: 0,
            img: '../../images/my_service_icon_prepaid.png',
            title: 'VOCO/我和 PRovicl氢氧化钙PRovicl氢氧化钙临时观桥粘接剂临时观桥粘接剂',
            price: 36.00,
            oldprice: 46.00,
            tags: '红',
          }, {
            id: 0,
            img: '../../images/my_service_icon_prepaid.png',
            title: 'VOCO/我和 PRovicl氢氧化钙PRovicl氢氧化钙临时观桥粘接剂临时观桥粘接剂',
            price: 36.00,
            oldprice: 46.00,
            tags: '红',
          }
        ]
      }
    ],
    all_arr: [
      {
        id: 0,
        img: '../../images/my_service_icon_prepaid.png',
        title: 'VOCO/我和 PRovicl氢氧化钙PRovicl氢氧化钙临时观桥粘接剂临时观桥粘接剂',
        price: 36.00,
        oldprice: 46.00,
        tags: '红',
      },
      {
        id: 0,
        img: '../../images/my_service_icon_prepaid.png',
        title: 'VOCO/我和 PRovicl氢氧化钙PRovicl氢氧化钙临时观桥粘接剂临时观桥粘接剂',
        price: 36.00,
        oldprice: 46.00,
        tags: '红',
      },
      {
        id: 0,
        img: '../../images/my_service_icon_prepaid.png',
        title: 'VOCO/我和 PRovicl氢氧化钙PRovicl氢氧化钙临时观桥粘接剂临时观桥粘接剂',
        price: 36.00,
        oldprice: 46.00,
        tags: '红',
      }
    ],
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 999
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
    console.log(555)
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