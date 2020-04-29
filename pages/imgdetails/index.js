// pages/imgdetails/index.js
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:[],
    index:0,
    current:0,
    customerid: '',
    clinicid: '',
    state:0
  },
  edit(e){
    wx.navigateTo({
      url: '../imgedit/index?index=' + e.currentTarget.dataset.index,
    })
  },
  keep(e){
    Dialog.confirm({
      title: '提示',
      message: '您确定保存这张影像吗？'
    }).then(() => {
      wx.downloadFile({
        url: e.currentTarget.dataset.item.url, //仅为示例，并非真实的资源
        success(res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success(res) {
                console.log(res)
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 2000
                })
              }
            })
          }
        }
      })
      // on confirm
    }).catch(() => {
      // on cancel
    })
  },
  del(e) {
    let self = this
    if (self.data.state == 1){
      Dialog.confirm({
        title: '提示',
        message: '您确定删除这张影像吗？'
      }).then(() => {
        wx.request({
          url: getApp().data.APIS + '/patient/delmedicaimage',
          method: 'post',
          data: {
            customerid: self.data.customerid,
            studyuid: e.currentTarget.dataset.item.studyuid,
            seriesuid: e.currentTarget.dataset.item.seriesuid,
            sopuid: e.currentTarget.dataset.item.sopuid
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
              let arr = self.data.arr
              arr.splice(e.currentTarget.dataset.index, 1)
              console.log(arr)
              let pages = getCurrentPages();
              let Page = pages[pages.length - 2];
              Page.getdata()
              if(arr.length==0){
                wx.navigateBack({
                  delta: 1,
                })
              }else{
                self.setData({
                  arr: arr,
                  current: 0
                })
              }
            }
          }
        })
        // on confirm
      }).catch(() => {
        // on cancel
      })
    } else if (self.data.state == 3) {
      Dialog.confirm({
        title: '提示',
        message: '您确定删除这张影像吗？'
      }).then(() => {
        let pages = getCurrentPages();
        let Page = pages[pages.length - 2];
        let Pageprev = pages[pages.length - 3];
        let arr1 = Page.data.img_arr
        arr1.splice(e.currentTarget.dataset.index, 1)
        Page.setData({
          img_arr: arr1
        })
        Pageprev.setData({
          img_arr: arr1
        })
        if (!e.currentTarget.dataset.item.id){
          if (arr1.length == 0) {
            wx.navigateBack({
              delta: 1,
            })
          } else {
            self.setData({
              arr: arr1,
              current: 0
            })
          }
        }else{
          wx.request({
            url: getApp().data.APIS + '/svc/a',
            method: 'post',
            data: {
              plugin: 'deladdon',
              id: e.currentTarget.dataset.item.id,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' //修改此处即可
            },
            success: function (res) {
              console.log(res)
              if (res.data.info == 'ok') {
                if (arr1.length == 0) {
                  wx.navigateBack({
                    delta: 1,
                  })
                } else {
                  self.setData({
                    arr: arr1,
                    current: 0
                  })
                }
              }
            }
          })
        }
        // on confirm
      }).catch(() => {
        // on cancel
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '图片浏览'
    })
    this.setData({
      state:options.state
    })
    let pages = getCurrentPages();
    let Page = pages[pages.length - 2];
    let index = ''
    if (options.state == 1){
      for (let i = 0; i < Page.data.arr.length;i++){
        if (Page.data.arr[i].studydatetime == options.time){
          index = i+1
        }
      }
      this.setData({
        arr: Page.data.arr,
        customerid: Page.data.customerid,
        clinicid: Page.data.clinicid,
        index:index,
        current:index-1
      })
      console.log(Page.data)
    } else if (options.state == 2) {
      this.setData({
        arr: Page.data.arr,
        current: options.index
      })
    } else if (options.state == 3) {
      this.setData({
        arr: Page.data.img_arr,
        current: options.index
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