// pages/Relation/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '选择关联'
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  getQRCode: function () {
    var _this = this;
    wx.scanCode({        //扫描API
      success: function (res) {
        console.log(res.result);    //输出回调信息
        // wx.showToast({
        //   title: '成功',
        //   duration: 2000
        // })
        _this.wxcode(res.result.split('ticket=')[0])
      }
    })
  },
  wxcode(qrcode) {
    //*************************放在扫码登录界面******************************** */
    var that = this;
    var xdata = getApp().data
    wx.login({
      // 调用 login 获取 code
      success: function (res) {
        var code = res.code;
        wx.getUserInfo({
          // 调用 getUserInfo 获取 encryptedData 和 iv
          success: function (res) {
            // success
            xdata.userInfo = res.userInfo;
            var encryptedData = res.encryptedData || 'encry';
            var iv = res.iv || 'iv';
            wx.request({ // 发送请求 获取 jwt
              url: xdata.APIS + '/svc/a',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              data: {
                plugin: 'wxcode',
                qrcode: qrcode,
                code: code,
                username: encryptedData,
                password: iv,
                grant_type: "password",
                auth_approach: 'wxapp',
              },
              method: "POST",
              success: function (res) {
                if (res.statusCode === 200) {
                  wx.navigateTo({
                    url: '/pages/Relationclinic/index?state=1&&clinicnum='+res.data.list[0].clinic,
                  })
                } else {
                  // 如果没有注册调用注册接口
                  // 提示错误信息
                  wx.showToast({
                    title: res.data.text,
                    icon: 'success',
                    duration: 2000
                  });
                  wx.navigateTo({
                    url: '/pages/Relationclinic/index?state=0',
                  })
                }
              },
              fail: function (res) {
                console.log('request token fail');
              }
            })
          },
          fail: function (res) {
            console.log('request token fail');
          }
        })
      }
    });
  },

  goclinic(){
    wx.navigateTo({
      url: '../Relationclinic/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择关联'
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