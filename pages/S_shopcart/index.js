// pages/S_shopcart/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
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
    ],
    user:'',
    order_arr:[],
    surplus_arr:[],
    isIphoneX:false
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
    arr1[first_index].child[index].buynum = arr1[first_index].child[index].buynum - 1
    this.setData({
      arr: arr1
    })
    this.all()
  },
  addone(e){
    let first_index = e.currentTarget.dataset.first_index
    let index = e.currentTarget.dataset.index
    let arr1 = this.data.arr
    arr1[first_index].child[index].buynum = arr1[first_index].child[index].buynum+1
    this.setData({
      arr:arr1
    })
    this.all()
  },
  del(e){
    console.log(e.currentTarget.dataset.index)
    Dialog.confirm({
      title: '标题',
      message: '您确定要删除所选商品吗？'
    }).then(() => {
      let arr = this.data.arr
      let arr1 = JSON.parse(JSON.stringify(this.data.arr))
      arr1[0].child = []
      if(!e.currentTarget.dataset.index&&e.currentTarget.dataset.index!=0){
        for(let i = 0;i<arr[0].child.length;i++){
          if(arr[0].child[i].state != 1){
            arr1[0].child.push(arr[0].child[i])
          }
        }
      }else{
        arr[0].child.splice(e.currentTarget.dataset.index,1)
        arr1 = arr
      }
      // console.log(arr1)
      wx.setStorageSync('buylist', JSON.stringify(arr1[0].child))
      this.setData({
        arr:arr1,
        del_state:0
      })
      this.all()
      Toast('删除成功')
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
    console.log(arr1)
    let arr2 = []
    let num = 0
    let price = 0
    let a = true
    for (let i = 0; i < arr1.length;i++){
      for(let j =0;j<arr1[i].child.length;j++){
        if(arr1[i].child[j].state == 1){
          arr2.push(arr1[i].child[j])
          num += arr1[i].child[j].buynum
          price += arr1[i].child[j].buynum * (this.data.user.vip!=''&& this.data.user.vip?Number(arr1[i].child[j].vipPrice):Number(arr1[i].child[j].promotionPrice))
        }else{
          a = false
        }
      }
    }
    price = Math.floor(price * 100) / 100
    this.setData({
        check_arr: arr2,
        all_num:num,
        all_price:price,
        allstate:a&&arr1[0].child.length>0?1:0
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
    let arr = this.data.arr[0].child
    let arr1 = []
    let arr2 = []
    for(let i =0;i<arr.length;i++){
      if(arr[i].state==1){
        arr1.push(arr[i])
      }else{
        arr2.push(arr[i])
      }
    }
    if(this.data.all_price>0){
      if(wx.getStorageSync('token')){
        this.setData({
          order_arr:arr1,
          surplus_arr:arr2
        })
        wx.navigateTo({
          url: '../S_Settlement/index?state=1',
        })
      }else{
        wx.navigateTo({
          url: '../authorize/index',
        })
      }
    }
  },

  getdata() {
    let self = this
    wx.request({
      url: getApp().data.API+'/S_shopcart.json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result == 200) {
          self.setData({
            arr: res.data.arr,
            Invalid_arr: res.data.Invalid_arr,
            love_arr: res.data.love_arr
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
    // this.getdata()
    let arr = this.data.arr
    arr[0].child = wx.getStorageSync('buylist')?JSON.parse(wx.getStorageSync('buylist')):[]
    this.setData({
      arr:arr
    })
    this.allcheck()
    this.getuser()

    // let arr1 = JSON.parse(wx.getStorageSync('buylist'))
    // let obj = {}
    // for(let i = 0;i<arr1.length;i++){
    //   obj[arr1[i].id] = arr1[i].buynum
    // }
    // console.log(obj)
    wx.getSystemInfo({
      success: res =>{
        console.log(res)
        let modelmes = res.model;
        if(modelmes.search('iPhone X') != -1){
            this.setData({
              isIphoneX:true
            })
          }
        }
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