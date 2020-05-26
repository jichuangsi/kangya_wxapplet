// pages/D_QRCode/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    id:'',
    isOverShare:true
  },
  go(){
    wx.redirectTo({
      url: '../D_index/index?doctorid='+this.data.id,
    })
  },
  baocun(){
    let that = this
    // wx.downloadFile({
    //   url: 'http://qr.liantu.com/api.php?text=https://open.weixin.qq.com/sns/getexpappinfo?appid=wxc34210c312dd9e56&path=pages%2FD_index%2Findex.html?doctorid='+that.data.id+'#wechat-redirect',
    //   success: function (res) {
    
    //     wx.saveImageToPhotosAlbum({
    //       filePath: res.tempFilePath,
    //       success(result) {
    //         console.log(result)
    //       }
    //     })
    //     // wx.saveFile({
    //     //   tempFilePath: res.tempFilePath,
    //     //   success: function (res) {
    //     //     console.log(res.savedFilePath) 
    //     //   }
    //     // })
        
    //   }
    // })


    const ctx = wx.createCanvasContext("myCanvas", that)
    console.log(ctx)
      // 获取图片信息，要按照原图来绘制，否则图片会变形 
      wx.getImageInfo({
        src: 'https://www.kyawang.com/uploads/images/border.png',
        success: function(res) {
          // 根据 图片的大小 绘制底图 的大小
          console.log(" 绘制底图 的图片信息》》》", res)
          let imgW = res.width
          let imgH = res.height
          let imgPath = res.path

          that.setData({
            canvasHeight: imgH,
            canvasWidth: imgW
          })
          // 绘制底图 用原图的宽高比绘制
          ctx.drawImage(imgPath, 0, 0, imgW, imgH)

          wx.getImageInfo({
            src: 'http://qr.liantu.com/api.php?text=https://open.weixin.qq.com/sns/getexpappinfo?appid=wxc34210c312dd9e56&path=pages%2FD_index%2Findex.html?doctorid='+that.data.id+'#wechat-redirect', // 二维码图片的路径
            success: function(res) {
              console.log(" 绘制二维码》》》", res)
              // 绘制二维码
              ctx.drawImage(res.path, 60, 60, res.width*0.6, res.height*0.6)
              ctx.draw()

              wx.showLoading({
                title: '正在保存',
                mask: true

              })

              setTimeout(() => {
                wx.canvasToTempFilePath({
                  canvasId: 'myCanvas',
                  success: function(res) {
                    console.log("合成的带有小程序码的图片success》》》", res)
                    let tempFilePath = res.tempFilePath
                    // 保存到相册
                    wx.saveImageToPhotosAlbum({
                      filePath: tempFilePath,
                      success(res) {
                        wx.hideLoading()
                        wx.showModal({
                          title: '温馨提示',
                          content: '图片保存成功，可在相册中查看',
                          showCancel: false,
                          success(res) {
                            wx.clear
                            if (res.confirm) {
                              that.setData({
                                isShow: true
                              })
                            }
                          }
                        })
                      },

                      fail(res) {
                        wx.hideLoading()
                        wx.showModal({
                          title: '温馨提示',
                          content: '图片保存失败，请重试',
                          showCancel: false
                        })
                      }
                    })

                    console.log("合成的带有小程序码的图片的信息》》》", res)
                  },
                  fail: function(res) {
                    console.log("生成的图拍呢 失败 fail fail fail ", res)
                    wx.hideLoading()
                    wx.showModal({
                      title: '温馨提示',
                      content: '小程序码图片合成失败，请重试',
                      showCancel: false
                    })
                  }
                }, that)
              },1500)
            },
            fail(res) {
              wx.hideLoading()
              wx.showModal({
                title: '温馨提示',
                content: '二维码获取失败，请重试',
                showCancel: false
              })
            }
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title:options.title,
      id:options.id
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
    return {
      title: "医生二维码",
      desc: '分享页面的内容',
      path: '/pages/D_QRCode/index?title=医生二维码' + '&&id=' + this.data.id  // 路径，传递参数到指定页面。
    }
  }
})