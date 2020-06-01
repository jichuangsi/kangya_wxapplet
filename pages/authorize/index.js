// pages/authorize/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  back(){
    wx.navigateBack({
      delta: 1,
    })
  },
  bindGetUserInfo(res){
    console.log(res)
    if (res.detail.errMsg =='getUserInfo:fail auth deny'){
      
    }else{
      this.signin()
      // wx.redirectTo({
      //   url: '/'+wx.getStorageSync('CurrentPage'),
      // })
    }
  },
  signin() {
    //****************************放在初始化界面****************************//
    var that = this;
    var xdata = getApp().data
    wx.login({
      // 调用 login 获取 code
      success: function (res) {
        var code = res.code;
        wx.getUserInfo({
          // 调用 getUserInfo 获取 encryptedData 和 iv
          success: function (res) {
            console.log(res)
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
                plugin: 'oauth2',
                code: code,
                username: encryptedData,
                password: iv,
                grant_type: "password",
                auth_approach: 'wxapp',
              },
              method: "POST",
              success: function (res) {
                console.log(11)
                console.log(res)
                if (res.statusCode === 200) {
                  if (res.data.list[0].r =='no auth'){
                    wx.navigateTo({
                      url: '/pages/Relationclinic/index?state=0',
                    })
                  }else{
                    // 得到 jwt 后存储到 storage，
                    // wx.showToast({
                    //   title: '登录成功',
                    //   icon: 'success'
                    // });
                    xdata.access_token = res.data.list[0].token;
                    wx.setStorageSync('token', res.data.list[0].token)
                    self.view.onLoad()
                  }
                } else {
                  // 如果没有注册调用注册接口
                  // 提示错误信息
                  wx.showToast({
                    title: res.data.text,
                    icon: 'success',
                    duration: 2000
                  });
                  // that.register();//调到授权登录页
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
            wx.navigateTo({
              url: '',
            })
          }
        })
      }
    });
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideHomeButton()
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