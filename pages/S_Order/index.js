// pages/S_Order/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '商城',
    active: '待付款',
    check_num:0,
    order_arr:[],
    pageIndex:0,
    user:'',
    scorllshow:true,
    check_item:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onChange(event) {
    console.log(event)
    this.setData({
      pageIndex:0,
      order_arr:[],
      check_num: event.detail.index,
      scorllshow:true
    })
    this.getdata(event.detail.index)
  },
  del() {
    Dialog.confirm({
      title: '标题',
      message: '您确定要删除订单吗？'
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    });
  },
  S_Servicego(){
    wx.navigateTo({
      url: '../S_Service/index?state=1',
    })
  },
  S_Orderdetailsgo(e) {
    this.setData({
      check_item:e.currentTarget.dataset.item
    })
    wx.navigateTo({
      url: '../S_Orderdetails/index?state='+this.data.check_num+'&&id='+e.currentTarget.dataset.id,
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
        console.log(res)
        self.setData({
          user:res.data.list[0]
        })
      }
    });
  },
  uptouch(){
    console.log(123)
    if(this.data.scorllshow){
      this.getdata(this.data.check_num)
    } 
  },
  getdata(number) {
    let self = this
    let index = Number(number) + 1
    wx.request({
      url: getApp().data.APIS +"/svc/a",
        method: "get",
        data: {
          "plugin": 'getcartorderlist',
          "p": {
            start:self.data.pageIndex,
            status:index
          }
        },
        header: {
          "token": wx.getStorageSync("token")
        },
        success: function(res) {
          console.log(54361)
          console.log(res)
          let num = self.data.pageIndex + res.data.list[0].length
          let arr = self.data.order_arr
          for(let i = 0;i<res.data.list[0].length;i++){
            res.data.list[0][i].actualPay = 0
            res.data.list[0][i].num = 0
            for(let j = 0;j<res.data.list[0][i].detail.length;j++){
              res.data.list[0][i].actualPay += res.data.list[0][i].detail[j].goodinfo.actualPay
              res.data.list[0][i].num += res.data.list[0][i].detail[j].goodinfo.num
            }
          }
          arr.push(...res.data.list[0])
          self.setData({
            pageIndex:num,
            order_arr:arr,
            scorllshow:res.data.list[0].length==0?false:true
          })
        }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      active: Number(options.title),
      check_num:options.title
    })
    wx.setNavigationBarTitle({
      title: '商城'
    })
    this.getdata(options.title)
    this.getuser()
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