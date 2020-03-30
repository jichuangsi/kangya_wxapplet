// pages/Tooth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '标记牙位',
    active:'恒牙',
    state:0,
    text:'',
    index:'',
    arr1:[
      { state: 0, text: 8, id: 0 },
      { state: 0, text: 7, id: 1 },
      { state: 0, text: 6, id: 2 },
      { state: 0, text: 5, id: 3 },
      { state: 0, text: 4, id: 4 },
      { state: 0, text: 3, id: 5 },
      { state: 0, text: 2, id: 6 },
      { state: 0, text: 1, id: 7 },
      { state: 0, text: 1, id: 8 },
      { state: 0, text: 2, id: 9 },
      { state: 0, text: 3, id: 10 },
      { state: 0, text: 4, id: 11 },
      { state: 0, text: 5, id: 12 },
      { state: 0, text: 6, id: 13 },
      { state: 0, text: 7, id: 14 },
      { state: 0, text: 8, id: 15 },
    ],
    arr2: [
      { state: 0, text: 8, id: 0 },
      { state: 0, text: 7, id: 1 },
      { state: 0, text: 6, id: 2 },
      { state: 0, text: 5, id: 3 },
      { state: 0, text: 4, id: 4 },
      { state: 0, text: 3, id: 5 },
      { state: 0, text: 2, id: 6 },
      { state: 0, text: 1, id: 7 },
      { state: 0, text: 1, id: 8 },
      { state: 0, text: 2, id: 9 },
      { state: 0, text: 3, id: 10 },
      { state: 0, text: 4, id: 11 },
      { state: 0, text: 5, id: 12 },
      { state: 0, text: 6, id: 13 },
      { state: 0, text: 7, id: 14 },
      { state: 0, text: 8, id: 15 },
    ],
    arr3: [
      { state: 0, text: 'E', id: 0 },
      { state: 0, text: 'D', id: 1 },
      { state: 0, text: 'C', id: 3 },
      { state: 0, text: 'B', id: 5 },
      { state: 0, text: 'A', id: 7 },
      { state: 0, text: 'A', id: 8 },
      { state: 0, text: 'B', id: 10 },
      { state: 0, text: 'C', id: 12 },
      { state: 0, text: 'D', id: 14 },
      { state: 0, text: 'E', id: 15 },
    ],
    arr4: [
      { state: 0, text: 'E', id: 0 },
      { state: 0, text: 'D', id: 1 },
      { state: 0, text: 'C', id: 3 },
      { state: 0, text: 'B', id: 5 },
      { state: 0, text: 'A', id: 7 },
      { state: 0, text: 'A', id: 8 },
      { state: 0, text: 'B', id: 10 },
      { state: 0, text: 'C', id: 12 },
      { state: 0, text: 'D', id: 14 },
      { state: 0, text: 'E', id: 15 },
    ]
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  btn() {
    let arr1 = this.data.arr1
    let arr2 = this.data.arr2
    let arr3 = this.data.arr3
    let arr4 = this.data.arr4
    let lt = ''
    let rt = ''
    let lb = ''
    let rb = ''
    for (let i = 0; i < arr1.length; i++) {
      if (i <= 7 && arr1[i].state == 1) {
        lt += arr1[i].text
      } else if (i > 7 && arr1[i].state == 1) {
        rt += arr1[i].text
      }
    }
    for (let i = 0; i < arr2.length; i++) {
      if (i <= 7 && arr2[i].state == 1) {
        lb += arr2[i].text
      } else if (i > 7 && arr2[i].state == 1) {
        rb += arr2[i].text
      }
    }
    for (let i = 0; i < arr3.length; i++) {
      if (i <= 4 && arr3[i].state == 1) {
        lt += arr3[i].text
      } else if (i > 4 && arr3[i].state == 1) {
        rt += arr3[i].text
      }
    }
    for (let i = 0; i < arr4.length; i++) {
      if (i <= 4 && arr4[i].state == 1) {
        lb += arr4[i].text
      } else if (i > 4 && arr4[i].state == 1) {
        rb += arr4[i].text
      }
    }
    if(this.data.state == 1){
      wx.navigateBack({
        delta: 2
      })
    } else {
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      if (this.data.text == 'inspect'){
        let data_arr = prevPage.data.inspect
        data_arr[this.data.index].lt = lt
        data_arr[this.data.index].rt = rt
        data_arr[this.data.index].lb = lb
        data_arr[this.data.index].rb = rb
        prevPage.setData({
          inspect: data_arr
        })
      } else if (this.data.text == 'auxiliary') {
        let data_arr = prevPage.data.inspect
        data_arr[this.data.index].lt = lt
        data_arr[this.data.index].rt = rt
        data_arr[this.data.index].lb = lb
        data_arr[this.data.index].rb = rb
        prevPage.setData({
          auxiliary: data_arr
        })
      } else if (this.data.text == 'diagnose') {
        let data_arr = prevPage.data.inspect
        data_arr[this.data.index].lt = lt
        data_arr[this.data.index].rt = rt
        data_arr[this.data.index].lb = lb
        data_arr[this.data.index].rb = rb
        prevPage.setData({
          diagnose: data_arr
        })
      } else if (this.data.text == 'programme') {
        let data_arr = prevPage.data.inspect
        data_arr[this.data.index].lt = lt
        data_arr[this.data.index].rt = rt
        data_arr[this.data.index].lb = lb
        data_arr[this.data.index].rb = rb
        prevPage.setData({
          programme: data_arr
        })
      } else if (this.data.text == 'treat') {
        let data_arr = prevPage.data.inspect
        data_arr[this.data.index].lt = lt
        data_arr[this.data.index].rt = rt
        data_arr[this.data.index].lb = lb
        data_arr[this.data.index].rb = rb
        prevPage.setData({
          treat: data_arr
        })
      }
      wx.navigateBack({
        delta: 1
      })
    }
  },
  onChange(event) {
    this.setData({
      active: event.detail.name
    })
  },
  check1(e){
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    let arr = this.data.arr1
    arr[index].state = arr[index].state==0?1:0
    console.log(arr)
    this.setData({arr1 :arr})
  },
  check2(e) {
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    let arr = this.data.arr2
    arr[index].state = arr[index].state == 0 ? 1 : 0
    console.log(arr)
    this.setData({ arr2: arr })
  },
  check3(e) {
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    let arr = this.data.arr3
    arr[index].state = arr[index].state == 0 ? 1 : 0
    console.log(arr)
    this.setData({ arr3: arr })
  },
  check4(e) {
    console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index
    let arr = this.data.arr4
    arr[index].state = arr[index].state == 0 ? 1 : 0
    console.log(arr)
    this.setData({ arr4: arr })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ state: options.state })
    wx.setNavigationBarTitle({
      title: '标记牙位'
    })
    console.log(options)
    let pages = getCurrentPages();
    let prevPage = options.state ? pages[pages.length - 3] : pages[pages.length - 2];
    let item = ''
    console.log(prevPage.data)
    if (options.text == 'inspect') {
      item = prevPage.data.inspect[options.index]
    } else if (options.text == 'auxiliary') {
      item = prevPage.data.auxiliary[options.index]
    } else if (options.text == 'diagnose') {
      item = prevPage.data.diagnose[options.index]
    } else if (options.text == 'programme') {
      item = prevPage.data.programme[options.index]
    } else if (options.text == 'treat') {
      item = prevPage.data.treat[options.index]
    }
    let arr1 = this.data.arr1
    let arr2 = this.data.arr2
    let arr3 = this.data.arr3
    let arr4 = this.data.arr4

    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < item.lt.split('').length; j++) {
        if (i <= 7 && item.lt.split('')[j] == arr1[i].text){
          arr1[i].state = 1
        }
      }
    }
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < item.rt.split('').length; j++) {
        if (i > 7 && item.rt.split('')[j] == arr1[i].text) {
          arr1[i].state = 1
        }
      }
    }
    for (let i = 0; i < arr2.length; i++) {
      for (let j = 0; j < item.lb.split('').length; j++) {
        if (i <= 7 && item.lb.split('')[j] == arr2[i].text) {
          arr2[i].state = 1
        }
      }
    }
    for (let i = 0; i < arr2.length; i++) {
      for (let j = 0; j < item.rb.split('').length; j++) {
        if (i > 7 && item.rb.split('')[j] == arr2[i].text) {
          arr2[i].state = 1
        }
      }
    }
    for (let i = 0; i < arr3.length; i++) {
      for (let j = 0; j < item.lt.split('').length; j++) {
        if (i <= 4 && item.lt.split('')[j] == arr3[i].text) {
          arr3[i].state = 1
        }
      }
    }
    for (let i = 0; i < arr3.length; i++) {
      for (let j = 0; j < item.rt.split('').length; j++) {
        if (i > 4 && item.rt.split('')[j] == arr3[i].text) {
          arr3[i].state = 1
        }
      }
    }
    for (let i = 0; i < arr4.length; i++) {
      for (let j = 0; j < item.lb.split('').length; j++) {
        if (i <= 4 && item.lb.split('')[j] == arr4[i].text) {
          arr4[i].state = 1
        }
      }
    }
    for (let i = 0; i < arr4.length; i++) {
      for (let j = 0; j < item.rb.split('').length; j++) {
        if (i > 4 && item.rb.split('')[j] == arr4[i].text) {
          arr4[i].state = 1
        }
      }
    }
    this.setData({
      arr1:arr1,
      arr2:arr2,
      text:options.text,
      index:options.index
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