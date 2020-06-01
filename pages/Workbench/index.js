// pages/Workbench/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[
      {
        img:'https://www.kyawang.com/uploads/images/clinic_workbench_icon_patient.png',
        title:'患者'
      }, {
        img: 'https://www.kyawang.com/uploads/images/clinic_workbench_icon_reservation.png',
        title: '预约'
      }, {
        img: 'https://www.kyawang.com/uploads/images/clinic_workbench_icon_returnvisit.png',
        title: '回访'
      }, {
        img: 'https://www.kyawang.com/uploads/images/clinic_workbench_icon_colleague.png',
        title: '同事'
      }, {
        img: 'https://www.kyawang.com/uploads/images/clinic_workbench_icon_scheduling.png',
        title: '排班'
      }, {
        img: 'https://www.kyawang.com/uploads/images/clinic_workbench_icon_website.png',
        title: '微官网'
      }, {
        img: 'https://www.kyawang.com/uploads/images/clinic_workbench_icon_marketing.png',
        title: '营销'
      }, {
        img: 'https://www.kyawang.com/uploads/images/clinic_workbench_icon_activity.png',
        title: '活动'
      }, {
        img: 'https://www.kyawang.com/uploads/images/clinic_workbench_icon_operating.png',
        title: '运营中心'
      }, {
        img: 'https://www.kyawang.com/uploads/images/kyshop.png',
        title: '康牙商城'
      }, {
        img: 'https://www.kyawang.com/uploads/images/clinic_workbench_icon_mall.png',
        title: '医患沟通'
      }, {
        img: 'https://www.kyawang.com/uploads/images/clinic_workbench_icon_dentist.png',
        title: '看牙无忧'
      }, {
        img: 'https://www.kyawang.com/uploads/images/clinic_workbench_icon_approval.png',
        title: '审批'
      }, {
        img: 'https://www.kyawang.com/uploads/images/clinic_workbench_icon_price.png',
        title: '价目表'
      },
    ],
    power_arr: [],
    user: ''
  },
  up(e){
    let index = e.currentTarget.dataset.index
    let item = e.currentTarget.dataset.item
    let arr = this.data.arr
    if (index !=0 ){
      arr.splice(index, 1)
      arr.splice(index - 1, 0, item)
      this.setData({
        arr:arr
      })
    }
  },
  down(e) {
    let index = e.currentTarget.dataset.index
    let item = e.currentTarget.dataset.item
    let arr = this.data.arr
    if (index != arr.length-1) {
      arr.splice(index, 1)
      arr.splice(index + 1, 0, item)
      this.setData({
        arr: arr
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '工作台管理'
    })
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];//
    this.setData({
      power_arr: Page.data.power_arr,
      user: Page.data.user,
      arr:Page.data.worker_nav
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