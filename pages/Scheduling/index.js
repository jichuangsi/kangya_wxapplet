// pages/Scheduling/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title:'排班',
    time_arr:[],
    name_arr:['李青琴'],
    data_arr:[],
    zw_arr: ['全部', '主任', '医生', '前台', '护士'],
    check_zw:'选择职位',
    show:false,
    state:0,
    color_arr:[],
    first_index:0,
    index: 0,
    power_arr: [],
    user: '',
    month:3
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    console.log(111)
    wx.navigateTo({
      url: '../Schedulingset/index',
    })
  },
  datatime(){
    var a = new Date()
    var year = a.getFullYear()
    var month = a.getMonth()+1
    var d1 = new Date(year, month-1, 1);
    var d2 = new Date(year, month, 1);
    var arr = this.data.time_arr
    // var length = this.data.name_arr.length
    // var arr1 = this.data.data_arr
    for (var i = d1.getTime(); i < d2.getTime(); i += 24 * 60 * 60 * 1000) {
      var d3 = new Date(i);
      var day = d3.getDate()+'';
      var str = "周" + "日一二三四五六".charAt(d3.getDay());
      arr.push({ date: day, week:str})
      // for (let j = 0; j < length; j++) {
      //   arr1[j].child.push({ state: 0 })
      // }
    }
    this.setData({
      time_arr:arr,
      month: month
      // data_arr:arr1
    })
    console.log(this.arr1)
  },
  showpopup(){
    this.setData({
      show:true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  zwclick(e) {
    this.setData({
      check_zw: e.currentTarget.dataset.text
    })
    this.getdata(e.currentTarget.dataset.text)
    this.onClose()
  },
  stateclick(e) {
    console.log(e)
    if (this.data.power_arr.code10610.has) {
      this.setData({
        state: e.currentTarget.dataset.index
      })
    }else{
      wx.showToast({
        icon:'none',
        title: '暂无权限',
      })
    }
    console.log(this.data.state)
  },
  colorclick(e) {
    console.log(e)
    this.setData({
      index: e.currentTarget.dataset.index,
      first_index: e.currentTarget.dataset.first_index
    })
    if(this.data.state == 1) {
      this.showpopup()
    }
  },
  pbclick(e) {
    let arr = this.data.data_arr
    if (!e.currentTarget.dataset.id){
      arr[this.data.first_index].scheduling[this.data.index].workshiftcolor = e.currentTarget.dataset.item.workshiftcolor
      arr[this.data.first_index].scheduling[this.data.index].workshiftname = e.currentTarget.dataset.item.workshiftname
    } else {
      arr[this.data.first_index].scheduling[this.data.index].workshiftcolor = ''
      arr[this.data.first_index].scheduling[this.data.index].workshiftname = ''
    }
    console.log(arr[this.data.first_index])
    this.setData({
      data_arr:arr
    })
    this.setweek(arr[this.data.first_index], e.currentTarget.dataset.item)
    this.onClose()
  },
  setweek(item,item1) {
    let a = new Date()
    let year = a.getFullYear()
    let month = a.getMonth() + 1
    let time = year + '-' + month + '-' + item.scheduling[this.data.index].workshiftdate
    wx.request({
      url: getApp().data.APIS + '/schedule/schedulingset',
      method: 'post',
      data: {
        "worktype": 0, 
        "scheduling": JSON.stringify([{ "doctorid": item.doctorid, "datestr": time, "workshiftidentity": item1 ? item1.workshiftidentity : '', "revoked": item1 ? 0 : 1 }])
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
        }
      }
    })
  },
  getdata(duty){
    let self = this
    let a = new Date()
    let year = a.getFullYear()
    let month = a.getMonth() + 1
    let begintime = year + '-' + month + '-' + '01'
    let endtime = month == '12' ? year + '1' : year + '-' + month == '12' ? '01' : month + '-' + '01'
    wx.request({
      url: getApp().data.APIS + '/schedule/scheduling',
      method: 'post',
      data: {
        worktype:'0',
        begintime: begintime,
        endtime: endtime,
        shiftrype: '0',
        duty: duty
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          //   console.log(1)
          let arr = JSON.parse(JSON.stringify(res.data.list))
          let arr1 = JSON.parse(JSON.stringify(res.data.list))
          let arr3 = JSON.parse(JSON.stringify(res.data.list))
          let t_arr = self.data.time_arr
          for (let d = 0; d < arr.length; d++) {
            arr1[d].scheduling = []
            arr3[d].scheduling = []
            for (let q = 0; q < t_arr.length; q++) {
              arr1[d].scheduling.push({ workshiftcolor: "", workshiftdate: q + 1 + '', workshiftname: "" })
              arr3[d].scheduling.push({ workshiftcolor: "", workshiftdate: q + 1 + '', workshiftname: "" })
            }
          }
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr1[i].scheduling.length; j++) {
              for (let k = 0; k < arr[i].scheduling.length; k++) {
                if (arr1[i].scheduling[j].workshiftdate == arr[i].scheduling[k].workshiftdate) {
                  // console.log(arr[i].scheduling[k])
                  // console.log('---------' + arr[i].name)
                  arr3[i].scheduling[j] = arr[i].scheduling[k]
                  // console.log(arr3[i])
                  // debugger
                }
              }
            }
          }
          self.setData({
            data_arr: arr3,
            color_arr: res.data.main
          })
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.datatime()
    wx.setNavigationBarTitle({
      title:'排班'
    })
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];
    this.setData({
      power_arr: Page.data.power_arr,
      user: Page.data.user,
    })
    this.getdata()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let arr1 = [
      { 
        scheduling: [
          { workshiftcolor: "", workshiftdate: '1', workshiftname: "" },
          { workshiftcolor: "", workshiftdate: '2', workshiftname: "" },
          { workshiftcolor: "", workshiftdate: '3', workshiftname: "" },
          { workshiftcolor: "", workshiftdate: '4', workshiftname: "" },
          { workshiftcolor: "", workshiftdate: '5', workshiftname: "" },
          { workshiftcolor: "", workshiftdate: '6', workshiftname: "" }
        ]
      }, {
        scheduling: [
          { workshiftcolor: "", workshiftdate: '1', workshiftname: "" },
          { workshiftcolor: "", workshiftdate: '2', workshiftname: "" },
          { workshiftcolor: "", workshiftdate: '3', workshiftname: "" },
          { workshiftcolor: "", workshiftdate: '4', workshiftname: "" },
          { workshiftcolor: "", workshiftdate: '5', workshiftname: "" },
          { workshiftcolor: "", workshiftdate: '6', workshiftname: "" }
        ]
      },
    ]
    let arr3 = [
      {
        scheduling: [
          { workshiftcolor: "", workshiftdate: '1', workshiftname: "" },
          { workshiftcolor: "", workshiftdate: '2', workshiftname: "" },
          { workshiftcolor: "", workshiftdate: '3', workshiftname: "" },
          { workshiftcolor: "", workshiftdate: '4', workshiftname: "" },
          { workshiftcolor: "", workshiftdate: '5', workshiftname: "" },
          { workshiftcolor: "", workshiftdate: '6', workshiftname: "" }
        ]
      }, {
        scheduling: [
          { workshiftcolor: "", workshiftdate: '1', workshiftname: "" },
          { workshiftcolor: "", workshiftdate: '2', workshiftname: "" },
          { workshiftcolor: "", workshiftdate: '3', workshiftname: "" },
          { workshiftcolor: "", workshiftdate: '4', workshiftname: "" },
          { workshiftcolor: "", workshiftdate: '5', workshiftname: "" },
          { workshiftcolor: "", workshiftdate: '6', workshiftname: "" }
        ]
      },
    ]
    let arr = [
      {
        scheduling: [
          { workshiftcolor: "zxc", workshiftdate: '1', workshiftname: "" },
          { workshiftcolor: "qwe", workshiftdate: '3', workshiftname: "" },
          { workshiftcolor: "re", workshiftdate: '5', workshiftname: "" },
        ]
      }, {
        scheduling: [
          { workshiftcolor: "12", workshiftdate: '1', workshiftname: "" },
          { workshiftcolor: "32", workshiftdate: '3', workshiftname: "" },
          { workshiftcolor: "13", workshiftdate: '5', workshiftname: "" },
        ]
      },
    ]

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr1[i].scheduling.length; j++) {
        for (let k = 0; k < arr[i].scheduling.length; k++) {
          if (arr1[i].scheduling[j].workshiftdate == arr[i].scheduling[k].workshiftdate) {
            // console.log(arr[i].scheduling[k])
            // console.log('---------' + arr[i].name)
            arr3[i].scheduling[j] = arr[i].scheduling[k]
            // console.log(arr3[i])
            // debugger
          }
        }
      }
    }
    // console.log(arr3)


     


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