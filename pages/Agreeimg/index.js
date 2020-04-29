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
    patdetails: '',
    tesu:0,
    tesu_arr:[]
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
            if (self.data.ly_state == 3) {
              let arr = self.data.img_arr
              arr.push({ type: 'image', url: "https://www.kyawang.com/oc9/index.php/s/sdAqxmkSwWs7WK4/download?path=%2F&files=" + name })
              self.setData({
                img_arr: arr
              })
              let pages = getCurrentPages();
              let Page = pages[pages.length - 2];//
              Page.setData({
                img_arr: arr
              })
            } else {
              self.addaudio(name)
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
      url: '../img/index?title=选择影像&&ly_state='+this.data.ly_state,
    })
    this.onClose()
  },


  addaudio(url) {
    let self = this
    wx.request({
      url: getApp().data.APIS + '/svc/a',
      method: 'post',
      data: {
        plugin: 'addon',
        sid: self.data.arr.studyidentity,
        pid: self.data.patdetails.patientid,
        link: self.data.tesu == 1 ? url:"https://www.kyawang.com/oc9/index.php/s/sdAqxmkSwWs7WK4/download?path=%2F&files=" + url,
        memo: 'image'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: function (res) {
        console.log(res)
        if (res.data.info == 'ok') {
          let pages = getCurrentPages();
          let Page = pages[pages.length - 2];//
          let Pageprev = pages[pages.length - 3];//
          if (self.data.ly_state == 1) {
            let i1 = Page.data.arr[self.data.index].addon.length
            Page.getdata()
            let timeout = setInterval(function(){
              if (i1 != Page.data.arr[self.data.index].addon.length) {
                let arr = Page.data.arr[self.data.index].addon
                let arr1 = []
                for (let i = 0; i < arr.length; i++) {
                  if (arr[i].type == 'image') {
                    arr1.push(arr[i])
                  }
                }
                self.setData({
                  img_arr: arr1
                })
                clearInterval(timeout)
              }
            },100)
          } else if (self.data.ly_state == 2) {
            let i1 = Pageprev.data.arr[Page.data.index].addon.length
            Pageprev.getdata()
            let timeout = setInterval(function () {
              if (i1 != Pageprev.data.arr[Page.data.index].addon.length) {
                let arr = Pageprev.data.arr[Page.data.index].addon
                let arr1 = []
                for (let i = 0; i < arr.length; i++) {
                  if (arr[i].type == 'image') {
                    arr1.push(arr[i])
                  }
                }
                Page.setData({
                  img_arr: arr1
                })
                self.setData({
                  img_arr: arr1
                })
                clearInterval(timeout)
              }
            },100)
          }
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
    this.page3 = pages[pages.length - 3];
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
      console.log(222)
      this.setData({
        ly_state: options.state,
        img_arr: Page.data.img_arr,
        arr: Page.data.arr,
        patdetails: Page.data.patdetails,
      })
    } else if (options.state == 3){
      this.setData({
        ly_state: options.state,
      })
    }
    console.log(this.data.arr)
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
    console.log(333)
    console.log(this.data.tesu)
    if(this.data.tesu == 1){
      for (let i = 0; i < this.data.tesu_arr.length;i++){
        this.addaudio(this.data.tesu_arr[i].url)
      }
    }
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
    console.log(555555555)
    console.log(this.data.ly_state)
    if (this.pageprev.title == '处置') {
      this.pageprev.getdata()
    } else if (this.data.ly_state == 2) {
      this.page3.getdata()
    }else if(this.data.ly_state == 3){
      console.log(333333333333)
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