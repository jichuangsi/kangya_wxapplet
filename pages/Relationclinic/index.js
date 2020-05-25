// pages/Relationclinic/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '选择关联',
    clinicnum: '',
    name: '',
    psw: '',
    pswstate: true,
    state: false
  },
  onClickLeft() {
    wx.navigateBack({
      delta: 1
    })
  },
  iptclinicnum(e){
    this.setData({
    clinicnum: e.detail.value
    })
    this.iptchange()
  },
  iptname(e) {
    this.setData({
      name: e.detail.value
    })
    this.iptchange()
  },
  iptpsw(e) {
    this.setData({
        psw: e.detail.value
    })
    this.iptchange()
  },
  iptchange(){
    console.log(this.data.psw)
      // && this.data.psw.length > 5
    if (this.data.clinicnum != '' && this.data.name != '' && this.data.psw != '' ){
      this.setData({
        state: true
      })
    }else{
      this.setData({
        state: false
      })
    }
  },
  pswcheck(e){
    console.log(e.currentTarget.dataset.id)
    this.setData({
      pswstate: e.currentTarget.dataset.id==1?false:true
    })
  },
  btn(){
    if (this.data.state) {
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
                  plugin: 'wxbind',
                  phone: that.data.name,
                  pwd: that.data.psw,
                  clinic: that.data.clinicnum,
                  code: code,
                  username: encryptedData,
                  password: iv,
                  grant_type: "password",
                  auth_approach: 'wxapp',
                },
                method: "POST",
                success: function (res) {
                  console.log(res)
                  if (res.statusCode === 200) {
                    if (res.data.list[0].token){
                      wx.showToast({
                        title: '登录成功',
                        icon: 'success'
                      });
                      xdata.access_token = res.data.list[0].token;
                      wx.setStorageSync('token', res.data.list[0].token)
                      
                      let pages = getCurrentPages()
                      //获取当前页面的对象
                      let view = pages[pages.length - 1]
                      view.onLoad()

                      wx.navigateBack({
                        delta: 1,
                      })
                    }else{
                      wx.showToast({
                        title: '登录失败',
                        icon: 'none',
                      })
                    }
                  } else {
                    // 如果没有注册调用注册接口
                    // 提示错误信息
                    wx.showToast({
                      title: res.data.text,
                      icon: 'success',
                      duration: 2000
                    });
                    that.register();//调到授权登录页
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
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '选择关联'
    })
    if (options.state == 0){

    }else{
      this.setData({
        clinicnum: options.clinicnum
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