// pages/Templatedetails/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '病历',
    id:'',
    arr: [
      { title: '主诉', text: '坐上后牙痛' },
      { title: '既往史', text: '曾经返回疼痛' },
      { title: '检查', text: '牙龈乳头红肿，充血有嵌塞物。' },
      { title: '辅助检查', text: '‘' },
      { title: '诊断', text: '龈乳头炎' },
      { title: '治疗方案', text: '控制炎症后局部治疗' },
      { title: '治疗', text: '局部冲洗，上药。' },
      { title: '医嘱', text: '暂时不能用左侧咀嚼' }
    ],
    item:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  btn(){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 3]; 
    prevPage.setData({
      complain: item.pc,
      repetition: item.pc,
      disease: item.hpi,
      past: item.pi,
      advice: item.da,
    })
    wx.navigateBack({
      delta: 2
    })
  },

  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/sysset/getcasemodel',
      method: 'post',
      data: {
        "emrtemplateidentity": self.data.id,
        "read": 1,
        "emrtpl": "emr"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            item:res.data.list[0]
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ title: options.title })
    wx.setNavigationBarTitle({
      title: options.title,
      id:options.id
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