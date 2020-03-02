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
    color_arr:[
      { id: 1, title: '休息' },
      { id: 2, title: '早班' },
      { id: 3, title: '午班' },
      { id: 4, title: '晚班' },
    ],
    first_index:0,
    index:0
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    wx.navigateTo({
      url: '../Schedulingset/index',
    })
  },
  datatime(){
    var d1 = new Date(2020, 2, 1);
    var d2 = new Date(2020, 3, 1);
    var arr = this.data.time_arr
    var length = this.data.name_arr.length
    var arr1 = this.data.data_arr
    for (var i = d1.getTime(); i < d2.getTime(); i += 24 * 60 * 60 * 1000) {
      var d3 = new Date(i);
      var day = d3.getDate();
      var str = "周" + "日一二三四五六".charAt(d3.getDay());
      arr.push({ date: day, week:str})
      for (let j = 0; j < length; j++) {
        arr1[j].child.push({ state: 0 })
      }
    }
    this.setData({
      time_arr:arr,
      data_arr:arr1
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
    arr[this.data.first_index].child[this.data.index].state = e.currentTarget.dataset.id
    this.setData({
      data_arr:arr
    })
    console.log(this.data.data_arr)
    this.onClose()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.datatime()
    wx.setNavigationBarTitle({
      title:'排班'
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