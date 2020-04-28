// pages/Agreeimg/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '知情同意书',
    show:false,
    img_arr:[],
    ly_state: 0,
    index: 0,
    arr: '',
    patdetails: ''
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  onClickRight() {
    this.setData({show:true})
  },
  onClose() {
    this.setData({ show: false });
  },
  imgclick(e) {
    wx.navigateTo({
      url: '../imgdetails/index?state=3&&index=' + e.currentTarget.dataset.index,
    })
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
      }
    })
  },
  addimg(imgname) {
    let self = this
    let name = new Date().getTime() + imgname[0].substring(imgname[0].length - 4)
    wx.getFileSystemManager().readFile({
      filePath: imgname[0],
      success: fileStream => {
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
            if(self.data.ly_state==1){
              let arr = self.data.img_arr
              arr.push({ type: 'image', url: "https://www.kyawang.com/oc9/index.php/s/sdAqxmkSwWs7WK4/download?path=%2F&files=" + name})
              self.setData({
                img_arr:arr
              })
            } else if (self.data.ly_state == 2) {
              let arr = self.data.img_arr
              arr.push({ type: 'image', url: "https://www.kyawang.com/oc9/index.php/s/sdAqxmkSwWs7WK4/download?path=%2F&files=" + name })
              self.setData({
                img_arr: arr
              })
            }
          },

          fail: function (err) {

            console.log("失败");
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
            self.setData({
              show: false
            })

          }

        })
      }
    })
  },
  imggo(){
    wx.navigateTo({
      url: '../img/index?title=选择影像',
    })
    this.onClose()
  },

  editManagement() {
    let self = this
    console.log(self.data.arr.handlelist)
    wx.request({
      url: getApp().data.APIS + '/patient/SaveHandleList',
      method: 'post',
      data: {
        addon: JSON.stringify(self.data.arr.addon),
        study: JSON.stringify(self.data.arr.handlelist),
        studyidentity: self.data.arr.studyidentity,
        customerid: self.data.patdetails.customerid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          setTimeout(function () {
            self.pageprev.getdata()
            wx.navigateBack({
              delta: 1,
            })
          }, 1000)
        } else {
          wx.showToast({
            title: '失败',
            duration: 2000
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '知情同意书'
    })
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];//
    this.pageprev = Page
    if (options.state == 1) {
      let arr = []
      for (let i = 0; i < Page.data.arr[options.index].addon.length;i++){
        if (Page.data.arr[options.index].addon[i].type =='image'){
          arr.push(Page.data.arr[options.index].addon[i])
        }
      }
      this.setData({
        index: options.index,
        ly_state: options.state,
        arr: Page.data.arr[options.index],
        patdetails: Page.data.patdetails,
        img_arr: arr
      })
    } else if (options.state == 2) {
      console.log(Page.data.img_arr)
      this.setData({
        ly_state: options.state,
        img_arr: Page.data.img_arr
      })
    }
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
    if (this.pageprev.title == '处置') {
      let arr = []
      let arr1 = this.data.arr
      let arr2 = []
      for (let i = 0; i < this.data.arr.addon.length; i++) {
        if (this.data.arr.addon[i].type == 'rec') {
          arr.push(this.data.arr.addon[i])
        }
      }
      for (let j = 0; j < this.data.img_arr.length; j++) {
        arr2.push({ type: 'image', url: this.data.img_arr[j].url })
      }
      arr.push(...arr2)
      arr1.addon = arr
      this.setData({
        arr: arr1
      })
      this.editManagement()
    }else if(this.data.ly_state == 2){
      let arr = []
      for (let i = 0; i < this.data.img_arr.length;i++){
        arr.push({ type: 'image', url: this.data.img_arr[i].url })
      }
      console.log(arr)
      this.pageprev.setData({
        img_arr: arr
      })
      console.log(this.pageprev)
    }
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