// pages/Price/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'划价',
    active:'收费明细',
    detailed:'',
    childnum:0
  },

  onChange(event) {
    this.setData({
      active: event.detail.name
    })
  },
  Patienteditgo(e) {
    this.setData({
      childnum: e.currentTarget.dataset.childnum
    })
    let btn = e.currentTarget.dataset.btn ? '&&btnstate=1' : ''
    let iptstate = e.currentTarget.dataset.iptstate ? '&&iptstate=1' : ''
    let textstate = e.currentTarget.dataset.textstate ? '&&textstate=1' : ''
    let value = e.currentTarget.dataset.value ? '&&value=' + e.currentTarget.dataset.value : ''
    let typestate = e.currentTarget.dataset.typestate ? '&&typestate=' + e.currentTarget.dataset.typestate : ''
    wx.navigateTo({
      url: '../Patientedit/index?title=' + e.currentTarget.dataset.text + iptstate + btn + textstate + value + typestate
    })
  },
  Colleaguego() {
    wx.navigateTo({
      url: '../Colleague/index?title=医生&&state=2',
    })
  },
  stateclick(e){
    let index = e.currentTarget.dataset.index
    let data = this.data.detailed
    data.handlelist[index].state = !data.handlelist[index].state
    data.discountfee = data.discountfee - data.handlelist[index].discountfee
    data.payfeetotal = data.payfeetotal - data.handlelist[index].payfeetotal
    if (data.handlelist[index].state){
      data.handlelist[index].discountfee = 0
      data.handlelist[index].payfeetotal = 0
    }else{
      data.handlelist[index].discountfee = data.handlelist[index].fee.indexOf(',') != '-1' ? Number(data.handlelist[index].fee.split(',')[0] + data.handlelist[index].fee.split(',')[1]) : Number(data.handlelist[index].fee)
      data.handlelist[index].payfeetotal = data.handlelist[index].fee.indexOf(',') != '-1' ? Number(data.handlelist[index].fee.split(',')[0] + data.handlelist[index].fee.split(',')[1]) : Number(data.handlelist[index].fee)
    }
    data.discountfee = data.discountfee + data.handlelist[index].discountfee
    data.payfeetotal = data.payfeetotal + data.handlelist[index].payfeetotal
    this.setData({
      detailed: data
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = JSON.parse(options.item)
    console.log(data)
    data.discount = 100
    data.activity = ''
    data.remark = ''
    data.discountfee = data.allfee
    data.payfeetotal = data.allfee
    if (data.handlelist){
      for (let i = 0; i < data.handlelist.length; i++) {
        data.handlelist[i].discount = 100
        data.handlelist[i].state = false
        data.handlelist[i].discountfee = data.handlelist[i].fee.indexOf(',') != '-1' ? Number(data.handlelist[i].fee.split(',')[0] + data.handlelist[i].fee.split(',')[1]) : Number(data.handlelist[i].fee)
        data.handlelist[i].payfeetotal = data.handlelist[i].fee.indexOf(',') != '-1' ? Number(data.handlelist[i].fee.split(',')[0] + data.handlelist[i].fee.split(',')[1]) : Number(data.handlelist[i].fee)
      }
    } else {
    }
    this.setData({
      title:options.title,
      detailed: data
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
    console.log(this.data.detailed)
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