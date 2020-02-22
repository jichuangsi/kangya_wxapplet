// pages/Relationclinic/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '选择关联',
    clinicnum: '',
    name: '',
    psw: '',
    pswstate: true,
    state: false
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  iptclinicnum(e){
    this.setData({
    clinicnum: e.detail.value
    })
    this.iptchange()
  },
  iptname(e) {
    this.setData({
      name: e.detail.value
    })
    this.iptchange()
  },
  iptpsw(e) {
    this.setData({
        psw: e.detail.value
    })
    this.iptchange()
  },
  iptchange(){
    console.log(this.data.psw)
    if (this.data.clinicnum != '' && this.data.name != '' && this.data.psw != '' && this.data.psw.length>5 ){
      this.setData({
        state: true
      })
    }else{
      this.setData({
        state: false
      })
    }
  },
  pswcheck(e){
    console.log(e.currentTarget.dataset.id)
    this.setData({
      pswstate: e.currentTarget.dataset.id==1?false:true
    })
  },
  btn(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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