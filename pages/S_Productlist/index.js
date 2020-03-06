// pages/S_Productlist/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'商城',
    check_title:'',
    search_text:'',
    search_state:0,
    a1:true,
    a2: true,
    nav_num:0,
    show:false,
    sxbrand:true,
    brandstate:'',
    brand:[
      { state: 0, title: '3M ESPE' },
      { state: 0, title: '富士GC' },
      { state: 0, title: '稳健' },
      { state: 0, title: 'TPC' },
      { state: 0, title: 'KERR/科尔' },
      { state: 0, title: '松风' },
    ],
    price:999,
    price_arr:['0-100','101-200','201-500','501-1000','1001-2000','2001以上'],
    lowprice:'',
    highprice:'',
    li_state:true,
    list_arr: [
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
    ],
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  searchipt(e){
    console.log(e)
    this.setData({
      search_text: e.detail.value
    })
  },
  lowipt(e) {
    this.setData({
      lowprice: e.detail.value
    })
  },
  highipt(e) {
    this.setData({
      highprice: e.detail.value
    })
  },
  searchenter(){
    console.log(this.data.search_text)
  },
  search(){
    this.setData({
      search_state: 0
    })
  },
  searchfocus(){
    this.setData({
      search_state: 1
    })
  },
  navclick(e) {
    this.setData({
      nav_num: e.currentTarget.dataset.index
    })
    if (e.currentTarget.dataset.index == this.data.nav_num && this.data.nav_num == 1){
      console.log(e.currentTarget.dataset.index)
      this.setData({
        a1: this.data.a1?false:true
      })
    } else if (e.currentTarget.dataset.index == this.data.nav_num && this.data.nav_num == 2) {
      this.setData({
        a2: this.data.a2 ? false : true
      })
    }
  },
  searchtextclick(e) {
    this.setData({
      nav_num: e.currentTarget.dataset.text
    })
    this.search()
  },
  showpopup(){
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  sxbrandclick() {
    this.setData({
      sxbrand: this.data.sxbrand?false:true
    })
  },
  brandclick(e){
    let index = e.currentTarget.dataset.index
    let arr = this.data.brand
    arr[index].state = arr[index].state == 0 ? 1 : 0
    this.setData({
      brand: arr
    })
  }, 
  priceclick(e) {
    this.setData({
      price: e.currentTarget.dataset.index
    })
  },
  cz(){
    let arr = this.data.brand
    for(let i =0;i<arr.length;i++){
      arr[i].state =0
    }
    this.setData({
      price: 999,
      brand:arr,
      lowprice:'',
      highprice:'',
    })
  },
  sxbtn (){
    this.onClose()
  },
  listate(){
    this.setData({
      li_state: this.data.li_state ? false : true
    })
  },

  getdata() {
    let self = this
    wx.request({
      url: getApp().data.API+'/S_Productlist.json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result == 200) {
          self.setData({
            list_arr: res.data.list_arr,
            brand: res.data.brand,
            assemble_arr: res.data.assemble_arr,
            Promotion_list: res.data.Promotion_list,
            all_arr: res.data.all_arr,
            brand_arr: res.data.brand_arr
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      check_title:options.title,
      search_state:options.search,
      brandstate: options.brand ? options.brand:''
    })
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