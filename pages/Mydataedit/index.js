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
    scrollTop: 'A',
    xm_arr: [
      { title: '超声波洁牙美白', state: 0 },
      { title: '多课牙种植', state: 0 },
      { title: '单课牙种植', state: 0 },
      { title: '多生牙', state: 0 },
      { title: '覆盖义齿', state: 0 },
      { title: '复杂智齿', state: 0 },
      { title: '个别牙反颌', state: 0 },
      { title: '固定修复', state: 0 },
      { title: '钢丝托槽', state: 0 },
      { title: '皓齿美白', state: 0 },
      { title: '活动修复', state: 0 },
      { title: '激光美白', state: 0 },
      { title: '烤瓷牙', state: 0 },
      { title: '冷光美白', state: 0 },
      { title: '抛光', state: 0 },
    ],
    check_list:'',
    positional_arr: ['无', '执业助理医师', '执业医师', '主治医师', '副主任医师', '主任医师']
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    let self = this
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];//
    if (self.data.title =='设置姓名'){
      Page.setData({
        name: self.data.value
      })
    } else if (self.data.title == '设置年龄') {
      Page.setData({
        age: self.data.value
      })
    } else if (self.data.title == '编辑个性签名') {
      Page.setData({
        qm: self.data.value
      })
    } else if (self.data.title == '编辑从医履历') {
      Page.setData({
        ll: self.data.value
      })
    } else if (this.data.title == '添加项目') {
      let arr = self.data.xm_arr
      let arr1 = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].state == 1) {
          arr1.push(arr[i].title)
        }
      }
      Page.setData({
        xm: arr1
      })
    }
    self.onClickLeft()
  },
  positional_click(e) {
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];//
    this.setData({
      value: e.currentTarget.dataset.text
    });
    Page.setData({
      jc: e.currentTarget.dataset.text
    })
    this.onClickLeft()
  },
  ipt(e) {
    this.setData({ value: e.detail.value })
  },
  xmclick(e) {
    let index = e.currentTarget.dataset.index
    let arr = this.data.xm_arr
    arr[index].state = arr[index].state == 0 ? 1 : 0
    this.setData({ xm_arr: arr })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title,
      value:options.value
    })
    wx.setNavigationBarTitle({
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