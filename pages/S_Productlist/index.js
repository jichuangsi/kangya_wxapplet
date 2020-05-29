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
    list_arr: [],
    user:'',
    id:'',
    searchhis:[],
    searchhot:[],
    index:1,
    searchshow:false
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
    this.setData({
      index:1
    })
    this.search()
  },
  search(sort){
    let self = this
    let order = sort?sort:''
    wx.request({
      url: "https://kyys.kyawang.com/svc/a",
      method: "POST",
      data: {
        "plugin":'searchcart',
        "keyword": self.data.search_text,
        'start':self.data.index,
        'sort':order
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' , //修改此处即可
        "token": wx.getStorageSync("token")
      },
      success: function(res) {
        console.log(res)
        let arr = self.data.index==1?{content:[]}:self.data.list_arr
        let index = self.data.index
        if(res.data.list[0].msg!='not found'){
          arr.content.push(...res.data.list[0].content)
        }
        index = self.data.index+1
        self.setData({
          list_arr:arr,
          index:index,
          searchshow:true
        })
      }
    });
    this.setData({
      search_state: 0
    })
  },
  qxsearch(){
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
    let sort = ''
    console.log(e.currentTarget.dataset.index)
    if (e.currentTarget.dataset.index == this.data.nav_num && this.data.nav_num == 1){
      this.setData({
        a1: this.data.a1?false:true,
        a2:true,
        index:1
      })
      sort = this.data.a1?'sale_i%20desc':'sale_i%20asc'
    } else if (e.currentTarget.dataset.index == this.data.nav_num && this.data.nav_num == 2) {
      this.setData({
        a1:true,
        a2: this.data.a2 ? false : true,
        index:1
      })
      sort = this.data.a2?'price_f%20desc':'price_f%20asc'
    }
    if(this.data.searchshow){
      this.search(sort)
    }else{
      let arr = this.data.list_arr.content
      let arr1 = this.data.list_arr
      // console.log(arr).content
      if(e.currentTarget.dataset.index==1){
        this.data.a1
        ? arr.sort(this.compare("goodinfo", "sale", "1"))
        : arr.sort(this.compare("goodinfo", "sale"));
        arr1.content = arr
        this.setData({
          list_arr:arr1
        })
      }else if(e.currentTarget.dataset.index==2){
        this.data.a2
        ? arr.sort(this.compare("goodinfo", "price", "1"))
        : arr.sort(this.compare("goodinfo", "price"));
        arr1.content = arr
        this.setData({
          list_arr:arr1
        })
      }else if(e.currentTarget.dataset.index==0){
        this.getcartdoc(this.data.id)
      }
    }
  },
  compare(attr,attr1, rev) {
    console.log(attr, rev)
    //第二个参数没有传递 默认升序排列
    if (rev == undefined) {
      rev = 1;
    } else {
      rev = -1;
    }
    return function(a, b) {
      console.log(a[attr])
      a = a[attr][attr1];
      b = b[attr][attr1];
      if (a < b) {
        return rev * -1;
      }
      if (a > b) {
        return rev * 1;
      }
      return 0;
    };
  },
  searchtextclick(e) {
    this.setData({
      search_text: e.currentTarget.dataset.text,
      index:1
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

  // getdata() {
  //   let self = this
  //   wx.request({
  //     url: getApp().data.API+'/S_Productlist.json',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     success: function (res) {
  //       console.log(res.data)
  //       if (res.data.result == 200) {
  //         self.setData({
  //           list_arr: res.data.list_arr,
  //           brand: res.data.brand,
  //           assemble_arr: res.data.assemble_arr,
  //           Promotion_list: res.data.Promotion_list,
  //           all_arr: res.data.all_arr,
  //           brand_arr: res.data.brand_arr
  //         })
  //       }
  //     },
  //   })
  // },
  
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
  getcartdoc(id){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'get',
      data: {
        plugin: 'getcartdoc',
        p: id,
      },
      header: {
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1=[]
          console.log(res.data.list[0].content.length)
          for(let i = 0;i<res.data.list[0].content.length;i++){
            if(arr1.indexOf(res.data.list[0].content[i].goodinfo.brand_name)==-1&&res.data.list[0].content[i].goodinfo.brand_name!=''&&res.data.list[0].content[i].goodinfo.brand_name){
              arr.push({state:0,id:res.data.list[0].content[i].goodinfo.brand_id,title:res.data.list[0].content[i].goodinfo.brand_name})
              arr1.push(res.data.list[0].content[i].goodinfo.brand_name)
            }
          }
          self.setData({
            list_arr:res.data.list[0],
            brand :arr
          })
        }
      }
    })
  },
  getsearchhis(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: "get",
      data: {
        "plugin":'getsearchhis'
      },
      header: {
        "token": wx.getStorageSync("token")
      },
      success: function(res) {
        console.log(res)
        self.setData({
          searchhis:res.data.list
        })
      }
    });
  },
  getsearchhot(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: "get",
      data: {
        "plugin":'getsearchhot'
      },
      header: {
        "token": wx.getStorageSync("token")
      },
      success: function(res) {
        console.log(777)
        console.log(res)
        self.setData({
          searchhot:res.data.list
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      check_title:options.title,
      search_state:options.search?options.search:0,
      brandstate: options.brand ? options.brand:'',
      id:options.id
    })
    wx.setNavigationBarTitle({
      title: '商城'
    })
    this.getuser()
    this.getsearchhis()
    this.getsearchhot()
    if(options.id){
      this.getcartdoc(options.id)
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