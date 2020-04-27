// pages/PriceList/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:0,
    title:'价目表',
    activeKey:'全部',
    check_id: 0,
    LookTeethimg:"",
    PriceList_arr: [],
    PriceListclick_arr:[],
    all_PriceListclick_arr:[],
    videolist_arr: [],
    videolistclick_arr: [],
    nowitem:'',
    video_nav:[],
    videonext_arr:[],
    next_num: 999,
    arr_num:0
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight(){
    wx.redirectTo({
      url: '../Pricesearch/index'
    })
  },
  first_click(e){
    let index = e.currentTarget.dataset.index
    let arr = this.data.videolist_arr
    if (e.currentTarget.dataset.state == 0){
      arr[index].state = 1
      this.setData({
        videolist_arr: arr
      })
    }else{
      arr[index].state = 0
      this.setData({
        videolist_arr: arr
      })
    }
  },
  litextclick(e) {
    let self = this
    this.setData({
      check_id: e.currentTarget.dataset.id
    })
    wx.request({
      url: getApp().data.API+'/PriceListClick.json',
      data: {
        id: e.currentTarget.dataset.id
      },
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result == 200) {
          self.setData({
            videolistclick_arr: res.data.videoclick_arr
          })
        }
      },
    })
  },
  onChange(event) {
    let self = this
    console.log(event.detail)
    self.setData({
      activeKey: event.detail.name
    })
    if (self.data.PriceList_arr[event.detail] == '全部'){
      this.setData({
        PriceListclick_arr: self.data.all_PriceListclick_arr
      })
    }else{
      let arr = self.data.all_PriceListclick_arr
      let arr1 = []
      for (let i = 0; i < arr.length;i++){
        if (arr[i].feetype == self.data.PriceList_arr[event.detail]){
          arr1.push(arr[i])
        }
      }
      this.setData({
        PriceListclick_arr: arr1
      })
    }
  },
  onChangevideo(event){
    console.log(this.data.videolist_arr[event.detail].link)
    let arr = []
    arr.push(this.data.videolist_arr[event.detail])
    this.setData({
      video_nav: arr,
      arr_num:1,
      videonext_arr: []
    })
    this.getvodnext(this.data.videolist_arr[event.detail].link)
  },
  getvod() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/video/getvod/EOk6llnOcw9X1e4',
      method: 'get',
      success: function (res) {
        console.log(1)
        console.log(res)
        if (res.data.info == 'ok') {
          self.getvodnext(res.data.list[0].link)
          let arr = []
          arr.push(res.data.list[0])
          self.setData({
            videolist_arr:res.data.list,
            video_nav: arr,
            arr_num:1
          })
        }
      }
    })
  },
  getvodnext(data) {
    let self = this
    wx.request({
      url: getApp().data.APIS + data,
      method: 'get',
      dataType:'json',
      success: function (res) {
        console.log(223)
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          let arr1 = []
          for (let i = 0; i < res.data.list.length;i++){

            if (res.data.list[i].type == 'file') {
              res.data.list[i].check_state = 0
              arr.push(res.data.list[i])
            } else {
              arr1.push(res.data.list[i])
            }
          }
          console.log(arr)
          console.log(arr1)
          self.setData({
            videolistclick_arr: arr,
            videonext_arr: arr1,
            arr_num: self.data.arr_num + 1,
            next_num:999
          })
          // if (res.data.list[0].type == 'file') {
          //   self.setData({
          //     videolistclick_arr: res.data.list,
          //   })
          // } else {
          //   self.setData({
          //     videonext_arr: res.data.list,
          //     arr_num: self.data.arr_num+1,
          //     videolistclick_arr:[]
          //   })
          // }
        }
      }
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
          for (let i = 0; i < res.data.list.length;i++){
            if (arr.indexOf(res.data.list[i].feetype)==-1){
              arr.push(res.data.list[i].feetype)
            }
          }
          console.log(arr)
          self.setData({
            PriceList_arr: arr,
            PriceListclick_arr: res.data.list,
            all_PriceListclick_arr:res.data.list
          })
        }
      }
    })
  },
  applygo(){
    wx.navigateTo({
      url: '../apply/index',
    })
  },
  check_PriceList(e){
    let item = e.currentTarget.dataset.item
    if(this.data.state == 1){
      let pages = getCurrentPages();
      let Page = pages[pages.length - 2];
      console.log(Page.data)
      let arr = Page.data.arr
      arr.bhuom = item.uom
      arr.billfeetype = item.feetype
      arr.fee = item.handleprice
      arr.name = item.handlename
      Page.setData({
        arr:arr
      })
      wx.navigateBack({
        delta: 1,
      })
    }
  },
  videogo(e){
    if (this.data.title == '医患沟通视频'){
      this.setData({
        nowitem: e.currentTarget.dataset.item
      })
      wx.navigateTo({
        url: '../Videoplay/index?state=0',
      })
    }else{
      let arr = this.data.videolistclick_arr
      let index = e.currentTarget.dataset.index
      for(let i = 0;i<arr.length;i++){
        if(i == index){
          arr[i].check_state = 1
        } else {
          arr[i].check_state = 0
        }
      }
      this.setData({
        videolistclick_arr:arr
      })
    }
  },
  nav_check(e) {
    let item = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index
    let arr = this.data.video_nav
    arr.splice((index+1),999)
    this.setData({
      video_nav: arr,
      arr_num:index,
      next_num: 999
    })
    this.getvodnext(item.link)
  },
  navnext_check(e) {
    let item = e.currentTarget.dataset.item
    let index = e.currentTarget.dataset.index
    let arr = this.data.video_nav
    // let arr1 = this.data.videonext_arr
    // for(let i = 0;i<arr1.length;i++){
    //   if (arr1[i].name == arr[arr.length-1].name){
    //     arr.splice((arr.length - 1), 1)
    //   }
    // }
    // if (arr.length>1){
    //   arr.splice((arr.length - 1), 1)
    // }
    arr.splice(this.data.arr_num, 1)
    arr.push(item)
    console.log(arr)
    this.setData({
      video_nav:arr,
      next_num:index
    })
    this.getvodnext(item.link)
  },
  video_btn() {
    let arr = this.data.videolistclick_arr
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];
    let arr1 = {
      "title":"",
      "picurl":"",
      "desc":"",
      "videoidentity":"",
      "type":""
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].check_state == 1) {
        console.log(arr[i])
        arr1 = {
          "title": arr[i].name,
          "picurl": arr[i].thumb,
          "desc": "",
          "videoidentity": arr[i].videoidentity ? arr[i].videoidentity:"36491422938237261",
          "type": "video"
        }
      }
    }
    Page.setData({
      video:arr1
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title,
      state: options.state
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
    console.log(1111)
    console.log(options.title)
    console.log(options)
    if (options.title == '价目表') {
      this.gethandle()
    } else if (options.title == '医患沟通视频' || options.title == '选择视频') {
      this.getvod()
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
    return {
      title: this.data.title,
      desc: '分享页面的内容',
      path: '/pages/PriceList/index?title='+this.data.title+'&&state='+this.data.state // 路径，传递参数到指定页面。
    }
  }
})