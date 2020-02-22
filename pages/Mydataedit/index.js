// pages/Mydataedit/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'设置姓名',
    name: '',
    sex: '',
    autograph: '',
    curriculum: '',
    scrollTop:'A',
    project_list:[
      { index: 'A', state: 0 },
      { index: 'B', state: 0 },
      { index: 'C', state: 0 },
      { index: 'D', state: 0 },
      { index: 'E', state: 0 }
    ],
    check_list:'',
    positional_index:0,
    positional_arr: ['无', '执业助理医师', '执业医师', '主治医师', '副主任医师', '主任医师']
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight(){

  },
  checkclick(e){
    console.log(e.currentTarget.dataset.id)
    let arr = this.data.project_list
    let index = e.currentTarget.dataset.index
      arr[index].state = arr[index].state == 0 ? arr[index].state = 1:arr[index].state = 0
    console.log(arr)
      this.setData({
        project_list:arr
      })
  },
  onPageScroll(event) {
    this.setData({
      scrollTop: event.scrollTop
    });
  },
  positional_click(e) {
    this.setData({
      positional_index: e.currentTarget.dataset.index
    });
    this.onClickLeft()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title
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