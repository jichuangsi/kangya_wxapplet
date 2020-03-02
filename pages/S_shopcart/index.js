// pages/S_shopcart/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '商城',
    del_state:0,
    all_num:0,
    all_price:0.00,
    allstate:0,
    arr:[
      {
        title:'满299减20元',
        state:'满减',
        id:0,
        child:[
          {
            img:'../../../images/my_service_icon_prepaid.png',
            title:'VOCO/我和 PRovicl氢氧化钙临时观桥粘接剂',
            min:3,
            num:3,
            price:36.00,
            tags:'红',
            state:0
          }
        ]
      }
    ],
    check_arr: [],
    Invalid_arr: [
      {
        img: '../../../images/my_service_icon_prepaid.png',
        title: 'VOCO/我和 PRovicl氢氧化钙临时观桥粘接剂',
        price: 36.00,
        tags: '红',
      }
    ],
    love_arr: [
      {
        img: '../../images/my_service_icon_prepaid.png',
        title: 'VOCO/我和 PRovicl氢氧化钙PRovicl氢氧化钙临时观桥粘接剂临时观桥粘接剂',
        price: 36.00,
        oldprice: 46.00,
        tags: '红',
      }
    ]
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 999
    })
  },
  edit(e){
    this.setData({
      del_state: e.currentTarget.dataset.index
    })
  },
  delone(e) {
    let first_index = e.currentTarget.dataset.first_index
    let index = e.currentTarget.dataset.index
    let arr1 = this.data.arr
    arr1[first_index].child[index].num = arr1[first_index].child[index].num - 1
    this.setData({
      arr: arr1
    })
  },
  addone(e){
    let first_index = e.currentTarget.dataset.first_index
    let index = e.currentTarget.dataset.index
    let arr1 = this.data.arr
    arr1[first_index].child[index].num = arr1[first_index].child[index].num+1
    this.setData({
      arr:arr1
    })
  },
  del(){
    Dialog.confirm({
      title: '标题',
      message: '您确定要删除所选商品吗？'
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    });
  },
  delInvalid() {
    Dialog.confirm({
      title: '标题',
      message: '您确定要清空失效商品吗？'
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    });
  },
  check(e){
    let first_index = e.currentTarget.dataset.first_index
    let index = e.currentTarget.dataset.index
    let arr1 = this.data.arr
    arr1[first_index].child[index].state = arr1[first_index].child[index].state==0?1:0
    this.setData({
      arr: arr1
    })
    this.all()
  },
  allcheck(){
    let arr1 = this.data.arr
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr1[i].child.length; j++) {
        arr1[i].child[j].state = this.data.allstate == 0?1:0
      }
    }
    this.setData({
      arr: arr1
    })
    this.all()
  },
  all(){
    let arr1 = this.data.arr
    let arr2 = []
    let num = 0
    let price = 0
    let a = true
    for (let i = 0; i < arr1.length;i++){
      for(let j =0;j<arr1[i].child.length;j++){
        if(arr1[i].child[j].state == 1){
          arr2.push(arr1[i].child[j])
          num += arr1[i].child[j].num
          price += arr1[i].child[j].num * arr1[i].child[j].price
        }else{
          a = false
        }
      }
    }
    this.setData({
        check_arr: arr2,
        all_num:num,
        all_price:price,
        allstate:a?1:0
    })
  },
  alike(){
    wx.navigateTo({
      url: '../S_Productlist/index',
    })
  },
  S_coupongo() {
    wx.navigateTo({
      url: '../S_coupon/index',
    })
  },
  S_Settlementgo(){
    if(this.data.all_price>0){
      wx.navigateTo({
        url: '../S_Settlement/index',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商城'
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