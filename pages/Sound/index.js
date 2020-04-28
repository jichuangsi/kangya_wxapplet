// pages/Sound/index.js
var countDown = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state:0,
    text:'准备录音',
    path: '',
    playstate:0,
    time: 600000,
    newtime: 600000,
    show: false,
    ly_state:0,
    patdetails: '',
    arr:'',
  },
  click(){
    let self = this
    let newtime = self.data.time
    console.log(self.data.state)
    if (self.data.state==0){
      self.setData({
        text: '正在录音',
        state:1
      })
      if (self.a == 0) {
        self.recorderManager.start(self.options)
        self.a = 1
      } else {
        self.recorderManager.resume(self.options)
      }
      countDown.start()
    } else {
      countDown.pause()
      self.recorderManager.pause(self.options)
      self.recorderManager.onPause((res) => {
        console.log(res)
        self.setData({
          text: '暂停录音',
          state: 0
        })
      })
    }
  },
  btn() {
    let self = this
    countDown.pause()
    self.recorderManager.stop(self.options)
    self.recorderManager.onStop((res) => {
      console.log(res)
      self.setData({
        text: '停止录音',
        state: 0,
        path: res.tempFilePath
      })
      self.setData({
        show: true
      })
      let name = new Date().getTime() + res.tempFilePath.substring(res.tempFilePath.length - 4)
      wx.getFileSystemManager().readFile({
        filePath: res.tempFilePath,
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
              self.setData({
                show: false
              })
              console.log(res);
              wx.showToast({
                title: '上传成功',
              })
              if (self.data.ly_state==1){
                if (self.data.arr.addon) {
                  self.data.arr.addon.push({ type: "rec", url: "https://www.kyawang.com/oc9/index.php/s/sdAqxmkSwWs7WK4/download?path=%2F&files=" + name})
                }else{
                  self.data.arr.addon = [{ type: "rec", url: "https://www.kyawang.com/oc9/index.php/s/sdAqxmkSwWs7WK4/download?path=%2F&files=" + name }]
                }
                self.editManagement()
              } else if(self.data.ly_state == 2) {
                let pages = getCurrentPages();
                let Page = pages[pages.length - 2];//
                let arr = Page.data.audio_arr
                arr.push({ type: "rec", url: "https://www.kyawang.com/oc9/index.php/s/sdAqxmkSwWs7WK4/download?path=%2F&files=" + name })
                Page.setData({
                  audio_arr: arr
                })
                wx.navigateBack({
                  delta: 1,
                })
              } else if (self.data.ly_state == 3) {
                let pages = getCurrentPages();
                let Page = pages[pages.length - 2];//
                let arr = Page.data.addon
                arr.push({ type: "rec", url: "https://www.kyawang.com/oc9/index.php/s/sdAqxmkSwWs7WK4/download?path=%2F&files=" + name })
                Page.setData({
                  addon: arr
                })
                wx.navigateBack({
                  delta: 1,
                })
              }
            },

            fail: function (err) {
              console.log("失败");
              wx.showToast({
                icon:'none',
                title: '上传失败',
              })
              self.setData({
                show: false
              })

            }

          })
        }
      })
      
    })
  },

  editManagement() {
    let self = this
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
          let pages = getCurrentPages();
          let Page = pages[pages.length - 2];//
          setTimeout(function () {
            Page.getdata()
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
      title: '录音'
    })
    countDown = this.selectComponent('.control-count-down');
    countDown.pause()
    this.recorderManager = wx.getRecorderManager()
    console.log(this.recorderManager)
    this.options = {
      duration: 600000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'aac',
    }
    this.a = 0
    if (options.state == 1) {
      let pages = getCurrentPages();
      let Page = pages[pages.length - 2];//
      this.setData({
        index:options.index,
        ly_state:options.state,
        arr: Page.data.arr[options.index],
        patdetails: Page.data.patdetails
      })
    } else if (options.state == 2) {
      this.setData({
        ly_state: options.state,
      })
    } else if (options.state == 3) {
      this.setData({
        ly_state: options.state,
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