// pages/Scheduling/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title:'排班',
    time_arr:[],
    name_arr:['李青琴'],
    data_arr:[
      {
        child:[]
      }
    ],
    zw_arr: ['全部', '主任', '医生', '前台', '护士'],
    check_zw:'选择职位',
    show:false,
    state:0,
    color_arr:[],
    first_index:0,
    index:0
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    console.log(111)
    wx.navigateTo({
      url: '../Schedulingset/index',
    })
  },
  datatime(){
    var a = new Date()
    var year = a.getFullYear()
    var month = a.getMonth()+1
    var d1 = new Date(year, month-1, 1);
    var d2 = new Date(year, month, 1);
    var arr = this.data.time_arr
    // var length = this.data.name_arr.length
    // var arr1 = this.data.data_arr
    for (var i = d1.getTime(); i < d2.getTime(); i += 24 * 60 * 60 * 1000) {
      var d3 = new Date(i);
      var day = d3.getDate();
      var str = "周" + "日一二三四五六".charAt(d3.getDay());
      arr.push({ date: day, week:str})
      // for (let j = 0; j < length; j++) {
      //   arr1[j].child.push({ state: 0 })
      // }
    }
    this.setData({
      time_arr:arr,
      // data_arr:arr1
    })
    console.log(this.arr1)
  },
  showpopup(){
    this.setData({
      show:true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  zwclick(e) {
    this.setData({
      check_zw: e.currentTarget.dataset.text
    })
    this.onClose()
  },
  stateclick(e) {
    console.log(e)
    this.setData({
      state: e.currentTarget.dataset.index
    })
    console.log(this.data.state)
  },
  colorclick(e) {
    console.log(e)
    this.setData({
      index: e.currentTarget.dataset.index,
      first_index: e.currentTarget.dataset.first_index
    })
    if(this.data.state == 1) {
      this.showpopup()
    }
  },
  pbclick(e){
    let arr = this.data.data_arr
    arr[this.data.first_index].child[this.data.index].state = e.currentTarget.dataset.state
    this.setData({
      data_arr:arr
    })
    console.log(this.data.data_arr)
    this.onClose()
  },
  getdata(){
    let self = this
    wx.request({
      url: 'http://192.168.31.251/Scheduling.json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.result == 200) {
          self.setData({
            name_arr:res.data.name_arr,
            data_arr:res.data.data_arr,
            color_arr:res.data.work_arr
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.datatime()
    wx.setNavigationBarTitle({
      title:'排班'
    })
    this.getdata()
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