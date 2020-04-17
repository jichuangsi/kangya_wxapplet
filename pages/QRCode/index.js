// pages/QRCode/index.js
import QRCode from '../../utils/weapp-qrcode.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'我的二维码',
    clinicid:'',
    state:0
  },
  getqrcode(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method:'get',
      data: {
        plugin: 'getclinicqrcode',
        p: self.data.clinicid
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.getdata(res.data.url)
        } else {
          self.getdata('https://mp.weixin.qq.com/cgi-bin/showqrcodeticket=gQFx8TwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyWDIzdUVlUzQ5RVUxNDBHRXh1MVQAAgSALx9eAwSAOgkA')
          
        }
      },
    })
  },
  getdata(url){
    new QRCode('myQrcode', {
      text: url,
      width: 182,
      height: 182,
      padding: 12, // 生成二维码四周自动留边宽度，不传入默认为0
      correctLevel: QRCode.CorrectLevel.Q, // 二维码可辨识度
      callback: (res) => {
        console.log(res.path)
        // 接下来就可以直接调用微信小程序的api保存到本地或者将这张二维码直接画在海报上面去，看各自需求
      }
    })
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.setData({
      clinicid: prevPage.data.clinicid ? prevPage.data.clinicid:'',
      state: options.state
    })
    if (options.state == 1) {
      this.setData({
        patdetails: prevPage.data.patdetails,
      })
    }
    this.getqrcode()
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