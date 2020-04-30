// pages/imgedit/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:'',
    customerid:'',
    clinicid:'',
    index:0
  },
  btn(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/upmedicaimage',
      method: 'post',
      data: {
        customerid: self.data.customerid, 
        studyuid: self.data.item.studyuid, 
        seriesuid: self.data.item.seriesuid, 
        sopuid: self.data.item.sopuid, 
        contentdescription: self.data.item.contentdescription, 
        teeth: JSON.stringify(self.data.item.bodyposition), 
        title: self.data.item.title, 
        isshow: '', 
        clinicid: self.data.clinicid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          wx.showToast({
            title: '修改成功',
          })
          let pages = getCurrentPages();
          let Page = pages[pages.length - 2];
          let Pageprev = pages[pages.length - 3];
          let arr = Page.data.arr
          arr[self.data.index] = self.data.item
          Page.setData({
            arr:arr
          })
          Pageprev.getdata()
          wx.navigateBack({
            delta: 1,
          })
        }
      }
    })
  },
  editgo(e) {
    let btn = e.currentTarget.dataset.btn ? '&&btnstate=1' : ''
    let iptstate = e.currentTarget.dataset.iptstate ? '&&iptstate=1' : ''
    let textstate = e.currentTarget.dataset.textstate ? '&&textstate=1' : ''
    let value = e.currentTarget.dataset.value ? '&&value=' + e.currentTarget.dataset.value : ''
    let typestate = e.currentTarget.dataset.typestate ? '&&typestate=' + e.currentTarget.dataset.typestate : ''
    wx.navigateTo({
      url: '../Patientedit/index?title=' + e.currentTarget.dataset.text + iptstate + btn + textstate + value + typestate
    })
  },
  toothgo() {
    wx.navigateTo({
      url: '../Tooth/index?state=2'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '影像'
    })
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];
    this.setData({
      item: Page.data.arr[options.index],
      customerid: Page.data.customerid,
      clinicid: Page.data.clinicid,
      index:options.index
    })
    console.log(this.data.item)
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