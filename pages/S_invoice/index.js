// pages/S_invoice/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '商城',
    check_num: 0,
    arr: ['不开发票', '普通发票', '增值税发票'],
    radio: '1',
    checked: false,
    taxid:'',
    tax_arr:[],
    state:0,
    check_tax:{
      'id':'',
      'unitName': '',
      'code': '',
      'registerAddress': '',
      'registerPhone': '',
      'bankName': '',
      'bankAccount': '',
      'receiverName': '',
      'receiverPhone': '',
      'receiverAddress': ''
    }
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  check_click(e) {
    this.setData({
      check_num: e.currentTarget.dataset.index
    })
  },
  stateclick(e){
    this.setData({
      state:1,
      check_tax: {
        'id':e.currentTarget.dataset.item.id,
        'unitName': e.currentTarget.dataset.item.unitName,
        'code': e.currentTarget.dataset.item.code,
        'registerAddress': e.currentTarget.dataset.item.registerAddress,
        'registerPhone': e.currentTarget.dataset.item.registerPhone,
        'bankName': e.currentTarget.dataset.item.bankName,
        'bankAccount': e.currentTarget.dataset.item.bankAccount,
        'receiverName': e.currentTarget.dataset.item.receiverName,
        'receiverPhone': e.currentTarget.dataset.item.receiverPhone,
        'receiverAddress': e.currentTarget.dataset.item.receiverAddress
      }
    })
  },
  sclick(){
    this.setData({
      state:1,
      check_tax:{
        'id':'',
        'unitName': '',
        'code': '',
        'registerAddress': '',
        'registerPhone': '',
        'bankName': '',
        'bankAccount': '',
        'receiverName': '',
        'receiverPhone': '',
        'receiverAddress': ''
      }
    })
  },
  iptn(e){
    let item = this.data.check_tax
    item[e.currentTarget.dataset.text] = e.detail.value
    this.setData({
      check_tax:item
    })
  },
  qxbtn(){
    this.setData({
      state:0,
      check_tax:{
        'id':'',
        'unitName': '',
        'code': '',
        'registerAddress': '',
        'registerPhone': '',
        'bankName': '',
        'bankAccount': '',
        'receiverName': '',
        'receiverPhone': '',
        'receiverAddress': ''
      }
    })
  },
  editbtn(){
    let self = this
    if(self.data.check_tax.unitName!=''&&self.data.check_tax.code!=''&&self.data.check_tax.registerAddress!=''&&self.data.check_tax.registerPhone!=''&&self.data.check_tax.bankName!=''&&self.data.check_tax.bankAccount!=''&&self.data.check_tax.receiverName!=''&&self.data.check_tax.receiverPhone!=''&&self.data.check_tax.receiverAddress!=''){
      wx.request({
        url: getApp().data.APIS + '/svc/a',
        method: "post",
        data: {
          "plugin":'addtax',
          "data":JSON.stringify(self.data.check_tax)
        },
        header: {
          "token": wx.getStorageSync("token"),
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
          console.log(777)
          console.log(res)
          self.setData({
            state: 0
          })
          self.getdata()
        }
      });
    }else{
      wx.showToast({
        title: '请填写信息',
        icon:'none'
      })
    }
  },
  onChange(event) {
    this.setData({
      radio: event.detail
    });
  },
  onChange1({ detail }) {
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: detail });
  },
  check_li(e){
   
    this.setData({ taxid: this.data.taxid==e.currentTarget.dataset.item.id?'':e.currentTarget.dataset.item.id});
  },
  btn(){
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];//
    Page.setData({
      invoice_id:this.data.check_num,
      taxid:this.data.taxid
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  getdata(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: "get",
      data: {
        "plugin":'gettax',
      },
      header: {
        "token": wx.getStorageSync("token"),
      },
      success: function(res) {
        console.log(777)
        console.log(res)
        self.setData({
          tax_arr: res.data.list
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商城'
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