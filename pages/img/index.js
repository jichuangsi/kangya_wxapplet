// pages/img/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '影像',
    show: false,
    state:0,
    msgstate:0,
    arr:[],
    zsarr:[],
    customerid: '',
    clinicid: '',
    power_arr: [],
    user: '',
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    if (this.data.power_arr.code10302.has) {
      this.setData({ show: true })
    }else{
      wx.showToast({
        icon:'none',
        title: '暂无权限',
      })
    }
  },
  onClose() {
    this.setData({ show: false });
  },
  pz() {
    let self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        self.addimg(res.tempFilePaths)
      }
    })
  },
  xc() {
    let self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        self.addimg(res.tempFilePaths)
        console.log(res.tempFilePaths)
      }
    })
  },
  imgclick(e) {
    console.log(e)
    wx.navigateTo({
      url: '../imgdetails/index?state=1&&time=' + e.currentTarget.dataset.time,
    })
      // wx.previewImage({
      //   current: e.currentTarget.dataset.item.url, // 当前显示图片的http链接
      //   urls: [e.currentTarget.dataset.item.url] // 需要预览的图片http链接列表
      // })
  },
  addimg(imgname) {
    let self = this
    let name = new Date().getTime() + imgname[0].substring(imgname[0].length - 4)
    wx.getFileSystemManager().readFile({
      filePath: imgname[0],
      success: fileStream => {
        console.log(fileStream)
        wx.request({
          url: 'https://www.kyawang.com/oc9/remote.php/webdav/rec/' + name,

          method: 'PUT',
          dataType: 'ARRAYBUFFER',
          header: {
            'Authorization': 'Basic cHViOnB1YkAxMjM=',
            'Content-Type': 'multipart/form-data',
          },

          data: fileStream.data,

          processData: false,

          success: function (res) {

            wx.showToast({
              title: '上传成功',
            })
            self.setData({
              show: false
            })
            self.getdata()
          },

          fail: function (err) {

            console.log("失败");
            wx.showToast({
              icon:'none',
              title: '上传失败',
            })
            self.setData({
              show:false
            })

          }

        })
      }
    })

  },
  getdata() {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/patient/patientimagelist',
      method: 'post',
      data: {
        customerid: self.data.customerid,
        clinicid: self.data.clinicid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let arr = res.data.list.imagelist
          let arr1 = []
          let arr2 = []
          for (let i = 0; i < arr.length;i++){
            arr[i].state = 0
            if (arr1.indexOf(arr[i].studydatetime.split(' ')[0]) == -1) {
              arr1.push(arr[i].studydatetime.split(' ')[0])
            }
          }
          for (let j = 0; j < arr1.length; j++) {
            arr2.push({time:arr1[j],child:[]})
            for (let k = 0; k < arr.length; k++) {
              if (arr[k].studydatetime.split(' ')[0]==arr1[j]){
                arr2[j].child.push(arr[k])
              }
            }
          }
          console.log(arr2)
          self.setData({
            arr: arr,
            zsarr: arr2
          })
          console.log(self.data.arr)
        }
      }
    })
  },
  check_img(e){
    let index = e.currentTarget.dataset.index
    let arr = this.data.arr
    arr[index].state = arr[index].state == 0 ? 1 : 0
    this.setData({
      arr: arr
    })
  },
  btn() {
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    if (this.data.msgstate == 0) {
      let currPage = pages[pages.length - 3];
      let arr = pages[pages.length - 2].img_arr
      for (let i = 0; i < this.data.arr.length; i++) {
        if (this.data.arr[i].state == 1) {
          arr.push(this.data.arr[i])
        }
      }
      currPage.setData({
        img_arr: arr
      })
      prevPage.setData({
        img_arr: arr
      })
      this.onClickLeft()
    } else {
      let arr1 = []
      for (let i = 0; i < this.data.arr.length; i++) {
        if (this.data.arr[i].state == 1) {
          arr1.push(this.data.arr[i])
        }
      }
      prevPage.setData({
        img_arr: arr1
      })
      this.onClickLeft()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ 
      title: options.title, 
      state: options.state ? options.state : 0,
      msgstate: options.msgstate ? options.msgstate : 0
    })
    wx.setNavigationBarTitle({
      title: options.title ? options.title :'影像'
    })
    // let pages = getCurrentPages();
    // let Page = pages[pages.length - 2];
    // this.setData({
    //   customerid: Page.data.customerid,
    //   clinicid: Page.data.clinicid
    // })
    // if (!options.title) {
    //   console.log(Page.data.power_arr)
    //   this.setData({
    //     power_arr: Page.data.power_arr,
    //     user: Page.data.user,
    //   })
    // }
    console.log(this.data.power_arr)
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