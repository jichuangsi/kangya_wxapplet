// pages/medical/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '病历',
    arr:[],
    name:'',
    sex:'',
    patdetails:'',
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight(){
    wx.navigateTo({
      url: '../medicaledit/index?title=新增病历',
    })
  },
  qm() {
    wx.showToast({
      title: '模板记录不存在',
      icon: 'none',
      duration: 1000
    })
  },
  del(e) {
    let self = this
    Dialog.confirm({
      title: '提示',
      message: '您确定删除这条病历吗？'
    }).then(() => {
      wx.request({
        url: getApp().data.APIS + '/patient/delmedicarecord',
        method: 'post',
        data: {
          "mediarecordidentity": e.currentTarget.dataset.item.mediarecordidentity, 
          "customerid": e.currentTarget.dataset.item.customerid, 
          "datastatus": "1"
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' //修改此处即可
        },
        success: function (res) {
          console.log(res)
          if (res.data.info == 'ok') {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000
            })
            self.getdata()
          } else {
            wx.showToast({
              title: '失败',
              duration: 2000
            })
          }
        }
      })
      // on confirm
    }).catch(() => {
      // on cancel
    })
  },
  edit() {
    wx.navigateTo({
      url: '../medicaledit/index?title=病历详情',
    })
  },
  getdata(){
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/medicalrecordinfo',
      method:'post',
      success: function (res) {
        // console.log(res)
        // console.log(JSON.parse(res.data.list[11].exam))
        if(res.data.info == 'ok'){
          let arr = res.data.list
          for (let k = 0; k < arr.length; k++) {
            if (typeof (arr[k].exam) =='string'){
              arr[k].exam = JSON.parse(arr[k].exam)
              if ('items' in arr[k].exam) {
                self.getdetails(arr[k].mediarecordidentity, arr[k].customerid,k)
              }
            }else{

            }
          }
          self.setData({
            arr: arr
          })
        }
      },
    })
  }, 
  getdetails(mediarecordidentity, customerid,index) {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/osexalist',
      method: 'post',
      data:{
        mediarecordidentity: mediarecordidentity,
        customerid: customerid,
      },
      success: function (res) {
        if(res.data.info == 'ok'){
          let arr = self.data.arr
          arr[index].exam = res.data.list[0].exam
          self.setData({
            arr: arr
          })
          console.log(self.data.arr)
        }
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:'病历'
    })
    this.getdata()
    // this.pieShow()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    console.log(prevPage.data)
    this.setData({
      name: prevPage.data.patdetails.name,
      sex: prevPage.data.patdetails.sex,
      patdetails: prevPage.data.patdetails
    })
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