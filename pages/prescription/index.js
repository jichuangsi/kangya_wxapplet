// pages/prescription/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '设置处方',
    price: 0,
    priceone:0,
    arr: [
      { title: '甲硝锉片', text: '口服一日三次', num: 0, price: 1.00, id: 101 }, { title: '维生素C片', text: '口服一日三次', num: 0, price: 3.00, id: 102 }, { title: '芬必得', text: '必要时口服', num: 0, price: 2.00, id: 103 },
    ],
    check_arr:[],
    power_arr:[]
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },

  onClickRight() {
    wx.navigateTo({
      url: '../prescriptionset/index',
    })
  },

  editgo(e) {
    wx.navigateTo({
      url: '../prescriptionedit/index?value=' + e.currentTarget.dataset.text + '&&index=' + e.currentTarget.dataset.index,
    })
  },

  addone(e) {
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.item.handlesetguid
    let arr1 = JSON.parse(JSON.stringify(this.data.check_arr))
    let arr2 = this.data.arr
    let arr3 = JSON.parse(JSON.stringify(this.data.check_arr))
    arr2[index].num = arr2[index].num + 1
    if (arr1.length > 0) {
      for (let i = 0; i < arr1.length; i++) {
        console.log(arr1[i].handlesetguid)
        if (arr1[i].handlesetguid == id) {
          arr3[i].num = arr3[i].num + 1
        }
      }
    } else {
      arr3.push(arr2[index])
    }
    this.setData({
      check_arr: arr3,
      arr: arr2
    })
    this.allprice()
  },
  delone(e) {
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.item.handlesetguid
    let arr1 = JSON.parse(JSON.stringify(this.data.check_arr))
    let arr2 = this.data.arr
    let arr3 = JSON.parse(JSON.stringify(this.data.check_arr))
    arr2[index].num = arr2[index].num - 1
    if (arr1.length > 0) {
      for (let i = 0; i < arr1.length; i++) {
        console.log(arr1[i].handlesetguid)
        if (arr1[i].handlesetguid == id) {
          arr3[i].num = arr3[i].num - 1
        }
      }
    } else {
      arr3.push(arr2[index])
    }
    this.setData({
      check_arr: arr3,
      arr: arr2
    })
    this.allprice()
  },
  allprice() {
    let arr1 = this.data.check_arr
    let priceall = 0
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].num == 0) {
      } else {
        priceall += arr1[i].num * arr1[i].handleprice
      }
    }
    this.setData({
      check_arr: arr1,
      price: priceall
    })
  },
  ipt(e){
    console.log(e)
    let index = e.currentTarget.dataset.index
    let id = e.currentTarget.dataset.id
    let arr1 = this.data.check_arr
    let arr2 = this.data.arr
    arr2[index].handleprice = e.detail.value
    for(let i =0;i<arr1.length;i++){
      if(arr1[i].id == id){
        arr1[i].handleprice = e.detail.value
      }
    }
    this.setData({
      check_arr: arr1,
      arr: arr2
    })
    this.allprice()
  },
  next(){
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];//
    let arr = Page.data.arr.handlelist
    let arr2 = Page.data.arr ? Page.data.arr : { handlelist:''}
    let arr1 = this.data.check_arr
    let arr4 = Page.data.arr.handlelist ? Page.data.arr.handlelist:[]
    let arr3=[]
    let price = 0
    console.log(Page.data.arr.handlelist)
    for (let i = 0; i < arr1.length; i++) {
      if (arr){
        for (let j = 0; j < arr.length; j++) {
          if (arr[j].bhhandlesetidentity == arr1[i].handlesetguid) {
            arr[j].billnumber = arr1[i].num
            arr[j].remark = arr1[i].remark
            arr3.push(arr1[i].handlesetguid)
            if (arr[j].billnumber == 0) {
              arr4.splice(j, 1)
            }
          }
        }
      }
    }
    for(let k =0;k<arr1.length;k++){
      if (arr3.indexOf(arr1[k].handlesetguid)!=-1){

      }else{
        if (arr1[k].num != 0){
          arr4.push({
            "handleidentity": "", 
            "bhhandlesetidentity": arr1[k].handlesetguid, 
            "studyidentity": Page.data.arr.studyidentity, 
            "customerid": Page.data.patdetails.customerid, 
            "doctorid": "", 
            "billfeetype": arr1[k].feetype,
            "fee": arr1[k].handleprice, 
            "name": arr1[k].handlename, 
            "bhdoct": "", 
            "bhdoctidentity": "",
            "remark": arr1[k].handmark, 
            "bhuom": arr1[k].uom, 
            "unitprice": arr1[k].handleprice, 
            "billnumber": arr1[k].num, 
            "handletype": 1
          })
        }
      }
    }
    arr2.handlelist = arr4
    for (let q = 0; q < arr2.handlelist.length; q++) {
      price += Number(arr2.handlelist[q].billnumber) * arr2.handlelist[q].fee.indexOf(',') != -1 ? Number(arr2.handlelist[q].fee.split(',')[0] + arr2.handlelist[q].fee.split(',')[1]) : Number(arr2.handlelist[q].fee)
    }
    Page.setData({
      arr: arr2,
      price:price
    })
    this.onClickLeft()
  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/SelDrugList',
      method: 'post',
      data: {
        "condition": ""
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', //修改此处即可
        'token':wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let pages = getCurrentPages();
          let Page = pages[pages.length - 2];//
          let arr = Page.data.arr.handlelist
          console.log(arr)
          for(let i = 0;i<res.data.list.length;i++){
            res.data.list[i].num = 0
            if(arr){
              for (let j = 0; j < arr.length; j++) {
                if (arr[j].bhhandlesetidentity == res.data.list[i].handlesetguid) {
                  res.data.list[i].num = Number(arr[j].billnumber)
                  res.data.list[i].remark = arr[j].remark
                }
              }
            }
          }
          self.setData({
            arr:res.data.list,
            check_arr:res.data.list,
          })
          self.allprice()
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:'设置处方'
    })
    let pages = getCurrentPages();
    let Page = pages[pages.length - 3];
    this.setData({
      power_arr:Page.data.power_arr
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