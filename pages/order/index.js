// pages/order/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '预约列表',
    active: '网络预约',
    show: false,
    order_arr:[],
    num:0,
    state1: '处理状态',
    state2: '状态',
    state3: '医生',
    bengindate: '',
    enddate: '',
    showbottom:false,
    calendarConfig: {
      // 配置内置主题
      theme: 'elegant',
      chooseAreaMode: false,
    },
    patdetails:'',
    doctor_arr:'',
    doctorid:'',
    order_state:''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onChange(event) {
    this.setData({
      active: event.detail.name
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  onClickRight() {
    console.log(this.data.title)
    if(this.data.title == '预约列表'){
      this.setData({ show: true });
    }else{
      console.log(1122)
      wx.navigateTo({
        url: '../orderedit/index?title=添加预约',
      })
    }
  },
  afterTapDay(e) {
    console.log('afterTapDay', e.detail); // => { currentSelect: {}, allSelectedDays: [] }

    this.setData({
      bengindate: e.detail.year + '/' + e.detail.month + '/' + e.detail.day,
      enddate: e.detail.year + '/' + e.detail.month + '/' + e.detail.day
    })
    this.onClose()
  },
  del(e){
    let self = this
    Dialog.confirm({
      title: '提示',
      message: '您确定删除这条预约吗？'
    }).then(() => {
      wx.request({
        url: getApp().data.APIS + '/schedule/sccancelschedule',
        method: 'post',
        data: {
          "scheduleidentity": e.currentTarget.dataset.item.scheduleidentity,
          "name": e.currentTarget.dataset.item.name, 
          "lostmemo": ""
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
  detailsgo(e) {
    let item = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '../orderdetails/index?item=' + item,
    })
  },
  numshow(e){
    this.setData({ num: e.currentTarget.dataset.index,showbottom:true})
  },
  onClosebottom() {
    this.setData({ showbottom: false })
  },
  numclick(e) {
    this.setData({ state1: e.currentTarget.dataset.text, showbottom: false })
  },
  numclick1(e) {
    this.setData({ state2: e.currentTarget.dataset.text, showbottom: false, order_state: e.currentTarget.dataset.state })
  },
  numclick2(e) {
    this.setData({ state3: e.currentTarget.dataset.text, showbottom: false })
  },
  addgo(){
    wx.navigateTo({
      url: '../orderedit/index?title=添加预约',
    })
  },
  searchgo() {
    wx.navigateTo({
      url: '../worksearch/index?state=1',
    })
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/schedule/scscheduleday',
      method: 'post',
      data: {
        bengindate: self.data.bengindate,
        enddate: self.data.enddate
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = []
          for (let i = 0; i < res.data.list.length; i++) {
            console.log(res.data.list[i].schedule)
            if (res.data.list[i].schedule){
              for (let j = 0; j < res.data.list[i].schedule.length;j++){
                if(self.data.title =='预约'){
                  if (res.data.list[i].schedule[j].customerid == self.data.patdetails.customerid) {
                    arr.push(res.data.list[i].schedule[j])
                  }
                } else {
                  arr.push(res.data.list[i].schedule[j])
                }
              }
            }
          }
          console.log(arr)
          self.setData({
            order_arr: arr
          })
        }
      }
    })

    wx.request({
      url: getApp().data.APIS + '/schedule/microlettercondition',
      method: 'post',
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          self.setData({
            doctor_arr: res.data.list.schdoctor
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];
    console.log(111223)
    console.log(Page.data)
    this.setData({ title:options.title})
    wx.setNavigationBarTitle({
      title: options.title
    })
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    this.setData({
      bengindate: year + '/' + month + '/' + day,
      enddate: year + '/' + month + '/' + day,
      patdetails: Page.data.patdetails
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