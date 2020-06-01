// pages/S_Detail/index.js
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'商城',
    id:0,
    commodity_title:"",
    star_show:false,
    active:'图文详情',
    show_num:0,
    show:false,
    check_title:'',
    yh_arr:[
      {
        state:0,
        price:20,
        m_price:299,
        time:'2020-02-26至2020-03-01',
        title: '拼团券',
        text: '限拼团可用'
      }
    ],
    gg_arr: [
      { state: 0, title: '1付加厚型10.8g,尺寸7' },
      { state: 0, title: '1付加厚型10.8g,尺寸7.5' }
    ],
    check_gg: '',
    check_num: 1,
    gg_min:1,
    price: 334.00,
    old_price:360.00,
    assemble_price:270.00,
    time: 30 * 60 * 60 * 1000,
    assemble_number:2,
    assemble_num:388,
    buystate:0,
    img_arr: '',
    details_text: '',
    prove_text: '',
    ensure_text: '',
    user:'',
    item:'',
    cpdeatil:'',
    isOverShare: true
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  love(){
    let arr = wx.getStorageSync('lovelist')?JSON.parse(wx.getStorageSync('lovelist')):[]
    let arr1 = wx.getStorageSync('loveidlist')?JSON.parse(wx.getStorageSync('loveidlist')):[]
    let arr2 = this.data.item.goods
    console.log(arr1.indexOf(this.data.item.goods.id))
    if(arr1.indexOf(this.data.item.goods.id)==-1){
      arr2.state = 0
      arr1.push(this.data.item.goods.id)
      arr.push(arr2)
      wx.setStorageSync('lovelist', JSON.stringify(arr))
      wx.setStorageSync('loveidlist', JSON.stringify(arr1))
      this.setData({
        star_show:true
      })
      Toast('收藏成功~');
    }else{
      for(let i =0;i<arr1.length;i++){
        if(arr1[i]==this.data.item.goods.id){
          arr1.splice(i,1)
          arr.splice(i,1)
        }
      }
      Toast('取消收藏~');
      wx.setStorageSync('lovelist', JSON.stringify(arr))
      wx.setStorageSync('loveidlist', JSON.stringify(arr1))
      this.setData({
        star_show:false
      })
    }
  },
  sygo(){
    wx.redirectTo({
      url: '../S_index/index',
    })
  },
  gwgo() {
    wx.redirectTo({
      url: '../S_shopcart/index',
    })
  },
  gwclick() {
    this.setData({
      show: true,
      show_num: 1
    })
  },
  onChange(event) {
    this.setData({
      active: event.detail.name
    })
  },
  showpopup(e) {
    this.setData({
      show: true,
      show_num: e.currentTarget.dataset.index
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  ggclick(e) {
    this.setData({
      check_gg: e.currentTarget.dataset.text
    })
  }, 
  addone(){
    let num = this.data.check_num + 1
    this.setData({
      check_num: num
    })
  },
  delone() {
    if(this.data.gg_min<this.data.check_num){
      let num = this.data.check_num - 1
      this.setData({
        check_num: num
      })
    }
  },
  gg_btn() {
    Toast('加入购物车成功~');
    let arr = wx.getStorageSync('buylist')?JSON.parse(wx.getStorageSync('buylist')):[]
    let arr1 = this.data.item.goods
    arr1.buynum = this.data.check_num
    arr1.state = 0
    arr.push(arr1)
    wx.setStorageSync('buylist', JSON.stringify(arr))
    this.onClose()
  },
  buy_btn() {
    this.onClose()
  },
  ptclcik(){
    Dialog.alert({
      title: '拼团玩法',
      message: '全面拼团，所有用户都可以直接参团或开团;拼团成功，指开团在规定时间内达到规定成团人数；拼团失败，指开团后在规定的时间内未能找到相应人数的好友参团，该团失败，系统取消该团订单，退款原路退回；'
    }).then(() => {
      // on close
    });
  },
  getdata(id) {
    let self = this
    wx.request({
      url: getApp().data.API+'/S_Detail.json',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        id: id
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result == 200) {
          self.setData({
            gg_min: res.data.gg_min,
            price: res.data.price,
            old_price: res.data.old_price,
            assemble_price: res.data.assemble_price,
            time: res.data.time,
            assemble_number: res.data.assemble_number,
            assemble_num: res.data.assemble_num,
            commodity_title: res.data.commodity_title,
            gg_arr: res.data.gg_arr,
            yh_arr: res.data.yh_arr,
            img_arr: res.data.img_arr,
            details_text: res.data.details_text,
            prove_text: res.data.prove_text,
            ensure_text: res.data.ensure_text,
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
  getdetail(id){
    let self = this
    wx.request({
      url: 'https://mini.kyawang.com/SSM/goods/selectGoodsDetailById',
      method: "POST",
      data: {
        gid:id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        "token": wx.getStorageSync("token")
      },
      success: function(res) {
        console.log(888)
        console.log(res)
        let arr = []
        for(let key in res.data.goods){
          if(key.indexOf('image')!=-1&&key!='imageUrl'){
            arr.push(res.data.goods[key])
          }
        }
        let arr1 = wx.getStorageSync('loveidlist')?JSON.parse(wx.getStorageSync('loveidlist')):[]
        console.log(arr1)
        console.log(res.data.goods.id)
        self.setData({
          item:res.data,
          img_arr:arr,
          star_show:arr1.indexOf(res.data.goods.id)!=-1?true:false
        })
      }
    });
    wx.request({
      url: 'https://mini.kyawang.com/SSM/goods/selectGoodsByDescription',
      method: "POST",
      data: {
        gid:id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        "token": wx.getStorageSync("token")
      },
      success: function(res) {
        console.log(666)
        console.log(res)
        let data = res.data
        data.image = data.image.replace(/style=/gi, 'style1=')
        data.image = data.image.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block"')
        self.setData({
          cpdeatil:data
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      check_title:options.title,
      buystate: options.buystate,
      id:options.id
    })
    wx.setNavigationBarTitle({
      title: '商城'
    })
    // this.getdata(options.id)
    this.getdetail(options.id)
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
    return {
      title: this.data.title,
      desc: '分享页面的内容',
      path: '/pages/S_index/index?title=商城&&id='+this.data.id  // 路径，传递参数到指定页面。
    }
  }
})